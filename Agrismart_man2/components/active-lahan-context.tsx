"use client";

import * as React from "react";

export interface LahanAktif {
  id: number;
  nama: string;
  luas: number;
  lokasi: string;
  tanaman: string;
  sensor: string;
  gambar?: string | null;
  tanggal?: string | number;
}

interface ActiveLahanContextType {
  lahanAktif: LahanAktif | null;
  setLahanAktif: (lahan: LahanAktif) => void;
  clearLahanAktif: () => void;
}

const ActiveLahanContext = React.createContext<
  ActiveLahanContextType | undefined
>(undefined);

export function ActiveLahanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lahanAktif, setLahanAktifState] = React.useState<LahanAktif | null>(
    null,
  );

  // Ambil lahan aktif dari localStorage saat pertama kali aplikasi dibuka
  React.useEffect(() => {
    const saved = localStorage.getItem("lahanAktif");

    if (saved) {
      try {
        const data: LahanAktif = JSON.parse(saved);

        setLahanAktifState(data);
      } catch (error) {
        console.error("Gagal membaca lahan aktif dari localStorage:", error);

        localStorage.removeItem("lahanAktif");
      }
    }
  }, []);

  // Menentukan lahan aktif
  const setLahanAktif = (lahan: LahanAktif) => {
    setLahanAktifState(lahan);

    localStorage.setItem("lahanAktif", JSON.stringify(lahan));
  };

  // Menghapus lahan aktif
  const clearLahanAktif = () => {
    setLahanAktifState(null);

    localStorage.removeItem("lahanAktif");
  };

  return (
    <ActiveLahanContext.Provider
      value={{
        lahanAktif,
        setLahanAktif,
        clearLahanAktif,
      }}
    >
      {children}
    </ActiveLahanContext.Provider>
  );
}

export function useActiveLahan() {
  const context = React.useContext(ActiveLahanContext);

  if (!context) {
    throw new Error(
      "useActiveLahan harus digunakan di dalam ActiveLahanProvider",
    );
  }

  return context;
}
