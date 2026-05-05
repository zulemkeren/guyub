"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSession, roleLabel } from "@/lib/session";
import { USERS } from "@/lib/mock/data";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export function AppTopbar({ title, subtitle }: TopbarProps) {
  const { user, switchRole } = useSession();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-earth-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold text-earth-900">{title}</h1>
        {subtitle && <p className="text-xs text-earth-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-earth-200 bg-earth-50 px-3 py-1.5 text-sm text-earth-500 w-64">
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Cari warga, KK, transaksi...</span>
          <kbd className="ml-auto rounded border border-earth-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-earth-500">
            ⌘K
          </kbd>
        </div>

        {/* Notif */}
        <button
          type="button"
          className="relative rounded-lg p-2 text-earth-500 transition-colors hover:bg-earth-50 hover:text-earth-900"
          aria-label="Notifikasi"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-amber-500" />
        </button>

        {/* Role switcher (demo mode) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-2 rounded-lg border border-earth-200 bg-white px-2.5 py-1.5 text-sm transition-colors hover:bg-earth-50"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-xs font-semibold text-white">
              {user?.nama.charAt(0) || "?"}
            </div>
            <div className="hidden text-left md:block">
              <p className="text-xs font-medium text-earth-900 leading-none">
                {user?.nama}
              </p>
              <p className="text-[10px] text-earth-500 leading-tight mt-0.5">
                {user ? roleLabel(user.role) : ""}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-earth-400" />
          </button>

          {showRoleSwitcher && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowRoleSwitcher(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-earth-200 bg-white shadow-warm-lg">
                <div className="border-b border-earth-100 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                    🎬 Mode Demo
                  </p>
                  <p className="text-xs text-earth-600">Pilih role untuk simulasi</p>
                </div>
                <ul className="p-1.5">
                  {USERS.map((u) => (
                    <li key={u.id}>
                      <button
                        type="button"
                        onClick={() => {
                          switchRole(u.id);
                          setShowRoleSwitcher(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm transition-colors",
                          u.id === user?.id
                            ? "bg-guyub-50 text-guyub-800"
                            : "text-earth-700 hover:bg-earth-50"
                        )}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-earth-100 text-xs font-semibold text-earth-600">
                          {u.nama.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium">{u.nama}</p>
                          <p className="text-[10px] text-earth-500">{u.jabatan}</p>
                        </div>
                        {u.id === user?.id && (
                          <span className="text-guyub-600">●</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
