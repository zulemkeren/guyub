"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Check,
  X as XIcon,
  Download,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import {
  SURAT_DATA,
  JENIS_SURAT,
  wargaById,
  kkById,
  USERS,
  RT_INFO,
} from "@/lib/mock/data";
import { formatTanggal, formatWaktu, timeAgo, cn } from "@/lib/utils";
import type { SuratPengantar } from "@/lib/mock/types";

export default function SuratPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selected, setSelected] = useState<SuratPengantar | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return SURAT_DATA;
    return SURAT_DATA.filter((s) => s.status === filter);
  }, [filter]);

  const stats = useMemo(() => ({
    pending: SURAT_DATA.filter((s) => s.status === "pending").length,
    approved: SURAT_DATA.filter((s) => s.status === "approved").length,
    rejected: SURAT_DATA.filter((s) => s.status === "rejected").length,
  }), []);

  return (
    <>
      <AppTopbar
        title="Surat Pengantar"
        subtitle={`${SURAT_DATA.length} permohonan · ${stats.pending} butuh persetujuan`}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-6">
          {/* Status tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            <StatusTab
              label="Semua"
              active={filter === "all"}
              count={SURAT_DATA.length}
              onClick={() => setFilter("all")}
            />
            <StatusTab
              label="Menunggu persetujuan"
              active={filter === "pending"}
              count={stats.pending}
              onClick={() => setFilter("pending")}
              accent="amber"
            />
            <StatusTab
              label="Disetujui"
              active={filter === "approved"}
              count={stats.approved}
              onClick={() => setFilter("approved")}
              accent="guyub"
            />
            <StatusTab
              label="Ditolak"
              active={filter === "rejected"}
              count={stats.rejected}
              onClick={() => setFilter("rejected")}
              accent="red"
            />
          </div>

          {/* List */}
          <div className="space-y-3">
            {filtered.map((s) => {
              const warga = wargaById(s.wargaId);
              const kk = warga ? kkById(warga.kkId) : undefined;
              const jenis = JENIS_SURAT.find((j) => j.kode === s.jenisKode);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelected(s)}
                  className="group w-full rounded-2xl border border-earth-200 bg-white p-4 text-left transition-all hover:border-guyub-300 hover:shadow-warm"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                        s.status === "pending" && "bg-amber-100 text-amber-700",
                        s.status === "approved" && "bg-guyub-100 text-guyub-700",
                        s.status === "rejected" && "bg-red-100 text-red-700"
                      )}
                    >
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-earth-900">
                              {jenis?.nama}
                            </h3>
                            <StatusBadge status={s.status} />
                          </div>
                          <p className="mt-0.5 text-sm text-earth-700">{s.perihal}</p>
                          <p className="mt-0.5 text-xs text-earth-500">
                            {warga?.nama} · {kk?.alamat}
                          </p>
                        </div>
                        <div className="text-right">
                          {s.nomorSurat && (
                            <p className="font-mono text-[10px] text-earth-500">
                              {s.nomorSurat}
                            </p>
                          )}
                          <p className="text-[10px] text-earth-500">
                            {timeAgo(s.tanggalPengajuan)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 line-clamp-1 text-xs text-earth-600">
                        <strong>Keperluan:</strong> {s.keperluan}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selected && (
        <SuratDetailModal surat={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

function StatusTab({
  label,
  count,
  active,
  onClick,
  accent,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  accent?: "amber" | "guyub" | "red";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? accent === "amber"
            ? "border-amber-500 bg-amber-500 text-white"
            : accent === "red"
            ? "border-red-500 bg-red-500 text-white"
            : "border-guyub-600 bg-guyub-600 text-white"
          : "border-earth-200 bg-white text-earth-700 hover:bg-earth-50"
      )}
    >
      {label}
      <span
        className={cn(
          "ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
          active ? "bg-white/20" : "bg-earth-100"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function StatusBadge({ status }: { status: SuratPengantar["status"] }) {
  const config = {
    pending: { icon: Clock, label: "Menunggu", cls: "bg-amber-100 text-amber-700" },
    approved: { icon: CheckCircle2, label: "Disetujui", cls: "bg-guyub-100 text-guyub-700" },
    rejected: { icon: XCircle, label: "Ditolak", cls: "bg-red-100 text-red-700" },
  }[status];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
        config.cls
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function SuratDetailModal({
  surat,
  onClose,
}: {
  surat: SuratPengantar;
  onClose: () => void;
}) {
  const warga = wargaById(surat.wargaId);
  const kk = warga ? kkById(warga.kkId) : undefined;
  const jenis = JENIS_SURAT.find((j) => j.kode === surat.jenisKode);
  const approver = surat.approvedBy ? USERS.find((u) => u.id === surat.approvedBy) : undefined;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-earth-950/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-start justify-center p-4">
        <div
          className="w-full max-w-3xl rounded-3xl bg-white shadow-warm-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-earth-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-earth-900">{jenis?.nama}</h2>
                  <StatusBadge status={surat.status} />
                </div>
                <p className="mt-1 text-sm text-earth-600">{surat.perihal}</p>
                {surat.nomorSurat && (
                  <p className="mt-1 font-mono text-xs text-earth-500">{surat.nomorSurat}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-earth-500 hover:bg-earth-100"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* PDF preview simulation */}
          <div className="border-b border-earth-200 bg-earth-50 p-6">
            <div className="mx-auto max-w-md rounded-lg border border-earth-200 bg-white p-6 shadow-warm font-serif text-xs leading-relaxed text-earth-800">
              <div className="mb-4 text-center">
                <p className="font-semibold">PEMERINTAH KOTA {RT_INFO.kota.toUpperCase()}</p>
                <p>KECAMATAN {RT_INFO.kecamatan.toUpperCase()}</p>
                <p>KELURAHAN {RT_INFO.kelurahan.toUpperCase()}</p>
                <p className="mt-1 font-bold text-sm">
                  RUKUN TETANGGA {RT_INFO.noRT} / RUKUN WARGA {RT_INFO.noRW}
                </p>
                <p className="text-[10px] text-earth-500 mt-1">
                  Alamat: Jl. Raya {RT_INFO.kelurahan}, {RT_INFO.kota}
                </p>
                <div className="mt-2 border-t-2 border-b border-earth-900" />
              </div>
              <p className="text-center font-bold underline">SURAT PENGANTAR</p>
              {surat.nomorSurat && (
                <p className="text-center text-[11px]">Nomor: {surat.nomorSurat}</p>
              )}
              <p className="mt-4">Yang bertanda tangan di bawah ini, Ketua RT {RT_INFO.noRT} / RW {RT_INFO.noRW} {RT_INFO.kelurahan}, menerangkan bahwa:</p>
              <div className="mt-3 pl-4">
                <p>Nama: <strong>{warga?.nama}</strong></p>
                <p>NIK: {warga?.nik}</p>
                <p>Tempat/Tgl Lahir: {warga?.tempatLahir}, {warga && formatTanggal(warga.tanggalLahir, "long")}</p>
                <p>Alamat: {kk?.alamat}, RT {RT_INFO.noRT}/RW {RT_INFO.noRW}</p>
                <p>Pekerjaan: {warga?.pekerjaan}</p>
              </div>
              <p className="mt-3">Adalah benar warga RT {RT_INFO.noRT}/RW {RT_INFO.noRW} Kelurahan {RT_INFO.kelurahan}.</p>
              <p className="mt-3">Surat ini dibuat untuk keperluan: <strong>{surat.keperluan}</strong></p>
              <p className="mt-3">Demikian surat ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
              <div className="mt-6 text-right">
                <p>{RT_INFO.kota}, {formatTanggal(surat.approvedAt || surat.tanggalPengajuan)}</p>
                <p className="mt-8">Ketua RT {RT_INFO.noRT}</p>
                <p className="mt-1 font-semibold underline">Pak Wanto</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 p-6">
            <div className="text-[11px] text-earth-500">
              {approver ? (
                <>Disetujui oleh {approver.nama} · {surat.approvedAt && formatTanggal(surat.approvedAt, "long")}</>
              ) : (
                <>Diajukan {formatTanggal(surat.tanggalPengajuan, "long")}</>
              )}
            </div>
            {surat.status === "pending" ? (
              <div className="flex gap-2">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Tolak
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-3 py-2 text-xs font-medium text-white shadow-warm hover:bg-guyub-700"
                >
                  <Check className="h-3.5 w-3.5" />
                  Setujui & generate PDF
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 hover:bg-earth-50"
              >
                <Download className="h-3.5 w-3.5" />
                Download PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
