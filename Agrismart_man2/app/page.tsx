import { redirect } from "next/navigation";

// Beranda/landing page dihapus sesuai permintaan.
// Membuka "/" akan langsung diarahkan ke Dashboard.
export default function Home() {
  redirect("/dashboard");
}
