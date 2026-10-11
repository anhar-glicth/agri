"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { BadgeCheck } from "lucide-react";

import { sendPredict } from "@/services/predict";

import { useActiveLahan } from "@/components/active-lahan-context";

interface Props {
  onSaved?: () => void;
}

interface Recommendation {
  sensor_id: string;
  jenisPupuk: string;
  dosis: number;
  tanggal: string;
}

export function ChartAreaInteractive({ onSaved }: Props) {
  const { lahanAktif } = useActiveLahan();

  const [result, setResult] = React.useState<Recommendation | null>(null);

  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);

  const fertilizerImages: Record<string, string> = {
    Urea: "/urea.jpg",
    MOP: "/mop.jpg",
    NPK: "/npk.jpeg",
    DAP: "/dap.jpg",
    "Zinc Sulphate": "/Zinc_Sulphate.jpg",
    Compost: "/compost.jpg",
  };

  async function handlePredict() {
    if (!lahanAktif?.sensor) {
      setResult(null);
      setError("Belum ada lahan aktif. Silakan pilih lahan terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await sendPredict(lahanAktif.sensor);

      setResult(data);
    } catch (err) {
      console.error("Gagal melakukan prediksi:", err);

      setError("Gagal mengambil rekomendasi dari sensor aktif.");
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    handlePredict();
  }, [lahanAktif?.sensor]);

  return (
    <div className="w-full">
      <Card
        className="
          @container/card
          flex
          h-full
          flex-col
          bg-green-50
          dark:bg-slate-900
        "
      >
        <CardHeader>
          <CardTitle>Rekomendasi Terakhir</CardTitle>

          <div
            className="
              flex
              items-center
              rounded-[10px]
              border-2
              border-green-300
              bg-green-200
              py-3
              dark:border-emerald-700
              dark:bg-emerald-900/50
            "
          >
            <BadgeCheck
              className="
                mx-2
                w-10
                shrink-0
                text-green-700
                dark:text-emerald-400
              "
            />

            <span
              className="
              text-sm
              text-slate-800
              dark:text-slate-200
            "
            >
              {lahanAktif
                ? `Berdasarkan kondisi sensor ${lahanAktif.sensor} pada ${lahanAktif.nama}, berikut rekomendasi pemupukan.`
                : "Pilih lahan aktif untuk melihat rekomendasi pemupukan."}
            </span>
          </div>
        </CardHeader>

        <CardContent
          className="
          flex
          flex-col
          gap-4
          overflow-hidden
          sm:flex-row
        "
        >
          {!lahanAktif ? (
            <div
              className="
              flex
              min-h-[180px]
              w-full
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              border-slate-300
              bg-white
              p-6
              text-center
              text-sm
              text-slate-500
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-400
            "
            >
              Pilih lahan aktif terlebih dahulu.
            </div>
          ) : loading ? (
            <div
              className="
              flex
              min-h-[180px]
              w-full
              items-center
              justify-center
              rounded-xl
              bg-white
              text-sm
              text-slate-500
              dark:bg-slate-800
              dark:text-slate-400
            "
            >
              Mengambil rekomendasi...
            </div>
          ) : error ? (
            <div
              className="
              flex
              min-h-[180px]
              w-full
              items-center
              justify-center
              rounded-xl
              bg-white
              p-6
              text-center
              text-sm
              text-red-500
              dark:bg-slate-800
            "
            >
              {error}
            </div>
          ) : result ? (
            <>
              <div
                className="
                flex
                w-full
                justify-center
                sm:w-52
                sm:shrink-0
              "
              >
                <img
                  src={fertilizerImages[result.jenisPupuk] ?? "/default.jpg"}
                  alt={result.jenisPupuk}
                  className="
                    aspect-square
                    w-full
                    max-w-52
                    rounded-md
                    border
                    object-cover
                  "
                />
              </div>

              <div
                className="
                w-full
                rounded-md
                border
                bg-white
                p-4
                dark:border-slate-700
                dark:bg-slate-800
              "
              >
                <div className="mb-5">
                  <span
                    className="
                    font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                  >
                    Pupuk yang direkomendasikan
                  </span>

                  <h1
                    className="
                    text-2xl
                    font-bold
                    text-green-900
                    dark:text-emerald-400
                  "
                  >
                    {result.jenisPupuk}
                  </h1>
                </div>

                <div className="mb-5">
                  <span
                    className="
                    font-semibold
                    text-slate-700
                    dark:text-slate-300
                  "
                  >
                    Dosis yang disarankan
                  </span>

                  <h1
                    className="
                    text-2xl
                    font-bold
                    text-green-900
                    dark:text-emerald-400
                  "
                  >
                    {Number(result.dosis).toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    kg/ha
                  </h1>
                </div>

                <div
                  className="
                  border-t
                  pt-3
                  text-xs
                  text-slate-500
                  dark:border-slate-700
                  dark:text-slate-400
                "
                >
                  Sensor:{" "}
                  <span className="font-semibold">{result.sensor_id}</span>
                </div>
              </div>
            </>
          ) : (
            <div
              className="
              flex
              min-h-[180px]
              w-full
              items-center
              justify-center
              rounded-xl
              bg-white
              text-sm
              text-slate-500
              dark:bg-slate-800
              dark:text-slate-400
            "
            >
              Belum ada rekomendasi.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
