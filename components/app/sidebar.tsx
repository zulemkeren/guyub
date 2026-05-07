"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, createContext, useContext } from "react";
import {
  LayoutDashboard,
  Users,
  Home,
  Wallet,
  Receipt,
  Megaphone,
  FileText,
  ShieldCheck,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useSession, roleLabel } from "@/lib/session";
import { RT_INFO } from "@/lib/mock/data";

interface SidebarContextType {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  mobileOpen: false,
  setMobileOpen: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    items: [{ href: "/app", label: "Beranda", icon: LayoutDashboard }],
  },
  {
    title: "Kependudukan",
    items: [
      { href: "/app/warga", label: "Data Warga", icon: Users },
      { href: "/app/kk", label: "Kartu Keluarga", icon: Home },
    ],
  },
  {
    title: "Keuangan",
    items: [
      { href: "/app/keuangan", label: "Kas RT", icon: Wallet },
      { href: "/app/iuran", label: "Iuran Bulanan", icon: Receipt },
    ],
  },
  {
    title: "Komunikasi",
    items: [
      { href: "/app/pengumuman", label: "Pengumuman", icon: Megaphone, badge: "3" },
      { href: "/app/surat", label: "Surat Pengantar", icon: FileText, badge: "2" },
      { href: "/app/ronda", label: "Jadwal Ronda", icon: ShieldCheck },
    ],
  },
  {
    title: "Lainnya",
    items: [{ href: "/app/pengaturan", label: "Pengaturan", icon: Settings }],
  },
];

export function AppSidebar() {
  const { mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-earth-950/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col border-r border-earth-200 bg-white transition-transform md:relative md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useSession();

  return (
    <>
      {/* Branding */}
      <div className="flex h-16 items-center justify-between border-b border-earth-200 px-5">
        <Link href="/app">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="md:hidden rounded-lg p-1.5 text-earth-500 hover:bg-earth-100 hover:text-earth-900"
          aria-label="Tutup menu"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* RT info */}
      <div className="border-b border-earth-200 px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-earth-500">
          Kelurahan
        </p>
        <p className="mt-0.5 text-sm font-semibold text-earth-900">
          RT {RT_INFO.noRT} / RW {RT_INFO.noRW}
        </p>
        <p className="text-xs text-earth-500">
          {RT_INFO.kelurahan}, {RT_INFO.kota}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-6" : ""}>
            {group.title && (
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-earth-400">
                {group.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/app"
                    ? pathname === "/app"
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-guyub-50 text-guyub-800 font-medium"
                          : "text-earth-600 hover:bg-earth-50 hover:text-earth-900"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          active
                            ? "text-guyub-600"
                            : "text-earth-400 group-hover:text-earth-600"
                        )}
                      />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                            active
                              ? "bg-guyub-600 text-white"
                              : "bg-amber-100 text-amber-700"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="border-t border-earth-200 p-3">
        {user && (
          <div className="rounded-xl bg-earth-50 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-guyub-500 to-guyub-700 text-sm font-semibold text-white">
                {user.nama.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-earth-900">
                  {user.nama}
                </p>
                <p className="truncate text-[10px] text-earth-500">
                  {roleLabel(user.role)}
                </p>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Keluar"
                className="rounded-md p-1.5 text-earth-500 transition-colors hover:bg-white hover:text-earth-900"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
