"use client";

import { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Plus,
  FileDown,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import {
  TRANSAKSI_DATA,
  KATEGORI_KEUANGAN,
  saldoKas,
  totalPemasukanBulan,
  totalPengeluaranBulan,
  kkById,
  wargaById,
} from "@/lib/mock/data";
import { formatRupiah, formatRupiahShort, formatTanggal, namaBulan, namaBulanShort, cn } from "@/lib/utils";

export default function KeuanganPage() {
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState<"all" | "pemasukan" | "pengeluaran">("all");

  const now = new Date();
  const saldo = saldoKas();
  const pemasukanBulan = totalPemasukanBulan(now.getFullYear(), now.getMonth() + 1);
  const pengeluaranBulan = totalPengeluaranBulan(now.getFullYear(), now.getMonth() + 1);
  const pemasukanBulanLalu = totalPemasukanBulan(
    now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear(),
    now.getMonth() === 0 ? 12 : now.getMonth()
  );
  const pemasukanChange = pemasukanBulanLalu > 0
    ? ((pemasukanBulan - pemasukanBulanLalu) / pemasukanBulanLalu) * 100
    : 0;

  // Category breakdown (last month)
  const categoryBreakdown = useMemo(() => {
    const prefix = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}`;
    const result = KATEGORI_KEUANGAN.map((kat) => {
      const total = TRANSAKSI_DATA
        .filter((t) => t.kategoriId === kat.id && t.tanggal.startsWith(prefix))
        .reduce((sum, t) => sum + t.jumlah, 0);
      return { ...kat, total };
    }).filter((k) => k.total > 0);
    result.sort((a, b) => b.total - a.total);
    return result;
  }, [now]);

  const filteredTransaksi = useMemo(() => {
    let list = TRANSAKSI_DATA;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.keterangan.toLowerCase().includes(q) ||
          KATEGORI_KEUANGAN.find((k) => k.id === t.kategoriId)?.nama.toLowerCase().includes(q)
      );
    }
    if (filterJenis !== "all") list = list.filter((t) => t.jenis === filterJenis);
    return list;
  }, [search, filterJenis]);

  return (
    <>
      <AppTopbar
        title="Kas RT"
        subtitle={`Saldo per ${formatTanggal(now.toISOString(), "short")}`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          {/* Saldo hero card */}
          <section className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-1 rounded-3xl bg-gradient-to-br from-guyub-700 via-guyub-800 to-guyub-900 p-6 text-white">
              <div className="flex items-center gap-2 text-guyub-200">
                <Wallet className="h-3.5 w-3.5" />
                <span className="text-[10px] uppercase tracking-widest">Saldo Kas RT</span>
              </div>
              <p className="mt-3 text-4xl font-semibold tabular-nums">{formatRupiah(saldo)}</p>
              <p className="mt-2 text-xs text-guyub-300">
                Per {formatTanggal(now.toISOString(), "long")}
              </p>
              <div className="mt-6 flex gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-full bg-white px-3 py-2 text-xs font-semibold text-guyub-900 transition-transform hover:scale-[1.02]"
                >
                  <Plus className="mr-1 inline h-3 w-3" /> Catat
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  <FileDown className="mr-1 inline h-3 w-3" /> Laporan
                </button>
              </div>
            </div>

            <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
              <KPI
                icon={TrendingUp}
                label={`Pemasukan ${namaBulan(now.getMonth() + 1)}`}
                value={formatRupiah(pemasukanBulan)}
                change={pemasukanChange}
                color="guyub"
              />
              <KPI
                icon={TrendingDown}
                label={`Pengeluaran ${namaBulan(now.getMonth() + 1)}`}
                value={formatRupiah(pengeluaranBulan)}
                change={0}
                color="amber"
              />
            </div>
          </section>

          {/* Category breakdown */}
          <section className="mb-6 rounded-3xl border border-earth-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-earth-900">Rincian Kategori Bulan Ini</h3>
                <p className="text-xs text-earth-500">
                  Pemasukan & pengeluaran {namaBulan(now.getMonth() + 1)} {now.getFullYear()}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {categoryBreakdown.map((kat) => {
                const max = Math.max(...categoryBreakdown.map((c) => c.total));
                const pct = (kat.total / max) * 100;
                return (
                  <div key={kat.id}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-block h-2 w-2 rounded-full",
                            kat.jenis === "pemasukan" ? "bg-guyub-500" : "bg-amber-500"
                          )}
                        />
                        <span className="text-xs font-medium text-earth-800">{kat.nama}</span>
                      </div>
                      <span className="text-xs font-semibold tabular-nums text-earth-900">
                        {formatRupiah(kat.total)}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-earth-100">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          kat.jenis === "pemasukan"
                            ? "bg-gradient-to-r from-guyub-500 to-guyub-400"
                            : "bg-gradient-to-r from-amber-500 to-amber-400"
                        )}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Transactions table */}
          <section className="rounded-3xl border border-earth-200 bg-white">
            <div className="flex flex-col gap-3 border-b border-earth-100 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-semibold text-earth-900">Riwayat Transaksi</h3>
                <p className="text-xs text-earth-500">{TRANSAKSI_DATA.length} transaksi total · 6 bulan terakhir</p>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-earth-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari transaksi..."
                    className="w-full rounded-lg border border-earth-200 bg-white py-1.5 pl-8 pr-3 text-xs placeholder:text-earth-400 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
                  />
                </div>
                <div className="relative">
                  <select
                    value={filterJenis}
                    onChange={(e) => setFilterJenis(e.target.value as "all" | "pemasukan" | "pengeluaran")}
                    className="appearance-none rounded-lg border border-earth-200 bg-white py-1.5 pl-3 pr-7 text-xs text-earth-700 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
                  >
                    <option value="all">Semua jenis</option>
                    <option value="pemasukan">Pemasukan</option>
                    <option value="pengeluaran">Pengeluaran</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-earth-400" />
                </div>
              </div>
            </div>

            <div className="divide-y divide-earth-100">
              {filteredTransaksi.slice(0, 40).map((t) => {
                const kat = KATEGORI_KEUANGAN.find((k) => k.id === t.kategoriId);
                const kk = t.kkId ? kkById(t.kkId) : undefined;
                return (
                  <div
                    key={t.id}
                    className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-earth-50"
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        t.jenis === "pemasukan"
                          ? "bg-guyub-100 text-guyub-700"
                          : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {t.jenis === "pemasukan" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-earth-900">
                          {t.keterangan}
                        </p>
                        <span className="shrink-0 rounded-md bg-earth-100 px-1.5 py-0.5 text-[10px] font-semibold text-earth-600">
                          {t.metode}
                        </span>
                      </div>
                      <p className="truncate text-[11px] text-earth-500">
                        {kat?.nama} · {formatTanggal(t.tanggal, "short")}
                        {kk && ` · ${kk.alamat}`}
                      </p>
                    </div>
                    <p
                      className={cn(
                        "text-sm font-semibold tabular-nums",
                        t.jenis === "pemasukan" ? "text-guyub-700" : "text-amber-700"
                      )}
                    >
                      {t.jenis === "pemasukan" ? "+" : "-"}
                      {formatRupiah(t.jumlah)}
                    </p>
                  </div>
                );
              })}
            </div>

            {filteredTransaksi.length > 40 && (
              <div className="border-t border-earth-100 bg-earth-50 px-5 py-2 text-center text-xs text-earth-600">
                Menampilkan 40 dari {filteredTransaksi.length} transaksi · <button className="font-medium text-guyub-600 hover:underline">Muat lebih banyak</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

function KPI({
  icon: Icon,
  label,
  value,
  change,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: number;
  color: "guyub" | "amber";
}) {
  return (
    <div className="rounded-2xl border border-earth-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg",
            color === "guyub" ? "bg-guyub-50 text-guyub-600" : "bg-amber-50 text-amber-600"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        {change !== 0 && (
          <span
            className={cn(
              "text-[10px] font-semibold tabular-nums",
              change > 0 ? "text-guyub-600" : "text-amber-600"
            )}
          >
            {change > 0 ? "↑" : "↓"} {Math.abs(change).toFixed(1)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-wider text-earth-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-earth-900">{value}</p>
    </div>
  );
}
