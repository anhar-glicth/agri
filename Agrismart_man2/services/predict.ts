import { getBaseUrl } from "./api";

export async function sendPredict(sensorId: string) {
  const response = await fetch(
    `${getBaseUrl()}/predict/${encodeURIComponent(sensorId)}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Gagal melakukan prediksi");
  }

  return response.json();
}
