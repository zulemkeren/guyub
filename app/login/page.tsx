"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { SessionProvider, useSession, roleLabel } from "@/lib/session";
import { USERS, RT_INFO } from "@/lib/mock/data";

export default function LoginPage() {
  return (
    <SessionProvider>
      <LoginContent />
    </SessionProvider>
  );
}

function LoginContent() {
  const { user, login } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/app");
  }, [user, router]);

  return (
    <div className="flex min-h-screen">
      {/* Left: login form */}
      <div className="flex w-full flex-col justify-between bg-white p-6 md:w-1/2 md:p-12">
        <header className="flex items-center justify-between">
          <Logo size="lg" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-earth-500 transition-colors hover:text-earth-900"
          >
            <ArrowLeft className="h-3 w-3" />
            Kembali ke beranda
          </Link>
        </header>

        <main className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-earth-900">
              Masuk ke akun Anda
            </h1>
            <p className="mt-2 text-sm text-earth-600">
              RT {RT_INFO.noRT} / RW {RT_INFO.noRW}, {RT_INFO.kelurahan}
            </p>
          </div>

          {/* Demo mode notice */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div className="text-xs leading-relaxed text-amber-900">
              <strong>Mode Demo Publik.</strong> Pilih salah satu role di bawah
              untuk melihat aplikasi dari perspektif yang berbeda. Di versi
              production, ini adalah login email/password dengan Azure AD B2C.
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-earth-500">
              Masuk sebagai
            </p>
            {USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => login(u.id)}
                className="group flex w-full items-center gap-3 rounded-xl border border-earth-200 bg-white p-3 text-left transition-all hover:border-guyub-300 hover:bg-guyub-50 hover:shadow-warm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-sm font-semibold text-white">
                  {u.nama.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-earth-900">{u.nama}</p>
                  <p className="text-xs text-earth-500">{u.jabatan}</p>
                </div>
                <span className="rounded-full bg-earth-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-earth-600 group-hover:bg-guyub-100 group-hover:text-guyub-700">
                  {roleLabel(u.role)}
                </span>
                <ArrowRight className="h-4 w-4 text-earth-400 transition-all group-hover:translate-x-0.5 group-hover:text-guyub-600" />
              </button>
            ))}
          </div>
        </main>

        <footer className="mt-8 text-xs text-earth-500">
          © {new Date().getFullYear()} Guyub. Made in Purwokerto.
        </footer>
      </div>

      {/* Right: illustration / value prop */}
      <div className="relative hidden md:block md:w-1/2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-guyub-700 via-guyub-800 to-guyub-950" />
        <div className="absolute inset-0 batik-pattern opacity-10" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <div>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest">
              Neighborhood Application Software
            </span>
          </div>

          <div className="max-w-md">
            <blockquote className="text-2xl font-medium leading-relaxed">
              &ldquo;Dulu saya coret-coret buku tiap kali salah tulis. Sekarang
              input data warga dari HP sambil nonton TV. Laporan bulanan pun
              lebih cepat 10x.&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-semibold">
                W
              </div>
              <div>
                <p className="font-medium">Pak Wanto</p>
                <p className="text-sm text-guyub-200">
                  Ketua RT 002 / RW 004, Purwokerto
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
            <div>
              <p className="text-2xl font-semibold">189</p>
              <p className="text-[10px] uppercase tracking-widest text-guyub-200">
                Warga
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold">52</p>
              <p className="text-[10px] uppercase tracking-widest text-guyub-200">
                KK
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold">6+ thn</p>
              <p className="text-[10px] uppercase tracking-widest text-guyub-200">
                Pilot
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
