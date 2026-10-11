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
      {getLahan.map((lahan: any) => {
        const isActive = lahanAktif?.id === Number(lahan.id);

        return (
          <div
            key={lahan.id}
            className={`
              grid
              grid-cols-1
              gap-4
              rounded-[10px]
              m-5
              p-4
              shadow-lg
              transition-all
              lg:grid-cols-[repeat(3,minmax(0,1fr))]
              dark:bg-slate-900
              ${isActive ? "ring-2 ring-emerald-600" : ""}
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
                src={lahan?.gambar}
                alt={lahan?.nama}
                className="
                  aspect-video
                  w-full
                  rounded-[10px]
                  object-cover
                "
              />
            </div>

            {/* =====================================================
                INFORMASI
            ===================================================== */}

            <div className="flex flex-col gap-3">
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
                <MountainSnow className="text-green-700" />

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
                <VectorSquare className="text-green-700" />
                Luas: {lahan?.luas}
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
                <Sprout className="text-green-700" />
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
                <RadioTower className="text-green-700" />
                Sensor: {lahan?.sensor}
              </h2>

              {/* STATUS LAHAN AKTIF */}

              {isActive && (
                <div
                  className="
                    mt-2
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
                flex-col
                items-center
                justify-center
                gap-4
              "
            >
              {/* EDIT */}

              <Link href={`/lahan/edit/${lahan.id}`}>
                <Button
                  type="button"
                  className="
                    w-32
                    cursor-pointer
                    border-2
                    border-green-700
                    bg-white
                    text-green-700
                    hover:bg-gray-100
                  "
                >
                  <Pencil />
                  Edit
                </Button>
              </Link>

              {/* AKTIFKAN */}

              <Button
                type="button"
                onClick={() => handleAktifkan(lahan)}
                className={`
                  w-32
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
                {isActive ? <CheckCircle2 /> : <Eye />}

                {isActive ? "Aktif" : "Aktifkan"}
              </Button>

              {/* HAPUS */}

              <Button
                type="button"
                onClick={() => handleHapus(lahan)}
                className="
                  w-32
                  cursor-pointer
                  border-2
                  border-red-600
                  bg-white
                  text-red-600
                  hover:bg-red-50
                "
              >
                <Trash />
                Hapus
              </Button>
            </div>
          </div>
        );
      })}
    </>
  );
}
