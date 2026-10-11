import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, Eye } from "lucide-react"

const datas = [
    {
        "Tanggal": "15/05/2026",
        "Kelembaban (%)": 62,
        "pH": 28.5,
        "Suhu (C)": 28.5,
        "N (ppm)": 24,
        "P (ppm)": 16,
        "K (ppm)": 35,
        "EC (dS/m)": 1.2,
    },
    {
        "Tanggal": "16/05/2026",
        "Kelembaban (%)": 62,
        "pH": 28.5,
        "Suhu (C)": 28.5,
        "N (ppm)": 24,
        "P (ppm)": 16,
        "K (ppm)": 35,
        "EC (dS/m)": 1.2,
    },
    {
        "Tanggal": "17/05/2026",
        "Kelembaban (%)": 62,
        "pH": 28.5,
        "Suhu (C)": 28.5,
        "N (ppm)": 24,
        "P (ppm)": 16,
        "K (ppm)": 35,
        "EC (dS/m)": 1.2,
    },
]

export function DataSensor() {
    return (
        <div className="px-2 pt-4 sm:px-6 sm:pt-6">
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle>Data Sensor Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>{Object.keys(datas[0]).map((heads) => (
                                <TableHead key={heads}>{heads}</TableHead> ))}
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {datas.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{data["Tanggal"]}</TableCell>
                                    <TableCell>{data["Kelembaban (%)"]}</TableCell>
                                    <TableCell>{data["pH"]}</TableCell>
                                    <TableCell>{data["Suhu (C)"]}</TableCell>
                                    <TableCell>{data["N (ppm)"]}</TableCell>
                                    <TableCell>{data["P (ppm)"]}</TableCell>
                                    <TableCell>{data["K (ppm)"]}</TableCell>
                                    <TableCell>{data["EC (dS/m)"]}</TableCell>
                                    <TableCell>
                                        <button className="cursor-pointer"><Eye size={18} /></button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <button className="cursor-pointer rounded-[10px] bg-gray-200 text-blue-600 font-bold flex items-center justify-center gap-2 p-3 w-full hover:bg-gray-300 transition">
                        Lihat Semua Data
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </CardContent>
            </Card>
        </div>
    )
}