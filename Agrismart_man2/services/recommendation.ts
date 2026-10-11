import BASE_URL from "./api";

export async function saveRecommendation(data: any) {
  const response = await fetch(`${BASE_URL}/recommendation/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gagal menyimpan rekomendasi: ${errorText}`);
  }

  return response.json();
}

export async function lastRecommendation() {
  const response = await fetch(`${BASE_URL}/recommendation/last`);

  if (!response.ok) {
    const errorText = await response.text();

    console.error("LAST RECOMMENDATION ERROR:", response.status, errorText);

    throw new Error(`Gagal mengambil rekomendasi (${response.status})`);
  }

  return await response.json();
}
