// Indonesian name pools — Javanese/Banyumasan flavor for Purwokerto setting

export const NAMA_DEPAN_L = [
  "Agus", "Bambang", "Budi", "Cahyo", "Darmawan", "Eko", "Fajar", "Gunawan",
  "Hadi", "Iwan", "Joko", "Kurniawan", "Lukman", "Mulyono", "Nugroho", "Priyanto",
  "Rahmat", "Sugeng", "Tri", "Untung", "Wahyu", "Yusuf", "Zainal",
  "Anggoro", "Bayu", "Candra", "Dwi", "Edi", "Feri", "Galih", "Heru",
  "Imam", "Junaedi", "Kusuma", "Legowo", "Marno", "Nur", "Panji", "Rudi",
  "Slamet", "Tarmuji", "Waluyo", "Yanto", "Harto", "Subroto", "Purnomo",
  "Suryo", "Wiratno", "Sudarto", "Sarjono",
];

export const NAMA_DEPAN_P = [
  "Ani", "Budi", "Citra", "Dewi", "Endang", "Fitri", "Gita", "Hani",
  "Ita", "Juminten", "Kartini", "Lestari", "Mulyani", "Ninik", "Oktaviana",
  "Partini", "Qori", "Rahayu", "Siti", "Tuti", "Umi", "Vivi", "Wati",
  "Yani", "Zakiah", "Ambarwati", "Bella", "Ciptaningsih", "Dyah", "Eni",
  "Farida", "Giyanti", "Handayani", "Ipung", "Juwariyah", "Kusrini",
  "Larasati", "Mutmainah", "Novi", "Ochtiyani", "Puji", "Rohmah", "Sri",
  "Tatik", "Utami", "Wiwik", "Yayuk", "Sugiyanti",
];

export const NAMA_BELAKANG = [
  "Santoso", "Wibowo", "Prabowo", "Saputro", "Nugroho", "Hartono", "Sulistyo",
  "Purwanto", "Susanto", "Setiawan", "Permadi", "Wijaya", "Pratama", "Kusuma",
  "Yudhistira", "Pramudita", "Sudirman", "Suharto", "Subandi", "Wardoyo",
  "Triyono", "Prasetyo", "Handoyo", "Raharjo", "Gunadi", "Suparno", "Sucipto",
  "Margono", "Riyadi", "Sutrisno", "Fadli", "Maharani", "Andriyani", "Rahmawati",
  "Wulandari", "Puspitasari", "Setyowati", "Handayani", "Kusumawati", "Hidayati",
  "Anggraini", "Purnamasari", "Lestari",
];

export const JALAN_PURWOKERTO = [
  "Jl. Gatot Subroto", "Jl. Kauman", "Jl. Merdeka", "Jl. Pahlawan",
  "Jl. Jenderal Sudirman", "Jl. Dr. Angka", "Jl. Komisaris Bambang Suprapto",
  "Jl. Profesor Soeharso", "Jl. Kober", "Jl. Bojongsari", "Jl. Mersi",
  "Jl. Sumampir", "Jl. Pasir Wetan", "Jl. Dukuhwaluh", "Jl. Karangwangkal",
  "Jl. Arcawinangun", "Jl. Teluk", "Jl. Kranji", "Jl. Purwokerto Lor",
  "Gang Melati", "Gang Mawar", "Gang Kenanga", "Gang Anggrek", "Gang Cempaka",
];

export const PEKERJAAN = [
  "Pegawai Negeri", "Karyawan Swasta", "Wiraswasta", "Petani", "Pedagang",
  "Guru", "Dosen", "Dokter", "Perawat", "Bidan", "Polisi", "TNI",
  "Pensiunan", "Ibu Rumah Tangga", "Pelajar/Mahasiswa", "Buruh", "Tukang",
  "Sopir", "Satpam", "Penjahit", "Tukang Cukur", "Montir", "Tukang Bangunan",
  "Jualan Online", "Freelance", "Kurir", "Belum Bekerja",
];

export const PENDIDIKAN = [
  "Tidak Sekolah", "SD", "SMP", "SMA/SMK", "Diploma", "S1", "S2", "S3",
];

export const GOL_DARAH = ["A", "B", "AB", "O", "A+", "B+", "AB+", "O+", undefined];

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pickN<T>(arr: readonly T[], n: number): T[] {
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}
