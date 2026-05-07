"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, UserPlus } from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { useToast } from "@/components/ui/toast";
import { KK_DATA, kkById } from "@/lib/mock/data";

export default function TambahWargaPage() {
  const router = useRouter();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    nik: "",
    jenisKelamin: "L",
    tempatLahir: "",
    tanggalLahir: "",
    kkId: "",
    hubungan: "kepala_keluarga",
    statusPerkawinan: "belum_kawin",
    agama: "Islam",
    pendidikan: "SMA/SMK",
    pekerjaan: "",
    noHp: "",
    statusDomisili: "tetap",
  });

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.show({
      variant: "success",
      title: "Warga berhasil ditambahkan",
      description: `${form.nama} telah masuk ke database RT 002`,
    });
    setTimeout(() => router.push("/app/warga"), 800);
  }

  return (
    <>
      <AppTopbar title="Tambah Warga Baru" subtitle="Input data warga baru ke RT" />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl p-6">
          <Link
            href="/app/warga"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-earth-600 transition-colors hover:text-earth-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke daftar warga
          </Link>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Identitas */}
            <FormSection
              title="Identitas"
              description="Data dasar dari KTP / Akta"
              icon={UserPlus}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nama lengkap" required>
                  <input
                    type="text"
                    required
                    value={form.nama}
                    onChange={(e) => update("nama", e.target.value)}
                    placeholder="Sesuai KTP"
                    className="input"
                  />
                </Field>
                <Field label="NIK" required hint="16 digit dari KTP">
                  <input
                    type="text"
                    required
                    maxLength={16}
                    pattern="[0-9]{16}"
                    value={form.nik}
                    onChange={(e) => update("nik", e.target.value.replace(/\D/g, ""))}
                    placeholder="33020213XXXXXXXX"
                    className="input font-mono"
                  />
                </Field>
                <Field label="Jenis kelamin" required>
                  <div className="flex gap-2">
                    {[
                      { v: "L", label: "Laki-laki" },
                      { v: "P", label: "Perempuan" },
                    ].map((o) => (
                      <button
                        key={o.v}
                        type="button"
                        onClick={() => update("jenisKelamin", o.v)}
                        className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          form.jenisKelamin === o.v
                            ? "border-guyub-600 bg-guyub-50 text-guyub-800"
                            : "border-earth-200 bg-white text-earth-700"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Tempat, tanggal lahir" required>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={form.tempatLahir}
                      onChange={(e) => update("tempatLahir", e.target.value)}
                      placeholder="Purwokerto"
                      className="input flex-1"
                    />
                    <input
                      type="date"
                      required
                      value={form.tanggalLahir}
                      onChange={(e) => update("tanggalLahir", e.target.value)}
                      className="input flex-1"
                    />
                  </div>
                </Field>
                <Field label="Agama" required>
                  <select
                    value={form.agama}
                    onChange={(e) => update("agama", e.target.value)}
                    className="input"
                  >
                    {["Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu"].map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status perkawinan">
                  <select
                    value={form.statusPerkawinan}
                    onChange={(e) => update("statusPerkawinan", e.target.value)}
                    className="input"
                  >
                    <option value="belum_kawin">Belum kawin</option>
                    <option value="kawin">Kawin</option>
                    <option value="cerai_hidup">Cerai hidup</option>
                    <option value="cerai_mati">Cerai mati</option>
                  </select>
                </Field>
              </div>
            </FormSection>

            {/* Keluarga */}
            <FormSection
              title="Kartu Keluarga & Domisili"
              description="Hubungan dengan KK dan status domisili"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Kartu Keluarga" required hint="Pilih KK existing atau buat baru">
                  <select
                    required
                    value={form.kkId}
                    onChange={(e) => update("kkId", e.target.value)}
                    className="input"
                  >
                    <option value="">— Pilih KK —</option>
                    {KK_DATA.slice(0, 30).map((kk) => (
                      <option key={kk.id} value={kk.id}>
                        {kk.alamat} ({kk.noKK.slice(-4)})
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Hubungan keluarga" required>
                  <select
                    value={form.hubungan}
                    onChange={(e) => update("hubungan", e.target.value)}
                    className="input"
                  >
                    <option value="kepala_keluarga">Kepala keluarga</option>
                    <option value="istri">Istri</option>
                    <option value="anak">Anak</option>
                    <option value="menantu">Menantu</option>
                    <option value="cucu">Cucu</option>
                    <option value="orang_tua">Orang tua</option>
                    <option value="mertua">Mertua</option>
                    <option value="famili_lain">Famili lain</option>
                  </select>
                </Field>
                <Field label="Status domisili">
                  <select
                    value={form.statusDomisili}
                    onChange={(e) => update("statusDomisili", e.target.value)}
                    className="input"
                  >
                    <option value="tetap">Tetap</option>
                    <option value="kontrak">Kontrak</option>
                    <option value="kost">Kost</option>
                  </select>
                </Field>
              </div>
            </FormSection>

            {/* Pekerjaan & kontak */}
            <FormSection
              title="Pendidikan, Pekerjaan & Kontak"
              description="Informasi tambahan"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Pendidikan terakhir">
                  <select
                    value={form.pendidikan}
                    onChange={(e) => update("pendidikan", e.target.value)}
                    className="input"
                  >
                    {["Tidak Sekolah", "SD", "SMP", "SMA/SMK", "Diploma", "S1", "S2", "S3"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Pekerjaan">
                  <input
                    type="text"
                    value={form.pekerjaan}
                    onChange={(e) => update("pekerjaan", e.target.value)}
                    placeholder="Karyawan Swasta / Wiraswasta / dll"
                    className="input"
                  />
                </Field>
                <Field label="No. HP / WhatsApp" hint="Untuk notifikasi pengumuman & iuran">
                  <input
                    type="tel"
                    value={form.noHp}
                    onChange={(e) => update("noHp", e.target.value)}
                    placeholder="08123456789"
                    className="input"
                  />
                </Field>
              </div>
            </FormSection>

            {/* Privacy notice */}
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div className="text-xs text-amber-900">
                <strong>Komitmen UU PDP:</strong> Data warga yang dimasukkan
                hanya akan diakses oleh Pak RT, Bendahara, dan Sekretaris yang
                berwenang. Tersimpan terenkripsi di server Indonesia.
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2 border-t border-earth-200 pt-6">
              <Link
                href="/app/warga"
                className="rounded-lg border border-earth-200 bg-white px-4 py-2 text-sm font-medium text-earth-700 hover:bg-earth-50"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-4 py-2 text-sm font-medium text-white shadow-warm transition-colors hover:bg-guyub-700 disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                {submitting ? "Menyimpan..." : "Simpan warga"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

function FormSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-6">
      <div className="mb-5 flex items-start gap-3">
        {Icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-guyub-100 text-guyub-700">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <div>
          <h2 className="text-sm font-semibold text-earth-900">{title}</h2>
          <p className="text-xs text-earth-500">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-earth-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-[10px] text-earth-500">{hint}</p>}
    </div>
  );
}
