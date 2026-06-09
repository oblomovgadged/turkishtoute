/**
 * THY Route — City-aware default places for the Route Builder.
 *
 * Single-city mode (e.g. a Roma trip) drops the user into a full sample
 * itinerary so the demo "comes alive". Multi-city tour mode (Türkiye
 * Turu) instead seeds each segment with 3-4 genuinely-relevant Turkish
 * landmarks per city — never Roma — so switching tabs doesn't leak the
 * wrong content across cities.
 *
 * Coordinates are in fractional viewport units (x∈[0..800], y∈[0..600])
 * for the FakeMap fallback. The real Google Map ignores them and uses
 * the city's lat/lng + lat/lng-on-place where available.
 */

/* ------------------ Sample international itinerary (Roma) ------------------ */
const ROMA_PLACES = [
  { id: 1, name: 'Colosseum',            cat: 'museum', catLabel: 'Müze',     x: 420, y: 360, rating: 4.7, duration: '2sa',  time: '09:00', partner: false, inRoute: true,  order: 0 },
  { id: 2, name: 'Foro Romano',          cat: 'museum', catLabel: 'Tarihî',   x: 400, y: 320, rating: 4.6, duration: '1.5sa',time: '11:30', partner: false, inRoute: true,  order: 1 },
  { id: 3, name: 'Pantheon',             cat: 'museum', catLabel: 'Tarihî',   x: 300, y: 240, rating: 4.8, duration: '1sa',  time: '14:00', partner: false, inRoute: true,  order: 2 },
  { id: 4, name: 'Trastevere — Da Enzo', cat: 'rest',   catLabel: 'Restoran', x: 160, y: 380, rating: 4.5, duration: '2sa',  time: '20:00', partner: true,  partnerSub: 'M&S · 1.500 mil/yemek', miles: 1500, inRoute: true, order: 3 },
  { id: 5, name: 'Trevi Çeşmesi',        cat: 'view',   catLabel: 'Manzara',  x: 340, y: 200, rating: 4.7, duration: '30dk', time: '10:00', partner: false, inRoute: true,  order: 4 },
  { id: 6, name: 'Hotel Artemide',       cat: 'hotel',  catLabel: 'Otel',     x: 380, y: 160, rating: 4.6, duration: '—',    time: '21:00', partner: true,  partnerSub: 'M&S · 500 mil/gece',    miles: 500,  inRoute: true, order: 5 },
  { id: 7, name: 'Vatikan Müzesi',       cat: 'museum', catLabel: 'Müze',     x: 200, y: 200, rating: 4.8, duration: '3sa',  time: '',      partner: false, inRoute: false, order: null },
  { id: 8, name: 'Borghese Galerisi',    cat: 'museum', catLabel: 'Müze',     x: 620, y: 180, rating: 4.7, duration: '2sa',  time: '',      partner: false, inRoute: false, order: null },
  { id: 9, name: 'Mercato di Testaccio', cat: 'shop',   catLabel: 'Pazar',    x: 450, y: 510, rating: 4.4, duration: '1.5sa',time: '',      partner: true,  partnerSub: 'M&S · 2 mil/1 ₺',       miles: 800,  inRoute: false, order: null },
  { id: 10, name: 'Roscioli',            cat: 'rest',   catLabel: 'Restoran', x: 280, y: 280, rating: 4.6, duration: '2sa',  time: '',      partner: true,  partnerSub: 'M&S · 1.200 mil/yemek', miles: 1200, inRoute: false, order: null },
  { id: 11, name: 'Hotel de Russie',     cat: 'hotel',  catLabel: 'Lüks otel',x: 360, y: 110, rating: 4.9, duration: '—',    time: '',      partner: true,  partnerSub: 'M&S · 1.000 mil/gece',  miles: 1000, inRoute: false, order: null },
  { id: 12, name: 'Piazza Navona',       cat: 'view',   catLabel: 'Meydan',   x: 270, y: 220, rating: 4.7, duration: '45dk', time: '',      partner: false, inRoute: false, order: null },
];

/* ------------------ Per-city Turkish itineraries ------------------ */
/* Each city ships with 4 in-route + 2-3 suggestion places. Lat/lng are
   real so the Google Map can place numbered red pins correctly. */
const TR_CITY_PLACES = {
  'İstanbul': [
    { id: 1, name: 'Ayasofya',        cat: 'museum', catLabel: 'Müze',     lat: 41.0086, lng: 28.9802, x: 400, y: 300, rating: 4.7, duration: '2sa',   time: '09:30', partner: false, inRoute: true,  order: 0 },
    { id: 2, name: 'Topkapı Sarayı',   cat: 'museum', catLabel: 'Saray',    lat: 41.0115, lng: 28.9833, x: 410, y: 280, rating: 4.7, duration: '2.5sa', time: '12:00', partner: false, inRoute: true,  order: 1 },
    { id: 3, name: 'Kapalıçarşı',     cat: 'shop',   catLabel: 'Çarşı',    lat: 41.0106, lng: 28.9680, x: 360, y: 310, rating: 4.6, duration: '2sa',   time: '15:30', partner: false, inRoute: true,  order: 2 },
    { id: 4, name: 'Mikla',            cat: 'rest',   catLabel: 'Restoran', lat: 41.0297, lng: 28.9745, x: 380, y: 240, rating: 4.6, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.500 mil/yemek', miles: 1500, inRoute: true,  order: 3 },
    { id: 5, name: 'Galata Kulesi',    cat: 'view',   catLabel: 'Manzara',  lat: 41.0256, lng: 28.9744, x: 370, y: 250, rating: 4.5, duration: '1sa',   time: '',      partner: false, inRoute: false, order: null },
    { id: 6, name: 'Hilton Bosphorus', cat: 'hotel',  catLabel: 'Otel',     lat: 41.0466, lng: 28.9919, x: 430, y: 210, rating: 4.5, duration: '—',     time: '',      partner: true,  partnerSub: 'M&S · 500 mil/gece',    miles: 500,  inRoute: false, order: null },
    { id: 7, name: 'Dolmabahçe Sarayı',cat: 'museum', catLabel: 'Saray',    lat: 41.0392, lng: 29.0001, x: 450, y: 220, rating: 4.7, duration: '2sa',   time: '',      partner: false, inRoute: false, order: null },
  ],
  'Ankara': [
    { id: 1, name: 'Anıtkabir',                   cat: 'museum', catLabel: 'Anıt',     lat: 39.9255, lng: 32.8369, x: 380, y: 280, rating: 4.9, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Anadolu Medeniyetleri Müzesi', cat: 'museum', catLabel: 'Müze',    lat: 39.9407, lng: 32.8627, x: 420, y: 250, rating: 4.8, duration: '2sa',   time: '13:00', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Ankara Kalesi',                cat: 'view',   catLabel: 'Manzara', lat: 39.9398, lng: 32.8638, x: 420, y: 245, rating: 4.6, duration: '1sa',   time: '15:30', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Çiçekçi Sokak',                cat: 'rest',   catLabel: 'Restoran',lat: 39.9075, lng: 32.8590, x: 410, y: 320, rating: 4.4, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.200 mil/yemek', miles: 1200, inRoute: true, order: 3 },
    { id: 5, name: 'Atakule',                      cat: 'shop',   catLabel: 'AVM',     lat: 39.8943, lng: 32.8643, x: 420, y: 360, rating: 4.4, duration: '1.5sa', time: '',      partner: false, inRoute: false, order: null },
  ],
  'İzmir': [
    { id: 1, name: 'Kemeraltı Çarşısı',        cat: 'shop',   catLabel: 'Çarşı',    lat: 38.4192, lng: 27.1287, x: 400, y: 300, rating: 4.5, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Saat Kulesi (Konak)',     cat: 'view',   catLabel: 'Meydan',   lat: 38.4192, lng: 27.1287, x: 400, y: 305, rating: 4.6, duration: '30dk',  time: '12:30', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Kordon',                   cat: 'view',   catLabel: 'Sahil',    lat: 38.4341, lng: 27.1428, x: 440, y: 270, rating: 4.7, duration: '1.5sa', time: '17:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Sushitto Göztepe',         cat: 'rest',   catLabel: 'Restoran', lat: 38.3941, lng: 27.0795, x: 350, y: 360, rating: 4.4, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.500 mil/yemek', miles: 1500, inRoute: true, order: 3 },
    { id: 5, name: 'Efes Antik Kenti',         cat: 'museum', catLabel: 'Antik',    lat: 37.9395, lng: 27.3417, x: 460, y: 400, rating: 4.8, duration: '3sa',   time: '',      partner: false, inRoute: false, order: null },
    { id: 6, name: 'Çeşme',                    cat: 'view',   catLabel: 'Sahil',    lat: 38.3231, lng: 26.3030, x: 200, y: 280, rating: 4.7, duration: 'tüm gün',time: '',     partner: false, inRoute: false, order: null },
  ],
  'Antalya': [
    { id: 1, name: 'Kaleiçi',          cat: 'view',   catLabel: 'Tarihî',   lat: 36.8841, lng: 30.7056, x: 400, y: 300, rating: 4.7, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Hadrian Kapısı',   cat: 'view',   catLabel: 'Tarihî',   lat: 36.8866, lng: 30.7068, x: 405, y: 295, rating: 4.7, duration: '30dk',  time: '12:30', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Konyaaltı Plajı',  cat: 'view',   catLabel: 'Plaj',     lat: 36.8606, lng: 30.6438, x: 320, y: 340, rating: 4.6, duration: '3sa',   time: '14:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: '7Mehmet',          cat: 'rest',   catLabel: 'Restoran', lat: 36.8595, lng: 30.6437, x: 320, y: 345, rating: 4.5, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.500 mil/yemek', miles: 1500, inRoute: true, order: 3 },
    { id: 5, name: 'Düden Şelalesi',   cat: 'view',   catLabel: 'Doğa',     lat: 36.8917, lng: 30.7747, x: 480, y: 260, rating: 4.5, duration: '1sa',   time: '',      partner: false, inRoute: false, order: null },
    { id: 6, name: 'Aspendos',         cat: 'museum', catLabel: 'Antik',    lat: 36.9389, lng: 31.1722, x: 600, y: 240, rating: 4.8, duration: '2sa',   time: '',      partner: false, inRoute: false, order: null },
  ],
  'Kapadokya': [
    { id: 1, name: 'Göreme Açık Hava Müzesi', cat: 'museum', catLabel: 'Müze',     lat: 38.6435, lng: 34.8425, x: 400, y: 300, rating: 4.7, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Sıcak Hava Balonu Turu',  cat: 'view',   catLabel: 'Aktivite', lat: 38.6431, lng: 34.8289, x: 380, y: 280, rating: 4.9, duration: '2sa',   time: '05:30', partner: true,  partnerSub: 'M&S · 2.500 mil/tur',   miles: 2500, inRoute: true, order: 1 },
    { id: 3, name: 'Uçhisar Kalesi',          cat: 'view',   catLabel: 'Manzara',  lat: 38.6313, lng: 34.8049, x: 340, y: 310, rating: 4.7, duration: '1sa',   time: '14:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Cappadocia Cave Suites',  cat: 'hotel',  catLabel: 'Otel',     lat: 38.6440, lng: 34.8294, x: 380, y: 290, rating: 4.8, duration: '—',     time: '21:00', partner: true,  partnerSub: 'M&S · 1.000 mil/gece',  miles: 1000, inRoute: true, order: 3 },
    { id: 5, name: 'Derinkuyu Yer Altı Şehri', cat: 'museum', catLabel: 'Tarihî',  lat: 38.3743, lng: 34.7345, x: 320, y: 460, rating: 4.6, duration: '1.5sa', time: '',      partner: false, inRoute: false, order: null },
    { id: 6, name: 'Paşabağı (Peri Bacaları)',cat: 'view',   catLabel: 'Doğa',     lat: 38.6745, lng: 34.8531, x: 420, y: 260, rating: 4.7, duration: '1sa',   time: '',      partner: false, inRoute: false, order: null },
  ],
  'Bodrum': [
    { id: 1, name: 'Bodrum Kalesi',     cat: 'museum', catLabel: 'Kale',     lat: 37.0331, lng: 27.4296, x: 400, y: 300, rating: 4.7, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Halikarnas Mozolesi',cat: 'museum',catLabel: 'Antik',    lat: 37.0379, lng: 27.4244, x: 385, y: 290, rating: 4.4, duration: '1sa',   time: '13:00', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Gümüşlük',          cat: 'view',   catLabel: 'Sahil',    lat: 37.0511, lng: 27.2306, x: 220, y: 280, rating: 4.7, duration: '4sa',   time: '15:30', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Maça Kızı',          cat: 'rest',   catLabel: 'Restoran', lat: 36.9871, lng: 27.3528, x: 320, y: 360, rating: 4.6, duration: '2sa',   time: '20:30', partner: true,  partnerSub: 'M&S · 2.000 mil/yemek', miles: 2000, inRoute: true, order: 3 },
    { id: 5, name: 'Yalıkavak Marina',  cat: 'shop',   catLabel: 'Marina',   lat: 37.1037, lng: 27.2913, x: 270, y: 240, rating: 4.7, duration: '2sa',   time: '',      partner: false, inRoute: false, order: null },
  ],
  'Dalaman': [
    { id: 1, name: 'Ölüdeniz',           cat: 'view',   catLabel: 'Lagün',    lat: 36.5483, lng: 29.1083, x: 400, y: 300, rating: 4.8, duration: '4sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Kelebekler Vadisi',  cat: 'view',   catLabel: 'Doğa',     lat: 36.5283, lng: 29.1283, x: 410, y: 320, rating: 4.6, duration: '2sa',   time: '14:30', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Saklıkent Kanyonu',  cat: 'view',   catLabel: 'Doğa',     lat: 36.4925, lng: 29.3742, x: 480, y: 340, rating: 4.6, duration: '3sa',   time: '17:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Fethiye Çarşı',      cat: 'shop',   catLabel: 'Çarşı',    lat: 36.6217, lng: 29.1158, x: 405, y: 280, rating: 4.4, duration: '2sa',   time: '20:00', partner: false, inRoute: true, order: 3 },
  ],
  'Konya': [
    { id: 1, name: 'Mevlana Müzesi',     cat: 'museum', catLabel: 'Müze',     lat: 37.8708, lng: 32.5051, x: 400, y: 300, rating: 4.8, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Aziziye Camii',      cat: 'view',   catLabel: 'Cami',     lat: 37.8729, lng: 32.4925, x: 390, y: 295, rating: 4.7, duration: '45dk',  time: '13:00', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Alaeddin Tepesi',    cat: 'view',   catLabel: 'Park',     lat: 37.8732, lng: 32.4929, x: 390, y: 290, rating: 4.5, duration: '1sa',   time: '15:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Konak Konya Mutfağı',cat: 'rest',   catLabel: 'Restoran', lat: 37.8713, lng: 32.5009, x: 400, y: 305, rating: 4.6, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.200 mil/yemek', miles: 1200, inRoute: true, order: 3 },
  ],
  'Gaziantep': [
    { id: 1, name: 'Zeugma Mozaik Müzesi', cat: 'museum', catLabel: 'Müze',     lat: 37.0782, lng: 37.3826, x: 400, y: 300, rating: 4.9, duration: '2sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Gaziantep Kalesi',     cat: 'view',   catLabel: 'Kale',     lat: 37.0606, lng: 37.3793, x: 395, y: 320, rating: 4.5, duration: '1sa',   time: '13:00', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Bakırcılar Çarşısı',  cat: 'shop',   catLabel: 'Çarşı',    lat: 37.0594, lng: 37.3787, x: 395, y: 325, rating: 4.6, duration: '1.5sa', time: '15:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'İmam Çağdaş',          cat: 'rest',   catLabel: 'Restoran', lat: 37.0608, lng: 37.3754, x: 390, y: 320, rating: 4.7, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.800 mil/yemek', miles: 1800, inRoute: true, order: 3 },
  ],
  'Şanlıurfa': [
    { id: 1, name: 'Göbeklitepe',     cat: 'museum', catLabel: 'Arkeoloji', lat: 37.2235, lng: 38.9226, x: 400, y: 300, rating: 4.9, duration: '3sa',   time: '09:30', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Balıklıgöl',      cat: 'view',   catLabel: 'Manzara',   lat: 37.1497, lng: 38.7869, x: 380, y: 320, rating: 4.7, duration: '1sa',   time: '14:30', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Şanlıurfa Kalesi', cat: 'view',  catLabel: 'Kale',      lat: 37.1521, lng: 38.7906, x: 385, y: 315, rating: 4.5, duration: '1sa',   time: '16:30', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Cevahir Konukevi', cat: 'rest',  catLabel: 'Restoran',  lat: 37.1490, lng: 38.7895, x: 380, y: 325, rating: 4.6, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.500 mil/yemek', miles: 1500, inRoute: true, order: 3 },
  ],
  'Pamukkale': [
    { id: 1, name: 'Travertenler',     cat: 'view',   catLabel: 'Doğa',     lat: 37.9203, lng: 29.1206, x: 400, y: 300, rating: 4.7, duration: '3sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Hierapolis Antik Kenti', cat: 'museum', catLabel: 'Antik',lat: 37.9264, lng: 29.1281,x: 405, y: 290, rating: 4.7, duration: '2sa',   time: '13:30', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Kleopatra Havuzu', cat: 'view',   catLabel: 'Termal',   lat: 37.9215, lng: 29.1244, x: 400, y: 295, rating: 4.5, duration: '1.5sa', time: '16:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Pamukkale Termal Otel', cat: 'hotel', catLabel: 'Otel', lat: 37.9180, lng: 29.1206, x: 395, y: 305, rating: 4.4, duration: '—',     time: '20:30', partner: true,  partnerSub: 'M&S · 700 mil/gece',    miles: 700,  inRoute: true, order: 3 },
  ],
  'Trabzon': [
    { id: 1, name: 'Sumela Manastırı', cat: 'museum', catLabel: 'Tarihî',   lat: 40.6900, lng: 39.6589, x: 400, y: 300, rating: 4.8, duration: '3sa',   time: '10:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Uzungöl',          cat: 'view',   catLabel: 'Doğa',     lat: 40.6266, lng: 40.2858, x: 510, y: 310, rating: 4.7, duration: '4sa',   time: '14:00', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Atatürk Köşkü',     cat: 'museum', catLabel: 'Müze',     lat: 41.0098, lng: 39.7158, x: 395, y: 240, rating: 4.6, duration: '1sa',   time: '18:30', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Hasanağa Konağı',   cat: 'rest',   catLabel: 'Restoran', lat: 41.0050, lng: 39.7261, x: 400, y: 245, rating: 4.5, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S · 1.500 mil/yemek', miles: 1500, inRoute: true, order: 3 },
  ],
};

/** Return a deep-cloned, city-aware default place list. Falls back to
 *  ROMA_PLACES for unknown international cities. */
function getDefaultPlaces(city) {
  const src = TR_CITY_PLACES[city] || (city === 'Roma' ? ROMA_PLACES : null);
  if (src) return JSON.parse(JSON.stringify(src));
  // Unknown city — empty list with an inviting hint.
  return [
    { id: 1, name: `${city} merkez`, cat: 'view', catLabel: 'Başlangıç noktası', x: 400, y: 300, rating: 0, duration: '—', time: '10:00', partner: false, inRoute: true, order: 0 },
  ];
}

export { getDefaultPlaces, TR_CITY_PLACES, ROMA_PLACES };
