"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { AppUser } from "@/lib/mock/types";
import { USERS } from "@/lib/mock/data";

interface SessionContextType {
  user: AppUser | null;
  login: (userId: string) => void;
  logout: () => void;
  switchRole: (userId: string) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

const STORAGE_KEY = "guyub-active-user";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const u = USERS.find((x) => x.id === stored);
        if (u) setUser(u);
      }
    } catch {}
    setHydrated(true);
  }, []);

  const login = (userId: string) => {
    const u = USERS.find((x) => x.id === userId);
    if (!u) return;
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, userId);
    } catch {}
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const switchRole = (userId: string) => {
    login(userId);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout, switchRole }}>
      {hydrated ? children : null}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

export function roleLabel(role: AppUser["role"]): string {
  switch (role) {
    case "admin_rt":
      return "Ketua RT";
    case "bendahara":
      return "Bendahara";
    case "sekretaris":
      return "Sekretaris";
    case "warga":
      return "Warga";
  }
}
