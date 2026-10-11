// =====================================================
// STANDAR PARAMETER TANAH
// -----------------------------------------------------
// Rentang ideal ini konsisten dengan yang ditampilkan
// pada kartu ringkasan (SectionCards) di seluruh dashboard,
// dipakai sebagai acuan standar pertanian sederhana untuk
// menilai kondisi kesehatan lahan/tanaman dari data sensor.
// =====================================================

export type HealthLevel = "rendah" | "normal" | "tinggi" | "tidak-diketahui";

export interface SensorLike {
  kelembaban?: number | string | null;
  pH_Tanah?: number | string | null;
  suhuTanah?: number | string | null;
  nitrogen?: number | string | null;
  fosfor?: number | string | null;
  kalium?: number | string | null;
  ec?: number | string | null;
}

export interface ParameterStandard {
  id: keyof SensorLike;
  label: string;
  unit: string;
  min: number;
  max: number;
  lowHint: string;
  highHint: string;
}

export const PARAMETER_STANDARDS: ParameterStandard[] = [
  {
    id: "kelembaban",
    label: "Kelembaban Tanah",
    unit: "%",
    min: 40,
    max: 60,
    lowHint: "Tanah cenderung kering. Tambah frekuensi/durasi irigasi.",
    highHint: "Tanah terlalu basah/tergenang. Kurangi irigasi dan periksa drainase.",
  },
  {
    id: "pH_Tanah",
    label: "pH Tanah",
    unit: "pH",
    min: 5.5,
    max: 7.0,
    lowHint: "Tanah cenderung asam. Pertimbangkan pengapuran (dolomit/kapur pertanian).",
    highHint: "Tanah cenderung basa. Pertimbangkan penambahan bahan organik/sulfur.",
  },
  {
    id: "suhuTanah",
    label: "Suhu Tanah",
    unit: "°C",
    min: 20,
    max: 30,
    lowHint: "Suhu tanah rendah, dapat memperlambat aktivitas akar dan mikroorganisme.",
    highHint: "Suhu tanah tinggi, pertimbangkan mulsa untuk menjaga suhu tetap stabil.",
  },
  {
    id: "nitrogen",
    label: "Nitrogen (N)",
    unit: "mg/kg",
    min: 50,
    max: 150,
    lowHint: "Nitrogen kurang, dapat menghambat pertumbuhan vegetatif (daun).",
    highHint: "Nitrogen berlebih, berisiko membuat tanaman rimbun namun lambat berbuah.",
  },
  {
    id: "fosfor",
    label: "Fosfor (P)",
    unit: "mg/kg",
    min: 30,
    max: 80,
    lowHint: "Fosfor kurang, dapat menghambat perkembangan akar dan pembungaan.",
    highHint: "Fosfor berlebih, dapat mengganggu penyerapan unsur hara lain.",
  },
  {
    id: "kalium",
    label: "Kalium (K)",
    unit: "mg/kg",
    min: 40,
    max: 100,
    lowHint: "Kalium kurang, dapat menurunkan ketahanan dan kualitas hasil panen.",
    highHint: "Kalium berlebih, dapat mengganggu keseimbangan hara lain di tanah.",
  },
  {
    id: "ec",
    label: "Electrical Conductivity (EC)",
    unit: "mS/cm",
    min: 1.0,
    max: 2.0,
    lowHint: "EC rendah, ketersediaan hara terlarut kemungkinan minim.",
    highHint: "EC tinggi, waspada risiko salinitas/kelebihan pupuk pada tanah.",
  },
];

export interface ParameterResult {
  id: keyof SensorLike;
  label: string;
  unit: string;
  value: number | null;
  min: number;
  max: number;
  idealRange: string;
  status: HealthLevel;
  statusLabel: string;
  hint: string;
}

export type OverallStatus = "Sehat" | "Perlu Perhatian" | "Kritis" | "Tidak Ada Data";

export interface SoilHealthResult {
  overallStatus: OverallStatus;
  summary: string;
  parameters: ParameterResult[];
  countLow: number;
  countHigh: number;
  countNormal: number;
  countUnknown: number;
}

function toNumber(value: number | string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function evaluateParameter(
  standard: ParameterStandard,
  rawValue: number | string | null | undefined,
): ParameterResult {
  const value = toNumber(rawValue);
  const idealRange = `${standard.min}–${standard.max} ${standard.unit}`;

  if (value === null) {
    return {
      id: standard.id,
      label: standard.label,
      unit: standard.unit,
      value: null,
      min: standard.min,
      max: standard.max,
      idealRange,
      status: "tidak-diketahui",
      statusLabel: "Belum ada data",
      hint: "Data sensor untuk parameter ini belum tersedia.",
    };
  }

  if (value < standard.min) {
    return {
      id: standard.id,
      label: standard.label,
      unit: standard.unit,
      value,
      min: standard.min,
      max: standard.max,
      idealRange,
      status: "rendah",
      statusLabel: "Rendah",
      hint: standard.lowHint,
    };
  }

  if (value > standard.max) {
    return {
      id: standard.id,
      label: standard.label,
      unit: standard.unit,
      value,
      min: standard.min,
      max: standard.max,
      idealRange,
      status: "tinggi",
      statusLabel: "Tinggi",
      hint: standard.highHint,
    };
  }

  return {
    id: standard.id,
    label: standard.label,
    unit: standard.unit,
    value,
    min: standard.min,
    max: standard.max,
    idealRange,
    status: "normal",
    statusLabel: "Normal",
    hint: "Berada pada rentang ideal untuk pertumbuhan tanaman.",
  };
}

// Menilai kondisi kesehatan lahan/tanaman secara keseluruhan
// dari satu snapshot data sensor terbaru.
export function evaluateSoilHealth(sensor: SensorLike | null | undefined): SoilHealthResult {
  const parameters = PARAMETER_STANDARDS.map((standard) =>
    evaluateParameter(standard, sensor?.[standard.id] ?? null),
  );

  const countLow = parameters.filter((p) => p.status === "rendah").length;
  const countHigh = parameters.filter((p) => p.status === "tinggi").length;
  const countNormal = parameters.filter((p) => p.status === "normal").length;
  const countUnknown = parameters.filter((p) => p.status === "tidak-diketahui").length;
  const countBermasalah = countLow + countHigh;

  let overallStatus: OverallStatus;
  let summary: string;

  if (countUnknown === parameters.length) {
    overallStatus = "Tidak Ada Data";
    summary = "Data sensor belum tersedia untuk lahan ini.";
  } else if (countBermasalah === 0) {
    overallStatus = "Sehat";
    summary = "Seluruh parameter berada pada rentang ideal standar pertanian.";
  } else if (countBermasalah <= 2) {
    overallStatus = "Perlu Perhatian";
    summary = `${countBermasalah} dari ${parameters.length} parameter berada di luar rentang ideal.`;
  } else {
    overallStatus = "Kritis";
    summary = `${countBermasalah} dari ${parameters.length} parameter berada di luar rentang ideal. Segera lakukan tindakan perbaikan.`;
  }

  return {
    overallStatus,
    summary,
    parameters,
    countLow,
    countHigh,
    countNormal,
    countUnknown,
  };
}
