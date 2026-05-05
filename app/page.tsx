import Link from "next/link";
import {
  ArrowRight,
  Users,
  Wallet,
  Megaphone,
  FileText,
  ShieldCheck,
  Database,
  Cloud,
  MessageCircle,
  Github,
  Menu,
  Sparkles,
  CheckCircle2,
  Home,
  Receipt,
  Code2,
  Server,
} from "lucide-react";
import { Logo } from "@/components/logo";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-earth-50 text-earth-900">
      {/* ─── Nav ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-earth-200/60 bg-earth-50/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-earth-600 md:flex">
            <a href="#product" className="transition-colors hover:text-earth-900">Produk</a>
            <a href="#stack" className="transition-colors hover:text-earth-900">Stack</a>
            <a href="#stage" className="transition-colors hover:text-earth-900">Status</a>
            <a href="#about" className="transition-colors hover:text-earth-900">Tentang</a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/zulemkeren/guyub"
              className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-earth-700 transition-colors hover:bg-earth-100 sm:inline-flex"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-guyub-600 px-4 py-2 text-sm font-medium text-white shadow-warm transition-all hover:bg-guyub-700 hover:gap-2"
            >
              Buka demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5 text-earth-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 warm-gradient" />
        <div className="absolute inset-0 batik-pattern opacity-50" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            {/* Authentic status badge */}
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-guyub-200 bg-white/90 px-3 py-1 text-xs font-medium text-guyub-700 shadow-warm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-guyub-500 animate-pulse-soft" />
              <span>Production pilot · RT 002 Purwokerto · 189 residents</span>
            </div>

            <h1 className="animate-slide-up text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              A digital backbone for{" "}
              <span className="relative">
                <span className="relative z-10 text-guyub-700">Indonesian</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-amber-200/60 md:h-4" />
              </span>
              <br />
              neighborhoods.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-earth-600 md:text-xl">
              Guyub (kode: Neighborhood Application Software) adalah aplikasi
              pengelola data warga, keuangan, dan komunikasi untuk RT dan RW
              Indonesia. Dibuat di Purwokerto, berjalan di Microsoft Azure.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-guyub-600 px-6 py-3.5 text-base font-medium text-white shadow-warm-lg transition-all hover:bg-guyub-700 hover:scale-[1.02]"
              >
                Coba live demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#product"
                className="inline-flex items-center gap-2 rounded-full border border-earth-300 bg-white/80 px-6 py-3.5 text-base font-medium text-earth-700 backdrop-blur-sm transition-colors hover:bg-white"
              >
                Lihat fitur produk
              </a>
            </div>

            <p className="mt-6 text-xs text-earth-500">
              Demo publik · tanpa registrasi · pilih peran di halaman login
            </p>
          </div>

          {/* Live stats from pilot */}
          <div className="relative mx-auto mt-16 max-w-4xl animate-fade-in">
            <div className="rounded-3xl border border-earth-200 bg-white/90 p-6 shadow-warm-lg backdrop-blur-sm md:p-8">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-500">
                    Pilot metrics · live dari RT 002
                  </p>
                  <p className="text-xs text-earth-600">Data real-time dari production pilot</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-guyub-50 px-2.5 py-1 text-[10px] font-semibold text-guyub-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-guyub-500 animate-pulse-soft" />
                  Live
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatBlock label="Warga aktif" value="189" sublabel="tersebar di 52 KK" />
                <StatBlock label="Transaksi kas" value="300+" sublabel="6 bulan terakhir" />
                <StatBlock label="Running" value="6+ thn" sublabel="sejak 2019" />
                <StatBlock label="Azure spend" value="$25K" sublabel="MS for Startups Scale" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The problem (honest, matter-of-fact) ─────────── */}
      <section className="border-t border-earth-100 bg-white py-20">
        <div className="mx-auto max-w-4xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              Konteks
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Indonesia punya 750.000 RT
            </h2>
            <p className="mt-4 text-earth-600">
              Setiap RT melayani 30 sampai 60 kartu keluarga. Mereka mengelola
              data warga, kas, iuran, pengumuman, dan surat pengantar. Hampir
              semua masih pakai cara manual: buku tulis, mading, dan WhatsApp
              Group yang berantakan.
            </p>
            <p className="mt-4 text-earth-600">
              Pemerintah sudah mencoba digitalisasi sejak 2015, tetapi produk
              yang ada (eRT/RW) memiliki adopsi yang sangat rendah karena UX
              yang tidak manusiawi dan tidak memahami bagaimana Pak RT
              sesungguhnya bekerja.
            </p>
            <p className="mt-4 font-medium text-earth-900">
              Guyub dibangun dari dalam — oleh warga RT, untuk warga RT.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Product tour ─────────────────────────────────── */}
      <section id="product" className="border-t border-earth-100 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              Produk
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Lima modul inti, satu antarmuka
            </h2>
            <p className="mt-4 text-earth-600">
              Setiap modul menggantikan alur kerja yang sebelumnya manual.
              Semua bisa lo coba langsung di demo — tidak perlu registrasi.
            </p>
          </div>

          <div className="mt-16 space-y-10">
            <ProductTourRow
              kicker="Modul 1"
              title="Data warga & kartu keluarga"
              description="Pak RT atau Sekretaris input data warga sekali, otomatis terindeks dan dapat dicari dalam hitungan detik. Terstruktur per-KK dengan hubungan keluarga, pekerjaan, pendidikan, dan kontak WhatsApp. Import massal dari Excel juga didukung."
              bullets={[
                "Search instant (nama, NIK, pekerjaan)",
                "Auto-update umur tiap hari",
                "Export ke Excel untuk backup",
              ]}
              demo="dashboard"
              reverse={false}
            />
            <ProductTourRow
              kicker="Modul 2"
              title="Kas RT dan iuran bulanan"
              description="Bendahara mencatat pemasukan dan pengeluaran dari HP, saldo real-time, dan sistem tracking iuran per-KK per-bulan. Laporan PDF bulanan tergenerasi otomatis — menghemat 4 sampai 8 jam kerja Bendahara di akhir bulan."
              bullets={[
                "Matrix iuran KK × 12 bulan color-coded",
                "Kategori otomatis (kas, keamanan, kebersihan)",
                "Integrasi QRIS (roadmap Q2 2026)",
              ]}
              demo="keuangan"
              reverse={true}
            />
            <ProductTourRow
              kicker="Modul 3"
              title="Pengumuman via WhatsApp"
              description="Pengumuman yang sebelumnya ditempel di mading sekarang dikirim langsung ke WhatsApp warga. Status delivery dan read-receipt terlacak, memastikan informasi penting (kerja bakti, kabar duka, reminder iuran) benar-benar sampai."
              bullets={[
                "Broadcast ke 52 KK dalam 1-2 menit",
                "Delivery tracking per-warga",
                "Kategorisasi (umum, ronda, darurat, dll)",
              ]}
              demo="pengumuman"
              reverse={false}
            />
            <ProductTourRow
              kicker="Modul 4"
              title="Surat pengantar digital"
              description="Warga mengajukan surat pengantar dari rumah via WhatsApp, Pak RT menyetujui dari HP dengan satu tap, dan PDF dengan kop surat RT otomatis ter-generate siap ditandatangani. Nomor surat auto-increment."
              bullets={[
                "6 template standar (SKDT, SKTM, SKU, dll)",
                "Nomor surat auto-generate per format",
                "Riwayat penerbitan lengkap",
              ]}
              demo="surat"
              reverse={true}
            />
            <ProductTourRow
              kicker="Modul 5"
              title="Jadwal ronda & kerja bakti"
              description="Roster ronda otomatis dari daftar warga laki-laki dewasa, reminder H-1 via WhatsApp ke warga yang kebagian giliran. Event kerja bakti dan rapat RT terjadwal dengan detail lokasi dan catatan."
              bullets={[
                "Kalender mingguan dengan auto-roster",
                "Reminder H-1 otomatis",
                "Event khusus (kerja bakti, rapat)",
              ]}
              demo="ronda"
              reverse={false}
            />
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-guyub-600 px-6 py-3 text-sm font-medium text-white shadow-warm transition-all hover:bg-guyub-700"
            >
              Coba semua modul di demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Tech stack ────────────────────────────────────── */}
      <section id="stack" className="border-t border-earth-100 bg-earth-950 text-white py-24">
        <div className="absolute inset-0 opacity-10 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-400">
              Stack
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Dibangun di atas Microsoft Azure
            </h2>
            <p className="mt-4 text-earth-300">
              Cloud-native dari awal. Data residency di Southeast Asia,
              enkripsi end-to-end, multi-tenant architecture, compliance
              dengan UU Perlindungan Data Pribadi.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TechCard
              icon={Cloud}
              title="Azure App Service"
              desc="Linux container, auto-scale, Southeast Asia region"
              tier="Current"
            />
            <TechCard
              icon={Database}
              title="Azure Database"
              desc="MySQL Flexible Server dengan PITR dan geo-backup"
              tier="Current"
            />
            <TechCard
              icon={MessageCircle}
              title="Azure Communication"
              desc="WhatsApp Business API, SMS fallback, 99.9% SLA"
              tier="Current"
            />
            <TechCard
              icon={ShieldCheck}
              title="Azure Key Vault"
              desc="Secret management, encryption keys, HSM-backed"
              tier="Current"
            />
            <TechCard
              icon={Server}
              title="Container Apps"
              desc="Multi-tenant scale dari Q1 2026"
              tier="Q1 2026"
            />
            <TechCard
              icon={Sparkles}
              title="Azure OpenAI"
              desc="Chatbot WhatsApp untuk warga low-literacy"
              tier="Q2 2026"
            />
            <TechCard
              icon={Code2}
              title="AD B2C"
              desc="Multi-tenant identity untuk RT/RW scale"
              tier="Q3 2026"
            />
            <TechCard
              icon={ShieldCheck}
              title="Defender + Sentinel"
              desc="SIEM dan compliance hardening untuk UU PDP"
              tier="Q4 2026"
            />
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-earth-400">
            <TechPill>Next.js 16</TechPill>
            <TechPill>TypeScript 5</TechPill>
            <TechPill>Tailwind CSS</TechPill>
            <TechPill>PHP / CodeIgniter (pilot legacy)</TechPill>
            <TechPill>MySQL → PostgreSQL (migration Q1)</TechPill>
          </div>
        </div>
      </section>

      {/* ─── Current stage / roadmap ──────────────────────── */}
      <section id="stage" className="border-t border-earth-100 py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              Status proyek
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Dari pilot ke skala nasional
            </h2>
            <p className="mt-4 text-earth-600">
              Kami sedang di tengah perjalanan. Berikut fase yang sudah dilalui
              dan yang akan datang.
            </p>
          </div>

          <div className="mt-14">
            <div className="space-y-4">
              <StageRow
                phase="2019"
                title="Pilot single-RT dimulai"
                status="done"
                items={[
                  "Deploy awal di RT 002 Purwokerto",
                  "Onboarding 52 KK, 189 warga",
                  "Fitur inti: data warga, kas, pengumuman",
                ]}
              />
              <StageRow
                phase="2020–2025"
                title="Production pilot & iterasi"
                status="done"
                items={[
                  "6+ tahun continuous usage di RT 002",
                  "Feedback rutin dari Pak RT, Bendahara, Sekretaris",
                  "Migrasi hosting ke Azure (Microsoft for Startups Scale tier)",
                ]}
              />
              <StageRow
                phase="Q4 2025"
                title="Rebrand & redesign"
                status="current"
                items={[
                  "Rebrand ke Guyub",
                  "Redesign UI/UX untuk mass-market onboarding",
                  "Landing page, documentation, developer experience",
                ]}
              />
              <StageRow
                phase="Q1–Q2 2026"
                title="Multi-tenant rewrite"
                status="upcoming"
                items={[
                  "Migrate ke Azure Container Apps (multi-tenant)",
                  "Integrasi WhatsApp Business API via Azure ACS",
                  "Onboarding 10 RT tambahan di Banyumas",
                ]}
              />
              <StageRow
                phase="Q3–Q4 2026"
                title="Regional expansion"
                status="upcoming"
                items={[
                  "50 RT target, Rp 10M MRR",
                  "Pemkot Banyumas B2G pilot",
                  "Pre-seed round initiation",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── About / founder ──────────────────────────────── */}
      <section id="about" className="border-t border-earth-100 bg-earth-50/50 py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="rounded-3xl border border-earth-200 bg-white p-8 md:p-12">
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-xl font-semibold text-white">
                Z
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
                  Tim
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-earth-900">
                  Zulmi Mustaqiem
                </h2>
                <p className="text-sm text-earth-500">
                  Founder & Engineer · Warga RT 002 Purwokerto
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-earth-700">
              <p>
                Saya kuliah di bidang ilmu komputer dan tinggal di RT 002 RW
                004 Purwokerto sejak lahir. Pak Wanto, ketua RT kami, sudah
                mempercayakan saya mengembangkan sistem administrasi RT sejak
                2019 — awalnya sebagai tugas akhir kuliah.
              </p>
              <p>
                Enam tahun berjalan, aplikasi itu terus digunakan. Pak Wanto
                tidak pernah balik ke buku tulis. Bu Sri (Bendahara) bilang
                laporan bulanan sekarang 10 kali lebih cepat. Warga dapat info
                kerja bakti via WhatsApp bahkan sebelum Pak RT sempat nempel
                di mading.
              </p>
              <p>
                Ini bukan eksperimen akademik. Ini infrastruktur hidup untuk
                satu komunitas yang saya cinta. Sekarang saya percaya bahwa
                pattern yang sama bisa membantu 750.000 RT lainnya di
                Indonesia.
              </p>
              <p className="text-earth-900 font-medium">
                Saya ingin lo membantu ini tumbuh.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="https://github.com/zulemkeren/guyub"
                className="inline-flex items-center gap-1.5 rounded-full border border-earth-200 bg-white px-4 py-2 text-xs font-medium text-earth-700 hover:bg-earth-50"
              >
                <Github className="h-3.5 w-3.5" />
                github.com/zulemkeren/guyub
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-full bg-guyub-600 px-4 py-2 text-xs font-medium text-white shadow-warm hover:bg-guyub-700"
              >
                Coba demo <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Final CTA (simpler) ──────────────────────────── */}
      <section className="border-t border-earth-100 bg-earth-950 text-white">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            Siap lihat aplikasinya?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-earth-300">
            Demo berjalan dengan data realistis dari RT 002 Purwokerto.
            Pilih salah satu peran (Pak RT, Bendahara, Sekretaris, atau
            Warga) untuk melihat aplikasi dari perspektif masing-masing.
          </p>
          <div className="mt-8">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-medium text-earth-950 transition-transform hover:scale-[1.02]"
            >
              Masuk ke demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-earth-500">
            Tanpa registrasi · tanpa kartu kredit · langsung bisa klik
          </p>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-earth-200 bg-earth-50 py-12">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-xs text-earth-500">
                Neighborhood Application Software
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-earth-500">
              <Link href="https://github.com/zulemkeren/guyub" className="hover:text-earth-900">
                GitHub
              </Link>
              <Link href="/login" className="hover:text-earth-900">
                Demo
              </Link>
              <span>© {new Date().getFullYear()} Made in Purwokerto</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════════════════

function StatBlock({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-500">
        {label}
      </p>
      <p className="mt-1 text-3xl font-semibold tabular-nums text-earth-900">
        {value}
      </p>
      <p className="text-[11px] text-earth-500">{sublabel}</p>
    </div>
  );
}

function ProductTourRow({
  kicker,
  title,
  description,
  bullets,
  demo,
  reverse,
}: {
  kicker: string;
  title: string;
  description: string;
  bullets: string[];
  demo: string;
  reverse: boolean;
}) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 md:items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-guyub-600">
          {kicker}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-earth-900 md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-earth-600">{description}</p>
        <ul className="mt-5 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-earth-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-guyub-600" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <ProductMockup variant={demo} />
      </div>
    </div>
  );
}

function ProductMockup({ variant }: { variant: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-warm-lg transition-transform hover:scale-[1.02]">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-earth-200 bg-earth-50 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-400" />
        <div className="h-2 w-2 rounded-full bg-amber-400" />
        <div className="h-2 w-2 rounded-full bg-guyub-400" />
        <div className="ml-2 flex-1 truncate rounded-md bg-white px-2 py-0.5 text-[10px] font-mono text-earth-500">
          guyub.app/app/{variant}
        </div>
      </div>
      {/* Content */}
      <div className="bg-earth-50 p-4">
        {variant === "dashboard" && <MockDashboard />}
        {variant === "keuangan" && <MockKeuangan />}
        {variant === "pengumuman" && <MockPengumuman />}
        {variant === "surat" && <MockSurat />}
        {variant === "ronda" && <MockRonda />}
      </div>
    </div>
  );
}

function MockDashboard() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-gradient-to-br from-guyub-700 to-guyub-900 p-3 text-white">
        <p className="text-[9px] uppercase tracking-widest text-guyub-300">Halo, Pak Wanto</p>
        <p className="text-xs font-semibold mt-0.5">RT 002 / RW 004 Purwokerto</p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white p-2.5 border border-earth-100">
          <Users className="h-3 w-3 text-guyub-600" />
          <p className="text-lg font-semibold mt-1">189</p>
          <p className="text-[9px] text-earth-500">warga</p>
        </div>
        <div className="rounded-lg bg-white p-2.5 border border-earth-100">
          <Wallet className="h-3 w-3 text-amber-600" />
          <p className="text-lg font-semibold mt-1">Rp 2.8jt</p>
          <p className="text-[9px] text-earth-500">saldo</p>
        </div>
      </div>
      <div className="rounded-lg bg-white p-3 border border-earth-100">
        <p className="text-[9px] font-semibold uppercase text-earth-500 mb-2">Kas 6 bulan</p>
        <div className="flex items-end gap-1 h-12">
          {[40, 60, 45, 75, 65, 80].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-guyub-600 to-guyub-400" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MockKeuangan() {
  return (
    <div className="space-y-2">
      <div className="rounded-xl bg-gradient-to-br from-guyub-700 to-guyub-900 p-3 text-white">
        <p className="text-[9px] uppercase tracking-widest text-guyub-300">Saldo Kas</p>
        <p className="text-xl font-semibold mt-1">Rp 2.847.500</p>
      </div>
      {["Iuran Kas RT", "Gaji Petugas", "Kerja Bakti"].map((label, i) => (
        <div key={i} className="rounded-lg bg-white p-2 border border-earth-100 flex items-center gap-2">
          <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${i === 0 ? "bg-guyub-100 text-guyub-700" : "bg-amber-100 text-amber-700"}`}>
            {i === 0 ? <Receipt className="h-3 w-3" /> : <Wallet className="h-3 w-3" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium truncate">{label}</p>
            <p className="text-[9px] text-earth-500">15 Des 2025</p>
          </div>
          <p className={`text-[10px] font-semibold ${i === 0 ? "text-guyub-700" : "text-amber-700"}`}>
            {i === 0 ? "+Rp 625rb" : "-Rp 150rb"}
          </p>
        </div>
      ))}
    </div>
  );
}

function MockPengumuman() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-white p-3 border border-earth-100">
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-guyub-100 text-guyub-700">
            <Megaphone className="h-3 w-3" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold">Kerja Bakti Minggu Pagi</p>
            <p className="text-[9px] text-earth-600 mt-0.5 line-clamp-2">
              Warga RT 002, kerja bakti hari Minggu 21 Desember jam 07.00. Bawa cangkul...
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-[8px] text-earth-500">
              <MessageCircle className="h-2 w-2 text-guyub-600" />
              <span>WhatsApp · 48/52 dibaca</span>
            </div>
          </div>
          <span className="text-[8px] font-semibold rounded-full bg-guyub-100 text-guyub-700 px-1.5 py-0.5">
            kerja bakti
          </span>
        </div>
      </div>
      <div className="rounded-lg bg-white p-3 border border-earth-100">
        <div className="flex items-start gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <ShieldCheck className="h-3 w-3" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold">Jadwal Ronda Minggu Ini</p>
            <p className="text-[9px] text-earth-600 mt-0.5 line-clamp-1">
              Senin: Pak Budi, Pak Eko. Selasa: Pak Agus...
            </p>
            <div className="mt-1.5 flex items-center gap-2 text-[8px] text-earth-500">
              <MessageCircle className="h-2 w-2 text-guyub-600" />
              <span>WhatsApp · 51/52 dibaca</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockSurat() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-white p-2.5 border border-amber-200">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-amber-100 flex items-center justify-center">
            <FileText className="h-3 w-3 text-amber-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium">Surat Ket. Usaha</p>
            <p className="text-[9px] text-earth-500 truncate">Izin warung makan · Pak Budi S.</p>
          </div>
          <span className="text-[8px] font-semibold rounded-full bg-amber-100 text-amber-700 px-1.5 py-0.5">
            pending
          </span>
        </div>
      </div>
      <div className="rounded-lg bg-white p-2.5 border border-guyub-200">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-guyub-100 flex items-center justify-center">
            <FileText className="h-3 w-3 text-guyub-700" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-medium">SKDT — KPR Mandiri</p>
            <p className="text-[9px] text-earth-500 truncate">Bu Dewi R. · disetujui hari ini</p>
          </div>
          <span className="text-[8px] font-semibold rounded-full bg-guyub-100 text-guyub-700 px-1.5 py-0.5">
            approved
          </span>
        </div>
      </div>
      <div className="rounded-lg bg-earth-100 p-2 text-center text-[9px] text-earth-600">
        RT002/RW004/SKDT/XII/2025/015 — PDF generated
      </div>
    </div>
  );
}

function MockRonda() {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div key={d} className={`rounded-md text-center p-1 ${i === 2 ? "bg-guyub-600 text-white" : "bg-white border border-earth-100"}`}>
            <p className={`text-[7px] ${i === 2 ? "text-guyub-200" : "text-earth-500"}`}>{d}</p>
            <p className={`text-[10px] font-semibold mt-0.5 ${i === 2 ? "text-white" : "text-earth-900"}`}>
              {15 + i}
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-2">
        <div className="flex items-center gap-1 mb-1">
          <ShieldCheck className="h-2.5 w-2.5 text-blue-700" />
          <p className="text-[9px] font-semibold text-blue-800">Ronda malam · Rabu</p>
        </div>
        <p className="text-[8px] text-blue-900">20.00 – 04.00 · Pos Ronda RT 002</p>
        <p className="text-[8px] text-blue-800 mt-1">• Pak Slamet Santoso</p>
        <p className="text-[8px] text-blue-800">• Pak Bambang Wibowo</p>
      </div>
    </div>
  );
}

function TechCard({
  icon: Icon,
  title,
  desc,
  tier,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  tier: string;
}) {
  const isCurrent = tier === "Current";
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-guyub-300">
          <Icon className="h-4 w-4" />
        </div>
        <span
          className={`text-[9px] font-semibold uppercase tracking-widest rounded-full px-2 py-0.5 ${
            isCurrent
              ? "bg-guyub-500/20 text-guyub-300"
              : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {tier}
        </span>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs text-earth-400">{desc}</p>
    </div>
  );
}

function TechPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
      {children}
    </span>
  );
}

function StageRow({
  phase,
  title,
  status,
  items,
}: {
  phase: string;
  title: string;
  status: "done" | "current" | "upcoming";
  items: string[];
}) {
  const statusConfig = {
    done: { dot: "bg-guyub-600", label: "Selesai", cls: "text-guyub-700 bg-guyub-100" },
    current: { dot: "bg-amber-500 animate-pulse", label: "Sedang berjalan", cls: "text-amber-700 bg-amber-100" },
    upcoming: { dot: "bg-earth-300", label: "Direncanakan", cls: "text-earth-600 bg-earth-100" },
  }[status];

  return (
    <div className="group relative flex gap-4 rounded-2xl border border-earth-200 bg-white p-5 transition-all hover:shadow-warm">
      <div className="flex flex-col items-center pt-1">
        <div className={`h-3 w-3 rounded-full ${statusConfig.dot}`} />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-earth-100 px-2 py-0.5 text-[10px] font-semibold text-earth-700 font-mono">
            {phase}
          </span>
          <h3 className="font-semibold text-earth-900">{title}</h3>
          <span
            className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${statusConfig.cls}`}
          >
            {statusConfig.label}
          </span>
        </div>
        <ul className="mt-3 space-y-1">
          {items.map((item) => (
            <li key={item} className="text-xs text-earth-600">
              — {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
