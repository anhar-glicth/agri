import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeaderLahan() {
  return (
    <div className="px-4">
      <Link href="/lahan/tambah">
        <Button className="bg-emerald-600 hover:bg-emerald-900 cursor-pointer">
          + Tambah Lahan Baru
        </Button>
      </Link>
    </div>
  );
}
