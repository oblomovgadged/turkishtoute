# THY Route

> **Yolculuğun her metrekaresi.** Bir Turkish Airlines bileti satın aldıktan sonra başlayan asıl yolculuğu — varış şehrindeki rotayı — birlikte planlayan, paylaşan ve Miles&Smiles'la ödüllendiren PWA prototipi.

[![Made with React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

---

## Bu Nedir?

THY Route, Turkish Airlines'tan **bağımsız ama esinlenmiş** bir konsept üründür. Bilet satmaz; biletin **sonrasını** çözer:

1. Kullanıcı THY'nin sattığı bir uçuşu seçer.
2. Sistem varış şehri için **otomatik bir günlük plan** çıkarır.
3. Kullanıcı planı düzenler, **yardımcı pilot** (eş, arkadaş, aile) çağırır.
4. **Miles&Smiles anlaşmalı yerleri** rotaya eklenir → mil otomatik düşer.
5. Rota **PDF olarak indirilir** veya **e-posta** ile paylaşılır.

### Üç Mod

| Mod | Senaryo |
|---|---|
| **Tek Yön / Gidiş-Dönüş** | İstanbul → Roma → İstanbul, tek şehir rotası |
| **Türkiye Turu (Multi-City)** | New York'tan gelen yolcu; İstanbul → İzmir → Bodrum → Antalya → New York, her şehir için ayrı rota |
| **Esnek Multi-City** | "20 gün, 3 şehir"; sistem dağılımı kendi yapar, kullanıcı oynar |

---

## Proje Beklentileri

Detaylı vizyon: [`docs/VISION.md`](docs/VISION.md)

Kısa hâliyle:

- **Kullanıcı için**: tatil planlamayı _stres_ olmaktan çıkarıp _heyecanlı bir oyuna_ dönüştürmek.
- **Turkish Airlines için**: bilet satışını _yolculuğun başlangıcı_ kılmak, müşteriyi varıştan dönüşe kadar markaya bağlı tutmak ve **Miles&Smiles dönüşümünü** artırmak.
- **Anlaşmalı partnerler için**: hedeflenmiş ve niyet doğrulanmış müşteri akışı.

---

## Hızlı Başlangıç

```bash
# 1. Bağımlılıklar
npm install

# 2. Geliştirme sunucusu (http://localhost:5173)
npm run dev

# 3. Production build
npm run build
npm run preview
```

### Ortam Değişkenleri

`.env.local` oluşturun (örnek için `.env.example`):

```env
VITE_GOOGLE_MAPS_API_KEY=...
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_DUFFEL_TOKEN=...
```

---

## Dokümantasyon

| Belge | İçerik |
|---|---|
| [`docs/VISION.md`](docs/VISION.md) | Ürün vizyonu, hedef kitle, başarı metrikleri |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Teknik altyapı, klasör yapısı, veri akışı |
| [`docs/FRONTEND.md`](docs/FRONTEND.md) | Frontend mimarisi, bileşen kataloğu, tasarım sistemi |
| [`docs/CHANGELOG.md`](docs/CHANGELOG.md) | Bugüne kadarki sürümler ve değişiklikler |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Sıradaki adımlar, bilinen sorunlar |

---

## Şu An Çalışan Özellikler

- ✅ İki dilli (TR/EN) arayüz + para birimi seçici (TRY/USD/EUR)
- ✅ Uçuş arama (Gidiş / Dönüş / Tek yön / Türkiye Turu)
- ✅ Economy/Business kabin seçimi + 4'lü EcoFly paket karşılaştırması
- ✅ Geçmiş tarih koruması olan dinamik takvim
- ✅ Google Maps entegrasyonu (gerçek harita + tıklayarak yer ekleme)
- ✅ Çoklu rota yönetimi + LocalStorage'da saklama
- ✅ Şehir bazlı varsayılan yerler (12 Türk şehri × 4-7 gerçek lokasyon)
- ✅ "Genel Bakış" sekmesi: tüm tur timeline (gidiş + iç hat uçuşlar + dönüş)
- ✅ Miles&Smiles 6 kategorisi (Konaklama / Araç Kiralama / VIP / Tur / Finans / Yemek)
- ✅ Yardımcı pilot (co-pilot) paylaşım modeli
- ✅ EmailJS ile rota raporu gönderme
- ✅ Hesabım: kayıtlı rotalar, geçmiş yolculuklar, M&S bakiyesi
- ✅ THY logosu (yaban kazı) — favicon + uçuş satırlarında

## Bilinen Eksikler

Detay için [`docs/ROADMAP.md`](docs/ROADMAP.md).

- ⏳ Duffel API tüm havayollarını döndürür — yalnız TK/AJ filtresi yok
- ⏳ Rota PNG export henüz devre dışı
- ⏳ PNR ile bilet içe alma sayfası tasarlandı, backend bağı yok
- ⏳ Sentry crash-reporting kayıt aşamasında

---

## Lisans

Bu prototip, eğitim ve sunum amaçlıdır. Turkish Airlines, Miles&Smiles, THY ve kuş amblemi Türk Hava Yolları A.O.'nun korumalı markalarıdır. Ticari kullanım için yazılı izin gereklidir.
