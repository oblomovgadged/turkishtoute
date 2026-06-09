# Mobile v2 — küçük yama

## Sadece BİR dosya değişti.

| Dosya | İşlem |
|---|---|
| `src/styles/mobile.css` | Üzerine yaz (v1'in üstüne) |

## Ne düzeldi

- **Üst bar:** "TURKISH AIRLINES" wordmark küçüldü, "ROUTE" altın rozeti gizlendi, "Hesabım" sadece ikon oldu — alt alta sığacak.
- **Arama formu:** NEREDEN/NEREYE aynı satırda iki sütun, TARİH ve YOLCU/KABİN ayrı satırlarda, "Uçuş ara →" tam genişlikte alttan kırmızı buton.

## Kurulum

1. Bu klasördeki `src/styles/mobile.css`'i bilgisayardaki projende aynı yere kopyala (üzerine yaz)
2. PowerShell:
   ```
   git add .
   git commit -m "fix: mobile header + search form layout"
   git push
   ```
3. Vercel 1-2 dakikada deploy eder, telefondan tekrar aç.