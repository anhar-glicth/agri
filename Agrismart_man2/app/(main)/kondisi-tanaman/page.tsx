"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  CircleCheckIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  InfoIcon,
  Sprout,
} from "lucide-react";

import { SectionCards } from "@/components/section-cards";
import { getLatestSensor } from "@/services/sensor";
import { useActiveLahan } from "@/components/active-lahan-context";
import {
  evaluateSoilHealth,
  type SoilHealthResult,
  type HealthLevel,
} from "@/lib/soil-health";

const overallStyle: Record<
  SoilHealthResult["overallStatus"],
  { icon: React.ElementType; badge: string; card: string; iconColor: string }
> = {
  Sehat: {
    icon: CircleCheckIcon,
    badge:
      "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    card: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/60 dark:bg-emerald-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  "Perlu Perhatian": {
    icon: TriangleAlertIcon,
    badge:
      "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    card: "border-amber-200 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  Kritis: {
    icon: OctagonXIcon,
    badge:
      "bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800",
    card: "border-red-200 bg-red-50/60 dark:border-red-900/60 dark:bg-red-950/20",
    iconColor: "text-red-600 dark:text-red-400",
  },
  "Tidak Ada Data": {
    icon: InfoIcon,
    badge:
      "bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    card: "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40",
    iconColor: "text-slate-500 dark:text-slate-400",
  },
};

const parameterStatusStyle: Record<HealthLevel, string> = {
  normal:
    "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  rendah:
    "bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800",
  tinggi:
    "bg-red-100 text-red-700 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800",
  "tidak-diketahui":
    "bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};

export default function KondisiTanamanPage() {
  const { lahanAktif } = useActiveLahan();

  const [sensor, setSensor] = React.useState<Record<string, any> | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadSensor() {
      if (!lahanAktif?.sensor) {
        setSensor(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getLatestSensor(lahanAktif.sensor);

        setSensor(data);
      } catch (err) {
        console.error("Gagal mengambil data sensor:", err);
        setError("Gagal mengambil data sensor.");
        setSensor(null);
      } finally {
        setLoading(false);
      }
    }

    loadSensor();
  }, [lahanAktif?.sensor]);

  const health = React.useMemo(() => evaluateSoilHealth(sensor), [sensor]);
  const style = overallStyle[health.overallStatus];
  const OverallIcon = style.icon;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* JUDUL HALAMAN */}
          <div className="px-4 sm:px-6">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
              Kondisi Tanaman &amp; Lahan
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Status kesehatan lahan dibandingkan standar pertanian, dihitung
              otomatis dari data 7 sensor tanah terbaru.
            </p>
          </div>

          <SectionCards />

          <div className="px-4 sm:px-6">
            {!lahanAktif ? (
              <Card className="@container/card bg-slate-50 dark:bg-slate-900">
                <CardContent className="flex min-h-52 items-center justify-center">
                  <div className="text-center">
                    <Sprout className="mx-auto mb-3 h-10 w-10 text-slate-400" />
                    <h2 className="font-semibold text-slate-700 dark:text-slate-200">
                      Belum Ada Lahan Aktif
                    </h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Pilih lahan terlebih dahulu pada menu Lahan untuk melihat
                      kondisi kesehatannya.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : loading ? (
              <Card className="@container/card">
                <CardContent className="flex min-h-52 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
                  Memuat data sensor...
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="@container/card">
                <CardContent className="flex min-h-52 items-center justify-center text-sm text-red-500">
                  {error}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[38%_62%] lg:items-start">
                {/* RINGKASAN STATUS KESELURUHAN */}
                <Card className={`@container/card border ${style.card}`}>
                  <CardHeader>
                    <CardTitle>Status Kesehatan Lahan</CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 dark:bg-slate-900/60`}
                      >
                        <OverallIcon className={`h-8 w-8 ${style.iconColor}`} />
                      </div>

                      <div className="min-w-0">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${style.badge}`}
                        >
                          {health.overallStatus}
                        </span>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                          {health.summary}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                        <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                          {health.countNormal}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Normal
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                        <p className="text-lg font-bold text-amber-700 dark:text-amber-400">
                          {health.countLow + health.countHigh}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Di Luar Rentang
                        </p>
                      </div>
                      <div className="rounded-xl bg-white/70 p-2.5 dark:bg-slate-900/60">
                        <p className="text-lg font-bold text-slate-500 dark:text-slate-400">
                          {health.countUnknown}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Belum Ada Data
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t border-slate-200/70 pt-3 text-sm dark:border-slate-700/70">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Lahan
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {lahanAktif.nama}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Jenis Tanaman
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {lahanAktif.tanaman || "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Luas Lahan
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {lahanAktif.luas != null ? `${lahanAktif.luas} ha` : "-"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Sensor
                        </span>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">
                          {lahanAktif.sensor || "-"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* RINCIAN PER PARAMETER */}
                <Card className="@container/card">
                  <CardHeader>
                    <CardTitle>Rincian per Parameter</CardTitle>
                  </CardHeader>

                  <CardContent className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Nilai Terukur</TableHead>
                          <TableHead>Rentang Ideal</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Catatan</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {health.parameters.map((p) => (
                          <TableRow key={p.id as string}>
                            <TableCell className="font-medium text-slate-800 dark:text-slate-100">
                              {p.label}
                            </TableCell>
                            <TableCell>
                              {p.value != null ? `${p.value} ${p.unit}` : "-"}
                            </TableCell>
                            <TableCell className="text-slate-500 dark:text-slate-400">
                              {p.idealRange}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${parameterStatusStyle[p.status]}`}
                              >
                                {p.statusLabel}
                              </span>
                            </TableCell>
                            <TableCell className="max-w-xs text-xs text-slate-500 dark:text-slate-400">
                              {p.hint}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
