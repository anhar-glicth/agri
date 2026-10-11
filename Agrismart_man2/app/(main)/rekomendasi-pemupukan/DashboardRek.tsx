"use client";

import { SectionCards } from "@/components/section-cards";
import { RekomendasiPemupukan } from "@/components/rekomendasi-pemupukan";
import { useState } from "react";

export default function DashboardRek() {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <RekomendasiPemupukan onSaved={handleRefresh} />
          </div>
        </div>
      </div>
    </div>
  );
}
