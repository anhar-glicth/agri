"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { tampilLahan, hapusLahan } from "@/services/tambah";

import {
  Eye,
  MountainSnow,
  Pencil,
  RadioTower,
  Sprout,
  Trash,
  VectorSquare,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";

import { useActiveLahan } from "@/components/active-lahan-context";

export function CardLahan() {
  const [getLahan, setGetLahan] = useState<any[]>([]);

  const { lahanAktif, setLahanAktif, clearLahanAktif } = useActiveLahan();

  // =====================================================
  // HAPUS LAHAN
  // =====================================================

  const handleHapus = async (lahan: any) => {
    const yakin = window.confirm(
      `Apakah kamu yakin ingin menghapus "${lahan.nama}"?`,
    );

    if (!yakin) {
      return;
    }

    try {
      // Hapus dari database
      await hapusLahan(lahan.id);

      // Jika lahan yang dihapus sedang aktif,
      // bersihkan context dan localStorage
      if (lahanAktif?.id === Number(lahan.id)) {
        clearLahanAktif();
      }

      // Hapus dari tampilan
      setGetLahan((prev) =>
        prev.filter((item) => Number(item.id) !== Number(lahan.id)),
      );

      alert("Data lahan berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus lahan:", error);

      alert("Gagal menghapus data lahan");
    }
  };

  // =====================================================
  // AMBIL DATA LAHAN
  // =====================================================

  async function loadLahan() {
    try {
      const datas = await tampilLahan();

      setGetLahan(datas?.data ?? []);
    } catch (error) {
      console.error("Gagal mengambil data lahan:", error);
    }
  }

  useEffect(() => {
    loadLahan();
  }, []);

  // =====================================================
  // AKTIFKAN LAHAN
  // =====================================================

  const handleAktifkan = (lahan: any) => {
    setLahanAktif({
      id: Number(lahan.id),
      nama: lahan.nama,
      luas: Number(lahan.luas),
      lokasi: lahan.lokasi,
      tanaman: lahan.tanaman,
      sensor: lahan.sensor,
      gambar: lahan.gambar,
      tanggal: lahan.tanggal,
    });
  };

  return (
    <>
      {getLahan.map((lahan: any, index: number) => {
        const isActive = Number(lahanAktif?.id) === Number(lahan.id);

        return (
          <div
            key={lahan.id ?? `lahan-${index}`}
            className={`
              grid
              grid-cols-1
              gap-4
              rounded-[10px]
              m-4
              sm:m-5
              p-4
              shadow-lg
              transition-all
              lg:grid-cols-[repeat(3,minmax(0,1fr))]
              dark:bg-slate-900
              ${isActive ? "ring-2 ring-emerald-600 bg-emerald-50/20" : "bg-white"}
            `}
          >
            {/* =====================================================
                GAMBAR
            ===================================================== */}

            <div
              className="
                relative
                w-full
                lg:max-w-sm
                lg:pr-5
              "
            >
              <img
                src={
                  lahan?.gambar ||
                  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop"
                }
                alt={lahan?.nama || "Lahan"}
                className="
                  aspect-video
                  w-full
                  rounded-[10px]
                  object-cover
                  border
                  border-slate-200
                  dark:border-slate-800
                "
              />
            </div>

            {/* =====================================================
                INFORMASI
            ===================================================== */}

            <div className="flex flex-col gap-3 justify-center">
              <h1
                className="
                  flex
                  items-center
                  gap-3
                  text-[20px]
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                <MountainSnow className="text-emerald-600 h-6 w-6 shrink-0" />
                {lahan?.nama}
              </h1>

              <h2
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-700
                  dark:text-slate-300
                "
              >
                <VectorSquare className="text-emerald-600 h-5 w-5 shrink-0" />
                Luas: {lahan?.luas} Hektar
              </h2>

              <h2
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-700
                  dark:text-slate-300
                "
              >
                <Sprout className="text-emerald-600 h-5 w-5 shrink-0" />
                Tanaman: {lahan?.tanaman}
              </h2>

              <h2
                className="
                  flex
                  items-center
                  gap-3
                  text-slate-700
                  dark:text-slate-300
                "
              >
                <RadioTower className="text-emerald-600 h-5 w-5 shrink-0" />
                Sensor: <span className="font-semibold text-emerald-700 dark:text-emerald-400">{lahan?.sensor}</span>
              </h2>

              {/* STATUS LAHAN AKTIF */}

              {isActive && (
                <div
                  className="
                    mt-1
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-emerald-700
                    dark:bg-emerald-950
                    dark:text-emerald-300
                  "
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Sensor sedang aktif
                </div>
              )}
            </div>

            {/* =====================================================
                AKSI
            ===================================================== */}

            <div
              className="
                flex
                flex-wrap
                sm:flex-row
                lg:flex-col
                items-center
                justify-center
                gap-3
                pt-2
                lg:pt-0
              "
            >
              {/* EDIT */}

              <Link href={`/lahan/edit?id=${lahan.id}`}>
                <Button
                  type="button"
                  className="
                    w-28
                    sm:w-32
                    cursor-pointer
                    border-2
                    border-green-700
                    bg-white
                    text-green-700
                    hover:bg-gray-100
                  "
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </Link>

              {/* AKTIFKAN */}

              <Button
                type="button"
                onClick={() => handleAktifkan(lahan)}
                className={`
                  w-28
                  sm:w-32
                  cursor-pointer
                  border-2

                  ${
                    isActive
                      ? `
                        border-emerald-700
                        bg-emerald-700
                        text-white
                        hover:bg-emerald-800
                      `
                      : `
                        border-blue-600
                        bg-white
                        text-blue-600
                        hover:bg-blue-50
                      `
                  }
                `}
              >
                {isActive ? <CheckCircle2 className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}

                {isActive ? "Aktif" : "Aktifkan"}
              </Button>

              {/* HAPUS */}

              <Button
                type="button"
                onClick={() => handleHapus(lahan)}
                className="
                  w-28
                  sm:w-32
                  cursor-pointer
                  border-2
                  border-red-600
                  bg-white
                  text-red-600
                  hover:bg-red-50
                "
              >
                <Trash className="h-4 w-4 mr-1" />
                Hapus
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
