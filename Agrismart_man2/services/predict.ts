import BASE_URL from "./api";

export async function sendPredict(sensorId: string) {
  const response = await fetch(
    `${BASE_URL}/predict/${encodeURIComponent(sensorId)}`,
    {
      method: "POST",
    },
  );

  if (!response.ok) {
    throw new Error("Gagal melakukan prediksi");
  }

  return response.json();
}
