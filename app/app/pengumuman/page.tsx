"use client";

import { useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  MessageCircle,
  Calendar,
  Check,
  CheckCheck,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { PENGUMUMAN_DATA, USERS, RT_INFO } from "@/lib/mock/data";
import { formatTanggal, formatWaktu, timeAgo, cn } from "@/lib/utils";

const KATEGORI_COLORS: Record<string, string> = {
  umum: "bg-earth-100 text-earth-700",
  ronda: "bg-blue-100 text-blue-700",
  kerja_bakti: "bg-guyub-100 text-guyub-700",
  iuran: "bg-amber-100 text-amber-700",
  kabar_duka: "bg-zinc-200 text-zinc-700",
  kabar_suka: "bg-pink-100 text-pink-700",
  keamanan: "bg-orange-100 text-orange-700",
  darurat: "bg-red-100 text-red-700",
};

export default function PengumumanPage() {
  const [showCompose, setShowCompose] = useState(false);
  const [search, setSearch] = useState("");
  const [composeData, setComposeData] = useState({
    judul: "",
    isi: "",
    kategori: "umum",
  });

  const filtered = search
    ? PENGUMUMAN_DATA.filter(
        (p) =>
          p.judul.toLowerCase().includes(search.toLowerCase()) ||
          p.isi.toLowerCase().includes(search.toLowerCase())
      )
    : PENGUMUMAN_DATA;

  return (
    <>
      <AppTopbar
        title="Pengumuman"
        subtitle={`${PENGUMUMAN_DATA.length} pengumuman terkirim · broadcast via WhatsApp`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl p-6">
          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-earth-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari pengumuman..."
                className="w-full rounded-lg border border-earth-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-earth-400 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowCompose(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-4 py-2 text-sm font-medium text-white shadow-warm transition-colors hover:bg-guyub-700"
            >
              <Plus className="h-4 w-4" />
              Pengumuman baru
            </button>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filtered.map((p) => {
              const author = USERS.find((u) => u.id === p.dibuatOleh);
              const readPct = Math.round((p.dibaca / p.terkirim) * 100);
              return (
                <article
                  key={p.id}
                  className="rounded-2xl border border-earth-200 bg-white p-5 transition-all hover:shadow-warm"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-guyub-100 text-guyub-700">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-earth-900">{p.judul}</h3>
                          <p className="text-[11px] text-earth-500">
                            {author?.nama} · {timeAgo(p.tanggalKirim)} · {formatWaktu(p.tanggalKirim)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize",
                            KATEGORI_COLORS[p.kategori] || KATEGORI_COLORS.umum
                          )}
                        >
                          {p.kategori.replace("_", " ")}
                        </span>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-earth-700">
                        {p.isi}
                      </p>

                      {/* Delivery status */}
                      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-earth-100 pt-3 text-xs">
                        {p.viaWhatsapp && (
                          <span className="flex items-center gap-1.5 text-guyub-700">
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-earth-600">
                          <Check className="h-3.5 w-3.5" />
                          Terkirim ke {p.terkirim} KK
                        </span>
                        <span className="flex items-center gap-1.5 text-guyub-700">
                          <CheckCheck className="h-3.5 w-3.5" />
                          Dibaca {p.dibaca} ({readPct}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compose modal */}
      {showCompose && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-earth-950/50 backdrop-blur-sm"
          onClick={() => setShowCompose(false)}
        >
          <div className="flex min-h-full items-start justify-center p-4">
            <div
              className="w-full max-w-2xl rounded-3xl bg-white shadow-warm-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-earth-200 p-6">
                <h2 className="text-lg font-semibold text-earth-900">
                  Pengumuman baru
                </h2>
                <p className="text-xs text-earth-500">
                  Akan dikirim via WhatsApp ke seluruh 52 KK di RT {RT_INFO.noRT}
                </p>
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Kategori
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["umum", "ronda", "kerja_bakti", "iuran", "keamanan", "kabar_duka", "kabar_suka", "darurat"].map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setComposeData({ ...composeData, kategori: k })}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium capitalize transition-colors",
                          composeData.kategori === k
                            ? "border-guyub-600 bg-guyub-600 text-white"
                            : "border-earth-200 bg-white text-earth-700 hover:bg-earth-50"
                        )}
                      >
                        {k.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={composeData.judul}
                    onChange={(e) => setComposeData({ ...composeData, judul: e.target.value })}
                    placeholder="Contoh: Kerja Bakti Minggu Pagi"
                    className="w-full rounded-lg border border-earth-200 bg-white px-3 py-2 text-sm focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-earth-700">
                    Isi pengumuman
                  </label>
                  <textarea
                    value={composeData.isi}
                    onChange={(e) => setComposeData({ ...composeData, isi: e.target.value })}
                    placeholder="Tulis pengumuman..."
                    rows={6}
                    className="w-full rounded-lg border border-earth-200 bg-white px-3 py-2 text-sm focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
                  />
                  <p className="mt-1 text-[10px] text-earth-500">
                    {composeData.isi.length} karakter · {Math.ceil(composeData.isi.length / 160)} SMS equivalent
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-1.5 text-xs text-earth-700 hover:bg-earth-50"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    Lampirkan gambar
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-1.5 text-xs text-earth-700 hover:bg-earth-50"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    Jadwalkan
                  </button>
                </div>

                <div className="rounded-xl border border-guyub-200 bg-guyub-50 p-3 text-xs text-guyub-800">
                  <strong>💡 Akan dikirim ke:</strong> 52 KK (sekitar 189 warga) via
                  WhatsApp broadcast. Estimasi waktu delivery: 1-2 menit.
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-earth-200 p-4">
                <button
                  type="button"
                  onClick={() => setShowCompose(false)}
                  className="rounded-lg border border-earth-200 bg-white px-4 py-2 text-sm font-medium text-earth-700 hover:bg-earth-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-4 py-2 text-sm font-medium text-white shadow-warm hover:bg-guyub-700"
                >
                  <Send className="h-3.5 w-3.5" />
                  Kirim ke 52 KK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
