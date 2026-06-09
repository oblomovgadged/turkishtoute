# Yol Haritası

## Yakın Vade (1-2 Sprint)

### Backend Sağlamlaştırma
- [ ] Duffel sorgusuna `filters.operating_carriers: ['TK','AJ']` ekle — sadece THY/AnadoluJet sonucu
- [ ] Duffel secret'ı serverless proxy'e taşı (`api/flights.js`)
- [ ] Firebase security rules: kullanıcı yalnız kendi rotalarını yazabilir
- [ ] Sentry production DSN aktif et

### UX Eksikleri
- [ ] PNG export (rota görseli) — html2canvas
- [ ] PNR ile bilet içe alma — backend tarafı
- [ ] Yardımcı pilot davet linki gerçek olmalı (Firestore document share)
- [ ] PDF Türkçe karakter problemi (jsPDF custom font)

### Performans
- [ ] Görsel optimizasyonu (WebP + lazy loading)
- [ ] Route splitting — `Account` ve `Explore` lazy import
- [ ] Service Worker (PWA install + offline route view)

---

## Orta Vade (3-6 ay)

### AI Asistan
- [ ] Gemini API ile dinamik rota önerisi
- [ ] "Bana bunu yakın bir alternatif öner" butonu
- [ ] Hava durumu duyarlı plan (yağmurlu günde müze öner)

### Sosyal Katman
- [ ] Tamamlanmış rotalar feed'i (Explore sayfası)
- [ ] Rota beğenme / kopyalama
- [ ] Yorum + fotoğraf ekleme

### THY Entegrasyonları
- [ ] THY MCP ile gerçek uçuş verisi
- [ ] Miles&Smiles gerçek bakiye API'si
- [ ] Lounge eşleme (Business yolcu için)

---

## Uzun Vade

- [ ] iOS/Android native (React Native)
- [ ] Apple Wallet boarding pass entegrasyonu
- [ ] Şirket B2B paneli (kurumsal seyahat)
- [ ] Beyaz etiket SDK (Pegasus, Anadolu Jet ayrı brand)

---

## Bilinen Sorunlar

| # | Sorun | Önem | Not |
|---|---|---|---|
| 1 | Duffel BA/LH gibi tüm havayollarını döner | 🔴 Yüksek | Filtre eklenecek |
| 2 | PNG indir butonu placeholder | 🟡 Orta | html2canvas ile çözülebilir |
| 3 | jsPDF Türkçe karakterler kayıyor | 🟡 Orta | Custom font load gerekir |
| 4 | Mobil görünüm henüz optimize değil | 🟡 Orta | Tasarım sistemi mobil token'ları var |
| 5 | Co-pilot real-time sync mock | 🔴 Yüksek | Firestore subscription eklenecek |

---

## Karar Verilmesi Gerekenler

- [ ] **Auth provider**: Firebase Auth mı, kendi backend'imizle SSO mu?
- [ ] **Resmi THY entegrasyonu**: MCP mi, Amadeus mu, doğrudan THY API mi?
- [ ] **PDF üretimi**: Client-side jsPDF mi, serverless Puppeteer mi?
- [ ] **Mil hesabı**: Statik formül mü, gerçek M&S API'si mi?
- [ ] **Multi-city otomatik dağılım**: Heuristic mi, AI mi?
