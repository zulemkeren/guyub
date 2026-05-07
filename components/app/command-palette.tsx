"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  LayoutDashboard,
  Users,
  Home,
  Wallet,
  Receipt,
  Megaphone,
  FileText,
  ShieldCheck,
  Settings,
  Plus,
  ArrowRight,
} from "lucide-react";
import { WARGA_DATA, KK_DATA, kkById } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

interface Command {
  id: string;
  type: "page" | "action" | "warga" | "kk";
  label: string;
  description?: string;
  icon: React.ElementType;
  href: string;
  shortcut?: string;
  group: string;
}

const PAGE_COMMANDS: Command[] = [
  { id: "p-dashboard", type: "page", label: "Beranda", icon: LayoutDashboard, href: "/app", group: "Halaman" },
  { id: "p-warga", type: "page", label: "Data Warga", icon: Users, href: "/app/warga", group: "Halaman" },
  { id: "p-kk", type: "page", label: "Kartu Keluarga", icon: Home, href: "/app/kk", group: "Halaman" },
  { id: "p-kas", type: "page", label: "Kas RT", icon: Wallet, href: "/app/keuangan", group: "Halaman" },
  { id: "p-iuran", type: "page", label: "Iuran Bulanan", icon: Receipt, href: "/app/iuran", group: "Halaman" },
  { id: "p-pengumuman", type: "page", label: "Pengumuman", icon: Megaphone, href: "/app/pengumuman", group: "Halaman" },
  { id: "p-surat", type: "page", label: "Surat Pengantar", icon: FileText, href: "/app/surat", group: "Halaman" },
  { id: "p-ronda", type: "page", label: "Jadwal Ronda", icon: ShieldCheck, href: "/app/ronda", group: "Halaman" },
  { id: "p-pengaturan", type: "page", label: "Pengaturan", icon: Settings, href: "/app/pengaturan", group: "Halaman" },
];

const ACTION_COMMANDS: Command[] = [
  { id: "a-warga-baru", type: "action", label: "Tambah warga baru", icon: Plus, href: "/app/warga/baru", group: "Aksi cepat", shortcut: "N W" },
  { id: "a-trx-baru", type: "action", label: "Catat transaksi", icon: Plus, href: "/app/keuangan/baru", group: "Aksi cepat", shortcut: "N T" },
  { id: "a-pengumuman-baru", type: "action", label: "Pengumuman baru", icon: Plus, href: "/app/pengumuman/baru", group: "Aksi cepat", shortcut: "N P" },
  { id: "a-surat-baru", type: "action", label: "Ajukan surat pengantar", icon: Plus, href: "/app/surat/baru", group: "Aksi cepat", shortcut: "N S" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Build searchable list
  const allCommands = useMemo<Command[]>(() => {
    const wargaCommands: Command[] = WARGA_DATA.slice(0, 50).map((w) => {
      const kk = kkById(w.kkId);
      return {
        id: `w-${w.id}`,
        type: "warga",
        label: w.nama,
        description: kk?.alamat,
        icon: Users,
        href: `/app/warga`,
        group: "Warga",
      };
    });

    return [...PAGE_COMMANDS, ...ACTION_COMMANDS, ...wargaCommands];
  }, []);

  const filtered = useMemo(() => {
    if (!query) {
      // Default: pages + actions only
      return [...PAGE_COMMANDS, ...ACTION_COMMANDS];
    }
    const q = query.toLowerCase();
    return allCommands
      .filter((c) =>
        c.label.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [query, allCommands]);

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>();
    for (const c of filtered) {
      if (!map.has(c.group)) map.set(c.group, []);
      map.get(c.group)!.push(c);
    }
    return Array.from(map.entries());
  }, [filtered]);

  function execute(cmd: Command) {
    setOpen(false);
    setQuery("");
    router.push(cmd.href);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-earth-950/40 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div className="flex min-h-full items-start justify-center px-4 py-16">
        <div
          className="w-full max-w-xl rounded-2xl border border-earth-200 bg-white shadow-warm-lg animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-earth-100 px-4">
            <Search className="h-4 w-4 text-earth-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              placeholder="Cari halaman, warga, atau aksi..."
              className="flex-1 border-0 bg-transparent py-3.5 text-sm placeholder:text-earth-400 focus:outline-none"
            />
            <kbd className="hidden rounded border border-earth-200 bg-earth-50 px-1.5 py-0.5 text-[10px] font-mono text-earth-500 sm:inline-block">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {grouped.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-sm text-earth-500">
                  Tidak ada hasil untuk &ldquo;<strong>{query}</strong>&rdquo;
                </p>
              </div>
            )}
            {grouped.map(([group, commands]) => (
              <div key={group} className="mb-2">
                <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-earth-400">
                  {group}
                </p>
                <ul>
                  {commands.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => execute(c)}
                        className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-guyub-50"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-earth-100 text-earth-600 group-hover:bg-guyub-100 group-hover:text-guyub-700">
                          <c.icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-earth-900">
                            {c.label}
                          </p>
                          {c.description && (
                            <p className="truncate text-[11px] text-earth-500">
                              {c.description}
                            </p>
                          )}
                        </div>
                        {c.shortcut && (
                          <kbd className="rounded border border-earth-200 bg-earth-50 px-1.5 py-0.5 text-[10px] font-mono text-earth-500">
                            {c.shortcut}
                          </kbd>
                        )}
                        <ArrowRight className="h-3 w-3 text-earth-300 group-hover:text-guyub-600" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer hint */}
          <div className="flex items-center justify-between border-t border-earth-100 px-4 py-2 text-[10px] text-earth-500">
            <span>
              <kbd className="rounded border border-earth-200 bg-earth-50 px-1 py-0.5 font-mono">↑↓</kbd>{" "}
              navigate
            </span>
            <span>
              Powered by{" "}
              <strong className="text-guyub-600">Guyub</strong> Search
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
