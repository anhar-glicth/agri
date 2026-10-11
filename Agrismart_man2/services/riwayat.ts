import BASE_URL from "./api";

export async function getLatestRek() {
    const response = await fetch(`${BASE_URL}/sensor`);
    if (!response.ok) {
        throw new Error("Gagal mengambil data sensor");
    }

    return await response.json();
}