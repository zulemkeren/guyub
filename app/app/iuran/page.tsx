"use client";

import { useState, useMemo } from "react";
import { Search, Download, BellRing, Check, Clock, X as XIcon } from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import {
  KK_DATA,
  IURAN_STATUS_DATA,
  KATEGORI_KEUANGAN,
  wargaInKK,
} from "@/lib/mock/data";
import { formatRupiah, namaBulanShort, cn } from "@/lib/utils";

const YEAR = 2025;

export default function IuranPage() {
  const [search, setSearch] = useState("");
  const [selectedKategori, setSelectedKategori] = useState<string>(
    KATEGORI_KEUANGAN.find((k) => k.isIuran)?.id || ""
  );

  const kategoriIuran = KATEGORI_KEUANGAN.filter((k) => k.isIuran);
  const kategori = kategoriIuran.find((k) => k.id === selectedKategori);

  const filteredKK = useMemo(() => {
    if (!search) return KK_DATA;
    const q = search.toLowerCase();
    return KK_DATA.filter((kk) => {
      if (kk.alamat.toLowerCase().includes(q)) return true;
      const warga = wargaInKK(kk.id);
      return warga.some((w) => w.nama.toLowerCase().includes(q));
    });
  }, [search]);

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth() + 1;
    const statusesBulanIni = IURAN_STATUS_DATA.filter(
      (s) => s.kategoriId === selectedKategori && s.bulan === currentMonth && s.tahun === YEAR
    );
    const lunas = statusesBulanIni.filter((s) => s.jumlahTerbayar >= s.jumlahWajib).length;
    const sebagian = statusesBulanIni.filter(
      (s) => s.jumlahTerbayar > 0 && s.jumlahTerbayar < s.jumlahWajib
    ).length;
    const belum = statusesBulanIni.filter((s) => s.jumlahTerbayar === 0).length;
    const total = statusesBulanIni.reduce((sum, s) => sum + s.jumlahWajib, 0);
    const terbayar = statusesBulanIni.reduce((sum, s) => sum + s.jumlahTerbayar, 0);
    return { lunas, sebagian, belum, total, terbayar };
  }, [selectedKategori]);

  function getIuranStatus(kkId: string, bulan: number) {
    return IURAN_STATUS_DATA.find(
      (s) => s.kkId === kkId && s.kategoriId === selectedKategori && s.bulan === bulan && s.tahun === YEAR
    );
  }

  return (
    <>
      <AppTopbar
        title="Iuran Bulanan"
        subtitle={`Tracking pembayaran iuran ${YEAR} per KK`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          {/* Kategori tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {kategoriIuran.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setSelectedKategori(k.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  selectedKategori === k.id
                    ? "border-guyub-600 bg-guyub-600 text-white shadow-warm"
                    : "border-earth-200 bg-white text-earth-700 hover:bg-earth-50"
                )}
              >
                {k.nama}
                <span className="ml-2 text-[10px] opacity-80">
                  {formatRupiah(k.nominalBulanan || 0)}/bulan
                </span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-3 md:grid-cols-4">
            <StatBox
              icon={Check}
              label="Lunas bulan ini"
              value={stats.lunas}
              total={KK_DATA.length}
              color="guyub"
            />
            <StatBox
              icon={Clock}
              label="Sebagian"
              value={stats.sebagian}
              total={KK_DATA.length}
              color="amber"
            />
            <StatBox
              icon={XIcon}
              label="Belum bayar"
              value={stats.belum}
              total={KK_DATA.length}
              color="red"
            />
            <div className="rounded-2xl border border-earth-200 bg-white p-4">
              <p className="text-[10px] uppercase tracking-wider text-earth-500">
                Terkumpul bulan ini
              </p>
              <p className="mt-1 text-2xl font-semibold text-earth-900">
                {formatRupiah(stats.terbayar)}
              </p>
              <p className="mt-1 text-[11px] text-earth-500">
                dari target {formatRupiah(stats.total)}
              </p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-earth-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari kepala keluarga atau alamat..."
                className="w-full rounded-lg border border-earth-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-earth-400 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 transition-colors hover:bg-earth-50"
              >
                <BellRing className="h-3.5 w-3.5" />
                Reminder yang belum bayar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 transition-colors hover:bg-earth-50"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
            </div>
          </div>

          {/* Matrix */}
          <div className="overflow-x-auto rounded-2xl border border-earth-200 bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-earth-200 bg-earth-50">
                  <th className="sticky left-0 z-10 bg-earth-50 px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-earth-500">
                    Kepala Keluarga / Alamat
                  </th>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((bulan) => (
                    <th
                      key={bulan}
                      className="px-3 py-2.5 text-center text-[10px] font-semibold uppercase tracking-wider text-earth-500"
                    >
                      {namaBulanShort(bulan)}
                    </th>
                  ))}
                  <th className="px-3 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-earth-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {filteredKK.slice(0, 20).map((kk) => {
                  const warga = wargaInKK(kk.id);
                  const kepala = warga.find((w) => w.hubungan === "kepala_keluarga");
                  const totalTerbayar = Array.from({ length: 12 }, (_, i) => i + 1)
                    .map((bulan) => getIuranStatus(kk.id, bulan)?.jumlahTerbayar || 0)
                    .reduce((a, b) => a + b, 0);
                  return (
                    <tr key={kk.id} className="transition-colors hover:bg-earth-50">
                      <td className="sticky left-0 z-10 bg-white px-4 py-2 hover:bg-earth-50">
                        <p className="text-xs font-medium text-earth-900">
                          {kepala?.nama || "-"}
                        </p>
                        <p className="truncate text-[10px] text-earth-500 max-w-[200px]">
                          {kk.alamat}
                        </p>
                      </td>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((bulan) => {
                        const status = getIuranStatus(kk.id, bulan);
                        if (!status) {
                          return (
                            <td key={bulan} className="px-2 py-2 text-center">
                              <span className="text-earth-300">—</span>
                            </td>
                          );
                        }
                        const isLunas = status.jumlahTerbayar >= status.jumlahWajib;
                        const isSebagian = status.jumlahTerbayar > 0 && !isLunas;
                        const isBelum = status.jumlahTerbayar === 0;
                        const currentMonth = new Date().getMonth() + 1;
                        const isFuture = bulan > currentMonth;

                        return (
                          <td key={bulan} className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className={cn(
                                "flex h-7 w-7 mx-auto items-center justify-center rounded-md text-[11px] font-semibold transition-transform hover:scale-110",
                                isFuture && "bg-earth-50 text-earth-300",
                                !isFuture && isLunas && "bg-guyub-100 text-guyub-700",
                                !isFuture && isSebagian && "bg-amber-100 text-amber-700",
                                !isFuture && isBelum && "bg-red-50 text-red-600 border border-red-200"
                              )}
                              title={
                                isFuture
                                  ? "Belum waktunya"
                                  : isLunas
                                  ? "Lunas"
                                  : isSebagian
                                  ? `Bayar sebagian: ${formatRupiah(status.jumlahTerbayar)}`
                                  : "Belum bayar"
                              }
                            >
                              {isFuture ? "—" : isLunas ? "✓" : isSebagian ? "½" : "✗"}
                            </button>
                          </td>
                        );
                      })}
                      <td className="px-3 py-2 text-right text-xs font-semibold tabular-nums text-earth-900">
                        {formatRupiah(totalTerbayar)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredKK.length > 20 && (
              <div className="border-t border-earth-100 bg-earth-50 px-5 py-2 text-center text-xs text-earth-600">
                Menampilkan 20 dari {filteredKK.length} KK · <button className="font-medium text-guyub-600 hover:underline">Muat lebih banyak</button>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-earth-600">
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-guyub-100 text-guyub-700 text-[10px] font-semibold">
                ✓
              </span>
              Lunas
            </span>
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-100 text-amber-700 text-[10px] font-semibold">
                ½
              </span>
              Sebagian
            </span>
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-50 border border-red-200 text-red-600 text-[10px] font-semibold">
                ✗
              </span>
              Belum bayar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-earth-50 text-earth-300 text-[10px]">—</span>
              Belum waktunya
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function StatBox({
  icon: Icon,
  label,
  value,
  total,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  total: number;
  color: "guyub" | "amber" | "red";
}) {
  const pct = (value / total) * 100;
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-lg",
            color === "guyub" && "bg-guyub-100 text-guyub-700",
            color === "amber" && "bg-amber-100 text-amber-700",
            color === "red" && "bg-red-100 text-red-700"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <p className="text-[10px] uppercase tracking-wider text-earth-500">{label}</p>
      </div>
      <div className="mt-3 flex items-baseline gap-1.5">
        <p className="text-2xl font-semibold tabular-nums text-earth-900">{value}</p>
        <p className="text-xs text-earth-500">dari {total} KK</p>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-earth-100">
        <div
          className={cn(
            "h-full rounded-full",
            color === "guyub" && "bg-guyub-500",
            color === "amber" && "bg-amber-500",
            color === "red" && "bg-red-500"
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-[10px] text-earth-500 tabular-nums">{pct.toFixed(0)}%</p>
    </div>
  );
}
