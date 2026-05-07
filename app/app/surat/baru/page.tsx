"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { useToast } from "@/components/ui/toast";
import { JENIS_SURAT, WARGA_DATA } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

export default function SuratBaruPage() {
  const router = useRouter();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    jenisKode: "",
    wargaId: "",
    perihal: "",
    keperluan: "",
  });

  const jenis = JENIS_SURAT.find((j) => j.kode === form.jenisKode);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.show({
      variant: "success",
      title: "Permohonan terkirim",
      description: "Pak RT akan menerima notifikasi WhatsApp",
    });
    setTimeout(() => router.push("/app/surat"), 800);
  }

  return (
    <>
      <AppTopbar
        title="Ajukan Surat Pengantar"
        subtitle="Permohonan surat pengantar dari RT"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl p-6">
          <Link
            href="/app/surat"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-earth-600 hover:text-earth-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke surat
          </Link>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Jenis surat picker */}
            <div className="rounded-2xl border border-earth-200 bg-white p-6">
              <h2 className="mb-1 text-sm font-semibold text-earth-900">
                Jenis surat pengantar
              </h2>
              <p className="mb-4 text-xs text-earth-500">
                Pilih jenis surat sesuai kebutuhan Anda
              </p>
              <div className="grid gap-2 md:grid-cols-2">
                {JENIS_SURAT.map((j) => (
                  <button
                    key={j.kode}
                    type="button"
                    onClick={() => setForm({ ...form, jenisKode: j.kode })}
                    className={cn(
                      "flex items-start gap-3 rounded-xl border p-3 text-left transition-all",
                      form.jenisKode === j.kode
                        ? "border-guyub-500 bg-guyub-50 shadow-warm"
                        : "border-earth-200 bg-white hover:border-earth-300"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                        form.jenisKode === j.kode
                          ? "bg-guyub-600 text-white"
                          : "bg-earth-100 text-earth-600"
                      )}
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-earth-900">
                        {j.kode} · {j.nama}
                      </p>
                      <p className="mt-0.5 text-[10px] text-earth-500 line-clamp-2">
                        {j.deskripsi}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {jenis && (
              <div className="rounded-2xl border border-earth-200 bg-white p-6 space-y-4">
                <h3 className="text-sm font-semibold text-earth-900">
                  Detail permohonan
                </h3>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Pemohon (warga) <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={form.wargaId}
                    onChange={(e) => setForm({ ...form, wargaId: e.target.value })}
                    className="input"
                  >
                    <option value="">— Pilih warga —</option>
                    {WARGA_DATA.slice(0, 50).map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Perihal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.perihal}
                    onChange={(e) => setForm({ ...form, perihal: e.target.value })}
                    placeholder="Contoh: Pengajuan KPR Bank Mandiri"
                    className="input"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Keperluan rinci <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.keperluan}
                    onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
                    placeholder="Jelaskan keperluan secara detail. Contoh: Pengajuan KPR Bank Mandiri untuk pembelian rumah pertama, sebagai pelengkap dokumen kelengkapan akad kredit."
                    className="input"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex justify-end gap-2">
              <Link href="/app/surat" className="btn-secondary">
                Batal
              </Link>
              <button
                type="submit"
                disabled={submitting || !form.jenisKode}
                className="btn-primary"
              >
                <Send className="h-3.5 w-3.5" />
                {submitting ? "Mengirim..." : "Ajukan ke Pak RT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
