# THY Route

Türk Hava Yolları benzeri seyahat planlama uygulaması.
**Vite + React 18 + Firebase + EmailJS + Google Maps.**

> Bu paket, görsel tasarımı tamamlanmış bir **production-ready** iskelet.
> Tüm UI hazır — sadece **API key'lerinizi** ve **/api/** serverless fonksiyonlarınızı bağlamanız yeterli.

---

## 🚀 Hızlı Başlangıç (10 dakika)

### 1. Paketi bilgisayarınıza alın

```bash
cd thy-route-app
npm install
```

### 2. Çevre değişkenlerini ayarlayın

```bash
cp .env.example .env.local
```

Sonra `.env.local` dosyasını açın ve **kendi anahtarlarınızı** yazın:

```ini
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_PROJECT_ID=thy-route
# ... vs.

VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...

VITE_GOOGLE_MAPS_KEY=AIza...
```

> **Not:** API key olmadan da uygulama açılır — sadece o servisler "no-op" çalışır. Her servis kendi durumunu console'a yazar.

### 3. Geliştirme sunucusu başlat

```bash
npm run dev
```

Tarayıcı otomatik açılır → `http://localhost:5173`

### 4. Üretim derlemesi

```bash
npm run build       # dist/ klasörü oluşur
npm run preview     # dist/'i lokal test et
```

---

## 📂 Klasör Yapısı

```
thy-route-app/
├── public/                  # Statik dosyalar (build sırasında kopyalanır)
│   ├── _ds/                 # THY Route Design System bundle + tokens
│   └── assets/              # Logolar, panorama, harita arka planı
├── src/
│   ├── main.jsx             # Giriş noktası — DS bundle'ı yükler, App'i mount eder
│   ├── App.jsx              # Hash router (#home, #results, #booking, ...)
│   ├── i18n.jsx             # TR/EN dil sistemi (LangProvider + useT)
│   ├── icons.jsx            # Lucide tarzı SVG ikon seti
│   ├── shell.jsx            # Header + Footer + HeroBg + SectionHeader
│   ├── styles/global.css    # Genel resetler ve animasyonlar
│   ├── pages/
│   │   ├── Home.jsx         # Ana sayfa (hero + arama + popüler + partnerler)
│   │   ├── Results.jsx      # Arama sonuçları (filtre + uçuş listesi)
│   │   ├── Booking.jsx      # Yolcu → Ödeme → Onay (boarding pass)
│   │   ├── RouteBuilder.jsx # Harita + günlük plan + Co-pilot + Mil
│   │   ├── Account.jsx      # Hesabım & yolculuklar
│   │   ├── Explore.jsx      # 12 destinasyon
│   │   └── Auth.jsx         # Giriş / Kayıt
│   └── services/            # ← BURADA BACKEND'E BAĞLANIYORUZ
│       ├── firebase.js      # Auth, Firestore, gerçek zamanlı co-pilot
│       ├── emailjs.js       # Rota raporu e-postası
│       ├── maps.js          # Google Maps yükleyici
│       └── flights.js       # Uçuş arama API'si
├── index.html
├── vite.config.js
├── package.json
└── .env.example
```

---

## 🔌 Servisleri Bağlama

Her servis kendi içinde belgelendi (dosyaların üstündeki yorumlar). Hızlı özet:

### Firebase
1. https://console.firebase.google.com → proje oluştur
2. Authentication → Email/Password etkinleştir
3. Firestore Database → "Start in production mode"
4. Project Settings → "Your apps" → Web App ekle → config'i `.env.local`'a yapıştır

### EmailJS
1. https://dashboard.emailjs.com → Service ekle (Gmail vb.)
2. Template oluştur — şu alanları kullanır: `{{to_email}}`, `{{user_name}}`, `{{trip_html}}`
3. Public Key + Service ID + Template ID → `.env.local`

### Google Maps
1. https://console.cloud.google.com → projeyi seç
2. APIs & Services → **Maps JavaScript API** ve **Places API** etkinleştir
3. Credentials → API Key oluştur → HTTP referrer kısıtlaması ekle (`localhost:*`, prod domain)
4. Key'i `.env.local`'a yapıştır

### Flight API
İki seçenek:
- **A)** Mevcut kendi backend'inizi kullanın → `.env.local`'da `VITE_FLIGHTS_ENDPOINT=https://thy-route.vercel.app/api/flights`
- **B)** Bu projeye yeni serverless fonksiyon ekleyin → `api/flights.js` (Vercel otomatik tanır)

---

## 🚢 Vercel'e Deploy

1. Bu klasörü yeni bir **GitHub repo**'ya pushlayın:

```bash
cd thy-route-app
git init
git add .
git commit -m "İlk commit — production iskeleti"
git remote add origin https://github.com/SIZIN_KULLANICI_ADINIZ/thy-route-app.git
git push -u origin main
```

2. https://vercel.com → "Import Project" → GitHub repo'yu seçin
3. **Framework Preset** otomatik "Vite" olarak algılanır → "Deploy" basın
4. Deploy bittikten sonra → **Project Settings → Environment Variables**:
   - `.env.local`'daki TÜM `VITE_*` değişkenlerini buraya da ekleyin
   - "Redeploy" basın
5. Tamam — `https://thy-route-app.vercel.app` üzerinde canlı.

---

## 🛠️ Sonraki Adımlar (Claude Code ile)

Bu pakette **görsel ve mimari tamamlandı**. Eklenecekler:
- Gerçek THY uçuş API entegrasyonu (`src/services/flights.js` zaten stub döndürüyor)
- Booking ödeme entegrasyonu (Iyzico, Stripe vb.)
- Route Builder'daki sahte SVG haritayı gerçek Google Maps ile değiştirme (`maps.js` yükleyici hazır)
- Yardımcı Pilot canlı sync'i `subscribeRoute` ile aktif etme

Detaylı talimatlar için bkz. **`CLAUDE.md`**.

---

## 📞 Destek

Bir şey çalışmıyor mu? Console'a bakın — her servis kendi durumunu ("disabled — missing VITE_*" vb.) yazar. Sonra adım adım gidin: önce Firebase, sonra Maps, sonra EmailJS.
