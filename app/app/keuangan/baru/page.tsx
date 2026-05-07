"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, TrendingUp, TrendingDown, Wallet, Receipt } from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { useToast } from "@/components/ui/toast";
import { KATEGORI_KEUANGAN, KK_DATA } from "@/lib/mock/data";
import { formatRupiah, cn } from "@/lib/utils";

export default function TambahTransaksiPage() {
  const router = useRouter();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    jenis: "pemasukan" as "pemasukan" | "pengeluaran",
    kategoriId: "",
    jumlah: "",
    tanggal: new Date().toISOString().split("T")[0],
    keterangan: "",
    metode: "tunai" as "tunai" | "transfer" | "qris",
    kkId: "",
  });

  const kategoriFiltered = KATEGORI_KEUANGAN.filter((k) => k.jenis === form.jenis);
  const kategori = KATEGORI_KEUANGAN.find((k) => k.id === form.kategoriId);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // If jenis changes, reset kategori
      if (key === "jenis") next.kategoriId = "";
      // If kategori is iuran with default amount, prefill jumlah
      if (key === "kategoriId") {
        const kat = KATEGORI_KEUANGAN.find((k) => k.id === value);
        if (kat?.isIuran && kat.nominalBulanan) {
          next.jumlah = kat.nominalBulanan.toString();
        }
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.show({
      variant: "success",
      title: form.jenis === "pemasukan" ? "Pemasukan dicatat" : "Pengeluaran dicatat",
      description: `${formatRupiah(parseInt(form.jumlah) || 0)} - ${form.keterangan}`,
    });
    setTimeout(() => router.push("/app/keuangan"), 800);
  }

  return (
    <>
      <AppTopbar
        title="Catat Transaksi"
        subtitle="Input pemasukan atau pengeluaran kas RT"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl p-6">
          <Link
            href="/app/keuangan"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-earth-600 hover:text-earth-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke kas
          </Link>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Jenis selector — big toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => update("jenis", "pemasukan")}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                  form.jenis === "pemasukan"
                    ? "border-guyub-500 bg-guyub-50 shadow-warm"
                    : "border-earth-200 bg-white hover:border-earth-300"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-guyub-100 text-guyub-700">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-earth-900">Pemasukan</p>
                  <p className="text-[11px] text-earth-500">Iuran, sumbangan, dll</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => update("jenis", "pengeluaran")}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                  form.jenis === "pengeluaran"
                    ? "border-amber-500 bg-amber-50 shadow-warm"
                    : "border-earth-200 bg-white hover:border-earth-300"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <TrendingDown className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-earth-900">Pengeluaran</p>
                  <p className="text-[11px] text-earth-500">Operasional, kas bersama</p>
                </div>
              </button>
            </div>

            {/* Form fields */}
            <div className="rounded-2xl border border-earth-200 bg-white p-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-earth-700">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.kategoriId}
                  onChange={(e) => update("kategoriId", e.target.value)}
                  className="input"
                >
                  <option value="">— Pilih kategori —</option>
                  {kategoriFiltered.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.nama} {k.isIuran && `(${formatRupiah(k.nominalBulanan || 0)}/bulan)`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Jumlah (Rupiah) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-earth-500">
                      Rp
                    </span>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.jumlah}
                      onChange={(e) => update("jumlah", e.target.value)}
                      placeholder="0"
                      className="input pl-9"
                    />
                  </div>
                  {form.jumlah && (
                    <p className="mt-1 text-[10px] text-earth-500">
                      {formatRupiah(parseInt(form.jumlah) || 0)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.tanggal}
                    onChange={(e) => update("tanggal", e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-earth-700">
                  Keterangan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.keterangan}
                  onChange={(e) => update("keterangan", e.target.value)}
                  placeholder="Contoh: Iuran kas Pak Budi RT 002 bulan Desember"
                  className="input"
                />
              </div>

              {kategori?.isIuran && (
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Kartu Keluarga (jika iuran)
                  </label>
                  <select
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
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-earth-700">
                  Metode pembayaran
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "tunai", label: "Tunai" },
                    { v: "transfer", label: "Transfer" },
                    { v: "qris", label: "QRIS" },
                  ].map((m) => (
                    <button
                      key={m.v}
                      type="button"
                      onClick={() => update("metode", m.v as typeof form.metode)}
                      className={cn(
                        "rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                        form.metode === m.v
                          ? "border-guyub-600 bg-guyub-50 text-guyub-800"
                          : "border-earth-200 bg-white text-earth-700"
                      )}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2">
              <Link href="/app/keuangan" className="btn-secondary">
                Batal
              </Link>
              <button type="submit" disabled={submitting} className="btn-primary">
                <Save className="h-3.5 w-3.5" />
                {submitting ? "Menyimpan..." : "Simpan transaksi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
