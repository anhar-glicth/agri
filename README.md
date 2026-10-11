# AgriSmart - Smart Agriculture System (MAN 2 Mataram)

Aplikasi IoT dan Machine Learning berbasis Web untuk monitoring kondisi tanah secara *real-time* serta memberikan rekomendasi takaran dan jenis pupuk yang optimal bagi tanaman.

---

## Arsitektur Sistem

1. **Frontend & Client Dashboard (`Agrismart_man2/`)**:
   - Next.js 16 (React, Tailwind CSS, TypeScript)
   - Static export (`output: "export"`) yang di-host di shared hosting Hostinger (`https://agrismartmrt.my.id/dashboard/`)
   - Indikator status koneksi server AI secara *real-time* (`AI Online` / `AI Offline`)
   - Desain responsif ramah smartphone dengan navigasi Hamburger Menu

2. **Backend Machine Learning & IoT Service (`ml/`)**:
   - Python FastAPI + Uvicorn di port `8000`
   - Model klasifikasi & rekomendasi pemupukan berbasis XGBoost & Scikit-learn
   - Database Supabase untuk penyimpanan data sensor IoT dan riwayat pemupukan

3. **Koneksi Backend ke Hosting Publik**:
   - Dijembatani melalui **Cloudflare Tunnel** (`cloudflared.exe`) sehingga laptop/komputer lokal dapat diakses secara publik dengan HTTPS tanpa memerlukan IP publik statis atau biaya VPS tambahan.

---

## Cara Menjalankan Sistem

### Menjalankan Backend & Tunnel (1 Klik)
Buka PowerShell di folder utama dan jalankan skrip otomatis:
```powershell
.\start-backend.ps1
```
Skrip ini akan otomatis:
1. Menyalakan Uvicorn FastAPI di `http://127.0.0.1:8000`
2. Membuka Cloudflare Tunnel ke internet dengan HTTPS

---

## Konfigurasi Cloudflare Tunnel Permanen (Opsional)

Jika ingin URL tunnel bersifat permanen (misalnya `api.agrismartmrt.my.id`):
1. Buka [Cloudflare Zero Trust Dashboard](https://one.dash.cloudflare.com/) (Gratis).
2. Pilih menu **Networks** > **Tunnels** > **Create a tunnel**.
3. Pilih konektor **Cloudflared** dan salin token instalasi.
4. Di domain Anda (`agrismartmrt.my.id`), arahkan subdomain `api.agrismartmrt.my.id` ke tunnel tersebut.
5. Jalankan tunnel dengan token permanen:
   ```powershell
   .\cloudflared.exe tunnel run --token <TOKEN_ANDA>
   ```
6. Atur variable `NEXT_PUBLIC_API_URL=https://api.agrismartmrt.my.id` di file `.env` proyek `Agrismart_man2`.
