"use client"

import { useEffect, useState } from "react"
import {
  Bell,
  Menu,
  Moon,
  PanelLeftIcon,
  Sun,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getNavItemByPath } from "@/lib/nav"
import { getBaseUrl, setCustomApiUrl, DEFAULT_API_URL } from "@/services/api"

interface HeaderProps {
  unreadNotifCount?: number
  onOpenNotifs?: () => void
}

export function SiteHeader({
  unreadNotifCount = 0,
  onOpenNotifs,
}: HeaderProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking")

  const isDarkMode = theme === "dark"
  const activeItem = getNavItemByPath(pathname ?? "")

  const handleToggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  const checkServer = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 4000)
      const res = await fetch(`${getBaseUrl()}/`, {
        method: "GET",
        signal: controller.signal,
        cache: "no-store",
      })
      clearTimeout(timeoutId)

      if (res.ok) {
        setServerStatus("online")
      } else {
        setServerStatus("offline")
      }
    } catch {
      setServerStatus("offline")
    }
  }

  // Cek status koneksi ke server AI / ML FastAPI
  useEffect(() => {
    checkServer()
    const interval = setInterval(checkServer, 30000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleConfigureApi = () => {
    const current = getBaseUrl()
    const input = window.prompt(
      `Pengaturan Koneksi Server AI:\n\nURL saat ini:\n${current}\n\nMasukkan URL Tunnel Cloudflare baru jika berubah (atau biarkan kosong untuk reset ke default):`,
      current
    )
    if (input !== null) {
      if (input.trim() === "" || input.trim() === DEFAULT_API_URL) {
        setCustomApiUrl(null)
      } else {
        setCustomApiUrl(input.trim())
      }
      setServerStatus("checking")
      setTimeout(checkServer, 300)
    }
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3 min-w-0">

          {/* HAMBURGER MENU (HANDPHONE) & PANEL TOGGLE (DESKTOP) */}
          <SidebarTrigger
            className="p-2 h-9 w-9 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            aria-label="Menu Navigasi"
          >
            <Menu className="w-5 h-5 md:hidden" />
            <PanelLeftIcon className="w-5 h-5 hidden md:block" />
          </SidebarTrigger>

          {/* JUDUL HALAMAN AKTIF */}
          <div className="min-w-0">
            <h1 className="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">
              {activeItem?.title ?? "AgriSmart"}
            </h1>
            {activeItem?.sublabel && (
              <p className="hidden truncate text-xs text-slate-500 dark:text-slate-400 sm:block">
                {activeItem.sublabel}
              </p>
            )}
          </div>

        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          {/* INDIKATOR STATUS SERVER AI / ML DENGAN TOMBOL PENGATURAN */}
          <button
            type="button"
            onClick={handleConfigureApi}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer ${
              serverStatus === "online"
                ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                : serverStatus === "offline"
                ? "bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100"
                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-200"
            }`}
            title={
              serverStatus === "online"
                ? "Server AI Online: Siap analisis & prediksi. Klik untuk ubah URL server jika diperlukan."
                : serverStatus === "offline"
                ? "Server AI Offline: Komputer backend belum aktif atau tunnel berganti. Klik untuk ubah URL tunnel."
                : "Memeriksa status koneksi server AI... Klik untuk ubah URL."
            }
          >
            <span
              className={`h-2 w-2 rounded-full ${
                serverStatus === "online"
                  ? "bg-emerald-500 animate-pulse"
                  : serverStatus === "offline"
                  ? "bg-rose-500"
                  : "bg-slate-400 animate-ping"
              }`}
            />
            <span className="hidden sm:inline">
              {serverStatus === "online"
                ? "AI Online"
                : serverStatus === "offline"
                ? "AI Offline (Klik)"
                : "AI..."}
            </span>
          </button>

          {/* BRANDING SEKOLAH, tampil ringkas di layar kecil saat sidebar tersembunyi */}
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-2 py-1 dark:bg-slate-800 lg:hidden">
            <img
              src="/logo-man2mataram.svg"
              alt="Logo MAN 2 Mataram"
              className="h-5 w-5 shrink-0 rounded-full"
            />
            <span className="hidden text-xs font-semibold text-slate-600 dark:text-slate-300 sm:inline">
              MAN 2 Mataram
            </span>
          </div>

          {/* DARK MODE */}
          <button
            onClick={handleToggleDarkMode}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            title={
              isDarkMode
                ? "Beralih ke Mode Terang"
                : "Beralih ke Mode Gelap"
            }
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* NOTIFICATION */}
          <button
            onClick={onOpenNotifs}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition-colors"
            title="Lihat Notifikasi"
            aria-label="Lihat Notifikasi"
          >
            <Bell className="w-4 h-4" />

            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

        </div>
      </div>
    </header>
  )
}
