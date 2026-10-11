"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLatestSensor } from "@/services/sensor";
import {
  Droplets,
  FlaskConical,
  Thermometer,
  CircleParking,
  Atom,
  ActivityIcon,
  Sprout,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useActiveLahan } from "@/components/active-lahan-context";

interface SensorData {
  kelembaban?: number;
  pH_Tanah?: number;
  suhuTanah?: number;
  nitrogen?: number;
  fosfor?: number;
  kalium?: number;
  ec?: number;
}

export function SectionCards() {
  const [sensor, setSensor] = useState<any>(null);
  const { lahanAktif } = useActiveLahan();

  useEffect(() => {
    async function loadSensor() {
      if (!lahanAktif?.sensor) {
        setSensor(null);
        return;
      }

      try {
        console.log("Mengambil sensor:", lahanAktif.sensor);

        const data = await getLatestSensor(lahanAktif.sensor);

        console.log("DATA SENSOR TERBARU:", data);

        setSensor(data);
      } catch (err) {
        console.error("Gagal mengambil data sensor:", err);

        setSensor(null);
      }
    }

    loadSensor();
  }, [lahanAktif?.sensor]);

  const metrics = [
    {
      id: "kelembaban",
      name: "Kelembaban",
      value: sensor?.kelembaban ?? "0",
      unit: "%",
      optimalRange: "40–60%",
      icon: Droplets,
      iconClass:
        "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    },
    {
      id: "ph",
      name: "pH Tanah",
      value: sensor?.pH_Tanah ?? "0",
      unit: "pH",
      optimalRange: "5.5–7.0",
      icon: FlaskConical,
      iconClass:
        "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    },
    {
      id: "suhu",
      name: "Suhu Tanah",
      value: sensor?.suhuTanah ?? "0",
      unit: "°C",
      optimalRange: "20–30°C",
      icon: Thermometer,
      iconClass:
        "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
    },
    {
      id: "nitrogen",
      name: "Nitrogen",
      value: sensor?.nitrogen ?? "0",
      unit: "mg/kg",
      optimalRange: "50–150 ppm",
      icon: Sprout,
      iconClass:
        "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    },
    {
      id: "fosfor",
      name: "Fosfor",
      value: sensor?.fosfor ?? "0",
      unit: "mg/kg",
      optimalRange: "30–80 ppm",
      icon: CircleParking,
      iconClass:
        "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
    },
    {
      id: "kalium",
      name: "Kalium",
      value: sensor?.kalium ?? "0",
      unit: "mg/kg",
      optimalRange: "40–100 ppm",
      icon: Atom,
      iconClass:
        "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    },
    {
      id: "ec",
      name: "Electrical Conductivity",
      value: sensor?.ec ?? "0",
      unit: "mS/cm",
      optimalRange: "1.0–2.0 dS/m",
      icon: ActivityIcon,
      iconClass:
        "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
    },
  ];

  return (
    <div className="px-4 sm:px-6 py-2">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            7 Parameter Tanah Terukur
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Termasuk EC, NPK, pH, kelembaban, dan suhu tanah
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            7 Sensor Aktif Tersinkron
          </span>
        </div>
      </div>

      {/* SENSOR CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <Card
              key={metric.id}
              className="
                @container/card
                bg-white dark:bg-slate-900
                rounded-2xl
                p-3 sm:p-3.5
                border border-green-300/80
                dark:border-slate-700
                shadow-2xs
                hover:border-emerald-600
                dark:hover:border-emerald-700
                transition-all
                relative
                flex flex-col
                justify-between
              "
            >
              <CardHeader className="p-0 flex items-start justify-between gap-1 mb-1">
                <div className="min-w-0">
                  <CardDescription className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                    {metric.name}
                  </CardDescription>

                  <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight my-1.5 flex items-baseline gap-1">
                    {metric.value}

                    <span className="text-xs font-normal text-slate-500 dark:text-white">
                      {metric.unit}
                    </span>
                  </CardTitle>
                </div>

                <CardAction className="relative">
                  <div
                    className={`
                      w-8 h-8
                      rounded-xl
                      flex items-center justify-center
                      ${metric.iconClass}
                    `}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </CardAction>
              </CardHeader>

              <div className="text-[11px] text-slate-400 dark:text-slate-400">
                Ideal: {metric.optimalRange}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
