import BASE_URL from "./api";

export async function statisticData() {
    const response = await fetch(`${BASE_URL}/statistic`);
    if (!response.ok) {
        throw new Error("Gagal mengambil data sensor");
    }

    return await response.json();
}