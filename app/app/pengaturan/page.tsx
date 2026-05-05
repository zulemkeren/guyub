"use client";

import {
  Settings,
  User,
  Building2,
  Bell,
  Shield,
  Database,
  ExternalLink,
} from "lucide-react";
import { AppTopbar } from "@/components/app/topbar";
import { RT_INFO } from "@/lib/mock/data";
import { useSession, roleLabel } from "@/lib/session";
import { cn } from "@/lib/utils";

export default function PengaturanPage() {
  const { user } = useSession();

  return (
    <>
      <AppTopbar title="Pengaturan" subtitle="Kelola profil, RT, dan aplikasi" />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl p-6 space-y-6">
          {/* Profile */}
          <Section icon={User} title="Profil Anda">
            <div className="flex items-center gap-4 rounded-xl border border-earth-200 bg-white p-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-2xl font-semibold text-white">
                {user?.nama.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold text-earth-900">{user?.nama}</p>
                <p className="text-sm text-earth-500">{user?.jabatan}</p>
                <p className="mt-1 inline-block rounded-md bg-guyub-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-guyub-700">
                  {user && roleLabel(user.role)}
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 hover:bg-earth-50"
              >
                Edit profil
              </button>
            </div>
          </Section>

          {/* RT Info */}
          <Section icon={Building2} title="Informasi RT">
            <div className="rounded-xl border border-earth-200 bg-white p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Nomor RT" value={RT_INFO.noRT} />
                <Field label="Nomor RW" value={RT_INFO.noRW} />
                <Field label="Kelurahan" value={RT_INFO.kelurahan} />
                <Field label="Kecamatan" value={RT_INFO.kecamatan} />
                <Field label="Kota/Kabupaten" value={RT_INFO.kota} />
                <Field label="Provinsi" value={RT_INFO.provinsi} />
                <Field label="Berdiri sejak" value={RT_INFO.tahunBerdiri.toString()} />
                <Field label="Subdomain" value={`rt002-rw004.guyub.app`} mono />
              </div>
            </div>
          </Section>

          {/* Notifications */}
          <Section icon={Bell} title="Notifikasi WhatsApp">
            <div className="space-y-2">
              <Toggle
                label="Pengumuman baru"
                desc="Kirim notifikasi saat ada pengumuman baru"
                enabled
              />
              <Toggle
                label="Reminder iuran"
                desc="H-3 sebelum tanggal jatuh tempo"
                enabled
              />
              <Toggle
                label="Reminder jadwal ronda"
                desc="H-1 untuk warga yang terjadwal ronda"
                enabled
              />
              <Toggle
                label="Laporan bulanan Bendahara"
                desc="Auto-send laporan PDF setiap tanggal 1"
                enabled
              />
              <Toggle
                label="Surat pengantar status"
                desc="Warga dapat notifikasi saat surat diapprove/ditolak"
                enabled
              />
            </div>
          </Section>

          {/* Privacy & Security */}
          <Section icon={Shield} title="Keamanan & Privasi">
            <div className="space-y-3">
              <div className="rounded-xl border border-guyub-200 bg-guyub-50 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 shrink-0 text-guyub-700" />
                  <div className="text-xs leading-relaxed text-guyub-900">
                    <strong>UU PDP Compliant</strong> — Data warga disimpan di
                    server Indonesia (Azure Southeast Asia), dienkripsi end-to-end,
                    dan akses dibagi per-role. Audit log tersedia untuk seluruh
                    aktivitas sensitif.
                  </div>
                </div>
              </div>
              <LinkRow label="Kebijakan Privasi" />
              <LinkRow label="Syarat dan Ketentuan" />
              <LinkRow label="Data Processing Agreement" />
              <LinkRow label="Download data saya (compliance)" />
            </div>
          </Section>

          {/* Data management */}
          <Section icon={Database} title="Data & Backup">
            <div className="rounded-xl border border-earth-200 bg-white p-5">
              <div className="space-y-4">
                <Stat label="Data warga" value="189 record" />
                <Stat label="Kartu Keluarga" value="52 KK" />
                <Stat label="Transaksi keuangan" value="300+ entries" />
                <Stat label="Backup terakhir" value="Hari ini, 03.00 WIB" accent="guyub" />
                <div className="pt-2 border-t border-earth-100 flex gap-2">
                  <button className="flex-1 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 hover:bg-earth-50">
                    Export semua data (.xlsx)
                  </button>
                  <button className="flex-1 rounded-lg border border-earth-200 bg-white px-3 py-2 text-xs font-medium text-earth-700 hover:bg-earth-50">
                    Backup manual
                  </button>
                </div>
              </div>
            </div>
          </Section>

          {/* Tentang */}
          <Section icon={Settings} title="Tentang Aplikasi">
            <div className="rounded-xl border border-earth-200 bg-white p-5 text-xs text-earth-600">
              <p>
                <strong className="text-earth-900">Neighborhood Application Software</strong>
                <br />
                Marketed as <strong>Guyub</strong> · v0.1.0
              </p>
              <p className="mt-2">
                Dibuat di Purwokerto untuk 750.000+ RT di Indonesia. Hosted on
                Microsoft Azure. WhatsApp Business API via Azure Communication
                Services.
              </p>
              <p className="mt-2">
                © 2025 Guyub. Made in Purwokerto 💚
              </p>
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-earth-500" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-earth-700">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-earth-500">{label}</p>
      <p className={cn("mt-0.5 text-sm font-medium text-earth-900", mono && "font-mono")}>
        {value}
      </p>
    </div>
  );
}

function Toggle({
  label,
  desc,
  enabled,
}: {
  label: string;
  desc: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-earth-200 bg-white p-4">
      <div>
        <p className="text-sm font-medium text-earth-900">{label}</p>
        <p className="text-xs text-earth-500">{desc}</p>
      </div>
      <div
        className={cn(
          "relative h-6 w-10 cursor-pointer rounded-full transition-colors",
          enabled ? "bg-guyub-600" : "bg-earth-300"
        )}
      >
        <div
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            enabled ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </div>
    </div>
  );
}

function LinkRow({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-between rounded-xl border border-earth-200 bg-white p-4 text-left text-sm hover:bg-earth-50"
    >
      <span className="font-medium text-earth-700">{label}</span>
      <ExternalLink className="h-3.5 w-3.5 text-earth-400" />
    </button>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: "guyub" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-earth-600">{label}</span>
      <span
        className={cn(
          "text-xs font-semibold",
          accent === "guyub" ? "text-guyub-700" : "text-earth-900"
        )}
      >
        {value}
      </span>
    </div>
  );
}
