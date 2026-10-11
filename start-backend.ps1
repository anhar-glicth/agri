Write-Host "==========================================" -ForegroundColor Green
Write-Host " Menjalankan Backend Agri IoT & ML...     " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# 1. Jalankan Uvicorn FastAPI
Start-Process python -ArgumentList "-m uvicorn main:app --host 127.0.0.1 --port 8000" -WorkingDirectory "$PSScriptRoot\ml"
Start-Sleep -Seconds 2

# 2. Jalankan Cloudflare Tunnel
Write-Host "Membuka Cloudflare Tunnel ke Internet..." -ForegroundColor Cyan
.\cloudflared.exe tunnel --url http://127.0.0.1:8000
