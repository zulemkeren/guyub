# Guyub — RT Digital yang Tetap Guyub

> **Live site:** https://guyub-rho.vercel.app
> **Misi:** Digitalisasi 750.000 RT di Indonesia tanpa menghilangkan nilai guyub.

---

## Apa itu Guyub?

Guyub adalah platform SaaS yang menggantikan pengelolaan RT berbasis kertas dengan alur digital yang terintegrasi dengan WhatsApp. Satu aplikasi untuk:

- 👥 **Data warga & KK** — replace buku tulis
- 💰 **Keuangan RT** — kas, iuran, laporan bulanan otomatis
- 📢 **Pengumuman via WhatsApp** — replace mading
- 📄 **Surat pengantar digital** — replace surat tulis tangan
- 🛡️ **Jadwal ronda & kerja bakti** — reminder otomatis
- 🚨 **Tombol darurat** — broadcast ke semua warga

## Kenapa Guyub berbeda

| | Guyub | Solusi lain |
|---|---|---|
| WhatsApp-first | ✅ Warga gak install app | ❌ Harus download app |
| Untuk Pak RT 60+ tahun | ✅ UI super simple | ❌ Butuh training panjang |
| Offline mode | ✅ Jalan di sinyal jelek | ❌ Butuh koneksi stabil |
| Harga untuk RT kecil | ✅ Gratis selamanya (<50 KK) | ❌ Rp jutaan/bulan |
| UU PDP compliance | ✅ Server di Indonesia, per-role access | ⚠️ Banyak yg belum |
| Dikembangkan di Indonesia | ✅ Purwokerto | ❌ Fork produk luar |

---

## Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js Route Handlers + Supabase (Postgres + Auth + Storage)
- **Infra:** Vercel (hosting), Supabase (DB), Fonnte/Twilio (WhatsApp API)
- **Payments:** QRIS via Xendit or Midtrans
- **Analytics:** Vercel Analytics + PostHog (self-hosted later)

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build
npm run lint
```

## Dokumentasi

Lihat folder `docs/`:

- [`01-database-schema.sql`](./docs/01-database-schema.sql) — Supabase schema lengkap (13 tabel, siap copy-paste)
- [`02-pitch-pak-rt.md`](./docs/02-pitch-pak-rt.md) — Proposal formal ke Pak RT (siap cetak)
- [`03-business-plan.md`](./docs/03-business-plan.md) — Market, pricing, GTM, finansial 24 bulan
- [`04-roadmap-6weeks.md`](./docs/04-roadmap-6weeks.md) — Sprint plan minggu demi minggu sampai pilot live
- [`05-microsoft-startups-application.md`](./docs/05-microsoft-startups-application.md) — Draft aplikasi ke MS for Startups

## Roadmap singkat

- **Week 1-6:** Pilot di RT 003 / RW 007 Purwokerto
- **Month 3-6:** Expand ke 10 RT sekitar (free tier)
- **Month 7-12:** Paid tier launch, target 50 RT
- **Month 13-18:** Expand Jawa Tengah, apply 1000 Startup Digital
- **Year 2:** Jakarta, Bandung, Surabaya + B2G pertama

## Contributing

Saat ini project ini closed-source (pilot phase). Kalau Anda tertarik
berkontribusi sebagai:
- **Pak RT / RW** yg mau jadi pilot → WhatsApp tim
- **Engineer** yg mau join awal → DM founder
- **Investor / advisor** → lihat `docs/03-business-plan.md` lalu hubungi

## Kontak

- **WhatsApp:** [TBD]
- **Email:** halo@guyub.app (pending domain)
- **Founder:** Zulmi Mustaqiem

## License

Proprietary, all rights reserved. Source akan di-open-source di bagian yg non-core
begitu produk stabil.
