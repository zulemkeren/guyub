-- ============================================================================
-- Guyub — Database Schema (PostgreSQL / Supabase)
-- ============================================================================
-- Target: RT pilot with up to ~200 warga, scales to multi-tenant (many RTs)
--
-- Design principles:
--   1. Multi-tenant from day 1 (rt_id on every table)
--   2. Soft-delete via deleted_at (warga/finance data must be recoverable)
--   3. Audit trail via created_at / updated_at / created_by
--   4. Row Level Security (RLS) for Supabase — handled separately
--   5. Indonesian-first: addresses use Indonesian admin hierarchy
-- ============================================================================

-- ─── Organizations (RT / RW / Kelurahan) ───────────────────────────────────
-- A Guyub "organization" is typically a single RT. RWs and kelurahans can
-- later manage multiple RTs via parent_org_id.

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_org_id UUID REFERENCES organizations(id) ON DELETE SET NULL,

    -- Administrative identity
    org_type TEXT NOT NULL CHECK (org_type IN ('rt', 'rw', 'kelurahan', 'kecamatan')),
    rt_number TEXT,                  -- e.g. "003"
    rw_number TEXT,                  -- e.g. "007"
    kelurahan TEXT,                  -- e.g. "Purwokerto Kulon"
    kecamatan TEXT,
    kota_kabupaten TEXT,
    provinsi TEXT DEFAULT 'Jawa Tengah',

    -- Display
    display_name TEXT NOT NULL,      -- "RT 003 / RW 007, Purwokerto Kulon"
    subdomain TEXT UNIQUE,           -- "rt003-purwokerto" → rt003-purwokerto.guyub.app
    logo_url TEXT,

    -- Plan
    plan TEXT NOT NULL DEFAULT 'rukun' CHECK (plan IN ('rukun', 'guyub', 'sejahtera', 'rw')),
    max_kk INTEGER NOT NULL DEFAULT 50,
    trial_ends_at TIMESTAMPTZ,
    subscribed_until TIMESTAMPTZ,

    -- Metadata
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_organizations_parent ON organizations(parent_org_id);
CREATE INDEX idx_organizations_subdomain ON organizations(subdomain) WHERE deleted_at IS NULL;

-- ─── Users & roles ─────────────────────────────────────────────────────────
-- Supabase manages auth.users. We extend with a profiles table.
-- A user can be part of multiple organizations with different roles.

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,                      -- WhatsApp number, format: +62...
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE organization_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

    role TEXT NOT NULL CHECK (role IN ('ketua_rt', 'bendahara', 'sekretaris', 'warga')),
    is_active BOOLEAN NOT NULL DEFAULT true,

    invited_at TIMESTAMPTZ DEFAULT now(),
    joined_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    UNIQUE (organization_id, profile_id)
);

CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_profile ON organization_members(profile_id);

-- ─── Kartu Keluarga (KK) ───────────────────────────────────────────────────
-- One KK = one household. Warga are linked to a KK.

CREATE TABLE kartu_keluarga (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

    no_kk CHAR(16) NOT NULL,         -- 16-digit KK number
    alamat TEXT NOT NULL,
    rt_rw TEXT,                      -- redundant but useful for search
    kelurahan TEXT,
    kepala_keluarga_warga_id UUID,   -- set after warga inserted

    notes TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,

    UNIQUE (organization_id, no_kk)
);

CREATE INDEX idx_kk_org ON kartu_keluarga(organization_id) WHERE deleted_at IS NULL;

-- ─── Warga (Residents) ─────────────────────────────────────────────────────
-- The core of the citizen data. Sensitive — treat with care.

CREATE TABLE warga (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    kartu_keluarga_id UUID REFERENCES kartu_keluarga(id) ON DELETE SET NULL,
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,  -- if they have app access

    -- Identity
    nama_lengkap TEXT NOT NULL,
    nik CHAR(16),                    -- 16-digit NIK (optional, validated format)
    jenis_kelamin TEXT CHECK (jenis_kelamin IN ('L', 'P')),
    tempat_lahir TEXT,
    tanggal_lahir DATE,

    -- Kinship within KK
    hubungan_keluarga TEXT CHECK (hubungan_keluarga IN (
        'kepala_keluarga', 'istri', 'anak', 'menantu',
        'cucu', 'orang_tua', 'mertua', 'famili_lain', 'lainnya'
    )),

    -- Civil status
    status_perkawinan TEXT CHECK (status_perkawinan IN (
        'belum_kawin', 'kawin', 'cerai_hidup', 'cerai_mati'
    )),
    agama TEXT,
    pendidikan TEXT,
    pekerjaan TEXT,
    golongan_darah TEXT,

    -- Citizenship
    kewarganegaraan TEXT DEFAULT 'WNI',

    -- Contact
    no_hp TEXT,                      -- WhatsApp
    email TEXT,

    -- Status in RT
    status_domisili TEXT DEFAULT 'tetap' CHECK (status_domisili IN ('tetap', 'kontrak', 'kost', 'pindah')),
    tanggal_masuk DATE,              -- when they joined this RT
    tanggal_keluar DATE,             -- when they left (if ex-warga)

    -- Extras
    foto_url TEXT,
    catatan TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_warga_org ON warga(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_warga_kk ON warga(kartu_keluarga_id);
CREATE INDEX idx_warga_nama ON warga USING gin(to_tsvector('indonesian', nama_lengkap)) WHERE deleted_at IS NULL;

-- ─── Keuangan: Kas & Iuran ─────────────────────────────────────────────────

-- Types of transactions
CREATE TABLE kategori_keuangan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    nama TEXT NOT NULL,              -- "Iuran Keamanan", "Iuran Kebersihan", "Kas RT", etc.
    jenis TEXT NOT NULL CHECK (jenis IN ('pemasukan', 'pengeluaran')),
    is_iuran BOOLEAN NOT NULL DEFAULT false,  -- true if this is a recurring iuran
    iuran_bulanan_rupiah INTEGER,             -- if is_iuran, the monthly amount
    urutan INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- All cash movements
CREATE TABLE transaksi_keuangan (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    kategori_id UUID REFERENCES kategori_keuangan(id) ON DELETE RESTRICT,

    jenis TEXT NOT NULL CHECK (jenis IN ('pemasukan', 'pengeluaran')),
    jumlah INTEGER NOT NULL CHECK (jumlah > 0),  -- stored in Rupiah (whole numbers)

    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    keterangan TEXT NOT NULL,

    -- Link to warga if it's an iuran payment
    warga_id UUID REFERENCES warga(id) ON DELETE SET NULL,
    kk_id UUID REFERENCES kartu_keluarga(id) ON DELETE SET NULL,

    -- Source
    metode TEXT CHECK (metode IN ('tunai', 'transfer', 'qris', 'lainnya')),
    bukti_url TEXT,                  -- photo/PDF of receipt
    qris_transaction_id TEXT,        -- if auto-recorded from QRIS

    -- Audit
    dicatat_oleh UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_transaksi_org ON transaksi_keuangan(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_transaksi_tanggal ON transaksi_keuangan(organization_id, tanggal DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_transaksi_kk ON transaksi_keuangan(kk_id);

-- Monthly iuran tracking (which KK has paid which month)
CREATE TABLE iuran_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    kk_id UUID NOT NULL REFERENCES kartu_keluarga(id) ON DELETE CASCADE,
    kategori_id UUID NOT NULL REFERENCES kategori_keuangan(id) ON DELETE CASCADE,

    periode_bulan SMALLINT NOT NULL CHECK (periode_bulan BETWEEN 1 AND 12),
    periode_tahun SMALLINT NOT NULL,

    jumlah_wajib INTEGER NOT NULL,
    jumlah_terbayar INTEGER NOT NULL DEFAULT 0,
    transaksi_id UUID REFERENCES transaksi_keuangan(id),

    status TEXT GENERATED ALWAYS AS (
        CASE
            WHEN jumlah_terbayar >= jumlah_wajib THEN 'lunas'
            WHEN jumlah_terbayar > 0 THEN 'sebagian'
            ELSE 'belum'
        END
    ) STORED,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    UNIQUE (organization_id, kk_id, kategori_id, periode_bulan, periode_tahun)
);

CREATE INDEX idx_iuran_status_kk ON iuran_status(kk_id);
CREATE INDEX idx_iuran_status_periode ON iuran_status(organization_id, periode_tahun DESC, periode_bulan DESC);

-- ─── Pengumuman ────────────────────────────────────────────────────────────

CREATE TABLE pengumuman (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

    judul TEXT NOT NULL,
    isi TEXT NOT NULL,
    kategori TEXT CHECK (kategori IN (
        'umum', 'ronda', 'kerja_bakti', 'iuran',
        'kabar_duka', 'kabar_suka', 'keamanan', 'darurat'
    )),

    -- Scheduling
    scheduled_for TIMESTAMPTZ,       -- if set, send at this time
    published_at TIMESTAMPTZ,

    -- Delivery
    deliver_whatsapp BOOLEAN DEFAULT true,
    deliver_app BOOLEAN DEFAULT true,
    deliver_email BOOLEAN DEFAULT false,

    -- Metadata
    lampiran_urls TEXT[],
    dibuat_oleh UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_pengumuman_org ON pengumuman(organization_id, published_at DESC) WHERE deleted_at IS NULL;

CREATE TABLE pengumuman_delivery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pengumuman_id UUID NOT NULL REFERENCES pengumuman(id) ON DELETE CASCADE,
    warga_id UUID REFERENCES warga(id) ON DELETE CASCADE,

    channel TEXT CHECK (channel IN ('whatsapp', 'app', 'email')),
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    error TEXT
);

CREATE INDEX idx_pengumuman_delivery_p ON pengumuman_delivery(pengumuman_id);

-- ─── Jadwal (Ronda, Kerja Bakti, dll) ─────────────────────────────────────

CREATE TABLE jadwal (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

    jenis TEXT NOT NULL CHECK (jenis IN ('ronda', 'kerja_bakti', 'rapat', 'kondangan', 'lainnya')),
    judul TEXT NOT NULL,
    lokasi TEXT,

    mulai TIMESTAMPTZ NOT NULL,
    selesai TIMESTAMPTZ,

    -- For ronda — who's on duty
    petugas_warga_ids UUID[],

    catatan TEXT,
    dibuat_oleh UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_jadwal_org_mulai ON jadwal(organization_id, mulai);

-- ─── Surat Pengantar ──────────────────────────────────────────────────────

CREATE TABLE jenis_surat (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),  -- NULL = template standar Guyub
    kode TEXT NOT NULL,              -- "SKDT" (Surat Keterangan Domisili), "SKTM", etc.
    nama TEXT NOT NULL,
    template_markdown TEXT NOT NULL, -- with {{placeholders}}
    dibutuhkan_data JSONB,           -- schema of fields warga must fill
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE surat_pengantar (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    jenis_surat_id UUID NOT NULL REFERENCES jenis_surat(id) ON DELETE RESTRICT,
    warga_id UUID NOT NULL REFERENCES warga(id) ON DELETE RESTRICT,

    nomor_surat TEXT UNIQUE,         -- auto-generated: "RT003/RW007/SKDT/I/2026"
    perihal TEXT NOT NULL,
    data_pemohon JSONB NOT NULL,     -- form fields filled by warga
    alasan TEXT,

    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending', 'approved', 'rejected', 'revoked'
    )),
    approved_by UUID REFERENCES profiles(id),
    approved_at TIMESTAMPTZ,
    rejection_reason TEXT,

    pdf_url TEXT,                    -- generated PDF
    signed_pdf_url TEXT,             -- after Pak RT signs

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_surat_org ON surat_pengantar(organization_id, created_at DESC);
CREATE INDEX idx_surat_warga ON surat_pengantar(warga_id);
CREATE INDEX idx_surat_status ON surat_pengantar(organization_id, status);

-- ─── Audit log ────────────────────────────────────────────────────────────

CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id),
    actor_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL,            -- "create_warga", "delete_transaksi", etc.
    entity_type TEXT NOT NULL,
    entity_id UUID,
    changes JSONB,                   -- {before, after}
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_org_created ON audit_log(organization_id, created_at DESC);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);

-- ═══════════════════════════════════════════════════════════════════════════
-- Scale expectations (for cost planning):
--   1 RT  ≈  200 warga × 50 KK × 12 months
--   Monthly rows: ~50 transactions + ~10 pengumuman + ~5 surat = ~65 rows
--   Yearly per-RT rows: ~1000 (comfortable for Supabase free tier)
--
--   1000 RTs → 200K warga, 50K KK, ~1M rows/year → still within Supabase Pro
-- ═══════════════════════════════════════════════════════════════════════════
