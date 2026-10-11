"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLatestRek } from "@/services/riwayat";
import { ChevronDown, Eye } from "lucide-react";
import { useEffect, useState } from "react";

interface RiwayatData {
  id: number;
  dosis: number;
  jenisPupuk: string;
  sensor_id: number;
  tanggal: string;
}

export function RiwayatRek() {
  const [search, setSearch] = useState("");
  const [jenisPupuk, setJenisPupuk] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [result, setResult] = useState<any>(null);
  const [selectedData, setSelectedData] = useState<RiwayatData | null>(null);
  const itemsPerPage = 5;

  const handleChange = (e: { target: { value: string } }) => {
    setSearch(e.target.value);
  };

  const dataFilters =
    result?.data?.filter((data: any) => {
      const searchData = search.toLowerCase();

      const cocokSearch =
        data.tanggal.includes(searchData) ||
        data.jenisPupuk.toLowerCase().includes(searchData) ||
        String(data.dosis).toLowerCase().includes(searchData);

      const cocokPupuk = !jenisPupuk || data.jenisPupuk === jenisPupuk;

      return cocokSearch && cocokPupuk;
    }) ?? [];

  async function riwayatPredict() {
    try {
      const sensorRiwayat = await getLatestRek();
      setResult(sensorRiwayat);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    riwayatPredict();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, jenisPupuk]);

  const totalPages = Math.ceil(dataFilters.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = dataFilters.slice(startIndex, endIndex);

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
        <CardHeader className="flex justify-between">
          <Input
            placeholder="Cari rekomendasi..."
            value={search}
            onChange={handleChange}
            className="w-[30%]"
          />
          <DropdownMenu>
            <DropdownMenuTrigger className="w-40 px-2" asChild>
              <Button variant="outline">
                {jenisPupuk || "Semua Jenis pupuk"}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setJenisPupuk("")}>
                Semua Jenis pupuk
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJenisPupuk("Urea")}>
                Urea
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJenisPupuk("NPK")}>
                NPK
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJenisPupuk("DAP")}>
                DAP
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJenisPupuk("MOP")}>
                MOP
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJenisPupuk("Zinc_Sulphate")}>
                Zinc Sulphate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setJenisPupuk("Compost")}>
                Compost
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              {currentData?.map((data: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{data.tanggal}</TableCell>
                  <TableCell>{data.jenisPupuk}</TableCell>
                  <TableCell>{data.dosis} kg/ha</TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelectedData(data)}
                      className="cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center items-center p-3">
            {dataFilters.length === 0 && <p>Data Kosong</p>}
          </div>

          <div className="flex justify-center items-center gap-2 mt-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Sebelumnya
            </Button>

            <span>
              Halaman {currentPage} dari {totalPages || 1}
            </span>

            <Button
              variant="outline"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Selanjutnya
            </Button>
          </div>
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
