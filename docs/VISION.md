# Vizyon — THY Route

## Problem

Bir uçak bileti satın almak, yolculuğun **%10**'udur. Geri kalan **%90** — varış şehrinde ne yapılacağı, nerede yeneceği, hangi müzenin saat kaçta açık olduğu, eşin hangi yeri görmek istediği — kullanıcının **kendi başına** çözmek zorunda kaldığı, fragmente bir kâbustur:

- 5 farklı sekme: Google Maps, TripAdvisor, Instagram, blog yazıları, otel sitesi
- Eşle iletişim: WhatsApp'ta link bombardımanı
- Mil hesabı: havayolu sitesinde, ayrı bir sayfada, kimse bakmıyor
- Sonuçta: kararsızlık, yarım kalan planlar, harcanmış mil potansiyeli

## Çözüm

**THY Route**, biletin satın alındığı anda devreye giren bir "yolculuk yönetim merkezi"dir.

Sistem:
1. Bileti referans alarak şehir/tarih bilir.
2. AI ile günlük plan kurar (sürelere, yürüme mesafelerine, açılış saatlerine duyarlı).
3. Kullanıcı planı **tek bir harita** üzerinde sürükleyerek değiştirir.
4. Bir bağlantı paylaşıp **eşini/dostunu** aynı haritaya çağırır → birlikte düzenlerler.
5. Rotaya eklenen her **anlaşmalı yer** otomatik mil kazandırır.
6. Plan tamamlandığında PDF/PNG indirilir, e-postayla paylaşılır.

---

## Hedef Kitle

### Birincil

**"Çift / Aile Premium Yolcu"**
- 30-55 yaş, orta-üst gelir.
- Yılda 2-4 uluslararası yolculuk.
- Miles&Smiles üyesi, Elite veya Elite Plus.
- Tatil planlamayı _angarya_ olarak görür, _ortağa devretmek_ ister.

### İkincil

- **Genç Çift (28-35)** — Bal ayı, romantik kaçamak; "yardımcı pilot" özelliği kritik.
- **3 Kuşak Aile** — Büyükanne dahil planlama; kolay paylaşım şart.
- **Multi-city İş Gezgini** — 3 şehirde 10 gün, otomatik dağılım istiyor.

---

## Başarı Metrikleri (Hipotez)

| Metrik | Hedef | Ölçüm Yolu |
|---|---|---|
| Bilet → Rota dönüşümü | %35 | Firebase analytics |
| Co-pilot daveti kabul | %50 | Davet linki tıklama |
| Mil-kazandıran etkinlik / kullanıcı | 3+ | M&S API webhook |
| Tekrar gelen kullanıcı | %40 | 30 gün retention |
| Net Promoter Score | 60+ | Rota tamamlama anketi |

---

## İş Modeli

THY Route bilet satmaz — gelir üç ayaktan:

1. **Turkish Airlines** ile beyaz etiket / iş ortaklığı: müşteri sadakati ve M&S kullanım artışı karşılığında lisans/destek bedeli.
2. **Anlaşmalı partner komisyonu**: kullanıcı rotaya bir Hilton ekleyip rezerve ettiğinde Hilton'dan komisyon.
3. **Premium katman**: ücretsiz sürümde tek yardımcı pilot; ücretli sürümde sınırsız + offline indirme + öncelikli AI rota.

---

## "Neden Şimdi?"

- **Bağlamsal AI** (Gemini, Claude) ilk kez gerçek seyahat planlaması yapacak olgunlukta.
- **Google Maps API** mobil-first, fiyat-uyumlu hale geldi.
- **Mils&Smiles** kart ortaklıkları (Garanti, Yapı Kredi, Akbank) zirvede — partner ağı kullanıma hazır.
- THY'nin **2026 hedefi**: 150 milyon yolcu, %30 dijital katma değer payı. THY Route tam bu açıkta oturuyor.

---

## Kapsam Dışı

Bu üründe **yok** — ve olmayacak:

- Bilet satışı (thy.com'a yönlendirme yapılır)
- Yolcu bilgisi / pasaport girişi (bilet THY'de alınır)
- Ödeme akışı
- Vize / sigorta üst-satış pop-up'ları
- Reklam banner'ları
