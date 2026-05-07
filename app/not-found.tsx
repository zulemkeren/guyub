import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-earth-50">
      <nav className="border-b border-earth-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5">
          <Link href="/">
            <Logo />
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="relative max-w-md text-center">
          <div className="absolute inset-0 -z-10 batik-pattern opacity-50" />

          {/* Big 404 */}
          <p className="text-[120px] font-bold tracking-tighter leading-none gradient-text bg-gradient-to-br from-guyub-600 to-guyub-900 bg-clip-text text-transparent">
            404
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-earth-900">
            Halaman tidak ditemukan
          </h1>
          <p className="mt-3 text-sm text-earth-600">
            Sepertinya halaman yang Anda cari sudah pindah, dihapus, atau
            mungkin tidak pernah ada. Mari kembali ke beranda.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              <Home className="h-3.5 w-3.5" />
              Kembali ke beranda
            </Link>
            <Link href="/app" className="btn-secondary">
              <ArrowLeft className="h-3.5 w-3.5" />
              Buka aplikasi
            </Link>
          </div>

          <div className="mt-12 rounded-2xl border border-earth-200 bg-white p-4 text-left">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-earth-500 mb-2">
              Mungkin Anda mencari
            </p>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="/app/warga"
                  className="flex items-center gap-2 rounded-lg p-1.5 text-earth-700 hover:bg-earth-50"
                >
                  <Search className="h-3 w-3 text-earth-400" />
                  Data Warga
                </Link>
              </li>
              <li>
                <Link
                  href="/app/keuangan"
                  className="flex items-center gap-2 rounded-lg p-1.5 text-earth-700 hover:bg-earth-50"
                >
                  <Search className="h-3 w-3 text-earth-400" />
                  Kas RT
                </Link>
              </li>
              <li>
                <Link
                  href="/app/pengumuman"
                  className="flex items-center gap-2 rounded-lg p-1.5 text-earth-700 hover:bg-earth-50"
                >
                  <Search className="h-3 w-3 text-earth-400" />
                  Pengumuman
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-earth-200 py-6 text-center text-xs text-earth-500">
        © {new Date().getFullYear()} Guyub · Made in Purwokerto
      </footer>
    </div>
  );
}
