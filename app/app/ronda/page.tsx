"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Calendar,
  Users as UsersIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { JADWAL_DATA, wargaById } from "@/lib/mock/data";
import { formatTanggal, cn } from "@/lib/utils";

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const DAYS_FULL = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default function RondaPage() {
  const [selectedWeek, setSelectedWeek] = useState(0); // 0 = current week

  const rondaEvents = JADWAL_DATA.filter((j) => j.jenis === "ronda");
  const kerjaBakti = JADWAL_DATA.filter((j) => j.jenis === "kerja_bakti");
  const rapat = JADWAL_DATA.filter((j) => j.jenis === "rapat");

  // Calculate week start
  const weekStart = new Date(2025, 11, 8); // Dec 8, 2025 Monday
  const currentWeekStart = new Date(weekStart);
  currentWeekStart.setDate(weekStart.getDate() + selectedWeek * 7);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart);
    d.setDate(currentWeekStart.getDate() + i);
    return d;
  });

  const rondaByDate: Record<string, typeof rondaEvents> = {};
  for (const r of rondaEvents) {
    if (!rondaByDate[r.tanggal]) rondaByDate[r.tanggal] = [];
    rondaByDate[r.tanggal].push(r);
  }

  return (
    <>
      <AppTopbar
        title="Jadwal Ronda"
        subtitle="Roster petugas ronda mingguan · reminder WhatsApp H-1"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl p-6">
          {/* Week navigator */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-xl border border-earth-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setSelectedWeek(selectedWeek - 1)}
                className="rounded-lg p-1.5 text-earth-600 hover:bg-earth-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="min-w-[200px] text-center">
                <p className="text-sm font-semibold text-earth-900">
                  {formatTanggal(weekDays[0].toISOString(), "day-month")} –{" "}
                  {formatTanggal(weekDays[6].toISOString(), "short")}
                </p>
                <p className="text-[10px] text-earth-500">
                  {selectedWeek === 0 && "Minggu ini"}
                  {selectedWeek === -1 && "Minggu lalu"}
                  {selectedWeek === 1 && "Minggu depan"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedWeek(selectedWeek + 1)}
                className="rounded-lg p-1.5 text-earth-600 hover:bg-earth-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-lg bg-guyub-600 px-3 py-2 text-xs font-medium text-white shadow-warm hover:bg-guyub-700"
            >
              <Plus className="h-3.5 w-3.5" />
              Buat jadwal
            </button>
          </div>

          {/* Calendar grid */}
          <div className="grid gap-3 md:grid-cols-7 mb-8">
            {weekDays.map((d, i) => {
              const dateStr = d.toISOString().split("T")[0];
              const events = rondaByDate[dateStr] || [];
              const isToday = dateStr === new Date().toISOString().split("T")[0];
              return (
                <div
                  key={dateStr}
                  className={cn(
                    "rounded-2xl border bg-white overflow-hidden",
                    isToday ? "border-guyub-500 ring-2 ring-guyub-100" : "border-earth-200"
                  )}
                >
                  <div
                    className={cn(
                      "px-3 py-2 border-b",
                      isToday ? "bg-guyub-50 border-guyub-200" : "bg-earth-50 border-earth-100"
                    )}
                  >
                    <p
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-wider",
                        isToday ? "text-guyub-700" : "text-earth-500"
                      )}
                    >
                      {DAYS[d.getDay()]}
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-xl font-semibold",
                        isToday ? "text-guyub-700" : "text-earth-900"
                      )}
                    >
                      {d.getDate()}
                    </p>
                  </div>
                  <div className="p-3 min-h-[120px]">
                    {events.map((e) => (
                      <div
                        key={e.id}
                        className="rounded-lg border border-blue-200 bg-blue-50 p-2"
                      >
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-blue-700">
                          <ShieldCheck className="h-2.5 w-2.5" />
                          Ronda
                        </div>
                        <p className="mt-1 text-[10px] text-blue-900">
                          {e.jamMulai}–{e.jamSelesai}
                        </p>
                        <div className="mt-1.5 space-y-0.5">
                          {e.petugasWargaIds.slice(0, 2).map((pid) => {
                            const p = wargaById(pid);
                            return (
                              <p key={pid} className="truncate text-[10px] text-blue-800">
                                • {p?.nama.split(" ").slice(0, 2).join(" ")}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {events.length === 0 && (
                      <p className="text-[10px] text-earth-400 italic mt-4">
                        Belum ada jadwal
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming events */}
          <section>
            <h3 className="mb-3 text-sm font-semibold text-earth-900">
              Event Penting Mendatang
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {[...kerjaBakti, ...rapat].map((e) => (
                <div
                  key={e.id}
                  className={cn(
                    "rounded-2xl border p-5",
                    e.jenis === "kerja_bakti"
                      ? "border-guyub-200 bg-guyub-50"
                      : "border-amber-200 bg-amber-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                        e.jenis === "kerja_bakti"
                          ? "bg-guyub-600 text-white"
                          : "bg-amber-500 text-white"
                      )}
                    >
                      {e.jenis === "kerja_bakti" ? (
                        <UsersIcon className="h-4 w-4" />
                      ) : (
                        <Calendar className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-earth-900">{e.judul}</h4>
                      <div className="mt-2 space-y-1 text-xs text-earth-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {formatTanggal(e.tanggal)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {e.jamMulai} – {e.jamSelesai || "selesai"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {e.lokasi}
                        </div>
                      </div>
                      {e.catatan && (
                        <p className="mt-2 text-xs italic text-earth-700">
                          &ldquo;{e.catatan}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
