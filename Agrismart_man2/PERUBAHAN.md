# Catatan Perubahan — AgriSmart (MAN 2 Mataram)

Ringkasan perubahan yang dilakukan pada front end sesuai permintaan.

## 1. Halaman Home dihilangkan
- `app/page.tsx` sekarang langsung melakukan redirect ke `/dashboard`.
  Membuka domain/root aplikasi akan langsung menampilkan Dashboard.
- `components/landing-page.tsx` (halaman marketing/landing lama) dihapus
  karena sudah tidak dipakai.

## 2. Logo MAN 2 Mataram
- Ditambahkan di **sidebar**, tepat di samping nama aplikasi "AgriSmart",
  lengkap dengan keterangan "MAN 2 Mataram • Smart Agriculture Program"
  di bawahnya (lihat `components/app-sidebar.tsx`).
- Ditambahkan juga versi ringkas di **header atas** untuk tampilan mobile,
  saat sidebar sedang tersembunyi (`components/site-header.tsx`).
- File logo: `public/logo-man2mataram.svg`.

  ⚠️ **PENTING:** Karena tidak ada akses internet saat proses pengerjaan,
  logo yang terpasang saat ini adalah **logo placeholder/sementara**
  (bukan logo resmi MAN 2 Mataram). Silakan ganti file
  `public/logo-man2mataram.svg` dengan file logo resmi sekolah
  (bisa `.svg` atau `.png`, cukup gunakan nama file yang sama — jika
  memakai `.png`, sesuaikan ekstensi pada 2 file di atas). Logo akan
  otomatis muncul di sidebar dan header begitu file diganti.

## 3. Tampilan lebih modern & profesional
- Menu navigasi kini memakai satu sumber data bersama: `lib/nav.ts`,
  dipakai oleh sidebar maupun header agar selalu konsisten.
- Header atas sekarang menampilkan **judul halaman aktif** (mengganti
  tombol "Halaman Utama" yang sudah tidak relevan setelah Home dihapus).
- Ukuran teks yang sebelumnya terlalu kecil (9–11px) di sidebar dan
  kartu ringkasan sensor dinaikkan agar lebih mudah dibaca.
- Perbaikan bug warna pada mode gelap (dark mode): beberapa kartu
  sebelumnya berubah menjadi hijau terang mencolok di dark mode
  (`dark:bg-emerald-400`) — sudah diperbaiki menjadi warna gelap yang
  konsisten dan enak dipandang di `components/section-cards.tsx` dan
  `components/rekomendasi-pemupukan.tsx`.

## 4. Menu baru: "Kondisi Tanaman"
- Route baru: `/kondisi-tanaman` (muncul di sidebar setelah "Monitoring Tanah").
- Menilai kondisi kesehatan lahan/tanaman secara otomatis dari data
  7 sensor terbaru, dibandingkan dengan standar pertanian yang sama
  seperti yang sudah ditampilkan di kartu ringkasan dashboard
  (kelembaban, pH, suhu, Nitrogen, Fosfor, Kalium, EC).
- Menampilkan:
  - Status keseluruhan: **Sehat** / **Perlu Perhatian** / **Kritis**
    (0 parameter di luar rentang = Sehat, 1–2 = Perlu Perhatian,
    3+ = Kritis).
  - Rincian per parameter: nilai terukur, rentang ideal, status
    (Normal/Rendah/Tinggi), dan catatan tindakan singkat.
- Logika penilaian ada di `lib/soil-health.ts` — mudah disesuaikan jika
  standar/rentang ideal ingin diubah di kemudian hari.

## 5. Kalkulator dosis pupuk berdasarkan luas lahan
- Pada halaman **Rekomendasi Pemupukan**, setelah melakukan prediksi,
  kini tersedia kolom **"Luas lahan untuk perhitungan (ha)"**.
- Nilai awal mengikuti luas lahan aktif, tetapi bisa diubah/ditambah
  secara manual untuk mensimulasikan penambahan luas lahan.
- Total kebutuhan pupuk (kg) dihitung otomatis secara langsung:
  `dosis per hektar (kg/ha) × luas lahan (ha)`.

## Yang perlu Anda lakukan
1. **Ganti logo placeholder** di `public/logo-man2mataram.svg` dengan
   logo resmi MAN 2 Mataram.
2. Jalankan seperti biasa:
   ```
   npm install
   npm run dev
   ```
3. Cek halaman baru di menu **"Kondisi Tanaman"** dan kalkulator dosis
   di halaman **"Rekomendasi Pemupukan"**.

Catatan: proyek ini tidak di-build/diinstal ulang di lingkungan
pengerjaan (tidak ada akses internet untuk `npm install`), sehingga
seluruh perubahan diverifikasi melalui pemeriksaan sintaks TypeScript/JSX
dan tinjauan manual menyeluruh terhadap konvensi kode yang sudah ada.
Disarankan menjalankan `npm run dev` / `npm run build` di komputer Anda
untuk pengecekan akhir sebelum digunakan secara produksi.
