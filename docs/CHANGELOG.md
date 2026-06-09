# Changelog

Tüm sürümler kronolojik. En yenisi en üstte.

---

## v13 — THY Logo Sabitleme

- ➕ `public/assets/thy-goose.svg` — yalın yaban kazı (favicon)
- 🔧 Uçuş listesi alt çubuğunda **her zaman** "Turkish Airlines" + kaz logosu (Duffel BA/LH dönse de marka THY kalır)
- 🔧 Sekme favicon'u → kaz

## v12 — Şehir-Aware Başlık + Takvim + Dropdown Fix

- 🐛 İstanbul→Lizbon seçildiğinde başlık "Roma" gözüküyordu → şehir adı dinamik
- 🐛 Türkiye Turu Genel Bakış'ta hâlâ Roma yazıyordu → "GENEL BAKIŞ" + paket adı
- 🐛 Takvim 2-7 Haziran (geçmiş) tarihleri seçtiriyordu → disabled + üstü çizili, dinamik ay
- 🐛 Tarih/Yolcu/Havalimanı dropdown'ları "Nasıl Çalışır" section'ı altına kalıyordu → `isolation: isolate` + z-index katmanlandı
- 🔧 `HeroBg` z-index 5'e yükseltildi

## v11 — Şehir-Bazlı Default Places + Genel Bakış

- ➕ `src/data/cityPlaces.js` — 12 Türk şehri × 4-7 gerçek lokasyon (Ayasofya, Anıtkabir, Göbeklitepe, Kapadokya balon turu, vb.)
- ➕ Multi-city için **"🗺️ Genel Bakış"** sekmesi — gidiş + iç hat uçuşları + dönüşü timeline'da gösterir
- ➕ Multi-city başlıkta paket adı altın rozeti (`Ege & Akdeniz`)
- 🐛 Şehir sekmesi değişince Bodrum'da beyaz ekran → her segment kendi place cache'ini tutar (ref-backed)
- 🐛 Tüm şehirlerde Roma yerleri görünüyordu → segment-aware places

## v10 — Multi-City "Tur Oluştur"

- ➕ Hazır paket seçici (Klasik Üçlü / Ege & Akdeniz / Tarih Turu)
- ➕ Esnek multi-city: süre + şehir sayısı → sistem otomatik dağıtır
- ➕ İç hat uçuşlar (THY + AnadoluJet) otomatik yerleştirilir
- ➕ Düzenle butonu ile uçuş saati ayarlama

## v9 — PNR İçe Alma Tasarımı

- ➕ Hesabım sayfasında "PNR ile bilet ekle" alanı (UI hazır, backend bağı yok)
- 🔧 Kayıtlı rotalarda silme butonu
- 🔧 Yaklaşan yolculuklar artık gerçekten silinebilir

## v8 — Gerçek Rota Linkleri

- 🔧 EmailJS template'inde gerçek paylaşılabilir link (`/r/<route-id>`)
- 🔧 Link tıklanınca rota düzenlemeye açılıyor
- 🐛 PDF indir butonu artık jsPDF ile gerçekten PDF üretir
- 🐛 Açılır menü beyaz panel altında kalıyordu → z-index düzeltildi

## v7 — Duffel + Mil Hesaplayıcı

- ➕ Duffel test API entegrasyonu — gerçek offer'lar
- ➕ Mil hesaplayıcı (`services/miles.js`) — uçuş + kabin + mesafe
- 🔧 Her uçuş kartında tahmini kazanılacak mil

## v6 — Google Maps Gerçek Entegrasyonu

- ➕ Google Maps JS API yüklendi
- ➕ Pin'lere tıklayınca info-window + "Rotaya ekle"
- ➕ Custom kırmızı numaralı pin'ler
- 🔧 Harita alanı büyütüldü, en-boy oranı korundu

## v5 — EmailJS Rapor

- ➕ "Rapor olarak gönder" butonu çalışır
- ➕ E-posta promptu, başarı/hata toast'u
- 🔧 PDF ekli mail (template'e bağlı)

## v4 — M&S Kategorileri + Çoklu Rota + Bilet Yeniden

- ➕ M&S 6 kategori accordion (Konaklama / Araç Kiralama / VIP / Tur / Finans / Yemek)
- ➕ Çoklu rota yönetimi + LocalStorage
- ➕ Economy/Business kabin seçimi + 4 EcoFly paketi
- ➕ Para birimi seçici (TRY/USD/EUR)
- ➖ Yolcu bilgisi + ödeme sayfaları kaldırıldı (THY satış yapmaz)
- ➕ Dönüş uçuşu sayfası
- ➕ Share menüsü (PDF/PNG/Link)
- ➕ Hesabım > Kayıtlı Rotalarım

## v3 — Hesabım + Explore + Auth

- ➕ Hesabım dashboard (yaklaşan, geçmiş, M&S bakiyesi)
- ➕ Explore sayfası — şehir vitrini
- ➕ Mock M&S girişi

## v2 — Route Builder

- ➕ Sol harita + sağ panel (Rotam / Yerler / M&S / Yardımcı Pilot)
- ➕ Günlük plan sürükle-bırak
- ➕ Yardımcı pilot davet linki

## v1 — İskelet

- ➕ Home (hero + arama formu)
- ➕ Results (uçuş listesi)
- ➕ Hash-based router
- ➕ TR/EN i18n
- ➕ Tasarım sistemi entegrasyonu
