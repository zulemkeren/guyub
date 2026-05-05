"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "@/lib/session";
import { AppSidebar } from "@/components/app/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppShell>{children}</AppShell>
    </SessionProvider>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-earth-50">
        <div className="text-sm text-earth-500">Memuat...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-earth-50">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
