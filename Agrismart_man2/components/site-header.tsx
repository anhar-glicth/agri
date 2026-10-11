"use client"

import {
  Bell,
  Moon,
  Sun,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getNavItemByPath } from "@/lib/nav"

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

  const isDarkMode = theme === "dark"
  const activeItem = getNavItemByPath(pathname ?? "")

  const handleToggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3 min-w-0">

          <SidebarTrigger
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          />

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
