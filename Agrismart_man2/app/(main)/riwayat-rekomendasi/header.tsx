"use client";

import { Card } from "@/components/ui/card";
import { getLatestRek } from "@/services/riwayat";
import { statisticData } from "@/services/statistic";
import {
  CalendarDays,
  ChartLine,
  Dot,
  Droplets,
  FileText,
  FlaskConical,
  Sprout,
  Thermometer,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function HeaderRek() {
  const [result, setResult] = useState<any>(null);
  const [dataStatistic, setDataStatistic] = useState<any>(null);

  async function riwayatPredict() {
    try {
      const sensorRiwayat = await getLatestRek();
      const statistic = await statisticData();

      setResult(sensorRiwayat);
      setDataStatistic(statistic);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    riwayatPredict();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card flex items-center flex-row gap-3 px-3">
        <div className="bg-blue-200 rounded-full p-2">
          <FileText className="text-blue-950 w-10 h-10" />
        </div>
        <div>
          <h1 className="font-bold">Total Rekomendasi</h1>
          <h1 className="font-bold text-2xl">{result?.count ?? 0}</h1>
          <h1>kali rekomendasi dibuat</h1>
        </div>
      </Card>
      <Card className="@container/card flex items-center flex-row gap-3 px-3">
        <div className="bg-purple-200 rounded-full p-2">
          <ChartLine className="text-purple-950 w-10 h-10" />
        </div>
        <div>
          <h1 className="font-bold">Pupuk Terbanyak</h1>
          <h1 className="font-bold text-2xl">{dataStatistic?.jenisPupuk}</h1>
          <h1>muncul pada {result?.count ?? 0} rekomendasi</h1>
        </div>
      </Card>
    </div>
  );
}
