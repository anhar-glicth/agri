import BASE_URL from "./api";

export async function getLahanById(id: string) {
  const result = await fetch(`${BASE_URL}/lahan/edit/${id}`);

  if (!result.ok) {
    throw new Error("Gagal mengambil data lahan");
  }
  return result.json();
}

export async function updateLahan(
  id: string,
  data: {
    nama: string;
    luas: number;
    lokasi: string;
    tanaman: string;
    sensor: string;
    tanggal: string;
    gambar?: File | string | null;
  },
) {
  const formData = new FormData();

  formData.append("nama", data.nama);
  formData.append("luas", String(data.luas));
  formData.append("lokasi", data.lokasi);
  formData.append("tanaman", data.tanaman);
  formData.append("sensor", data.sensor);
  formData.append("tanggal", data.tanggal);

  if (data.gambar instanceof File) {
    formData.append("gambar", data.gambar);
  }

  const result = await fetch(`${BASE_URL}/lahan/edit/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!result.ok) {
    const errorText = await result.text();

    throw new Error(errorText || "Gagal memperbarui data lahan");
  }

  return result.json();
}
