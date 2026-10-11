"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getLatestSensor } from "@/services/sensor";
import { BadgeCheck } from "lucide-react";

// function getStatus(parameter: string, value: any) {
//   switch (parameter) {
//     case "pH_Tanah":
//       if (value >= 6 && value <= 7) return "pH tanah berada pada kisaran ideal untuk pertumbuhan tanaman.";
//       if ((value < 6 || value > 7)) return "pH tanah berada di luar kisaran ideal dan dapat menghambat penyerapan unsur hara.";

//     case "kelembaban":
//       if (value >= 60 && value <= 80) return "Kelembaban tanah berada pada rentang ideal untuk pertumbuhan tanaman.";
//       if ((value < 60 || value > 80)) return "Kelembaban tanah tidak sesuai sehingga dapat memengaruhi pertumbuhan tanaman.";

//     case "ec":
//       if (value >= 0.8 && value <= 2.5) return "Menunjukkan ketersediaan unsur hara yang baik di dalam tanah.";
//       if ((value < 0.8 || value > 2.5)) return "Terlalu rendah atau terlalu tinggi sehingga menunjukkan kondisi tanah kurang optimal.";

//     case "nitrogen":
//       if ((value >= 20 || value <= 40)) return "Kandungan nitrogen mencukupi untuk mendukung pertumbuhan vegetatif tanaman.";
//       if ((value < 20 || value > 40)) return "Kandungan nitrogen rendah sehingga berpotensi menghambat pertumbuhan tanaman.";

//     case "fosfor":
//       if (value <= 15) return "Terlalu rendah sehingga dapat menghambat perkembangan akar dan pembentukan bunga atau buah.";
//       if (value >= 16 || value <= 50) return "Berada pada tingkat yang memadai untuk mendukung perkembangan akar dan pembungaan.";
//       if (value > 50) return "Tinggi";

//     case "kalium":
//       if (value < 125) return "Terlalu rendah dan dapat menurunkan kualitas hasil panen dan ketahanan tanaman";
//       if (value >= 126 || value <= 400) return "Mencukupi untuk mendukung kualitas dan ketahanan tanaman.";
//       if (value > 400) return "Sangat Tinggi";
//       return "Kurang";

//     case "suhuTanah":
//       if ((value < 15 || value > 30)) return "Berada di luar kisaran ideal sehingga dapat menghambat pertumbuhan tanaman";
//       if ((value >= 16 && value < 30)) return "Suhu tanah berada pada kisaran optimal untuk aktivitas akar dan mikroorganisme tanah.";

//     default:
//       return "-";
//   }
// }

// const fields = [
//   "pH_Tanah",
//   "kelembaban",
//   "ec",
//   "nitrogen",
//   "fosfor",
//   "kalium",
//   "suhuTanah",
// ];

// const labels: Record<string, string> = {
//   pH_Tanah: "pH Tanah",
//   kelembaban: "Kelembaban",
//   ec: "EC",
//   nitrogen: "Nitrogen",
//   fosfor: "Fosfor",
//   kalium: "Kalium",
//   suhuTanah: "Suhu Tanah",
// };

export function StatusTanah() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("2d");

  // const [sensor, setSensor] = React.useState<any>(null)

  //   React.useEffect(() => {
  //     loadSensor();
  //   }, []);

  //   async function loadSensor(){
  //     try{
  //       const data = await getLatestSensor();
  //       setSensor(data);
  //     }catch(err){
  //       console.error(err);
  //     }

  //   }

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  return (
    <Card className="@container/card bg-green-50 dark:text-slate-900 flex flex-col h-full">
      <CardHeader>
        <CardTitle>Status Parameter</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="w-[80%]">
          <div className="flex items-center gap-3 my-2">
            <BadgeCheck className="text-green-700" />
            <h1 className="">Lakukan pemupukan sesuai rekomendasi sistem</h1>
          </div>
          <div className="flex items-center gap-3 my-2">
            <BadgeCheck className="text-green-700" />
            <h1 className="">
              Jaga kelembaban tanah dengan irigasi yang cukup
            </h1>
          </div>
          <div className="flex items-center gap-3 my-2">
            <BadgeCheck className="text-green-700" />
            <h1 className="">
              Lakukan monitoring secara rutin untuk hasil optimal
            </h1>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
