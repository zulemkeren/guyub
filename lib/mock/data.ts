// Realistic mock data for RT 002 / RW 004 Purwokerto — 52 KK, 189 warga
// Deterministic seed-based generation so every load gives same data

import type {
  Warga,
  KartuKeluarga,
  KategoriKeuangan,
  Transaksi,
  IuranStatus,
  Pengumuman,
  SuratPengantar,
  JenisSurat,
  Jadwal,
  AppUser,
  RTInfo,
  HubunganKeluarga,
  JenisKelamin,
  Agama,
} from "./types";

// ─── Seeded random (deterministic) ────────────────────────────────────────
let seed = 42;
function rand(): number {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}
function rint(min: number, max: number): number {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

// Reset seed for deterministic generation
function reset() {
  seed = 42;
}

// ─── Names (inline to control seeding) ─────────────────────────────────
const NAMA_L = [
  "Agus", "Bambang", "Budi", "Cahyo", "Darmawan", "Eko", "Fajar", "Gunawan",
  "Hadi", "Iwan", "Joko", "Kurniawan", "Lukman", "Mulyono", "Nugroho", "Priyanto",
  "Rahmat", "Sugeng", "Tri", "Untung", "Wahyu", "Yusuf", "Bayu", "Candra",
  "Dwi", "Edi", "Feri", "Galih", "Heru", "Imam", "Slamet", "Waluyo",
  "Yanto", "Harto", "Subroto", "Purnomo", "Suryo", "Wiratno", "Sudarto",
];
const NAMA_P = [
  "Ani", "Citra", "Dewi", "Endang", "Fitri", "Gita", "Hani", "Ita",
  "Kartini", "Lestari", "Mulyani", "Ninik", "Partini", "Rahayu", "Siti",
  "Tuti", "Umi", "Wati", "Yani", "Eni", "Farida", "Handayani", "Juwariyah",
  "Novi", "Puji", "Rohmah", "Sri", "Tatik", "Utami", "Wiwik", "Yayuk",
];
const MARGA = [
  "Santoso", "Wibowo", "Prabowo", "Saputro", "Nugroho", "Hartono",
  "Purwanto", "Susanto", "Setiawan", "Wijaya", "Pratama", "Kusuma",
  "Yudhistira", "Prasetyo", "Handoyo", "Raharjo", "Gunadi", "Suparno",
  "Sutrisno", "Rahmawati", "Wulandari", "Puspitasari", "Handayani",
];
const JALAN = [
  "Jl. Gatot Subroto", "Jl. Kauman", "Jl. Merdeka", "Jl. Pahlawan",
  "Jl. Jenderal Sudirman", "Jl. Dr. Angka", "Jl. Kober", "Jl. Bojongsari",
  "Jl. Mersi", "Jl. Sumampir", "Gang Melati", "Gang Mawar", "Gang Kenanga",
];
const PEKERJAAN = [
  "Pegawai Negeri", "Karyawan Swasta", "Wiraswasta", "Petani", "Pedagang",
  "Guru", "Dokter", "Perawat", "Pensiunan", "Ibu Rumah Tangga",
  "Pelajar/Mahasiswa", "Buruh", "Sopir", "Satpam", "Freelance",
];
const PENDIDIKAN = ["SD", "SMP", "SMA/SMK", "Diploma", "S1", "S2"];
const GOL_DARAH = ["A", "B", "AB", "O", "A+", "B+", "O+", undefined];
const AGAMA_POOL: Agama[] = ["Islam", "Islam", "Islam", "Islam", "Kristen", "Katolik"];

// ─── RT Info ────────────────────────────────────────────────────────────
export const RT_INFO: RTInfo = {
  noRT: "002",
  noRW: "004",
  kelurahan: "Purwokerto Kulon",
  kecamatan: "Purwokerto Selatan",
  kota: "Banyumas",
  provinsi: "Jawa Tengah",
  tahunBerdiri: 1985,
  jumlahKK: 52,
  jumlahWarga: 189,
  saldoKas: 2_847_500,
};

// ─── Users for demo (role switcher) ────────────────────────────────────
export const USERS: AppUser[] = [
  {
    id: "u-1",
    nama: "Pak Wanto",
    role: "admin_rt",
    jabatan: "Ketua RT 002",
  },
  {
    id: "u-2",
    nama: "Bu Sri Handayani",
    role: "bendahara",
    jabatan: "Bendahara RT",
  },
  {
    id: "u-3",
    nama: "Mas Bayu Santoso",
    role: "sekretaris",
    jabatan: "Sekretaris RT",
  },
  {
    id: "u-4",
    nama: "Dewi Rahmawati",
    role: "warga",
    jabatan: "Warga",
  },
];

// ─── Generate KK & Warga ────────────────────────────────────────────────
function genNIK(tglLahir: string, jk: JenisKelamin, rtNum: string): string {
  // Not real NIK, but realistic 16-digit format
  const [y, m, d] = tglLahir.split("-").map(Number);
  const day = jk === "P" ? d + 40 : d;
  const yy = y % 100;
  const provKode = "33"; // Jateng
  const kabKode = "02"; // Banyumas-ish
  const kecKode = "13";
  const urut = rint(1, 9999).toString().padStart(4, "0");
  return `${provKode}${kabKode}${kecKode}${day.toString().padStart(2, "0")}${m.toString().padStart(2, "0")}${yy.toString().padStart(2, "0")}${urut}`;
}

function genNoKK(): string {
  return Array.from({ length: 16 }, () => rint(0, 9)).join("");
}

function randomDate(startYear: number, endYear: number): string {
  const y = rint(startYear, endYear);
  const m = rint(1, 12);
  const d = rint(1, 28);
  return `${y}-${m.toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;
}

interface GenResult {
  kkList: KartuKeluarga[];
  wargaList: Warga[];
}

function generateKKDanWarga(): GenResult {
  reset();
  const kkList: KartuKeluarga[] = [];
  const wargaList: Warga[] = [];

  // Distribution: avg ~3.6 warga per KK to reach 189 from 52 KK
  // Mix of 1-person, 2-person, 3-4 person, 5-6 person households
  const kkSizes = [
    // Small (1-2): ~15 KK
    ...Array(5).fill(1),
    ...Array(10).fill(2),
    // Medium (3-4): ~25 KK
    ...Array(13).fill(3),
    ...Array(12).fill(4),
    // Large (5+): ~12 KK
    ...Array(8).fill(5),
    ...Array(3).fill(6),
    ...Array(1).fill(7),
  ];

  // Shuffle deterministically
  for (let i = kkSizes.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [kkSizes[i], kkSizes[j]] = [kkSizes[j], kkSizes[i]];
  }

  let wargaCount = 0;
  for (let k = 0; k < 52; k++) {
    const kkId = `kk-${(k + 1).toString().padStart(3, "0")}`;
    const alamat = `${pick(JALAN)} No. ${rint(1, 95)}`;
    const marga = pick(MARGA);

    const kk: KartuKeluarga = {
      id: kkId,
      noKK: genNoKK(),
      alamat,
      rtRw: "002/004",
      kelurahan: RT_INFO.kelurahan,
      tanggalTerbit: randomDate(2005, 2020),
    };

    const size = kkSizes[k] || 3;

    // Kepala keluarga (male, 30-65)
    const kkTglLahir = randomDate(1958, 1995);
    const kkNama = `${pick(NAMA_L)} ${marga}`;
    const kepalaId = `w-${(wargaCount + 1).toString().padStart(3, "0")}`;
    wargaCount++;

    wargaList.push({
      id: kepalaId,
      nama: kkNama,
      nik: genNIK(kkTglLahir, "L", "002"),
      jenisKelamin: "L",
      tempatLahir: pick(["Purwokerto", "Purwokerto", "Banyumas", "Cilacap", "Purbalingga"]),
      tanggalLahir: kkTglLahir,
      kkId,
      hubungan: "kepala_keluarga",
      statusPerkawinan: size > 1 ? "kawin" : pick(["belum_kawin", "cerai_hidup", "cerai_mati"] as const),
      agama: pick(AGAMA_POOL),
      pendidikan: pick(PENDIDIKAN),
      pekerjaan: pick(PEKERJAAN),
      golDarah: pick(GOL_DARAH),
      noHp: `08${rint(11, 99)}${rint(1000000, 9999999)}`,
      statusDomisili: "tetap",
      tanggalMasuk: kk.tanggalTerbit,
    });

    kk.kepalaKeluargaId = kepalaId;

    // Istri if size >= 2 & kawin
    if (size >= 2 && Math.random() > 0.15) {
      const istriId = `w-${(wargaCount + 1).toString().padStart(3, "0")}`;
      wargaCount++;
      const istriTglLahir = randomDate(1960, 1998);
      wargaList.push({
        id: istriId,
        nama: `${pick(NAMA_P)} ${marga}`,
        nik: genNIK(istriTglLahir, "P", "002"),
        jenisKelamin: "P",
        tempatLahir: pick(["Purwokerto", "Banyumas", "Semarang", "Yogyakarta"]),
        tanggalLahir: istriTglLahir,
        kkId,
        hubungan: "istri",
        statusPerkawinan: "kawin",
        agama: wargaList[wargaList.length - 1].agama,
        pendidikan: pick(PENDIDIKAN),
        pekerjaan: pick(["Ibu Rumah Tangga", "Ibu Rumah Tangga", "Karyawan Swasta", "Guru", "Pedagang", "Wiraswasta"]),
        golDarah: pick(GOL_DARAH),
        noHp: `08${rint(11, 99)}${rint(1000000, 9999999)}`,
        statusDomisili: "tetap",
        tanggalMasuk: kk.tanggalTerbit,
      });
    }

    // Anak-anak
    const currentSize = size - (wargaList.filter((w) => w.kkId === kkId).length);
    for (let c = 0; c < currentSize; c++) {
      const anakId = `w-${(wargaCount + 1).toString().padStart(3, "0")}`;
      wargaCount++;
      const anakJk: JenisKelamin = rand() > 0.5 ? "L" : "P";
      const anakTglLahir = randomDate(1995, 2023);
      const anakUmur = 2025 - parseInt(anakTglLahir.split("-")[0]);
      wargaList.push({
        id: anakId,
        nama: `${anakJk === "L" ? pick(NAMA_L) : pick(NAMA_P)} ${marga}`,
        nik: genNIK(anakTglLahir, anakJk, "002"),
        jenisKelamin: anakJk,
        tempatLahir: "Purwokerto",
        tanggalLahir: anakTglLahir,
        kkId,
        hubungan: anakUmur > 22 && rand() > 0.7 ? "menantu" : "anak",
        statusPerkawinan: anakUmur >= 22 && rand() > 0.5 ? "kawin" : "belum_kawin",
        agama: wargaList[wargaList.length - 1].agama,
        pendidikan: anakUmur < 7 ? "Tidak Sekolah" : anakUmur < 13 ? "SD" : anakUmur < 16 ? "SMP" : anakUmur < 19 ? "SMA/SMK" : pick(["SMA/SMK", "Diploma", "S1"]),
        pekerjaan: anakUmur < 18 ? "Pelajar/Mahasiswa" : pick(PEKERJAAN),
        golDarah: pick(GOL_DARAH),
        noHp: anakUmur >= 15 ? `08${rint(11, 99)}${rint(1000000, 9999999)}` : undefined,
        statusDomisili: "tetap",
        tanggalMasuk: anakTglLahir,
      });

      if (wargaCount >= 189) break;
    }

    kkList.push(kk);
    if (wargaCount >= 189) break;
  }

  // Ensure exactly 189 — pad or trim
  while (wargaCount < 189 && kkList.length > 0) {
    const kk = kkList[kkList.length - 1];
    const anakId = `w-${(wargaCount + 1).toString().padStart(3, "0")}`;
    wargaCount++;
    const jk: JenisKelamin = rand() > 0.5 ? "L" : "P";
    const tgl = randomDate(2010, 2024);
    wargaList.push({
      id: anakId,
      nama: `${jk === "L" ? pick(NAMA_L) : pick(NAMA_P)} ${pick(MARGA)}`,
      nik: genNIK(tgl, jk, "002"),
      jenisKelamin: jk,
      tempatLahir: "Purwokerto",
      tanggalLahir: tgl,
      kkId: kk.id,
      hubungan: "anak",
      statusPerkawinan: "belum_kawin",
      agama: "Islam",
      pendidikan: "SD",
      pekerjaan: "Pelajar/Mahasiswa",
      statusDomisili: "tetap",
      tanggalMasuk: tgl,
    });
  }

  return { kkList, wargaList: wargaList.slice(0, 189) };
}

const { kkList: KK_LIST, wargaList: WARGA_LIST } = generateKKDanWarga();

export const KK_DATA = KK_LIST;
export const WARGA_DATA = WARGA_LIST;

// ─── Keuangan: Kategori ────────────────────────────────────────────────
export const KATEGORI_KEUANGAN: KategoriKeuangan[] = [
  { id: "kat-1", nama: "Iuran Kas RT", jenis: "pemasukan", isIuran: true, nominalBulanan: 25000 },
  { id: "kat-2", nama: "Iuran Keamanan", jenis: "pemasukan", isIuran: true, nominalBulanan: 15000 },
  { id: "kat-3", nama: "Iuran Kebersihan", jenis: "pemasukan", isIuran: true, nominalBulanan: 10000 },
  { id: "kat-4", nama: "Sumbangan Donatur", jenis: "pemasukan", isIuran: false },
  { id: "kat-5", nama: "Pemasukan Lain", jenis: "pemasukan", isIuran: false },
  { id: "kat-6", nama: "Gaji Petugas Kebersihan", jenis: "pengeluaran", isIuran: false },
  { id: "kat-7", nama: "Pembelian Peralatan", jenis: "pengeluaran", isIuran: false },
  { id: "kat-8", nama: "Biaya Listrik Pos Ronda", jenis: "pengeluaran", isIuran: false },
  { id: "kat-9", nama: "Konsumsi Kerja Bakti", jenis: "pengeluaran", isIuran: false },
  { id: "kat-10", nama: "Kabar Duka", jenis: "pengeluaran", isIuran: false },
  { id: "kat-11", nama: "Santunan Lansia", jenis: "pengeluaran", isIuran: false },
  { id: "kat-12", nama: "Pengeluaran Lain", jenis: "pengeluaran", isIuran: false },
];

// ─── Transaksi — generate realistic 6 months history ───────────────────
function generateTransaksi(): Transaksi[] {
  reset();
  const result: Transaksi[] = [];
  const kategoriIuran = KATEGORI_KEUANGAN.filter((k) => k.isIuran);
  const kategoriPemasukan = KATEGORI_KEUANGAN.filter((k) => k.jenis === "pemasukan" && !k.isIuran);
  const kategoriPengeluaran = KATEGORI_KEUANGAN.filter((k) => k.jenis === "pengeluaran");

  const now = new Date(2025, 11, 15); // Dec 15, 2025
  let idx = 1;

  // Generate last 6 months of transactions
  for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
    const date = new Date(now);
    date.setMonth(date.getMonth() - monthOffset);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthStart = `${year}-${month.toString().padStart(2, "0")}`;

    // Iuran pemasukan: ~40 KK bayar per bulan, dari 52
    const kkBayar = [...KK_DATA].sort(() => rand() - 0.5).slice(0, rint(38, 47));
    for (const kk of kkBayar) {
      for (const kat of kategoriIuran) {
        const tgl = `${monthStart}-${rint(1, 28).toString().padStart(2, "0")}`;
        result.push({
          id: `trx-${idx++}`,
          tanggal: tgl,
          jenis: "pemasukan",
          kategoriId: kat.id,
          jumlah: kat.nominalBulanan || 20000,
          keterangan: `${kat.nama} ${monthStart}`,
          metode: pick(["tunai", "tunai", "tunai", "transfer", "qris"] as const),
          kkId: kk.id,
          dicatatOleh: "u-2", // Bendahara
        });
      }
    }

    // Pemasukan lain: ~2 per bulan
    for (let p = 0; p < rint(1, 3); p++) {
      const tgl = `${monthStart}-${rint(1, 28).toString().padStart(2, "0")}`;
      result.push({
        id: `trx-${idx++}`,
        tanggal: tgl,
        jenis: "pemasukan",
        kategoriId: pick(kategoriPemasukan).id,
        jumlah: rint(5, 30) * 10000,
        keterangan: pick([
          "Sumbangan dari Pak Haji Rahman",
          "Sumbangan 17 Agustus",
          "Sumbangan acara sunatan",
          "Sumbangan kabar suka",
          "Pemasukan dari sewa tenda",
        ]),
        metode: pick(["tunai", "transfer"] as const),
        dicatatOleh: "u-2",
      });
    }

    // Pengeluaran: ~5-8 per bulan
    for (let p = 0; p < rint(5, 8); p++) {
      const tgl = `${monthStart}-${rint(1, 28).toString().padStart(2, "0")}`;
      const kat = pick(kategoriPengeluaran);
      result.push({
        id: `trx-${idx++}`,
        tanggal: tgl,
        jenis: "pengeluaran",
        kategoriId: kat.id,
        jumlah: rint(5, 80) * 10000,
        keterangan: pick([
          `${kat.nama} bulan ini`,
          "Beli sapu + pengki",
          "Servis pos ronda",
          "Konsumsi rapat RT",
          "Kabar duka Pak Suparto",
          "Perbaikan lampu jalan",
          "Beli tali dan hiasan",
          "Santunan Bu Partini (lansia)",
        ]),
        metode: pick(["tunai", "transfer"] as const),
        dicatatOleh: "u-2",
      });
    }
  }

  return result.sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export const TRANSAKSI_DATA = generateTransaksi();

// ─── Iuran Status: matrix KK × 12 bulan (tahun berjalan) ───────────────
function generateIuranStatus(): IuranStatus[] {
  reset();
  const result: IuranStatus[] = [];
  const kategoriIuran = KATEGORI_KEUANGAN.filter((k) => k.isIuran);

  for (const kk of KK_DATA) {
    for (const kat of kategoriIuran) {
      for (let bulan = 1; bulan <= 12; bulan++) {
        const wajib = kat.nominalBulanan || 20000;
        // Current month: Dec 2025. So Jan-Nov mostly lunas, Dec partial
        let terbayar: number;
        if (bulan < 12) {
          // 85% chance lunas
          terbayar = rand() < 0.85 ? wajib : rand() < 0.5 ? Math.floor(wajib / 2) : 0;
        } else {
          // Dec: 55% lunas
          terbayar = rand() < 0.55 ? wajib : 0;
        }

        result.push({
          kkId: kk.id,
          kategoriId: kat.id,
          bulan,
          tahun: 2025,
          jumlahWajib: wajib,
          jumlahTerbayar: terbayar,
          tanggalBayar: terbayar > 0
            ? `2025-${bulan.toString().padStart(2, "0")}-${rint(1, 28).toString().padStart(2, "0")}`
            : undefined,
        });
      }
    }
  }

  return result;
}

export const IURAN_STATUS_DATA = generateIuranStatus();

// ─── Pengumuman ────────────────────────────────────────────────────────
export const PENGUMUMAN_DATA: Pengumuman[] = [
  {
    id: "p-1",
    judul: "Kerja Bakti Minggu Pagi",
    isi: "Warga RT 002 yang terhormat. Akan diadakan kerja bakti membersihkan saluran air dan lingkungan RT pada hari Minggu, 21 Desember 2025, mulai pukul 07.00 WIB. Mohon bawa cangkul, sapu lidi, dan karung. Setelah kerja bakti akan ada konsumsi bersama. Terima kasih atas partisipasinya.",
    kategori: "kerja_bakti",
    tanggalKirim: "2025-12-15T09:30:00+07:00",
    dibuatOleh: "u-1",
    viaWhatsapp: true,
    terkirim: 52,
    dibaca: 48,
  },
  {
    id: "p-2",
    judul: "Jadwal Ronda Malam Minggu Ini",
    isi: "Jadwal ronda malam untuk minggu ini:\nSenin: Pak Budi, Pak Eko\nSelasa: Pak Agus, Pak Heru\nRabu: Pak Slamet, Pak Bambang\nKamis: Pak Sugeng, Pak Tri\nJumat: Pak Hadi, Pak Wahyu\nSabtu: Pak Yusuf, Pak Fajar\nPos ronda tersedia teh hangat + camilan. Mohon tepat waktu.",
    kategori: "ronda",
    tanggalKirim: "2025-12-14T18:00:00+07:00",
    dibuatOleh: "u-3",
    viaWhatsapp: true,
    terkirim: 52,
    dibaca: 51,
  },
  {
    id: "p-3",
    judul: "Reminder Iuran Bulan Desember",
    isi: "Bapak/Ibu warga RT 002 yang belum menyelesaikan iuran bulan Desember, mohon segera melunasi melalui transfer ke rekening Bendahara atau bayar langsung ke Bu Sri. Terima kasih.",
    kategori: "iuran",
    tanggalKirim: "2025-12-10T08:00:00+07:00",
    dibuatOleh: "u-2",
    viaWhatsapp: true,
    terkirim: 23,
    dibaca: 19,
  },
  {
    id: "p-4",
    judul: "Kabar Duka — Alm. Pak Sudarto",
    isi: "Innalillahi wa innailaihi rajiun. Telah berpulang ke rahmatullah, Bapak Sudarto (68 tahun) pada hari Selasa, 9 Desember 2025, pukul 04.15 WIB. Jenazah akan dikebumikan hari ini pukul 14.00 WIB di Pemakaman Umum Kaliputat. Mohon doa untuk almarhum dan kekuatan bagi keluarga yang ditinggalkan.",
    kategori: "kabar_duka",
    tanggalKirim: "2025-12-09T05:30:00+07:00",
    dibuatOleh: "u-1",
    viaWhatsapp: true,
    terkirim: 52,
    dibaca: 52,
  },
  {
    id: "p-5",
    judul: "Rapat RT Bulanan",
    isi: "Rapat bulanan RT 002 akan diadakan hari Sabtu, 6 Desember 2025, jam 19.30 WIB di rumah Pak RT. Agenda: laporan kas bulan November, persiapan tahun baru, usulan warga. Dimohon kehadiran perwakilan dari tiap KK.",
    kategori: "umum",
    tanggalKirim: "2025-12-03T10:00:00+07:00",
    dibuatOleh: "u-1",
    viaWhatsapp: true,
    terkirim: 52,
    dibaca: 50,
  },
  {
    id: "p-6",
    judul: "Peringatan — Waspada Pencurian",
    isi: "Informasi dari warga: ada laporan percobaan pencurian di gang depan rumah Pak Bambang kemarin malam. Mohon warga meningkatkan kewaspadaan, kunci pintu-pagar, matikan lampu yang tidak perlu. Jadwal ronda diperketat mulai minggu ini.",
    kategori: "keamanan",
    tanggalKirim: "2025-11-28T22:15:00+07:00",
    dibuatOleh: "u-1",
    viaWhatsapp: true,
    terkirim: 52,
    dibaca: 52,
  },
  {
    id: "p-7",
    judul: "Selamat kepada Ananda Dewi — Lulus S1",
    isi: "Selamat dan turut berbahagia kepada Ananda Dewi Santoso yang telah berhasil menyelesaikan pendidikan S1 di Universitas Jenderal Soedirman dengan predikat Cumlaude. Semoga ilmunya berkah dan bermanfaat. Atas nama seluruh warga RT 002, kami ucapkan selamat.",
    kategori: "kabar_suka",
    tanggalKirim: "2025-11-20T14:00:00+07:00",
    dibuatOleh: "u-1",
    viaWhatsapp: true,
    terkirim: 52,
    dibaca: 46,
  },
];

// ─── Jenis Surat ───────────────────────────────────────────────────────
export const JENIS_SURAT: JenisSurat[] = [
  { kode: "SKDT", nama: "Surat Keterangan Domisili", deskripsi: "Untuk keperluan administrasi domisili" },
  { kode: "SKTM", nama: "Surat Keterangan Tidak Mampu", deskripsi: "Untuk keperluan bantuan sosial, BPJS, beasiswa" },
  { kode: "SKU", nama: "Surat Keterangan Usaha", deskripsi: "Untuk keperluan izin usaha, BRI, BI Checking" },
  { kode: "SKKH", nama: "Surat Keterangan Kematian Hilang", deskripsi: "Pelengkap dokumen kematian" },
  { kode: "SKNB", nama: "Surat Keterangan Nikah Belum", deskripsi: "Untuk keperluan pengurusan KUA" },
  { kode: "SKLP", nama: "Surat Keterangan Laporan Polisi", deskripsi: "Pengantar ke kepolisian" },
];

// ─── Surat Pengantar (active dari warga) ───────────────────────────────
export const SURAT_DATA: SuratPengantar[] = [
  {
    id: "s-1",
    nomorSurat: "RT002/RW004/SKDT/XII/2025/015",
    jenisKode: "SKDT",
    wargaId: WARGA_DATA[0]?.id || "w-001",
    perihal: "Pengajuan Kredit KPR",
    keperluan: "Pengajuan KPR di Bank Mandiri untuk pembelian rumah pertama",
    tanggalPengajuan: "2025-12-14T09:30:00+07:00",
    status: "approved",
    approvedBy: "u-1",
    approvedAt: "2025-12-14T16:20:00+07:00",
  },
  {
    id: "s-2",
    nomorSurat: "RT002/RW004/SKTM/XII/2025/014",
    jenisKode: "SKTM",
    wargaId: WARGA_DATA[5]?.id || "w-006",
    perihal: "Bantuan Pendidikan SMP",
    keperluan: "Keperluan pengurusan bantuan pendidikan BOS untuk anak SMP",
    tanggalPengajuan: "2025-12-12T10:15:00+07:00",
    status: "approved",
    approvedBy: "u-1",
    approvedAt: "2025-12-13T08:00:00+07:00",
  },
  {
    id: "s-3",
    nomorSurat: "",
    jenisKode: "SKU",
    wargaId: WARGA_DATA[12]?.id || "w-013",
    perihal: "Izin Usaha Warung Makan",
    keperluan: "Mengurus NIB untuk warung makan yang sudah buka sejak 2020",
    tanggalPengajuan: "2025-12-15T14:00:00+07:00",
    status: "pending",
  },
  {
    id: "s-4",
    nomorSurat: "",
    jenisKode: "SKDT",
    wargaId: WARGA_DATA[20]?.id || "w-021",
    perihal: "Pendaftaran BPJS Kesehatan",
    keperluan: "Pendaftaran BPJS Kesehatan Mandiri Kelas 2 untuk keluarga",
    tanggalPengajuan: "2025-12-15T11:20:00+07:00",
    status: "pending",
  },
  {
    id: "s-5",
    nomorSurat: "RT002/RW004/SKTM/XII/2025/013",
    jenisKode: "SKTM",
    wargaId: WARGA_DATA[30]?.id || "w-031",
    perihal: "Beasiswa KIP Kuliah",
    keperluan: "Pengajuan Beasiswa KIP Kuliah untuk anak yang masuk PTN",
    tanggalPengajuan: "2025-12-08T16:00:00+07:00",
    status: "approved",
    approvedBy: "u-1",
    approvedAt: "2025-12-09T09:15:00+07:00",
  },
  {
    id: "s-6",
    nomorSurat: "",
    jenisKode: "SKU",
    wargaId: WARGA_DATA[40]?.id || "w-041",
    perihal: "Pengajuan KUR BRI",
    keperluan: "Pengajuan Kredit Usaha Rakyat BRI untuk modal jualan online",
    tanggalPengajuan: "2025-12-11T13:45:00+07:00",
    status: "rejected",
    approvedBy: "u-1",
    approvedAt: "2025-12-12T10:00:00+07:00",
    rejectionReason: "Data yang diajukan belum lengkap. Mohon melengkapi SIUP dan fotokopi KTP usaha terlebih dahulu.",
  },
  {
    id: "s-7",
    nomorSurat: "RT002/RW004/SKDT/XI/2025/012",
    jenisKode: "SKDT",
    wargaId: WARGA_DATA[50]?.id || "w-051",
    perihal: "Pindah Kependudukan",
    keperluan: "Pengantar pindah ke Bekasi untuk keperluan pekerjaan",
    tanggalPengajuan: "2025-11-28T09:00:00+07:00",
    status: "approved",
    approvedBy: "u-1",
    approvedAt: "2025-11-28T14:30:00+07:00",
  },
];

// ─── Jadwal Ronda ──────────────────────────────────────────────────────
function generateJadwal(): Jadwal[] {
  reset();
  const result: Jadwal[] = [];
  let idx = 1;

  // Laki-laki dewasa (18+)
  const lakiDewasa = WARGA_DATA.filter((w) => {
    const umur = 2025 - parseInt(w.tanggalLahir.split("-")[0]);
    return w.jenisKelamin === "L" && umur >= 18 && umur < 65;
  });

  // Generate 3 weeks of ronda (last week + this week + next week)
  const baseDate = new Date(2025, 11, 8); // Dec 8, 2025 (Mon)

  for (let week = 0; week < 3; week++) {
    for (let day = 0; day < 7; day++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + week * 7 + day);
      const dateStr = date.toISOString().split("T")[0];

      // Pick 2 petugas for each night
      const petugas = [...lakiDewasa].sort(() => rand() - 0.5).slice(0, 2);

      result.push({
        id: `j-${idx++}`,
        jenis: "ronda",
        judul: `Ronda Malam`,
        tanggal: dateStr,
        jamMulai: "20:00",
        jamSelesai: "04:00",
        lokasi: "Pos Ronda RT 002",
        petugasWargaIds: petugas.map((p) => p.id),
      });
    }
  }

  // Kerja bakti upcoming
  result.push({
    id: `j-${idx++}`,
    jenis: "kerja_bakti",
    judul: "Kerja Bakti Bersih Lingkungan",
    tanggal: "2025-12-21",
    jamMulai: "07:00",
    jamSelesai: "10:00",
    lokasi: "Seluruh Area RT 002",
    petugasWargaIds: [],
    catatan: "Bawa cangkul, sapu, karung. Konsumsi disediakan.",
  });

  // Rapat
  result.push({
    id: `j-${idx++}`,
    jenis: "rapat",
    judul: "Rapat Bulanan RT",
    tanggal: "2025-12-27",
    jamMulai: "19:30",
    jamSelesai: "22:00",
    lokasi: "Rumah Pak RT",
    petugasWargaIds: [],
    catatan: "Agenda: laporan kas, rencana tahun baru, usulan warga",
  });

  return result;
}

export const JADWAL_DATA = generateJadwal();

// ─── Helpers ────────────────────────────────────────────────────────────
export function wargaById(id: string): Warga | undefined {
  return WARGA_DATA.find((w) => w.id === id);
}

export function kkById(id: string): KartuKeluarga | undefined {
  return KK_DATA.find((k) => k.id === id);
}

export function wargaInKK(kkId: string): Warga[] {
  return WARGA_DATA.filter((w) => w.kkId === kkId);
}

export function hitungUmur(tglLahir: string): number {
  const [y, m, d] = tglLahir.split("-").map(Number);
  const now = new Date();
  let age = now.getFullYear() - y;
  if (now.getMonth() + 1 < m || (now.getMonth() + 1 === m && now.getDate() < d)) age--;
  return age;
}

export function totalPemasukanBulan(tahun: number, bulan: number): number {
  const prefix = `${tahun}-${bulan.toString().padStart(2, "0")}`;
  return TRANSAKSI_DATA
    .filter((t) => t.jenis === "pemasukan" && t.tanggal.startsWith(prefix))
    .reduce((sum, t) => sum + t.jumlah, 0);
}

export function totalPengeluaranBulan(tahun: number, bulan: number): number {
  const prefix = `${tahun}-${bulan.toString().padStart(2, "0")}`;
  return TRANSAKSI_DATA
    .filter((t) => t.jenis === "pengeluaran" && t.tanggal.startsWith(prefix))
    .reduce((sum, t) => sum + t.jumlah, 0);
}

export function saldoKas(): number {
  const pemasukan = TRANSAKSI_DATA.filter((t) => t.jenis === "pemasukan").reduce((s, t) => s + t.jumlah, 0);
  const pengeluaran = TRANSAKSI_DATA.filter((t) => t.jenis === "pengeluaran").reduce((s, t) => s + t.jumlah, 0);
  return 500000 + pemasukan - pengeluaran; // start balance 500K
}
