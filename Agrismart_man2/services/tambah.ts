import BASE_URL from "./api";

type TambahLahanRequest = {
  nama: string;
  luas: number;
  lokasi: string;
  tanaman: string;
  sensor: string;
  gambar: File | null;
};

export async function tambahLahan(data: TambahLahanRequest) {
  try {
    const formData = new FormData();

    formData.append("nama", data.nama);
    formData.append("luas", data.luas.toString());
    formData.append("lokasi", data.lokasi);
    formData.append("tanaman", data.tanaman);
    formData.append("sensor", data.sensor);

    if (data.gambar) {
      formData.append("gambar", data.gambar);
    }

    const response = await fetch(`${BASE_URL}/lahan/tambah/save`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function tampilLahan() {
  const result = await fetch(`${BASE_URL}/lahan/tambah/get`);

  if (!result.ok) {
    throw new Error("Gagal tampil");
  }

  return await result.json();
}

export async function hapusLahan(id: number | string) {
  const response = await fetch(`${BASE_URL}/lahan/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(errorText || "Gagal menghapus data lahan");
  }

  return response.json();
}
