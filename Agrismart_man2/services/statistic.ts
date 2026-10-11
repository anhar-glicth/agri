import { getBaseUrl } from "./api";

export async function statisticData() {
    const response = await fetch(`${getBaseUrl()}/statistic`);
    if (!response.ok) {
        throw new Error("Gagal mengambil data sensor");
    }

    return await response.json();
}