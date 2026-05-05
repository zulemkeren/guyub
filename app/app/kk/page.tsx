"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Home, Users, ChevronRight } from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { KK_DATA, WARGA_DATA, wargaInKK, hitungUmur } from "@/lib/mock/data";
import { formatTanggal } from "@/lib/utils";

export default function KKPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return KK_DATA;
    const q = search.toLowerCase();
    return KK_DATA.filter((k) => {
      if (k.alamat.toLowerCase().includes(q)) return true;
      if (k.noKK.includes(q)) return true;
      const warga = wargaInKK(k.id);
      return warga.some((w) => w.nama.toLowerCase().includes(q));
    });
  }, [search]);

  return (
    <>
      <AppTopbar
        title="Kartu Keluarga"
        subtitle={`${KK_DATA.length} KK · ${WARGA_DATA.length} jiwa total`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-earth-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari no. KK, alamat, atau nama kepala keluarga..."
                className="w-full rounded-lg border border-earth-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-earth-400 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-3 py-2 text-xs font-medium text-white shadow-warm transition-colors hover:bg-guyub-700"
            >
              <Plus className="h-3.5 w-3.5" />
              Tambah KK
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((kk) => {
              const warga = wargaInKK(kk.id);
              const kepala = warga.find((w) => w.hubungan === "kepala_keluarga");
              const isExpanded = expanded === kk.id;
              return (
                <div
                  key={kk.id}
                  className="group rounded-2xl border border-earth-200 bg-white overflow-hidden transition-all hover:shadow-warm"
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : kk.id)}
                    className="block w-full p-5 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-guyub-100 text-guyub-700">
                        <Home className="h-4 w-4" />
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 text-earth-400 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-earth-900">
                      {kepala?.nama || "Kepala Keluarga belum ter-set"}
                    </h3>
                    <p className="text-xs text-earth-600">{kk.alamat}</p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-earth-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {warga.length} jiwa
                      </span>
                      <span>·</span>
                      <span className="font-mono">
                        {kk.noKK.slice(0, 6)}...{kk.noKK.slice(-4)}
                      </span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="border-t border-earth-100 bg-earth-50/50 p-4">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-earth-500">
                        Anggota
                      </p>
                      <ul className="space-y-1.5">
                        {warga.map((w) => (
                          <li
                            key={w.id}
                            className="flex items-center gap-2 rounded-lg bg-white p-2 text-xs"
                          >
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-guyub-400 to-guyub-600 text-[9px] font-semibold text-white">
                              {w.nama.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate font-medium text-earth-900">{w.nama}</p>
                              <p className="text-[10px] text-earth-500 capitalize">
                                {w.hubungan.replace("_", " ")} · {hitungUmur(w.tanggalLahir)} th
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-[10px] text-earth-500">
                        Terbit: {formatTanggal(kk.tanggalTerbit, "short")}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
