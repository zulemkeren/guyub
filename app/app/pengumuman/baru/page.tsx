"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Image as ImageIcon, Calendar, MessageCircle } from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { useToast } from "@/components/ui/toast";
import { RT_INFO } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

const KATEGORI = [
  { v: "umum", label: "Umum" },
  { v: "ronda", label: "Jadwal ronda" },
  { v: "kerja_bakti", label: "Kerja bakti" },
  { v: "iuran", label: "Iuran" },
  { v: "keamanan", label: "Keamanan" },
  { v: "kabar_duka", label: "Kabar duka" },
  { v: "kabar_suka", label: "Kabar suka" },
  { v: "darurat", label: "Darurat" },
];

export default function PengumumanBaruPage() {
  const router = useRouter();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    kategori: "umum",
    judul: "",
    isi: "",
    viaWhatsapp: true,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.show({
      variant: "success",
      title: "Pengumuman terkirim",
      description: `Broadcast WhatsApp ke 52 KK · ${form.judul}`,
    });
    setTimeout(() => router.push("/app/pengumuman"), 1000);
  }

  return (
    <>
      <AppTopbar
        title="Pengumuman Baru"
        subtitle="Broadcast info ke seluruh warga via WhatsApp"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl p-6">
          <Link
            href="/app/pengumuman"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-earth-600 hover:text-earth-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke pengumuman
          </Link>

          <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-earth-200 bg-white p-6 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-medium text-earth-700">
                    Kategori
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {KATEGORI.map((k) => (
                      <button
                        key={k.v}
                        type="button"
                        onClick={() => setForm({ ...form, kategori: k.v })}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                          form.kategori === k.v
                            ? "border-guyub-600 bg-guyub-600 text-white"
                            : "border-earth-200 bg-white text-earth-700 hover:bg-earth-50"
                        )}
                      >
                        {k.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Judul <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.judul}
                    onChange={(e) => setForm({ ...form, judul: e.target.value })}
                    placeholder="Contoh: Kerja Bakti Minggu Pagi"
                    className="input"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Isi pengumuman <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={form.isi}
                    onChange={(e) => setForm({ ...form, isi: e.target.value })}
                    placeholder="Tulis pengumuman lengkap..."
                    rows={8}
                    className="input"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-earth-500">
                    <span>{form.isi.length} karakter</span>
                    <span>~{Math.ceil(form.isi.length / 160)} SMS equivalent</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-earth-100 pt-4">
                  <button type="button" className="btn-secondary text-xs px-3 py-1.5">
                    <ImageIcon className="h-3 w-3" />
                    Lampirkan gambar
                  </button>
                  <button type="button" className="btn-secondary text-xs px-3 py-1.5">
                    <Calendar className="h-3 w-3" />
                    Jadwalkan
                  </button>
                </div>
              </div>
            </div>

            {/* Live preview */}
            <div className="space-y-4">
              <div className="sticky top-6">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-earth-500">
                  Preview WhatsApp
                </p>
                <div className="rounded-2xl bg-gradient-to-b from-emerald-50 to-emerald-100 p-3 shadow-warm">
                  <div className="rounded-lg bg-white p-3 shadow-sm">
                    <div className="flex items-center gap-2 border-b border-earth-100 pb-2 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-xs font-semibold text-white">
                        G
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Guyub RT 002</p>
                        <p className="text-[9px] text-earth-500">via WhatsApp Business</p>
                      </div>
                    </div>
                    <p className="text-[11px] font-semibold text-earth-900">
                      📢 {form.judul || "Judul pengumuman..."}
                    </p>
                    <p className="mt-2 whitespace-pre-line text-[10px] leading-relaxed text-earth-700">
                      {form.isi || "Isi pengumuman akan muncul di sini..."}
                    </p>
                    <p className="mt-3 text-[9px] text-earth-400">
                      ✓✓ Sent via Guyub
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-guyub-200 bg-guyub-50 p-3">
                  <div className="flex items-start gap-2">
                    <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-guyub-700" />
                    <div className="text-[11px] leading-relaxed text-guyub-900">
                      <strong>Akan dikirim ke:</strong>
                      <br />
                      52 KK · ~189 warga
                      <br />
                      via WhatsApp Business API
                      <br />
                      Estimasi: 1–2 menit
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    <Send className="h-3.5 w-3.5" />
                    {submitting ? "Mengirim..." : "Kirim ke 52 KK"}
                  </button>
                  <Link href="/app/pengumuman" className="btn-secondary w-full">
                    Batal
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
