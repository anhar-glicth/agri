"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { getGrafikSensor } from "@/services/sensor";
import { useActiveLahan } from "@/components/active-lahan-context";

interface SensorData {
  id: number;
  jenisTanaman: string;
  kelembaban: number;
  pH_Tanah: number;
  suhuTanah: number;
  nitrogen: number;
  fosfor: number;
  kalium: number;
  ec: number;
  tanggal: string;
}

interface ChartData {
  tanggal: number;
  kelembaban: number;
  pHtanah: number;
  suhu: number;
  nitrogen: number;
  fosfor: number;
  kalium: number;
  ec: number;
}

const parameterColors: Record<string, string> = {
  kelembaban: "#3b82f6",
  pHtanah: "#22c55e",
  suhu: "#fc6603",
  nitrogen: "#9003fc",
  fosfor: "#fcc603",
  kalium: "#03adfc",
  ec: "#fc035e",
};

const chartConfig = {
  kelembaban: {
    label: "Kelembaban",
  },
  pHtanah: {
    label: "pH Tanah",
  },
  suhu: {
    label: "Suhu Tanah",
  },
  nitrogen: {
    label: "Nitrogen",
  },
  fosfor: {
    label: "Fosfor",
  },
  kalium: {
    label: "Kalium",
  },
  ec: {
    label: "Electrical Conductivity",
  },
} satisfies ChartConfig;

function formatTanggal(value: string | number | Date | undefined) {
  if (value === undefined || value === null) {
    return "-";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTanggalSingkat(value: string | number | Date | undefined) {
  if (value === undefined || value === null) {
    return "-";
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
  });
}

export function ChartAreaInteractive() {
  const { lahanAktif } = useActiveLahan();

  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      if (!lahanAktif?.sensor) {
        setChartData([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res: SensorData[] = await getGrafikSensor(lahanAktif.sensor);

        console.log("SENSOR ID:", lahanAktif.sensor);
        console.log("DATA SENSOR DARI API:", res);

        const grafik: ChartData[] = [...res]
          .sort(
            (a, b) =>
              new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime(),
          )
          .map((item) => ({
            tanggal: new Date(item.tanggal).getTime(),
            kelembaban: Number(item.kelembaban),
            pHtanah: Number(item.pH_Tanah),
            suhu: Number(item.suhuTanah),
            nitrogen: Number(item.nitrogen),
            fosfor: Number(item.fosfor),
            kalium: Number(item.kalium),
            ec: Number(item.ec),
          }));

        setChartData(grafik);
      } catch (err) {
        console.error("Gagal mengambil data grafik:", err);
        setError("Gagal mengambil data sensor.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [lahanAktif?.sensor]);

  return (
    <Card className="w-full @container/card">
      <CardHeader>
        <CardTitle>Tren Kondisi Tanah</CardTitle>
      </CardHeader>

      <CardContent className="w-full px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex h-60 items-center justify-center text-sm text-slate-500 sm:h-75 md:h-85 lg:h-95 dark:text-slate-400">
            Memuat data sensor...
          </div>
        ) : error ? (
          <div className="flex h-60 items-center justify-center text-sm text-red-500 sm:h-75 md:h-85 lg:h-95">
            {error}
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-60 items-center justify-center text-sm text-slate-500 sm:h-75 md:h-85 lg:h-95 dark:text-slate-400">
            Belum ada data sensor.
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="h-60 w-full sm:h-75 md:h-85 lg:h-95"
          >
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 12,
                left: 8,
                bottom: 10,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />

              <XAxis
                dataKey="tanggal"
                type="number"
                scale="time"
                domain={["dataMin", "dataMax"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={(value) => formatTanggalSingkat(value)}
              />

              <YAxis tickLine={false} axisLine={false} width={42} />

              <ChartTooltip
                cursor={{
                  strokeDasharray: "4 4",
                }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => formatTanggal(value)}
                  />
                }
              />

              <Line
                type="natural"
                dataKey="kelembaban"
                name="Kelembaban"
                stroke={parameterColors.kelembaban}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />

              <Line
                type="natural"
                dataKey="pHtanah"
                name="pH Tanah"
                stroke={parameterColors.pHtanah}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />

              <Line
                type="natural"
                dataKey="suhu"
                name="Suhu Tanah"
                stroke={parameterColors.suhu}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />

              <Line
                type="natural"
                dataKey="nitrogen"
                name="Nitrogen"
                stroke={parameterColors.nitrogen}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />

              <Line
                type="natural"
                dataKey="fosfor"
                name="Fosfor"
                stroke={parameterColors.fosfor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />

              <Line
                type="natural"
                dataKey="kalium"
                name="Kalium"
                stroke={parameterColors.kalium}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />

              <Line
                type="natural"
                dataKey="ec"
                name="Electrical Conductivity"
                stroke={parameterColors.ec}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                connectNulls
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
