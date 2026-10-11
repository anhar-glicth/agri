import {
  LayoutDashboardIcon,
  History,
  Leaf,
  Binoculars,
  MapPinned,
  Activity,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  title: string;
  sublabel: string;
  url: string;
  icon: LucideIcon;
}

// Satu sumber data menu utama, dipakai oleh sidebar (navigasi)
// dan header (judul halaman aktif) agar selalu konsisten.
export const navMain: NavItem[] = [
  {
    title: "Dashboard",
    sublabel: "Kondisi 7 Parameter Tanah",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Monitoring Tanah",
    sublabel: "Telemetri NPK, EC, pH, Suhu",
    url: "/monitoring-tanah",
    icon: Binoculars,
  },
  {
    title: "Kondisi Tanaman",
    sublabel: "Status kesehatan lahan berbasis sensor",
    url: "/kondisi-tanaman",
    icon: Activity,
  },
  {
    title: "Rekomendasi Pemupukan",
    sublabel: "Rekomendasi pupuk berbasis ML",
    url: "/rekomendasi-pemupukan",
    icon: Leaf,
  },
  {
    title: "Riwayat Rekomendasi",
    sublabel: "Catatan rekomendasi pemupukan",
    url: "/riwayat-rekomendasi",
    icon: History,
  },
  {
    title: "Lahan",
    sublabel: "Informasi dan pemetaan lahan",
    url: "/lahan",
    icon: MapPinned,
  },
];

export function getNavItemByPath(pathname: string): NavItem | undefined {
  if (!pathname) return undefined;

  // Exact match dulu.
  const exact = navMain.find((item) => item.url === pathname);
  if (exact) return exact;

  // Fallback: cocokkan berdasarkan awalan path (mis. /lahan/edit/1 -> "Lahan").
  return navMain
    .filter((item) => pathname.startsWith(item.url))
    .sort((a, b) => b.url.length - a.url.length)[0];
}
