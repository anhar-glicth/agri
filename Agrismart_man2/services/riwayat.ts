import { getBaseUrl } from "./api";

export async function getLatestRek() {
    const response = await fetch(`${getBaseUrl()}/sensor`);
    if (!response.ok) {
        throw new Error("Gagal mengambil data sensor");
    }

    return await response.json();
}