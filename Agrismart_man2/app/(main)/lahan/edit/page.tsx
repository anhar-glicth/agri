"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import EditClient from "./[id]/EditClient";

function EditPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "1";

  return <EditClient id={id} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Memuat formulir edit lahan...</div>}>
      <EditPageContent />
    </Suspense>
  );
}
