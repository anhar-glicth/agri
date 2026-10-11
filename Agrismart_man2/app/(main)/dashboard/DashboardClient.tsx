"use client";

import { useState } from "react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { RiwayatDash } from "@/components/riwayat-terakhir";

export default function DashboardClient() {
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
            <ChartAreaInteractive onSaved={handleRefresh} />
          </div>
          {/* <DataTable data={data} /> */}
          <RiwayatDash refresh={refresh} />
        </div>
      </div>
    </div>
  );
}
