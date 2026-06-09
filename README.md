# Geri Alma Paketi — Mobile v1/v2'yi sil

## Adım 1 — SİLİNECEK dosyalar (bilgisayardaki projenden)

| Dosya | Aksiyon |
|---|---|
| `src/styles/mobile.css` | **SİL** |
| `src/MobileNav.jsx` | **SİL** |

Windows'ta: dosyayı sağ tık → **Delete**. Çöp kutusuna gider, geri alabilirsin.

## Adım 2 — ÜZERİNE YAZILACAK 3 dosya (bu klasörden kopyala)

| Bu klasördeki dosya | Bilgisayardaki yer |
|---|---|
| `src/main.jsx` | `thy-route-app/src/main.jsx` (üzerine yaz) |
| `src/App.jsx` | `thy-route-app/src/App.jsx` (üzerine yaz) |
| `index.html` | `thy-route-app/index.html` (üzerine yaz) |

## Adım 3 — Git push

```powershell
cd "C:\Users\borak\Downloads\web sitesi\thy-route-app"
git add .
git commit -m "revert: remove mobile-first layer (going with separate mobile design)"
git push
```

## Sonuç

Web siten yine masaüstü hâlinde, mobil yamaları temizlendi. Şimdi Claude Design'da
ayrı bir mobil tasarım yapabilirsin (prompt'u sohbette).
