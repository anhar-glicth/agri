"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { ArrowRight, Flower2, X } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Card } from "@/components/ui/card";
import { useActiveLahan } from "@/components/active-lahan-context";
import { navMain } from "@/lib/nav";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { lahanAktif } = useActiveLahan();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
      className="border-r border-slate-200/80 dark:border-slate-800"
    >
      {/* =====================================================
          HEADER / BRANDING
      ===================================================== */}
      <SidebarHeader className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Nama Aplikasi + Logo Sekolah, berdampingan */}
            <div className="px-4 pt-3.5 pb-2.5 flex items-center gap-2.5">
              {/* Logo Aplikasi */}
              <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-700 to-lime-500 flex items-center justify-center shadow-sm shrink-0 text-lg">
                🌱
              </div>

              {/* Nama Aplikasi */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline">
                  <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    Agri
                  </span>

                  <span className="text-lg font-black tracking-tight text-emerald-700 dark:text-lime-400">
                    Smart
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Pemupukan Cerdas
                </p>
              </div>

              {/* Logo Sekolah, di samping nama aplikasi */}
              <img
                src="/logo-man2mataram.svg"
                alt="Logo MAN 2 Mataram"
                className="h-9 w-9 shrink-0 rounded-full ring-1 ring-slate-200 dark:ring-slate-700"
              />

              {/* Tombol Tutup Khusus Mobile Handphone */}
              {isMobile && (
                <button
                  type="button"
                  onClick={() => setOpenMobile(false)}
                  className="p-1.5 ml-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                  aria-label="Tutup Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Keterangan instansi, seperti kop surat */}
            <div className="mx-4 mb-3 flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 dark:bg-slate-800/60">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                MAN 2 Mataram
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Smart Agriculture Program
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* =====================================================
          CONTENT / NAVIGATION
      ===================================================== */}
      <SidebarContent className="bg-white dark:bg-slate-900 px-3 py-3">
        {/* Label */}
        <div className="px-3 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Menu Utama
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          {navMain.map((item) => {
            const IconComponent = item.icon;

            /*
             * Exact URL
             *
             * Contoh:
             * /dashboard
             * /monitoring-tanah
             */
            const isActive = pathname === item.url;

            return (
              <Link
                key={item.title}
                href={item.url}
                className="block"
                onClick={handleNavClick}
              >
                <button
                  type="button"
                  className={clsx(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all cursor-pointer",

                    isActive
                      ? "bg-emerald-800 dark:bg-emerald-600 text-white font-semibold shadow-xs"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white",
                  )}
                >
                  {/* ICON */}
                  <IconComponent
                    className={clsx(
                      "w-5 h-5 shrink-0",

                      isActive
                        ? "text-emerald-100"
                        : "text-slate-400 dark:text-slate-400",
                    )}
                  />

                  {/* TEXT */}
                  <div className="min-w-0 flex-1">
                    {/* Title */}
                    <div className="text-sm font-semibold leading-tight truncate">
                      {item.title}
                    </div>

                    {/* Sublabel */}
                    <div
                      className={clsx(
                        "text-xs truncate leading-tight mt-0.5",

                        isActive
                          ? "text-emerald-200"
                          : "text-slate-400 dark:text-slate-500",
                      )}
                    >
                      {item.sublabel}
                    </div>
                  </div>
                </button>
              </Link>
            );
          })}
        </div>
      </SidebarContent>

      <SidebarFooter
        className="
    bg-slate-50/70
    dark:bg-slate-950/40
    border-t
    border-slate-100
    dark:border-slate-800
    p-3
  "
      >
        <Card
          className="
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-3
      shadow-2xs
      dark:border-slate-800
      dark:bg-slate-900
    "
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-xl
        bg-emerald-100
        dark:bg-emerald-950/60
      "
            >
              <Flower2
                className="
          h-6
          w-6
          text-emerald-600
          dark:text-emerald-400
        "
              />
            </div>

            <div className="min-w-0">
              <span
                className="
          text-xs
          font-medium
          text-slate-400
          dark:text-slate-500
        "
              >
                Lahan Aktif
              </span>

              <h1
                className="
          truncate
          text-sm
          font-bold
          text-slate-900
          dark:text-white
        "
              >
                {lahanAktif?.nama ?? "Belum ada lahan aktif"}
              </h1>
            </div>
          </div>

          <div className="mb-3 space-y-1.5">
            <div
              className="
        flex
        items-center
        justify-between
        text-xs
      "
            >
              <span
                className="
          text-slate-500
          dark:text-slate-400
        "
              >
                Tanaman
              </span>

              <span
                className="
          font-bold
          text-slate-800
          dark:text-slate-200
        "
              >
                {lahanAktif?.tanaman ?? "-"}
              </span>
            </div>

            <div
              className="
        flex
        items-center
        justify-between
        text-xs
      "
            >
              <span
                className="
          text-slate-500
          dark:text-slate-400
        "
              >
                Luas Lahan
              </span>

              <span
                className="
          font-bold
          text-slate-800
          dark:text-slate-200
        "
              >
                {lahanAktif?.luas ? `${lahanAktif.luas} ha` : "-"}
              </span>
            </div>

            <div
              className="
        flex
        items-center
        justify-between
        text-xs
      "
            >
              <span
                className="
          text-slate-500
          dark:text-slate-400
        "
              >
                Sensor
              </span>

              <span
                className="
          font-bold
          text-slate-800
          dark:text-slate-200
        "
              >
                {lahanAktif?.sensor ?? "-"}
              </span>
            </div>
          </div>

          <Link
            href={lahanAktif ? `/lahan/edit/${lahanAktif.id}` : "/lahan"}
            onClick={handleNavClick}
            className="
        rounded-xl
        bg-emerald-800
        px-3
        py-2.5
        text-xs
        font-semibold
        text-white
        transition-colors
        hover:bg-emerald-900
        dark:bg-emerald-600
        dark:hover:bg-emerald-500
        flex
        items-center
        justify-center
        gap-2
      "
          >
            <span>Lihat Detail Lahan</span>

            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>

        <div
          className="
    pt-1
    text-center
    text-[11px]
    text-slate-400
    dark:text-slate-500
  "
        >
          AgriSmart • Pemupukan Cerdas
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
