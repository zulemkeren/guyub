# Guyub — Week-by-Week Sprint Roadmap (6 weeks to pilot live)

> **Target:** 1 Production RT live (RT 003 / RW 007 Purwokerto)
> with Pak RT + Bendahara + Sekretaris + 50+ warga actively using

---

## Week 0: Preparation (this week — don't need laptop yet)

### ✅ Goals
- Brand identity locked (done: Guyub)
- Landing page live (done: guyub-rho.vercel.app)
- Pak RT pitch doc ready (done: docs/02-pitch-pak-rt.md)

### 📋 Do this week
- [ ] Formal pitch to Pak RT (bawa print-out pitch doc + show landing dari HP)
- [ ] Siapin infrastructure accounts:
  - Supabase account + create project "guyub-prod"
  - Vercel (sudah ada)
  - Cloudflare (domain, kalau beli)
  - WhatsApp Business API account (atau pakai wa.me link dulu)
- [ ] Review existing PHP/CI skripsi code di laptop (begitu lo pulang)
- [ ] Siapkan 5 warga yang paling tech-savvy sebagai alpha testers
  (biasanya anak muda 20-30an)

---

## Week 1: Foundation (laptop required)

### ✅ Goals
- Next.js project scaffolded (done)
- Auth + multi-tenancy working
- Database seeded with RT 003 structure

### 📋 Deliverables
- [ ] Setup Supabase project + run docs/01-database-schema.sql
- [ ] Setup Supabase Auth (email + magic link)
- [ ] Next.js integration: `@supabase/ssr` + middleware auth check
- [ ] Protected `/app` routes (require login)
- [ ] Organization switcher (for multi-RT later)
- [ ] Seed script: insert RT 003 org + kategori keuangan default
- [ ] Deploy updated app to Vercel preview branch

### 🎯 Definition of Done
Login page works. After login, `/app` shows empty dashboard with
selected org name in the corner. Can add a team member by email.

---

## Week 2: Data Warga + KK

### ✅ Goals
- Full CRUD for Warga + Kartu Keluarga
- Import flow from Excel/CSV
- Search & filter

### 📋 Deliverables
- [ ] `/app/warga` list page with search + filter (by KK, hubungan, umur)
- [ ] `/app/warga/new` form with all fields (NIK validation, date pickers)
- [ ] `/app/warga/[id]` detail + edit page
- [ ] `/app/kk` — KK grouping view (family tree-ish)
- [ ] CSV import (Excel template provided): upload → preview → confirm
- [ ] Export to CSV (for data portability / compliance)
- [ ] Migrate data from existing skripsi MySQL DB to Supabase
  (write migration script, run once, verify count)

### 🎯 Definition of Done
All 52 KK + 189 warga dari RT 003 ter-input. Search "Pak Budi" → muncul
dalam 1 detik. Edit alamat → tersimpan. Export → CSV valid untuk backup.

---

## Week 3: Keuangan + Iuran

### ✅ Goals
- Cash in/out tracking
- Monthly iuran status per KK
- Auto-generated monthly PDF report

### 📋 Deliverables
- [ ] `/app/kas` dashboard (saldo real-time, chart 6 bulan terakhir)
- [ ] Quick-input form: "Pemasukan / Pengeluaran, Jumlah, Kategori"
- [ ] `/app/iuran` — matrix view KK × bulan, klik cell untuk toggle lunas
- [ ] Bulk mark paid (handy for bendahara: "semua bayar Januari" → 1 klik)
- [ ] Monthly PDF report (use `@react-pdf/renderer` or server-side
      `pdfkit`): saldo, ringkasan, daftar iuran belum bayar, dll
- [ ] Schedule: tanggal 1 tiap bulan, auto-email PDF ke Bendahara
      (pakai Vercel cron + Resend.com free tier)

### 🎯 Definition of Done
Bendahara bisa catat transaksi dalam <10 detik via HP. Klik "Generate
Laporan Januari" → PDF muncul dalam 5 detik. Iuran belum bayar ter-highlight.

---

## Week 4: Pengumuman + WhatsApp Integration

### ✅ Goals
- Pengumuman published + delivered via WhatsApp
- Schedule support
- Read receipts

### 📋 Deliverables
- [ ] `/app/pengumuman` — list + create form
- [ ] WhatsApp delivery: pakai **Fonnte.com** atau **Twilio WA** or
      **360dialog** (pilih yg paling murah untuk volume kecil)
- [ ] Template pengumuman: "Kerja Bakti", "Kabar Duka", "Rapat", dll
- [ ] Schedule feature (send at specific time)
- [ ] Delivery tracking (delivered, read)
- [ ] Warga dapat opt-out (UU PDP compliance)

### 🎯 Definition of Done
Pak RT ketik pengumuman → klik kirim → dalam 30 detik, semua 52 KK
dapat pesan WhatsApp. Pak RT liat dashboard: "46/52 dibaca".

---

## Week 5: Surat Pengantar + Ronda

### ✅ Goals
- Digital surat pengantar request/approve flow
- Auto-generate PDF with nomor surat
- Ronda jadwal + auto-reminder

### 📋 Deliverables
- [ ] Template surat: SKDT, SKTM, Usaha, Nikah, etc.
      (5 template paling sering dipake di RT)
- [ ] Warga flow: WA bot → pilih jenis surat → isi form via web form
      (dengan token) → submit
- [ ] Pak RT flow: notif WA → review via app → approve/reject
- [ ] PDF generation dengan kop surat RT + nomor + tanda tangan (digital
      or space for manual signing)
- [ ] `/app/jadwal` — ronda scheduler (roster otomatis berdasarkan KK)
- [ ] Auto-reminder H-1 via WhatsApp ke warga yg giliran

### 🎯 Definition of Done
Warga request SKDT via WA → dalam 1 jam Pak RT approve dari HP →
PDF siap download di WA warga tsb. Ronda minggu depan, Pak Budi + Pak Andi
dapat reminder malam sebelumnya.

---

## Week 6: Launch prep + Training

### ✅ Goals
- Onboarding material untuk warga
- Training session di rumah Pak RT
- Soft launch: 5 alpha testers + Pak RT active

### 📋 Deliverables
- [ ] Buku panduan cetak (1 lembar A4 bolak-balik): step by step
- [ ] Video tutorial 3 menit (direkam di HP, upload YouTube unlisted)
- [ ] Link undangan WhatsApp blast ke 52 KK
- [ ] Training session langsung: Pak RT + Bendahara + Sekretaris
      (datang ke rumah Pak RT, 60 menit, bawa laptop + contoh HP)
- [ ] Setup emergency hotline (nomor WA lo) untuk minggu 1
- [ ] Deploy ke production domain (rt003.guyub.app atau guyub.app/rt003)

### 🎯 Definition of Done
Pak RT bisa independen pakai app tanpa supervisi. Alpha tester (5
warga) dapat pengumuman pertama via WA. Bendahara pertama kali generate
laporan sendiri.

---

## Week 7-12: Optimization + Expansion

Goals setelah pilot:
- Iterasi UX berdasarkan feedback
- Solve the **5 biggest complaints** dari Pak RT/warga
- Onboard 2-3 RT tetangga (via intro Pak RT)
- Mulai siapin paid tier + billing (pakai Xendit atau Midtrans)
- Apply 1000 Startup Digital (bulan 4)
- Apply Microsoft for Startups Founders Hub (bulan 5)

---

## Daily rhythm (during 6 weeks)

```
Pagi (2 jam)     - Code / ship features
Siang (1 jam)    - Respond Pak RT / warga feedback via WA
Sore (2-3 jam)   - Code / polish
Malam (30 min)   - Prep besok, baca feedback
Weekend pagi     - Visit Pak RT (kunjungan rutin, ngopi, lihat masalah)
```

**Total commit:** ~35-45 jam/minggu (kalau lo full-time)
**Burn rate:** ~Rp 3-4jt/bulan (biaya hidup + hosting)
**Total budget 6 minggu:** ~Rp 6-8jt

---

## Success criteria at end of Week 6

| Metric | Target |
|---|---|
| Pak RT logs in weekly | ✅ Yes, 5x/week |
| Bendahara catat transaksi di app | ✅ 100% dari transaksi RT |
| Warga dapat pengumuman via WA | ✅ 90%+ delivery rate |
| Surat pengantar via digital | ✅ 3+ sudah approved |
| NPS Pak RT | 8+/10 |
| Ngotot pindah balik ke buku? | ❌ Tidak |

If 4/6 metrics hit → **pilot sukses**, siap expand ke Phase 2.
