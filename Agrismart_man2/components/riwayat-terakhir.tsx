"use client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { getLatestRek } from "@/services/riwayat";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  refresh: boolean;
}

interface RiwayatData {
  id: number;
  dosis: number;
  jenisPupuk: string;
  sensor_id: number;
  tanggal: string;
}

export function RiwayatDash({ refresh }: Props) {
  const [result, setResult] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<RiwayatData | null>(null);

  async function riwayatPredict() {
    try {
      const sensorRiwayat = await getLatestRek();
      setResult(sensorRiwayat);
    } catch (error) {
      console.error("Gagal mengambil riwayat:", error);
    }
  }

  useEffect(() => {
    riwayatPredict();
  }, [refresh]);

  // Format tanggal menjadi: 24 Agustus 2026
  function formatTanggal(tanggal: string) {
    if (!tanggal) return "-";

    const date = new Date(tanggal);

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  // Format dosis menjadi: 173,91 kg/ha
  function formatDosis(dosis: number) {
    return `${Number(dosis).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} kg/ha`;
  }

  return (
    <div className="px-2 pt-4 sm:px-6 sm:pt-6">
      <Card className="@container/card">
        <CardHeader>
          <CardTitle>Riwayat Pemupukan</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Rekomendasi</TableHead>
                <TableHead>Dosis</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {result?.data
                ?.slice(0, 5)
                .map((data: RiwayatData, index: number) => (
                  <TableRow key={data.id ?? index}>
                    <TableCell>{formatTanggal(data.tanggal)}</TableCell>

                    <TableCell>{data.jenisPupuk}</TableCell>

                    <TableCell>{formatDosis(data.dosis)}</TableCell>

                    <TableCell>
                      <button
                        onClick={() => setSelectedData(data)}
                        className="
                          cursor-pointer
                          rounded-lg
                          p-2
                          text-slate-600
                          transition
                          hover:bg-slate-100
                          hover:text-blue-600
                          dark:text-slate-300
                          dark:hover:bg-slate-800
                          dark:hover:text-blue-400
                        "
                        title="Lihat detail"
                        aria-label="Lihat detail rekomendasi"
                      >
                        <Eye size={18} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}

              {(!result?.data || result.data.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    Belum ada riwayat pemupukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <Link href="/riwayat-rekomendasi">
            <button
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-[10px]
                bg-gray-200
                p-3
                font-bold
                text-blue-600
                transition
                hover:bg-gray-300
                dark:bg-slate-800
                dark:text-blue-400
                dark:hover:bg-slate-700
              "
            >
              Lihat Semua Riwayat
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </CardContent>
      </Card>

      <Dialog
        open={selectedData !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedData(null);
          }
        }}
      >
        <DialogContent
          className="
            max-w-md
            rounded-2xl
            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              Detail Riwayat Pemupukan
            </DialogTitle>

            <DialogDescription>
              Informasi rekomendasi pemupukan yang tersimpan.
            </DialogDescription>
          </DialogHeader>

          {selectedData && (
            <div className="space-y-5">
              {/* INFORMASI UTAMA */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Tanggal
                  </p>

                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {formatTanggal(selectedData.tanggal)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Jenis Pupuk
                  </p>

                  <p className="mt-1 font-medium text-slate-900 dark:text-white">
                    {selectedData.jenisPupuk}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Dosis
                  </p>

                  <p className="mt-1 text-lg font-bold text-emerald-600 dark:text-lime-400">
                    {formatDosis(selectedData.dosis)}
                  </p>
                </div>
              </div>

              {/* PEMBATAS */}
              <div className="border-t border-slate-200 dark:border-slate-700" />

              {/* INFORMASI TEKNIS */}
              <div>
                <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">
                  Informasi Teknis
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      ID Riwayat
                    </p>

                    <p className="mt-1 font-medium text-slate-900 dark:text-white">
                      {selectedData.id}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Sensor ID
                    </p>

                    <p className="mt-1 font-medium text-slate-900 dark:text-white">
                      {selectedData.sensor_id}
                    </p>
                  </div>
                </div>
              </div>

              {/* KETERANGAN */}
              <div
                className="
                  rounded-xl
                  border
                  border-emerald-100
                  bg-emerald-50
                  p-4
                  dark:border-emerald-900/50
                  dark:bg-emerald-950/30
                "
              >
                <p className="text-sm leading-relaxed text-emerald-800 dark:text-emerald-300">
                  Rekomendasi pemupukan telah tersimpan berdasarkan data sensor
                  yang digunakan pada proses rekomendasi.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
