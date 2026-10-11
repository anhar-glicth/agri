export type MetricStatus = 'Normal' | 'Low' | 'High' | 'Critical';

export type TabType = 'dashboard' | 'sensors' | 'plants' | 'lahan' | 'recs' | 'history';

export interface SoilMetric {
  id: string;
  name: string;
  chemicalSymbol?: string;
  simpleName: string; // Nama sederhana untuk orang awam (contoh: "Tingkat Keasinan Tanah / Garam")
  value: number;
  unit: string;
  status: MetricStatus;
  statusLabel: string; // "Aman / Normal", "Kurang", "Tinggi", dll.
  lastUpdated: string;
  optimalRange: string;
  description: string;
  simpleExplanation: string; // Penjelasan ringkas untuk petani/orang awam
  remedyHint: string;
}

export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface RecommendationItem {
  id: string;
  cropName: string;
  plotName: string;
  soilCondition: string;
  recommendation: string;
  dosage: string;
  confidence: number;
  modelType?: string; // e.g. "Random Forest ML Model v2.1"
  actionSteps?: string[];
  createdAt: string;
}

export interface PlotInfo {
  id: string;
  name: string;
  crop: string;
  areaAcres: number;
  soilType: string;
  irrigationType: string;
  plantingDate: string;
  targetHarvestDate: string;
  status: 'Healthy' | 'Needs Nitrogen' | 'Requires Irrigation' | 'Optimal';
  // 7 Soil Parameters measured:
  soilN: number;      // 1. Nitrogen (mg/kg)
  soilP: number;      // 2. Fosfor (mg/kg)
  soilK: number;      // 3. Kalium (mg/kg)
  ph: number;         // 4. pH Level
  ec: number;         // 5. EC / Electrical Conductivity (mS/cm)
  moisture: number;   // 6. Kelembaban (%)
  temp: number;       // 7. Suhu (°C)
}

export interface IoTDevice {
  id: string;
  name: string;
  plotName: string;
  battery: number;
  signalStrength: 'Strong' | 'Medium' | 'Weak';
  status: 'Online' | 'Offline' | 'Calibrating';
  type: 'Sensor 7-in-1 NPK + EC + pH + Suhu' | 'Stasiun Cuaca' | 'Sensor Kanopi Daun';
  lastPing: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  read: boolean;
}
