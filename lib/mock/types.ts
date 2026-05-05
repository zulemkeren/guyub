// Core types for the Guyub/NAS demo application
// All data in-memory, initialized from mock generators

export type JenisKelamin = "L" | "P";

export type HubunganKeluarga =
  | "kepala_keluarga"
  | "istri"
  | "anak"
  | "menantu"
  | "cucu"
  | "orang_tua"
  | "mertua"
  | "famili_lain"
  | "lainnya";

export type StatusPerkawinan = "belum_kawin" | "kawin" | "cerai_hidup" | "cerai_mati";

export type StatusDomisili = "tetap" | "kontrak" | "kost" | "pindah";

export type Agama = "Islam" | "Kristen" | "Katolik" | "Hindu" | "Buddha" | "Konghucu";

export interface Warga {
  id: string;
  nama: string;
  nik: string;
  jenisKelamin: JenisKelamin;
  tempatLahir: string;
  tanggalLahir: string; // ISO date
  kkId: string;
  hubungan: HubunganKeluarga;
  statusPerkawinan: StatusPerkawinan;
  agama: Agama;
  pendidikan: string;
  pekerjaan: string;
  golDarah?: string;
  noHp?: string;
  email?: string;
  statusDomisili: StatusDomisili;
  tanggalMasuk: string;
  foto?: string;
  catatan?: string;
}

export interface KartuKeluarga {
  id: string;
  noKK: string;
  alamat: string;
  rtRw: string;
  kelurahan: string;
  kepalaKeluargaId?: string; // warga id
  tanggalTerbit: string;
}

export type JenisTransaksi = "pemasukan" | "pengeluaran";
export type MetodeBayar = "tunai" | "transfer" | "qris" | "lainnya";

export interface KategoriKeuangan {
  id: string;
  nama: string;
  jenis: JenisTransaksi;
  isIuran: boolean;
  nominalBulanan?: number;
}

export interface Transaksi {
  id: string;
  tanggal: string;
  jenis: JenisTransaksi;
  kategoriId: string;
  jumlah: number;
  keterangan: string;
  metode: MetodeBayar;
  kkId?: string;
  wargaId?: string;
  dicatatOleh: string;
}

export interface IuranStatus {
  kkId: string;
  kategoriId: string;
  bulan: number; // 1-12
  tahun: number;
  jumlahWajib: number;
  jumlahTerbayar: number;
  tanggalBayar?: string;
}

export type KategoriPengumuman =
  | "umum"
  | "ronda"
  | "kerja_bakti"
  | "iuran"
  | "kabar_duka"
  | "kabar_suka"
  | "keamanan"
  | "darurat";

export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  kategori: KategoriPengumuman;
  tanggalKirim: string;
  dibuatOleh: string;
  viaWhatsapp: boolean;
  terkirim: number;
  dibaca: number;
}

export type StatusSurat = "pending" | "approved" | "rejected";

export interface JenisSurat {
  kode: string;
  nama: string;
  deskripsi: string;
}

export interface SuratPengantar {
  id: string;
  nomorSurat: string;
  jenisKode: string;
  wargaId: string;
  perihal: string;
  keperluan: string;
  tanggalPengajuan: string;
  status: StatusSurat;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

export type JenisJadwal = "ronda" | "kerja_bakti" | "rapat" | "lainnya";

export interface Jadwal {
  id: string;
  jenis: JenisJadwal;
  judul: string;
  tanggal: string;
  jamMulai: string;
  jamSelesai?: string;
  lokasi: string;
  petugasWargaIds: string[];
  catatan?: string;
}

export type UserRole = "admin_rt" | "bendahara" | "sekretaris" | "warga";

export interface AppUser {
  id: string;
  nama: string;
  role: UserRole;
  avatar?: string;
  jabatan: string;
}

export interface RTInfo {
  noRT: string;
  noRW: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  provinsi: string;
  tahunBerdiri: number;
  jumlahKK: number;
  jumlahWarga: number;
  saldoKas: number;
}
