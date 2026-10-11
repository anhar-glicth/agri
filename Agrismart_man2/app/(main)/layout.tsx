"use client";

import { useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import {
  NotificationProvider,
  useNotifications,
} from "@/components/notification-context";

import { ActiveLahanProvider } from "@/components/active-lahan-context";

function DashboardContent({ children }: { children: React.ReactNode }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, clearNotifications } = useNotifications();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader
          unreadNotifCount={notifications.length}
          onOpenNotifs={() => setNotifOpen((prev) => !prev)}
        />

        {children}

        {notifOpen && (
          <div
            className="
              fixed
              right-4
              top-20
              z-50
              w-80
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-xl
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                p-4
                dark:border-slate-700
              "
            >
              <h2
                className="
                font-semibold
                text-slate-900
                dark:text-white
              "
              >
                Notifikasi
              </h2>

              <button
                type="button"
                onClick={() => setNotifOpen(false)}
                className="
                  text-slate-500
                  hover:text-slate-900
                  dark:text-slate-400
                  dark:hover:text-white
                "
              >
                ✕
              </button>
            </div>

            {/* LIST */}
            <div className="max-h-80 overflow-y-auto p-3">
              {notifications.length === 0 ? (
                <p
                  className="
                  p-3
                  text-center
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
                >
                  Tidak ada notifikasi.
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="
                      mb-2
                      rounded-xl
                      bg-slate-50
                      p-3
                      dark:bg-slate-800
                    "
                  >
                    <p
                      className="
                      text-sm
                      font-medium
                      text-slate-900
                      dark:text-white
                    "
                    >
                      {notification.message}
                    </p>

                    <p
                      className="
                      mt-1
                      text-xs
                      text-slate-500
                      dark:text-slate-400
                    "
                    >
                      {notification.time}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {notifications.length > 0 && (
              <div
                className="
                  border-t
                  border-slate-200
                  p-3
                  dark:border-slate-700
                "
              >
                <button
                  type="button"
                  onClick={clearNotifications}
                  className="
                    w-full
                    rounded-xl
                    bg-slate-100
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-slate-700
                    hover:bg-slate-200
                    dark:bg-slate-800
                    dark:text-slate-200
                    dark:hover:bg-slate-700
                  "
                >
                  Hapus semua notifikasi
                </button>
              </div>
            )}
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationProvider>
      <ActiveLahanProvider>
        <DashboardContent>{children}</DashboardContent>
      </ActiveLahanProvider>
    </NotificationProvider>
  );
}
