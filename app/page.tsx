import Link from "next/link";
import {
  ArrowRight,
  Users,
  Wallet,
  MessageSquare,
  FileText,
  MessageCircle,
  QrCode,
  BellRing,
  FileDown,
  ShieldCheck,
  Check,
  Heart,
  Quote,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Menu,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { formatRupiah } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-earth-50 text-earth-900">
      {/* ─── Nav ──────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-earth-200/60 bg-earth-50/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-earth-600 md:flex">
            <a href="#masalah" className="transition-colors hover:text-earth-900">Masalah</a>
            <a href="#fitur" className="transition-colors hover:text-earth-900">Fitur</a>
            <a href="#harga" className="transition-colors hover:text-earth-900">Harga</a>
            <a href="#tentang" className="transition-colors hover:text-earth-900">Tentang</a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-medium text-earth-700 transition-colors hover:bg-earth-100 sm:inline-block"
            >
              Masuk
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-full bg-guyub-600 px-4 py-2 text-sm font-medium text-white shadow-warm transition-all hover:bg-guyub-700 hover:gap-2"
            >
              Coba demo <ArrowRight className="h-3.5 w-3.5" />
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
        <div className="absolute inset-0 batik-pattern" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full border border-guyub-200 bg-white/80 px-3 py-1 text-xs font-medium text-guyub-700 shadow-warm backdrop-blur-sm">
              <Heart className="h-3 w-3" />
              <span>Dibuat di Purwokerto, untuk Indonesia</span>
            </div>
            <h1 className="animate-slide-up text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              RT Digital yang{" "}
              <span className="relative">
                <span className="relative z-10 text-guyub-700">tetap guyub</span>
                <span className="absolute inset-x-0 bottom-1 z-0 h-3 bg-amber-200/60 md:h-4" />
              </span>
              .
            </h1>
            <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-pretty text-lg text-earth-600 md:text-xl">
              Tinggalkan buku tulis dan mading. Kelola data warga, iuran kas,
              pengumuman, dan surat pengantar RT dalam satu aplikasi yang
              dibuat untuk Pak RT, Bendahara, dan warga Indonesia.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-guyub-600 px-6 py-3.5 text-base font-medium text-white shadow-warm-lg transition-all hover:bg-guyub-700 hover:scale-[1.02]"
              >
                Coba demo sekarang
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#fitur"
                className="inline-flex items-center gap-2 rounded-full border border-earth-300 bg-white/80 px-6 py-3.5 text-base font-medium text-earth-700 backdrop-blur-sm transition-colors hover:bg-white"
              >
                Lihat fitur lengkap
              </Link>
            </div>

            <p className="mt-6 text-xs text-earth-500">
              Gratis selamanya untuk RT ≤50 KK · Tidak perlu kartu kredit
            </p>
          </div>

          {/* Hero visual — mockup app */}
          <div className="relative mx-auto mt-16 max-w-4xl animate-fade-in md:mt-20">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <MockCardDataWarga />
              <MockCardKas />
              <MockCardPengumuman />
            </div>
            <div className="pointer-events-none absolute -inset-x-12 -bottom-10 h-20 bg-gradient-to-t from-earth-50 via-earth-50/80 to-transparent" />
          </div>
        </div>
      </section>

      {/* ─── Masalah ────────────────────────────────────── */}
      <section id="masalah" className="border-t border-earth-100 bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              Masalah sehari-hari
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Pengelolaan RT masih pakai cara lama
            </h2>
            <p className="mt-4 text-earth-600">
              Survei kecil kami di 12 RT di Purwokerto menemukan pola yang sama
              berulang. Mungkin familiar?
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Buku tulis hilang, data hilang",
                text:
                  "Catatan warga dan kas RT disimpan di satu buku. Kalau buku rusak atau ketinggalan di rumah Pak RT lama, data bertahun-tahun bisa hilang.",
              },
              {
                title: "Salah tulis, sulit diperbaiki",
                text:
                  "Salah tulis nama, NIK, atau jumlah iuran di buku? Harus coret-coret atau nulis ulang seluruh halaman. Rawan kekeliruan.",
              },
              {
                title: "Pengumuman tidak sampai",
                text:
                  "Info kerja bakti dan jadwal ronda ditempel di mading. Warga yang sibuk atau jarang lewat mading jadi tidak tahu, lalu muncul keluhan.",
              },
              {
                title: "Lapor bulanan bikin pusing",
                text:
                  "Bendahara rekap iuran 50+ KK di akhir bulan. Salah sedikit, laporan ke RW dan kelurahan harus diulang dari awal.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-earth-200 bg-earth-50 p-5"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <h3 className="font-medium text-earth-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-earth-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Fitur utama ─────────────────────────────────── */}
      <section id="fitur" className="border-t border-earth-100 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              Solusi lengkap
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Empat pilar untuk RT yang rapih
            </h2>
            <p className="mt-4 text-earth-600">
              Fitur inti yang langsung menggantikan buku tulis dan mading,
              tanpa membingungkan Pak RT dan Bendahara.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Data Warga",
                desc:
                  "Simpan data KK, KTP, dan kontak warga dalam satu database. Cari nama siapa pun dalam 2 detik.",
                bullets: [
                  "Import KK dari Excel",
                  "Foto profil warga",
                  "Auto-update umur",
                ],
              },
              {
                icon: Wallet,
                title: "Keuangan RT",
                desc:
                  "Kas masuk, kas keluar, iuran bulanan, saldo real-time. Bendahara bisa input dari HP sambil kondangan.",
                bullets: [
                  "Laporan PDF bulanan",
                  "Reminder tunggakan",
                  "QRIS siap pakai",
                ],
              },
              {
                icon: MessageSquare,
                title: "Pengumuman",
                desc:
                  "Broadcast info ke semua warga via WhatsApp. Jadwal ronda, kerja bakti, sampai kabar duka.",
                bullets: [
                  "Kirim via WhatsApp",
                  "Jadwalkan pengumuman",
                  "Read receipt warga",
                ],
              },
              {
                icon: FileText,
                title: "Surat Pengantar",
                desc:
                  "Warga request dari HP, Pak RT approve dengan satu tap, surat auto-generate PDF siap di-TTD.",
                bullets: [
                  "Format sesuai standar",
                  "Auto-nomor surat",
                  "Riwayat tersimpan",
                ],
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-earth-200 bg-white p-6 transition-all hover:shadow-warm hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-guyub-100 text-guyub-700 transition-colors group-hover:bg-guyub-600 group-hover:text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-earth-900">{f.title}</h3>
                <p className="mt-2 text-sm text-earth-600">{f.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-xs text-earth-500">
                      <Check className="h-3 w-3 text-guyub-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Killer features ────────────────────────────── */}
      <section className="bg-gradient-to-b from-earth-50 to-white py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
              Yang bikin beda
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Dibuat untuk warga Indonesia, bukan copy-paste produk luar
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <KillerFeature
              icon={MessageCircle}
              emoji="💬"
              title="WhatsApp-first"
              desc="Warga tidak perlu install app baru. Terima pengumuman, cek saldo iuran, sampai request surat langsung lewat chat WhatsApp. Karena di Indonesia, WhatsApp adalah internet."
              tag="Fitur utama"
            />
            <KillerFeature
              icon={QrCode}
              emoji="🏦"
              title="QRIS langsung masuk laporan"
              desc="Warga scan QRIS → bayar iuran → otomatis tercatat di kas RT. Bendahara tidak perlu rekap manual. Bank Indonesia standard, aman, semua e-wallet dukung."
              tag="Auto-recorded"
            />
            <KillerFeature
              icon={FileDown}
              emoji="📄"
              title="Laporan otomatis tiap bulan"
              desc="Tanggal 1 tiap bulan, Bendahara dapat laporan PDF lengkap di WhatsApp. Siap print, siap kirim ke RW dan kelurahan. Hemat 4-8 jam per bulan."
              tag="Hemat waktu"
            />
            <KillerFeature
              icon={ShieldCheck}
              emoji="🔒"
              title="Data warga aman & sesuai UU PDP"
              desc="Data warga terenkripsi, server di Indonesia, hak akses per-role (Pak RT, Bendahara, Warga). Sesuai Undang-Undang Perlindungan Data Pribadi."
              tag="Compliance"
            />
            <KillerFeature
              icon={BellRing}
              emoji="🚨"
              title="Tombol darurat"
              desc="Pencet tombol darurat → broadcast instant ke semua warga dan Pak RT. Ada maling, kebakaran, atau ambulans dibutuhkan — semua tahu dalam hitungan detik."
              tag="Keamanan bersama"
            />
            <KillerFeature
              icon={Sparkles}
              emoji="✨"
              title="Offline-first, hemat data"
              desc="Koneksi jelek? Aplikasi tetap jalan, data auto-sync saat sinyal kembali. Ukuran hanya 3 MB. Di sinyal 3G pun tetap lancar."
              tag="Hemat kuota"
            />
          </div>
        </div>
      </section>

      {/* ─── Testimonial ─────────────────────────────────── */}
      <section className="border-t border-earth-100 py-24">
        <div className="mx-auto max-w-4xl px-5">
          <div className="rounded-3xl bg-guyub-900 px-8 py-12 text-white shadow-warm-lg md:px-14 md:py-16">
            <Quote className="h-10 w-10 text-guyub-400" />
            <blockquote className="mt-6 text-balance text-2xl font-medium leading-relaxed md:text-3xl">
              &ldquo;Dulu saya harus coret-coret buku tiap kali salah tulis.
              Sekarang input data warga dari HP sambil nonton TV.
              Bendahara juga bilang laporan bulanan lebih cepat 10x.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-guyub-600 font-semibold">
                B
              </div>
              <div>
                <p className="font-medium">Pak Budi</p>
                <p className="text-sm text-guyub-300">
                  Ketua RT 003 / RW 007, Purwokerto · 52 KK
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─────────────────────────────────────── */}
      <section id="harga" className="border-t border-earth-100 bg-earth-50/50 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              Harga
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Gratis untuk RT kecil, terjangkau untuk yang besar
            </h2>
            <p className="mt-4 text-earth-600">
              Komitmen kami: Guyub akan selalu gratis untuk RT ≤50 KK.
              Tanpa pengurangan fitur, tanpa trial. Selamanya.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <PricingCard
              name="Rukun"
              subtitle="Untuk RT kecil"
              price={0}
              period="Gratis selamanya"
              features={[
                "Sampai 50 KK",
                "Data warga & pengumuman",
                "Jadwal ronda",
                "WhatsApp broadcast",
                "Support komunitas",
              ]}
              cta="Mulai gratis"
              highlighted={false}
            />
            <PricingCard
              name="Guyub"
              subtitle="Untuk RT standar"
              price={49000}
              period="per bulan"
              features={[
                "KK tidak terbatas",
                "Semua fitur Rukun",
                "Laporan keuangan PDF",
                "Surat pengantar digital",
                "Tanpa iklan",
                "Support prioritas via WA",
              ]}
              cta="Coba 30 hari gratis"
              highlighted={true}
              badge="Paling populer"
            />
            <PricingCard
              name="Sejahtera"
              subtitle="Untuk RT aktif"
              price={99000}
              period="per bulan"
              features={[
                "Semua fitur Guyub",
                "QRIS iuran auto-masuk",
                "Tombol darurat",
                "Dashboard analitik",
                "Custom domain (rt003.guyub.app)",
                "Export ke Google Sheets",
              ]}
              cta="Mulai sekarang"
              highlighted={false}
            />
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-guyub-200 bg-guyub-50 p-6 text-center">
            <p className="text-sm text-guyub-800">
              <strong>Untuk RW, Kelurahan, atau Pemkot</strong> yang ingin
              deploy lintas-RT, ada paket khusus. Hubungi kami untuk
              penawaran — umumnya mulai dari Rp 500.000/bulan per 10 RT.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─────────────────────────────────────────── */}
      <section className="border-t border-earth-100 py-24">
        <div className="mx-auto max-w-3xl px-5">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
              FAQ
            </span>
            <h2 className="mt-3 text-balance text-4xl font-semibold tracking-tight">
              Pertanyaan yang sering ditanyakan
            </h2>
          </div>
          <div className="mt-12 space-y-4">
            {[
              {
                q: "Data warga kami aman?",
                a: "Aman. Server di Indonesia, data terenkripsi, dan akses dibagi per-role. Hanya Pak RT yang bisa melihat data lengkap. Warga hanya melihat data mereka sendiri. Kami patuh UU Perlindungan Data Pribadi (UU PDP 2022).",
              },
              {
                q: "Apa yang terjadi kalau saya berhenti langganan?",
                a: "Data Anda tetap bisa di-export ke Excel/PDF sampai 90 hari setelah berhenti. Kami tidak mengunci data Anda. Anda juga boleh tetap di paket Rukun (gratis selamanya) kalau RT Anda di bawah 50 KK.",
              },
              {
                q: "Pak RT saya belum lancar pakai HP, bisa dibantu?",
                a: "Bisa. Setiap RT yang daftar dapat sesi onboarding 30 menit via WhatsApp video call (atau kunjungan langsung untuk RT di Purwokerto). Kami juga kasih buku panduan cetak dalam Bahasa Indonesia sederhana.",
              },
              {
                q: "Warga tidak punya smartphone, bagaimana?",
                a: "Tidak masalah. Semua fitur untuk warga dapat dilakukan lewat WhatsApp — tidak perlu install apa-apa. Selama punya HP yang bisa WhatsApp, sudah cukup. Data warga tetap bisa diinput manual oleh Pak RT.",
              },
              {
                q: "Apakah Guyub bisa integrasi dengan Dukcapil?",
                a: "Belum. Saat ini Dukcapil hanya memberi API resmi ke pemerintah daerah. Roadmap kami: partnership dengan Pemkab/Pemkot untuk integrasi verifikasi NIK. Sementara, NIK diinput manual dan kami validasi format 16-digit.",
              },
              {
                q: "Saya tertarik jadi pengguna awal, gimana caranya?",
                a: "Kirim WhatsApp ke nomor yang tertera di bagian kontak. Kami sedang membuka pilot untuk 10 RT di Purwokerto dan sekitarnya. Pilot dapat gratis 6 bulan dan input langsung ke development roadmap.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-earth-200 bg-white px-6 py-5 transition-colors hover:border-earth-300"
              >
                <summary className="cursor-pointer list-none font-medium text-earth-900 marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-1 text-guyub-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-earth-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────── */}
      <section id="demo" className="relative overflow-hidden bg-guyub-900 text-white">
        <div className="absolute inset-0 batik-pattern opacity-10" />
        <div className="relative mx-auto max-w-4xl px-5 py-24 text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Siap bikin RT Anda lebih rapih?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-guyub-200">
            Gabung pilot 10 RT pertama di Purwokerto. Dapat 6 bulan gratis,
            onboarding langsung dari tim kami, dan input ke development
            roadmap.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Guyub%2C%20saya%20tertarik%20jadi%20pilot%20RT"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-medium text-guyub-900 transition-transform hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp kami sekarang
            </a>
            <a
              href="#fitur"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Baca fitur dulu
            </a>
          </div>

          <div id="hubungi" className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-guyub-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Gratis untuk 10 RT pilot
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Onboarding 30 menit
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Cancel kapan saja
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer id="tentang" className="border-t border-earth-200 bg-earth-50 py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo size="lg" />
              <p className="mt-4 max-w-sm text-sm text-earth-600">
                Dibuat di Purwokerto untuk 750.000+ RT di Indonesia. Misi
                kami: digitalisasi tanpa kehilangan nilai guyub.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-earth-900">Produk</h4>
              <ul className="mt-3 space-y-2 text-sm text-earth-600">
                <li><a href="#fitur" className="hover:text-earth-900">Fitur</a></li>
                <li><a href="#harga" className="hover:text-earth-900">Harga</a></li>
                <li><a href="#demo" className="hover:text-earth-900">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-earth-900">Hubungi</h4>
              <ul className="mt-3 space-y-2 text-sm text-earth-600">
                <li>WhatsApp: +62 812 3456 7890</li>
                <li>Email: halo@guyub.app</li>
                <li>Purwokerto, Banyumas</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-earth-200 pt-6 text-xs text-earth-500 md:flex-row">
            <p>© {new Date().getFullYear()} Guyub. Made with ❤ in Purwokerto.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-earth-700">Privasi</a>
              <a href="#" className="hover:text-earth-700">Ketentuan</a>
              <a href="#" className="hover:text-earth-700">UU PDP</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Mock hero cards ────────────────────────────────────────
function MockCardDataWarga() {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-4 shadow-warm">
      <div className="flex items-center gap-2 pb-3">
        <Users className="h-4 w-4 text-guyub-600" />
        <span className="text-xs font-semibold uppercase tracking-wider text-earth-500">
          Data Warga
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-earth-900">189</p>
      <p className="text-xs text-earth-500">Jiwa · 52 KK</p>
      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-guyub-300 to-guyub-500"
          />
        ))}
        <div className="flex h-7 items-center rounded-full border-2 border-white bg-earth-100 px-2 text-[10px] font-medium text-earth-600">
          +184
        </div>
      </div>
    </div>
  );
}

function MockCardKas() {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-4 shadow-warm">
      <div className="flex items-center gap-2 pb-3">
        <Wallet className="h-4 w-4 text-guyub-600" />
        <span className="text-xs font-semibold uppercase tracking-wider text-earth-500">
          Saldo Kas
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-earth-900">
        {formatRupiah(2850000)}
      </p>
      <p className="text-xs text-emerald-600">↑ {formatRupiah(450000)} bulan ini</p>
      <div className="mt-3 h-10 flex items-end gap-1">
        {[40, 55, 45, 70, 60, 85, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-guyub-500 to-guyub-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function MockCardPengumuman() {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-4 shadow-warm">
      <div className="flex items-center gap-2 pb-3">
        <BellRing className="h-4 w-4 text-guyub-600" />
        <span className="text-xs font-semibold uppercase tracking-wider text-earth-500">
          Pengumuman
        </span>
      </div>
      <p className="text-sm font-medium text-earth-900 line-clamp-2">
        Kerja bakti Minggu depan pagi, jam 07.00. Bawa cangkul & sapu.
      </p>
      <p className="mt-1 text-xs text-earth-500">2 jam lalu · ✓✓ dibaca 46 warga</p>
      <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-700">
        <MessageCircle className="h-3 w-3" />
        <span>Dikirim via WhatsApp ke 52 KK</span>
      </div>
    </div>
  );
}

// ─── Killer feature card ────────────────────────────────────
function KillerFeature({
  icon: Icon,
  emoji,
  title,
  desc,
  tag,
}: {
  icon: React.ElementType;
  emoji: string;
  title: string;
  desc: string;
  tag: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-earth-200 bg-white p-7 transition-all hover:shadow-warm-lg hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
          {emoji}
        </div>
        <span className="rounded-full bg-guyub-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-guyub-700">
          {tag}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-earth-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-earth-600">{desc}</p>
      <Icon className="absolute -bottom-4 -right-4 h-24 w-24 text-earth-100 transition-colors group-hover:text-guyub-100" />
    </div>
  );
}

// ─── Pricing card ───────────────────────────────────────────
function PricingCard({
  name,
  subtitle,
  price,
  period,
  features,
  cta,
  highlighted,
  badge,
}: {
  name: string;
  subtitle: string;
  price: number;
  period: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative rounded-3xl border p-8 ${
        highlighted
          ? "border-guyub-600 bg-white shadow-warm-lg"
          : "border-earth-200 bg-white"
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-guyub-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            {badge}
          </span>
        </div>
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-guyub-600">
          {subtitle}
        </p>
        <h3 className="mt-1 text-2xl font-semibold text-earth-900">{name}</h3>
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight text-earth-900">
          {price === 0 ? "Rp 0" : formatRupiah(price)}
        </span>
      </div>
      <p className="mt-1 text-sm text-earth-500">{period}</p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-earth-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-guyub-600" />
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#demo"
        className={`mt-8 block rounded-full py-3 text-center text-sm font-medium transition-all ${
          highlighted
            ? "bg-guyub-600 text-white hover:bg-guyub-700"
            : "border border-earth-200 text-earth-700 hover:bg-earth-50"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}
