# Frontend Yaklaşımı

## Felsefe

> Her ekran bir **uçak kokpiti** kadar hassas, bir **business class koltuğu** kadar premium hissettirmeli.

THY Route iki yüzeyi birlikte taşır:
- **Booking Portal** — açık, beyaz, turkishairlines.com tarzı
- **Cockpit / Map Journal** — koyu navy, glassmorphism, gold vurgular

Tek bir uygulamada ikisi de yaşar; sayfaya göre arka plan ve kart yüzeyi değişir, **token seti aynıdır**.

---

## Tasarım Sistemi Bağlantısı

Proje `_ds/thy-route-design-system-cb84b4/` altında **bound** bir tasarım sistemine sahip.

Yüklenen sırasıyla:
```html
<link rel="stylesheet" href="_ds/.../tokens/fonts.css">
<link rel="stylesheet" href="_ds/.../tokens/colors.css">
<link rel="stylesheet" href="_ds/.../tokens/typography.css">
<link rel="stylesheet" href="_ds/.../tokens/spacing.css">
<link rel="stylesheet" href="_ds/.../styles.css">
<script src="_ds/.../_ds_bundle.js"></script>
```

Sonra:
```js
const { Button, Badge, Card, FlightCard, PartnerItem } = window.THYRouteDesignSystem_cb84b4;
```

### Token Kullanımı

Asla hex kodu yazmıyoruz. Her renk `var(--*)`:

```jsx
style={{
  background: 'var(--thy-navy)',
  color: 'var(--thy-gold-light)',
  borderRadius: 'var(--radius-card)',
}}
```

---

## Tipografi

| Aile | Kullanım |
|---|---|
| **Outfit** (300-900) | UI başlıkları, gövde |
| **Montserrat 800** | Sadece logotype + eyebrow'lar |
| **Inter** | Uzun gövde metni (raporlar) |
| **JetBrains Mono** | Uçuş kodları, IATA, saat, koordinat — "enstrüman yüzü" |

Eyebrow'lar daima `UPPERCASE` + `letter-spacing: 2px` + `font-weight: 800`.

---

## Renk Kuralları

### Açık yüzeyde (Booking)
- Background: `#F3F5F8`
- Kart: `#FFFFFF` + `1px solid #E2E8F0` + soft drop shadow
- Birincil CTA: `var(--thy-red)` (`#B7312C`)
- İkincil CTA: `var(--thy-navy)` border'lı

### Koyu yüzeyde (Cockpit / Hero / Route Builder header)
- **Asla `#000` veya `#FFF` değil.** Katmanlar:
  - `#050B14` (harita overlay)
  - `#0A1628` (bg)
  - `#0B1A33` / `#0F2244` (panel)
  - `rgba(255,255,255,0.045)` (cam kart)
  - `.075` (hover)
- Hover'da **gold hairline border** ekleniyor.

---

## Geometri

| Token | Değer | Nerede |
|---|---|---|
| `--radius-pill` | 999px | Pill butonlar, dil/para seçici |
| `--radius-card` | 8px | Kartlar, butonlar |
| `--radius-panel` | 12px | Büyük paneller |
| `--radius-input` | 4px | Form alanları, chip'ler |

Spacing 4-8-16-24-32-48 — başka bir değer yok.

---

## Motion

| Easing | Süre | Kullanım |
|---|---|---|
| `cubic-bezier(.16,1,.3,1)` | 650ms | Panel/sayfa girişi ("aerodynamic") |
| `cubic-bezier(.4,0,.2,1)` | 250ms | Hover/state geçişi |
| `cubic-bezier(.4,0,.2,1)` | 150ms | Buton press |

İmza animasyonlar:
- Buton üzerinde **soldan sağa shimmer** sweep
- Live badge'in yanındaki **nabız atan yeşil nokta**
- Boarding-pass üzerinde **uçak kayışı**
- Sayfa girişlerinde `fadeInUp`

`@media (prefers-reduced-motion: no-preference)` ile gating zorunlu.

---

## Bileşen Kataloğu

| Bileşen | Konum | Kullanım |
|---|---|---|
| `Header` / `Footer` | `shell.jsx` | Tüm sayfalarda |
| `HeroBg` | `shell.jsx` | Home + Auth hero arka planı |
| `DatesPopover` | `Home.jsx` | Tarih seçici, geçmiş gün kilitli |
| `AirportField` | `Home.jsx` | Autocomplete'li havalimanı arama |
| `Tracker` | `Results.jsx` | 3 adımlı progress (Gidiş/Dönüş/Rota) |
| `FlightRow` + `CabinTile` + `PackageTable` | `Results.jsx` | Uçuş listesi |
| `SelectionBar` | `Results.jsx` | Üstte sticky seçim özeti |
| `MapPanel` | `RouteBuilder.jsx` | Google Maps + numaralı pin'ler |
| `DailyPlan` | `RouteBuilder.jsx` | Saat-saat itinerary |
| `MilesPanel` | `RouteBuilder.jsx` | 6 kategorili M&S partner accordion |
| `OverviewPanel` | `RouteBuilder.jsx` | Multi-city tur timeline |
| `CitySegmentRow` + `FlightStrip` | `RouteBuilder.jsx` | Genel Bakış satırları |

---

## Erişilebilirlik

- Tüm tıklanabilir öğeler `<button>` veya `<a>`.
- Modal/dropdown'lar `Escape` ile kapanır.
- Klavye navigasyonu Tab sırasına uygun.
- Renk kontrastı WCAG AA (navy zemin üzerine gold metin = 4.8:1 ✓).
- Animasyonlar reduced-motion'a saygı duyar.

---

## Çoklu Dil

`STR` sözlüğü `i18n.jsx` içinde. Kullanım:

```jsx
const t = useT();
<h1>{t('home.headline')}</h1>
```

Tüm string'ler hem TR hem EN. Yeni key ekleyince **iki dilini de** doldur.

---

## Geliştirme İpuçları

- Bir sayfanın test'i için: `index.html` Vite ile aç, `#sayfa` ekleyerek direkt git.
- Yeni şehir eklemek: `src/data/cityPlaces.js` → `TR_CITY_PLACES` objesine entry ekle (lat/lng zorunlu).
- M&S partner eklemek: `RouteBuilder.jsx` içinde `MS_PARTNERS_BY_CAT` objesine ekle.
- Yeni dil string'i: `i18n.jsx` → `STR` objesine `{ tr, en }` çifti.
