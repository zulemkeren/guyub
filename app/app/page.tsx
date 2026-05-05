"use client";

import Link from "next/link";
import {
  Users,
  Home,
  Wallet,
  Receipt,
  TrendingUp,
  TrendingDown,
  Megaphone,
  FileText,
  ShieldCheck,
  ArrowRight,
  Plus,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { useSession } from "@/lib/session";
import {
  RT_INFO,
  WARGA_DATA,
  KK_DATA,
  TRANSAKSI_DATA,
  PENGUMUMAN_DATA,
  SURAT_DATA,
  JADWAL_DATA,
  saldoKas,
  totalPemasukanBulan,
  totalPengeluaranBulan,
  wargaById,
} from "@/lib/mock/data";
import {
  formatRupiah,
  formatRupiahShort,
  formatTanggal,
  timeAgo,
  namaBulanShort,
  cn,
} from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useSession();

  const now = new Date();
  const saldo = saldoKas();
  const pemasukanBulanIni = totalPemasukanBulan(
    now.getFullYear(),
    now.getMonth() + 1
  );
  const pengeluaranBulanIni = totalPengeluaranBulan(
    now.getFullYear(),
    now.getMonth() + 1
  );

  // 6-month chart data
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - (5 - i));
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    return {
      label: namaBulanShort(month),
      pemasukan: totalPemasukanBulan(year, month),
      pengeluaran: totalPengeluaranBulan(year, month),
    };
  });
  const maxChart = Math.max(...chartData.flatMap((d) => [d.pemasukan, d.pengeluaran]));

  // Count unpaid iuran
  const suratPending = SURAT_DATA.filter((s) => s.status === "pending").length;
  const rondaMingguIni = JADWAL_DATA.filter((j) => {
    if (j.jenis !== "ronda") return false;
    const diff = (new Date(j.tanggal).getTime() - now.getTime()) / (1000 * 3600 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  const recentPengumuman = PENGUMUMAN_DATA.slice(0, 3);
  const recentTransaksi = TRANSAKSI_DATA.slice(0, 5);

  return (
    <>
      <AppTopbar
        title="Beranda"
        subtitle={`Selamat datang, ${user?.nama}`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          {/* Welcome + quick stats */}
          <section className="mb-6">
            <div className="rounded-3xl bg-gradient-to-br from-guyub-700 via-guyub-800 to-guyub-900 p-6 text-white md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-guyub-200">
                    {formatTanggal(now.toISOString())}
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold md:text-3xl">
                    Halo, {user?.nama.split(" ")[0] || "Warga"} 👋
                  </h2>
                  <p className="mt-1 text-sm text-guyub-200">
                    RT {RT_INFO.noRT} / RW {RT_INFO.noRW} · {RT_INFO.kelurahan}, {RT_INFO.kota}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/app/pengumuman/baru"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Pengumuman
                  </Link>
                  <Link
                    href="/app/keuangan"
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-amber-950 shadow-warm transition-transform hover:scale-[1.02]"
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    Catat kas
                  </Link>
                </div>
              </div>

              {/* Mini stats row */}
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-guyub-200">Warga</p>
                  <p className="text-2xl font-semibold">{WARGA_DATA.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-guyub-200">KK</p>
                  <p className="text-2xl font-semibold">{KK_DATA.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-guyub-200">Saldo Kas</p>
                  <p className="text-2xl font-semibold">{formatRupiahShort(saldo)}</p>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3">
                  <p className="text-[10px] uppercase tracking-wider text-guyub-200">Surat pending</p>
                  <p className="text-2xl font-semibold">{suratPending}</p>
                </div>
              </div>
            </div>
          </section>

          {/* KPI cards */}
          <section className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <KPICard
              icon={Users}
              label="Total warga"
              value={WARGA_DATA.length.toString()}
              sub={`tersebar di ${KK_DATA.length} KK`}
              trend="+2 bulan ini"
              trendUp
              href="/app/warga"
            />
            <KPICard
              icon={TrendingUp}
              label="Pemasukan bulan ini"
              value={formatRupiahShort(pemasukanBulanIni)}
              sub={namaBulanShort(now.getMonth() + 1) + " " + now.getFullYear()}
              trend="iuran 40 KK"
              trendUp
              href="/app/keuangan"
            />
            <KPICard
              icon={TrendingDown}
              label="Pengeluaran bulan ini"
              value={formatRupiahShort(pengeluaranBulanIni)}
              sub="operasional + kabar duka"
              trend="dalam rencana"
              href="/app/keuangan"
            />
            <KPICard
              icon={ShieldCheck}
              label="Ronda minggu ini"
              value={rondaMingguIni.toString()}
              sub="jadwal aktif"
              trend={`${rondaMingguIni * 2} petugas`}
              trendUp
              href="/app/ronda"
            />
          </section>

          {/* Chart + quick actions */}
          <section className="mb-6 grid gap-6 lg:grid-cols-3">
            {/* Chart */}
            <div className="lg:col-span-2 rounded-3xl border border-earth-200 bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-earth-900">Arus Kas 6 Bulan</h3>
                  <p className="text-xs text-earth-500">Pemasukan vs pengeluaran</p>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-guyub-500" />
                    <span className="text-earth-600">Pemasukan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-sm bg-amber-400" />
                    <span className="text-earth-600">Pengeluaran</span>
                  </div>
                </div>
              </div>
              <div className="flex h-56 items-end gap-3">
                {chartData.map((d) => (
                  <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full gap-1 h-full items-end">
                      <div
                        className="flex-1 rounded-t-md bg-gradient-to-t from-guyub-600 to-guyub-500 transition-all hover:from-guyub-700"
                        style={{ height: `${(d.pemasukan / maxChart) * 100}%` }}
                        title={formatRupiah(d.pemasukan)}
                      />
                      <div
                        className="flex-1 rounded-t-md bg-gradient-to-t from-amber-500 to-amber-400"
                        style={{ height: `${(d.pengeluaran / maxChart) * 100}%` }}
                        title={formatRupiah(d.pengeluaran)}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-earth-500">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl border border-earth-200 bg-white p-6">
              <h3 className="mb-4 font-semibold text-earth-900">Aksi cepat</h3>
              <div className="space-y-2">
                <QuickAction href="/app/warga/baru" icon={Users} label="Tambah Warga" />
                <QuickAction href="/app/keuangan/baru" icon={Wallet} label="Catat Transaksi" />
                <QuickAction href="/app/iuran" icon={Receipt} label="Cek Iuran Bulan Ini" />
                <QuickAction href="/app/pengumuman/baru" icon={Megaphone} label="Kirim Pengumuman" />
                <QuickAction href="/app/surat" icon={FileText} label="Approve Surat" badge={suratPending > 0 ? suratPending.toString() : undefined} />
              </div>
            </div>
          </section>

          {/* Recent activity */}
          <section className="grid gap-6 lg:grid-cols-2">
            {/* Recent pengumuman */}
            <div className="rounded-3xl border border-earth-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-earth-900">Pengumuman Terbaru</h3>
                <Link
                  href="/app/pengumuman"
                  className="text-xs font-medium text-guyub-600 hover:text-guyub-700"
                >
                  Semua →
                </Link>
              </div>
              <div className="space-y-3">
                {recentPengumuman.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-earth-100 p-4 transition-colors hover:border-earth-200 hover:bg-earth-50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-earth-900">{p.judul}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-earth-600">{p.isi}</p>
                        <div className="mt-2 flex items-center gap-3 text-[10px] text-earth-500">
                          <span>{timeAgo(p.tanggalKirim)}</span>
                          <span>·</span>
                          <span>✓✓ dibaca {p.dibaca}/{p.terkirim}</span>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize",
                          p.kategori === "darurat"
                            ? "bg-red-100 text-red-700"
                            : p.kategori === "kabar_duka"
                            ? "bg-zinc-100 text-zinc-700"
                            : "bg-guyub-100 text-guyub-700"
                        )}
                      >
                        {p.kategori.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent transaksi */}
            <div className="rounded-3xl border border-earth-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-earth-900">Transaksi Terbaru</h3>
                <Link
                  href="/app/keuangan"
                  className="text-xs font-medium text-guyub-600 hover:text-guyub-700"
                >
                  Semua →
                </Link>
              </div>
              <div className="space-y-2">
                {recentTransaksi.map((t) => {
                  const warga = t.wargaId ? wargaById(t.wargaId) : undefined;
                  return (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-earth-50"
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full",
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
                        <p className="truncate text-sm font-medium text-earth-900">
                          {t.keterangan}
                        </p>
                        <p className="text-[10px] text-earth-500">
                          {formatTanggal(t.tanggal, "short")} · {t.metode}
                        </p>
                      </div>
                      <p
                        className={cn(
                          "text-sm font-semibold tabular-nums",
                          t.jenis === "pemasukan" ? "text-guyub-700" : "text-amber-700"
                        )}
                      >
                        {t.jenis === "pemasukan" ? "+" : "-"}
                        {formatRupiahShort(t.jumlah)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  trend,
  trendUp,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  trend?: string;
  trendUp?: boolean;
  href?: string;
}) {
  const content = (
    <div className="group rounded-2xl border border-earth-200 bg-white p-5 transition-all hover:shadow-warm hover:-translate-y-0.5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-guyub-50 text-guyub-600 transition-colors group-hover:bg-guyub-600 group-hover:text-white">
          <Icon className="h-4 w-4" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] font-semibold tabular-nums",
              trendUp ? "text-guyub-600" : "text-earth-500"
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-wider text-earth-500">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-earth-900">{value}</p>
      <p className="mt-1 text-xs text-earth-500">{sub}</p>
    </div>
  );
  return href ? <Link href={href}>{content}</Link> : content;
}

function QuickAction({
  href,
  icon: Icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-earth-100 bg-white px-3 py-2.5 text-sm transition-colors hover:border-guyub-200 hover:bg-guyub-50"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-earth-50 text-earth-600">
        <Icon className="h-4 w-4" />
      </div>
      <span className="flex-1 font-medium text-earth-700">{label}</span>
      {badge && (
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
          {badge}
        </span>
      )}
      <ArrowRight className="h-3.5 w-3.5 text-earth-400" />
    </Link>
  );
}
