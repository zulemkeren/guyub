"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionProvider, useSession } from "@/lib/session";
import { AppSidebar, SidebarProvider } from "@/components/app/sidebar";
import { ToastProvider } from "@/components/ui/toast";
import { CommandPalette } from "@/components/app/command-palette";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <SidebarProvider>
          <AppShell>{children}</AppShell>
        </SidebarProvider>
      </ToastProvider>
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
      <CommandPalette />
    </div>
  );
}
