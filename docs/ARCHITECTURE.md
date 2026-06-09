# Teknik Altyapı

## Yığın

| Katman | Teknoloji | Neden |
|---|---|---|
| Build | **Vite 5** | ESM-native, anlık HMR, basit env yönetimi |
| Framework | **React 18.3** | Geniş ekosistem, tasarım sisteminin bağlı olduğu paradigma |
| Dil | **JavaScript (JSX)** | Hızlı prototip; TS'ye geçiş yol haritada |
| Stil | **CSS-in-JSX (inline)** + DS tokens | Bileşen başına lokal, tema kayması yok |
| Routing | **Hash-based custom router** | Vendor lock-in yok, statik hosting'de zahmetsiz |
| Harita | **Google Maps JavaScript API** | Marker, info-window, autocomplete, places search |
| Backend | **Firebase** (Firestore + Auth + Analytics) | Realtime co-pilot için ideal |
| Uçuş Verisi | **Duffel Test API** | Gerçek-gibi offer'lar (production: amadeus/THY MCP) |
| E-posta | **EmailJS** | Backend kurmadan client'tan tetiklenebilir |
| Hata İzleme | **Sentry** | Üretimde rota crash'lerini yakalama |
| Hosting | **Vercel** | Otomatik git deploy, edge cache, ücretsiz katman |

---

## Klasör Yapısı

```
thy-route-app/
├─ public/
│  ├─ _ds/                       # Tasarım sistemi (bound design system)
│  │   ├─ tokens/                # colors, fonts, typography, spacing
│  │   ├─ styles.css
│  │   └─ _ds_bundle.js
│  └─ assets/                    # Logo, favicon, kaz svg, panorama
├─ src/
│  ├─ App.jsx                    # Router + LangProvider sarmalayıcı
│  ├─ i18n.jsx                   # TR/EN sözlüğü, currency context, useMoney
│  ├─ icons.jsx                  # Lucide-uyumlu line icon seti
│  ├─ shell.jsx                  # Header, Footer, dil + para seçici, HeroBg
│  ├─ data/
│  │   └─ cityPlaces.js          # 12 Türk şehri × 4-7 yer
│  ├─ pages/
│  │   ├─ Home.jsx               # Hero + arama formu + paket seçici
│  │   ├─ Results.jsx            # Uçuş listesi, 3-step tracker
│  │   ├─ RouteBuilder.jsx       # Harita + günlük plan + M&S panel
│  │   ├─ Account.jsx            # Yaklaşan/Geçmiş + Kayıtlı Rotalar
│  │   ├─ Explore.jsx            # Şehir vitrini
│  │   └─ Auth.jsx               # M&S girişi mock
│  └─ services/
│      ├─ duffel.js              # Uçuş offer'ları
│      ├─ emailjs.js             # Rapor gönderme
│      ├─ firebase.js            # Init + co-pilot sync
│      ├─ pdf.js                 # jsPDF ile rota → PDF
│      └─ miles.js               # Mil hesaplayıcı
├─ api/                          # Vercel serverless (gerekirse)
│   └─ flights.js
├─ .env.example
├─ index.html
├─ vite.config.js
└─ package.json
```

---

## Veri Akışı

```
        ┌──────────────┐    Search    ┌──────────────┐
        │  Home (form) │─────────────▶│  Results.jsx │
        └──────────────┘              └──────┬───────┘
               │                             │ Duffel API
               │                             ▼
               │                      ┌──────────────┐
               │                      │  Duffel offers│
               │                      └──────┬───────┘
               │                             │
               │            User picks       │
               │            Outbound + Return│
               ▼                             ▼
        ┌──────────────────────────────────────────┐
        │            RouteBuilder.jsx               │
        │  ┌─────────┐  ┌────────┐  ┌──────────┐  │
        │  │  Map    │  │ Daily  │  │   M&S    │  │
        │  │  + Pins │  │  Plan  │  │ Partners │  │
        │  └────┬────┘  └───┬────┘  └─────┬────┘  │
        │       │           │              │       │
        │       └───────────┴──────────────┘       │
        │                   │                       │
        │            ┌──────▼──────┐               │
        │            │ places[]    │ (state)       │
        │            │ + segment   │               │
        │            │   cache     │               │
        │            └──────┬──────┘               │
        └───────────────────┼──────────────────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
       ┌──────────┐ ┌────────────┐ ┌─────────┐
       │ LocalSt. │ │  EmailJS   │ │  jsPDF  │
       │ kayıtlı  │ │  rapor     │ │  PDF    │
       │ rotalar  │ │  gönderim  │ │  indir  │
       └──────────┘ └────────────┘ └─────────┘
```

---

## State Yönetimi

**Global context yok** — bilinçli bir tercih:

- **`LangContext`** + **`CurrencyContext`** (sadece i18n) — `i18n.jsx`
- **Sayfa state'i**: doğrudan `useState` / `useRef`
- **Persisting**: `localStorage` (`thyroute_lang`, `thyroute_cur`, `thyroute_saved_routes`, `thyroute_active_route`)
- **Realtime sync** (co-pilot): Firestore document subscription — `RouteBuilder` mount'unda

Bu boyutta bir proje için Redux/Zustand fazladan karmaşıklık olurdu.

---

## Routing

Hash-based custom router. `App.jsx` içinde:

```js
window.addEventListener('hashchange', applyRoute)
```

URL şemaları:
- `#home`
- `#results`
- `#route?city=İzmir&tour=ege-akdeniz`
- `#account`
- `#explore`
- `#auth`

Avantaj: Vercel rewrite config gerektirmez, statik sunucularda 404 sorunu yok.

---

## Güvenlik Notları

- API anahtarları **VITE_ prefix** ile env'den okunur → bundle'a girer. Sadece **public-safe** anahtarlar (Firebase web SDK, Google Maps domain-restricted, EmailJS public key).
- Gizli sırlar (Duffel secret) **serverless** üzerinden proxy'lenmeli (`api/flights.js`).
- Firebase Firestore'a yazma: yalnız auth'lu kullanıcı, kendi document'i altında — security rules zorunlu.

---

## Performans

- **Code splitting** (Vite default): her sayfa ayrı chunk.
- **Resim**: `public/assets/` altındakiler `<img>` ile, lazy değil (henüz az resim var).
- **Google Maps**: `loading="async"` script attribute.
- **localStorage** debounce'lu yazılır (rota değişikliği başına).

---

## Deploy

GitHub'a push → Vercel otomatik deploy.

Branch stratejisi:
- `main` → production (`thy-route.vercel.app`)
- `dev` → preview (her PR için ayrı URL)

Environment variables Vercel dashboard'unda set edilir; `VITE_*` prefixliler client'a, prefixsizler serverless'a gider.
