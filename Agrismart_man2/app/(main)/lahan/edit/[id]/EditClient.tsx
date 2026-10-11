"use client";

import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import FormEdit from "./form";
import { getLahanById } from "@/services/edit";

export default function EditClient({ id }: { id: string }) {
  const [lahan, setLahan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getLahanById(id)
        .then(setLahan)
        .catch((err) => console.error("Error fetching lahan:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return (
    <div className="px-4 py-4 md:py-6">
      <div className="text-[20px] font-bold flex items-center gap-2 mx-5">
        <CirclePlus />
        <h1>LAHAN</h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 rounded-[10px] m-5 p-4 inset-shadow-xs shadow-lg">
        {loading ? (
          <p className="p-4 text-gray-500">Memuat data lahan...</p>
        ) : lahan ? (
          <FormEdit lahan={lahan} />
        ) : (
          <p className="p-4 text-red-500">Data lahan tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}
