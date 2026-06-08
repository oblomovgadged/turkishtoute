# CLAUDE.md — Claude Code Talimatları

> Bu dosya, Claude Code'un projeye baktığında **tam olarak ne yapması** gerektiğini açıklar.
> Önce baştan sona oku, sonra çalışmaya başla.

---

## 🎯 Projenin Durumu

Bu **production-ready** bir THY Route iskeleti.

- ✅ **Görsel tasarım tamamlandı** (Vite + React + THY Design System)
- ✅ **Mimari hazır** (hash router, i18n, servis dosyaları)
- ✅ **Tüm sayfalar mevcut** (Home, Results, Booking, Route Builder, Account, Explore, Auth)
- ⚠️ **Backend bağlantıları stub** (firebase/emailjs/maps/flights dosyalarında "no-op")

Senin görevin: bu stub servisleri **gerçek** yapmak — **görsele dokunmadan**.

---

## ⛔ DOKUNMA KURALI

> **Aşağıdaki dosyaların hiçbirinin görselini değiştirme.**
> Sadece içlerindeki sabit veriyi gerçek API çağrılarıyla değiştir.

| Dosya | Ne yap | Ne yapma |
|---|---|---|
| `src/shell.jsx`        | İçerik değiştirme | Layout, renk, font, boşluk DOKUNMA |
| `src/pages/*.jsx`      | Mock veriyi API çağrılarıyla değiştir | JSX yapısını, stilleri, hover state'leri DOKUNMA |
| `src/i18n.jsx`         | Yeni dil string'leri ekle | Mevcutları silme |
| `src/icons.jsx`        | Yeni ikon ekle | Mevcutları değiştirme |
| `src/styles/global.css`| Yeni animasyon ekleyebilirsin | Mevcut keyframe'leri silme |
| `public/_ds/*`         | **DOKUNMA** — design system | **DOKUNMA** |
| `public/assets/*`      | **DOKUNMA** — markalı görseller | **DOKUNMA** |

Kuşkun varsa: **kullanıcıya sor**.

---

## ✅ ADIM ADIM YAPILACAKLAR

### Adım 1 — Çevre değişkenlerini kontrol et

```bash
cat .env.local 2>/dev/null || echo "Dosya yok"
```

Eğer yoksa kullanıcıya `.env.example`'ı kopyalamasını söyle, kendi anahtarlarını eklemesini iste. Devam etme.

### Adım 2 — Firebase'i bağla

`src/services/firebase.js` zaten yazılı. Sadece kullanıcının `.env.local`'a Firebase config'ini doğru girdiğinden emin ol:

```bash
npm run dev
```

Console'da `[firebase] disabled — missing VITE_FIREBASE_*` çıkmıyorsa hazır.

**Test et:** `src/pages/Auth.jsx` içinde "Giriş yap →" butonu şu an sadece route değiştiriyor. Onu şuna bağla:

```jsx
import { signIn } from '../services/firebase.js';

const handleSignIn = async () => {
  try {
    await signIn(email, password);
    go('account');
  } catch (e) {
    setError('Giriş başarısız: ' + e.message);
  }
};
```

> **Önemli:** Mevcut form alanlarına dokunma, sadece onClick handler'ı bağla.

### Adım 3 — Uçuş aramasını gerçek API'ye bağla

`src/services/flights.js` zaten `/api/flights` endpoint'ine POST atar. Eğer 404 alıyorsa stub döner.

**Yapılacak:**
1. Mevcut `thy-route.vercel.app` projesindeki `api/flights.js`'i bu projeye taşı (kullanıcıya sor)
2. Veya `.env.local`'a `VITE_FLIGHTS_ENDPOINT=https://thy-route.vercel.app/api/flights` ekle (CORS sorunu çıkabilir, ona göre)
3. `src/pages/Home.jsx`'teki `HomeBookingCard` component'inin `onSearch` çağrısını izle — şu an `go('results', {...})` yapıyor. Onu koru.
4. `src/pages/Results.jsx`'te uçuş listesi şu an sabit:

```jsx
const flights = [ /* 5 sabit */ ];
```

Bunu şununla değiştir:

```jsx
import { searchFlights } from '../services/flights.js';

const [flights, setFlights] = React.useState([]);
const [loading, setLoading] = React.useState(true);

React.useEffect(() => {
  searchFlights({ from: search.from, to: search.to, date: search.dates?.go })
    .then((res) => setFlights(res.flights))
    .finally(() => setLoading(false));
}, [search]);

if (loading) return <div style={{padding:40,textAlign:'center'}}>Uçuşlar yükleniyor…</div>;
```

> **Önemli:** Loading durumunu mevcut renk paletinden CSS değişkenleriyle yap (`var(--thy-navy)`, `var(--thy-red)`).

### Adım 4 — Google Maps'i bağla

`src/pages/RouteBuilder.jsx` içinde **`FakeMap`** adında bir SVG harita var. Onu silmeyeceğiz, **opsiyon olarak bırakacağız** (offline / no-key fallback).

**Yapılacak:**
1. `FakeMap` component'inin yanına `RealMap` adında yeni bir component yaz.
2. `loadMaps()` ile Google Maps'i yükle, marker'ları yerleştir, `drawRoute` ile yolu çiz.
3. `RouteBuilderPage` içinde:

```jsx
import { loadMaps } from '../services/maps.js';

const [useReal, setUseReal] = React.useState(Boolean(import.meta.env.VITE_GOOGLE_MAPS_KEY));
// ...
{useReal ? <RealMap ... /> : <FakeMap ... />}
```

> Görsel olarak gerçek Google Maps siyah-beyaz tema ile (custom styles) sahteki gri-mavi havayı korumalı. Google Maps "Cloud-based map styling" kullan.

### Adım 5 — EmailJS — Rapor gönder butonu

`src/pages/RouteBuilder.jsx` içinde "Rapor olarak gönder" butonu var. Şu an boş.

```jsx
import { sendTripReport } from '../services/emailjs.js';

const sendReport = async () => {
  await sendTripReport({
    to: userEmail,
    name: userName,
    trip: { city, days: 3, places: routedPlaces, totalMiles },
  });
  // Toast göster (DS'de Toast component'i var)
};
```

### Adım 6 — Yardımcı Pilot canlı sync

`RouteBuilder.jsx` içindeki state'i Firestore ile senkronize et:

```jsx
import { subscribeRoute, updateRoutePlaces } from '../services/firebase.js';

// Birisi rotaya katıldığında dinle:
React.useEffect(() => {
  if (!routeId) return;
  return subscribeRoute(routeId, (route) => setPlaces(route.places));
}, [routeId]);

// Bir yer eklendi/silindi → Firestore'a yaz:
React.useEffect(() => {
  if (!routeId) return;
  updateRoutePlaces(routeId, places);
}, [places, routeId]);
```

---

## 🚦 Her Adımdan Sonra

1. `npm run dev` ile test et
2. Console hatası var mı kontrol et
3. **Görselin bozulmadığından emin ol** (`F12` → ekran görüntüsü al, karşılaştır)
4. Git'e commit at: `git commit -m "feat: ADIM X — şu API bağlandı"`
5. Kullanıcıya kısa rapor ver:
   - Hangi dosyalar değişti
   - Yeni davranış nedir
   - Test edilebilecek senaryo

---

## 🎨 THY Route Design System

Sistem tüm tasarım token'larını sağlar. Kullanım:

```jsx
// DS bundle, main.jsx tarafından yüklenir — window'a register edilir
const DS = window.THYRouteDesignSystem_cb84b4;
const { Button, Badge, Card, FlightCard, BoardingPass } = DS;

<Button variant="primary">Uçuş ara →</Button>
<Badge variant="status">PLANLANIYOR</Badge>
```

CSS değişkenleri:
- Renkler: `var(--thy-navy)`, `var(--thy-red)`, `var(--thy-blue)`, `var(--thy-gold)`
- Fontlar: `var(--font-ui)`, `var(--font-mono)`, `var(--font-heading)`
- Easing: `var(--ease-aerodynamic)`

Detaylı dokümantasyon: bu projeyi açan kullanıcının "Design System" panelinde mevcut.

---

## ❓ Tereddüt Ettiğinde

- **Görsel mi değişecek API mi?** → API. Görsele dokunma.
- **Yeni paket ekleyeyim mi?** → Önce kullanıcıya sor.
- **Mevcut /api/ endpoint hangi şekilde veri döndürüyor?** → Kullanıcıya sor, "şu endpoint'in çıktısını gönderin" de.
- **State management eklesem mi (Redux, Zustand)?** → Hayır. React state + useContext yeterli.

---

## 🚀 Deploy

Tüm değişiklikler bittikten sonra:

```bash
git push origin main
```

Vercel otomatik build alır. Environment variables Vercel dashboard'da set edilmiş olmalı.

---

**Son söz:** Bu proje çalışıyor — bozma. Her şeyi olduğu yerde bırak, sadece **stub** dosyalardaki API'leri gerçek yap. Görsele saygı duy.
