"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Plus,
  Upload,
  Users,
  X,
  ChevronDown,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import {
  WARGA_DATA,
  KK_DATA,
  hitungUmur,
  kkById,
  wargaInKK,
} from "@/lib/mock/data";
import { formatTanggal, cn } from "@/lib/utils";
import type { Warga } from "@/lib/mock/types";

export default function WargaPage() {
  const [search, setSearch] = useState("");
  const [filterJk, setFilterJk] = useState<"all" | "L" | "P">("all");
  const [filterAge, setFilterAge] = useState<"all" | "balita" | "anak" | "remaja" | "dewasa" | "lansia">("all");
  const [selectedWarga, setSelectedWarga] = useState<Warga | null>(null);

  const filtered = useMemo(() => {
    let list = WARGA_DATA;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (w) =>
          w.nama.toLowerCase().includes(q) ||
          w.nik.includes(q) ||
          w.pekerjaan.toLowerCase().includes(q)
      );
    }
    if (filterJk !== "all") list = list.filter((w) => w.jenisKelamin === filterJk);
    if (filterAge !== "all") {
      list = list.filter((w) => {
        const u = hitungUmur(w.tanggalLahir);
        switch (filterAge) {
          case "balita": return u < 5;
          case "anak": return u >= 5 && u < 13;
          case "remaja": return u >= 13 && u < 18;
          case "dewasa": return u >= 18 && u < 60;
          case "lansia": return u >= 60;
        }
      });
    }
    return list;
  }, [search, filterJk, filterAge]);

  const stats = useMemo(() => {
    const total = WARGA_DATA.length;
    const laki = WARGA_DATA.filter((w) => w.jenisKelamin === "L").length;
    const perempuan = total - laki;
    const lansia = WARGA_DATA.filter((w) => hitungUmur(w.tanggalLahir) >= 60).length;
    const anak = WARGA_DATA.filter((w) => hitungUmur(w.tanggalLahir) < 18).length;
    return { total, laki, perempuan, lansia, anak };
  }, []);

  return (
    <>
      <AppTopbar
        title="Data Warga"
        subtitle={`${WARGA_DATA.length} warga tersebar di ${KK_DATA.length} Kartu Keluarga`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl p-6">
          {/* Stats row */}
          <div className="mb-6 grid gap-3 grid-cols-2 md:grid-cols-5">
            <StatChip label="Total" value={stats.total} accent="guyub" />
            <StatChip label="Laki-laki" value={stats.laki} icon="♂" />
            <StatChip label="Perempuan" value={stats.perempuan} icon="♀" />
            <StatChip label="Anak (<18)" value={stats.anak} icon="👶" />
            <StatChip label="Lansia (≥60)" value={stats.lansia} icon="🌾" />
          </div>

          {/* Toolbar */}
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-earth-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari nama, NIK, atau pekerjaan..."
                  className="w-full rounded-lg border border-earth-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-earth-400 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
                />
              </div>
              <FilterDropdown
                value={filterJk}
                onChange={(v) => setFilterJk(v as "all" | "L" | "P")}
                options={[
                  { value: "all", label: "Semua gender" },
                  { value: "L", label: "Laki-laki" },
                  { value: "P", label: "Perempuan" },
                ]}
              />
              <FilterDropdown
                value={filterAge}
                onChange={(v) => setFilterAge(v as "all" | "balita" | "anak" | "remaja" | "dewasa" | "lansia")}
                options={[
                  { value: "all", label: "Semua umur" },
                  { value: "balita", label: "Balita (<5)" },
                  { value: "anak", label: "Anak (5-12)" },
                  { value: "remaja", label: "Remaja (13-17)" },
                  { value: "dewasa", label: "Dewasa (18-59)" },
                  { value: "lansia", label: "Lansia (≥60)" },
                ]}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 transition-colors hover:bg-earth-50"
              >
                <Upload className="h-3.5 w-3.5" />
                Import
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 transition-colors hover:bg-earth-50"
              >
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
              <Link
                href="/app/warga/baru"
                className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-3 py-2 text-xs font-medium text-white shadow-warm transition-colors hover:bg-guyub-700"
              >
                <Plus className="h-3.5 w-3.5" />
                Tambah warga
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-earth-200 bg-white">
            <div className="grid grid-cols-12 gap-4 border-b border-earth-100 bg-earth-50 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-earth-500">
              <div className="col-span-4">Nama</div>
              <div className="col-span-2">NIK</div>
              <div className="col-span-1">L/P</div>
              <div className="col-span-1">Umur</div>
              <div className="col-span-2">Hubungan</div>
              <div className="col-span-2">Pekerjaan</div>
            </div>
            <div className="divide-y divide-earth-100">
              {filtered.slice(0, 50).map((w) => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setSelectedWarga(w)}
                  className="grid w-full grid-cols-12 items-center gap-4 px-5 py-3 text-left text-sm transition-colors hover:bg-earth-50"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-guyub-400 to-guyub-600 text-[11px] font-semibold text-white">
                      {w.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-earth-900">{w.nama}</p>
                      <p className="truncate text-[11px] text-earth-500">{kkById(w.kkId)?.alamat}</p>
                    </div>
                  </div>
                  <div className="col-span-2 font-mono text-[11px] text-earth-600">
                    {w.nik.slice(0, 6)}...{w.nik.slice(-4)}
                  </div>
                  <div className="col-span-1">
                    <span
                      className={cn(
                        "inline-block rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                        w.jenisKelamin === "L"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-pink-100 text-pink-700"
                      )}
                    >
                      {w.jenisKelamin}
                    </span>
                  </div>
                  <div className="col-span-1 tabular-nums text-earth-700">
                    {hitungUmur(w.tanggalLahir)} th
                  </div>
                  <div className="col-span-2 text-xs text-earth-600 capitalize">
                    {w.hubungan.replace("_", " ")}
                  </div>
                  <div className="col-span-2 truncate text-xs text-earth-600">
                    {w.pekerjaan}
                  </div>
                </button>
              ))}
            </div>

            {filtered.length > 50 && (
              <div className="border-t border-earth-100 bg-earth-50 px-5 py-2 text-center text-xs text-earth-600">
                Menampilkan 50 dari {filtered.length} hasil · <button className="font-medium text-guyub-600 hover:underline">Muat lebih banyak</button>
              </div>
            )}
            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
                <Users className="h-8 w-8 text-earth-300" />
                <p className="text-sm font-medium text-earth-700">Tidak ada warga ditemukan</p>
                <p className="text-xs text-earth-500">Coba ubah filter atau kata kunci pencarian</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selectedWarga && (
        <WargaDetailModal warga={selectedWarga} onClose={() => setSelectedWarga(null)} />
      )}
    </>
  );
}

function StatChip({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number;
  icon?: string;
  accent?: "guyub";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        accent === "guyub"
          ? "border-guyub-200 bg-guyub-50"
          : "border-earth-200 bg-white"
      )}
    >
      <p className="text-[10px] uppercase tracking-wider text-earth-500 flex items-center gap-1.5">
        {icon && <span className="text-sm">{icon}</span>}
        {label}
      </p>
      <p className={cn(
        "mt-1 text-2xl font-semibold tabular-nums",
        accent === "guyub" ? "text-guyub-800" : "text-earth-900"
      )}>
        {value}
      </p>
    </div>
  );
}

function FilterDropdown({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-earth-200 bg-white py-2 pl-3 pr-8 text-sm text-earth-700 focus:border-guyub-400 focus:outline-none focus:ring-2 focus:ring-guyub-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-earth-400" />
    </div>
  );
}

function WargaDetailModal({ warga, onClose }: { warga: Warga; onClose: () => void }) {
  const kk = kkById(warga.kkId);
  const keluarga = wargaInKK(warga.kkId);
  const umur = hitungUmur(warga.tanggalLahir);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-earth-950/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
        <div
          className="relative w-full max-w-2xl rounded-3xl bg-white shadow-warm-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-earth-200 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-xl font-semibold text-white">
                {warga.nama.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-earth-900">{warga.nama}</h2>
                <p className="text-sm text-earth-500">
                  {umur} tahun · {warga.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"} · {warga.pekerjaan}
                </p>
                <p className="mt-1 text-xs text-earth-500 capitalize">
                  {warga.hubungan.replace("_", " ")} · {warga.statusPerkawinan.replace("_", " ")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-earth-500 transition-colors hover:bg-earth-100 hover:text-earth-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 md:grid-cols-2">
            <Section title="Identitas">
              <Field label="NIK" value={warga.nik} mono />
              <Field label="Tempat lahir" value={warga.tempatLahir} />
              <Field label="Tanggal lahir" value={formatTanggal(warga.tanggalLahir, "short")} />
              <Field label="Agama" value={warga.agama} />
              <Field label="Gol. darah" value={warga.golDarah || "-"} />
            </Section>
            <Section title="Kontak & Keluarga">
              <Field label="No. HP" value={warga.noHp || "-"} />
              <Field label="Email" value={warga.email || "-"} />
              <Field label="No. KK" value={kk?.noKK || "-"} mono />
              <Field label="Alamat" value={kk?.alamat || "-"} />
              <Field label="Pendidikan" value={warga.pendidikan} />
            </Section>
          </div>

          {/* Anggota keluarga */}
          <div className="border-t border-earth-200 p-6">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-earth-500">
              Anggota Keluarga ({keluarga.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {keluarga.map((k) => (
                <div
                  key={k.id}
                  className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs",
                    k.id === warga.id
                      ? "border-guyub-300 bg-guyub-50 text-guyub-800 font-semibold"
                      : "border-earth-200 bg-earth-50 text-earth-700"
                  )}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-guyub-400 to-guyub-600 text-[9px] font-semibold text-white">
                    {k.nama.charAt(0)}
                  </div>
                  <span>{k.nama}</span>
                  <span className="text-earth-400 capitalize">({k.hubungan.replace("_", " ")})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-earth-200 p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-earth-200 bg-white px-4 py-2 text-sm font-medium text-earth-700 transition-colors hover:bg-earth-50"
            >
              Tutup
            </button>
            <button
              type="button"
              className="rounded-lg bg-guyub-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-guyub-700"
            >
              Edit data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-earth-500">
        {title}
      </h3>
      <dl className="space-y-2">{children}</dl>
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-xs text-earth-500">{label}</dt>
      <dd className={cn("text-xs text-earth-900 text-right", mono && "font-mono")}>{value}</dd>
    </div>
  );
}
