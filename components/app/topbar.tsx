"use client";

import { Search, Bell, ChevronDown, Menu, MessageCircle, Receipt, FileText, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useSession, roleLabel } from "@/lib/session";
import { USERS } from "@/lib/mock/data";
import { useSidebar } from "@/components/app/sidebar";
import { cn, timeAgo } from "@/lib/utils";

interface TopbarProps {
  title: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  icon: React.ElementType;
  iconCls: string;
  title: string;
  desc: string;
  time: string;
  href: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "n-1",
    icon: FileText,
    iconCls: "bg-amber-100 text-amber-700",
    title: "Surat baru menunggu approval",
    desc: "Pak Budi - Izin Usaha Warung Makan",
    time: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    href: "/app/surat",
    unread: true,
  },
  {
    id: "n-2",
    icon: Receipt,
    iconCls: "bg-guyub-100 text-guyub-700",
    title: "23 KK belum bayar iuran Desember",
    desc: "Reminder otomatis terkirim hari ini",
    time: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    href: "/app/iuran",
    unread: true,
  },
  {
    id: "n-3",
    icon: MessageCircle,
    iconCls: "bg-blue-100 text-blue-700",
    title: "Pengumuman terkirim ke 52 KK",
    desc: "Kerja Bakti Minggu Pagi · 48 dibaca",
    time: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    href: "/app/pengumuman",
    unread: false,
  },
  {
    id: "n-4",
    icon: ShieldCheck,
    iconCls: "bg-blue-100 text-blue-700",
    title: "Reminder ronda H-1",
    desc: "Pak Slamet & Pak Bambang - besok 20.00",
    time: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    href: "/app/ronda",
    unread: false,
  },
];

export function AppTopbar({ title, subtitle }: TopbarProps) {
  const { user, switchRole } = useSession();
  const { setMobileOpen } = useSidebar();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  function openCommandPalette() {
    // Dispatch keyboard event to trigger command palette
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-earth-200 bg-white px-4 md:px-6">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden rounded-lg p-2 text-earth-600 hover:bg-earth-100 hover:text-earth-900"
          aria-label="Buka menu"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base md:text-lg font-semibold text-earth-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-earth-500 truncate hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search trigger (Cmd+K) */}
        <button
          type="button"
          onClick={openCommandPalette}
          className="hidden md:flex items-center gap-2 rounded-lg border border-earth-200 bg-earth-50 px-3 py-1.5 text-sm text-earth-500 w-64 transition-colors hover:bg-earth-100"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="text-xs">Cari warga, halaman...</span>
          <kbd className="ml-auto rounded border border-earth-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-earth-500">
            ⌘K
          </kbd>
        </button>

        {/* Mobile search trigger */}
        <button
          type="button"
          onClick={openCommandPalette}
          className="md:hidden rounded-lg p-2 text-earth-600 hover:bg-earth-100 hover:text-earth-900"
          aria-label="Cari"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notif */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotif(!showNotif)}
            className="relative rounded-lg p-2 text-earth-500 transition-colors hover:bg-earth-50 hover:text-earth-900"
            aria-label="Notifikasi"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-500 text-[8px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotif(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-earth-200 bg-white shadow-warm-lg">
                <div className="flex items-center justify-between border-b border-earth-100 px-4 py-3">
                  <p className="text-sm font-semibold text-earth-900">
                    Notifikasi
                  </p>
                  {unreadCount > 0 && (
                    <button className="text-[10px] font-medium text-guyub-600 hover:text-guyub-700">
                      Tandai semua dibaca
                    </button>
                  )}
                </div>
                <ul className="max-h-96 overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={n.href}
                        onClick={() => setShowNotif(false)}
                        className={cn(
                          "flex items-start gap-3 border-b border-earth-50 px-4 py-3 transition-colors hover:bg-earth-50 last:border-0",
                          n.unread && "bg-guyub-50/30"
                        )}
                      >
                        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", n.iconCls)}>
                          <n.icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold text-earth-900 truncate">
                              {n.title}
                            </p>
                            {n.unread && (
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                            )}
                          </div>
                          <p className="mt-0.5 text-[10px] text-earth-600 line-clamp-2">
                            {n.desc}
                          </p>
                          <p className="mt-1 text-[9px] text-earth-400">
                            {timeAgo(n.time)}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-earth-100 p-2 text-center">
                  <button className="text-xs font-medium text-guyub-600 hover:text-guyub-700">
                    Lihat semua notifikasi
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Role switcher (demo mode) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            className="flex items-center gap-2 rounded-lg border border-earth-200 bg-white px-2 py-1.5 text-sm transition-colors hover:bg-earth-50 md:px-2.5"
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
            <ChevronDown className="h-3.5 w-3.5 text-earth-400 hidden md:block" />
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
