import BASE_URL from "./api";

export async function getLatestSensor(sensorId: string) {
  const response = await fetch(
    `${BASE_URL}/sensor/latest/${encodeURIComponent(sensorId)}`,
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil sensor terbaru");
  }

  return response.json();
}

export async function getGrafikSensor(sensorId: string) {
  const response = await fetch(
    `${BASE_URL}/sensor/grafik/${encodeURIComponent(sensorId)}`,
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil grafik sensor");
  }

  return response.json();
}
