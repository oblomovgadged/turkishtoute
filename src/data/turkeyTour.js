/**
 * THY Route — Türkiye Tour data.
 *
 * Drives the "Türkiye Turu" multi-city mode: a curated set of Turkish
 * destinations the system can hop between, three pre-built packages, and
 * a deterministic inter-city flight picker that uses Turkish Airlines or
 * AnadoluJet depending on the route.
 *
 * Tour shape (used everywhere downstream):
 *   {
 *     fromCity: { code: 'JFK', city: 'New York', country: 'ABD' },
 *     totalDays: 20,
 *     startDate: '2026-07-01',
 *     packageId: 'classic-trio',
 *     segments: [
 *       { city: 'İstanbul',  iata: 'IST', days: 7, slug: 'istanbul' },
 *       { city: 'Kapadokya', iata: 'ASR', days: 4, slug: 'kapadokya' },
 *       { city: 'Antalya',   iata: 'AYT', days: 9, slug: 'antalya' },
 *     ],
 *     flights: [
 *       { kind: 'inbound',   from: 'JFK', to: 'IST', carrier: 'TK', flightNo: 'TK 12'  },
 *       { kind: 'intercity', from: 'IST', to: 'ASR', carrier: 'TK', flightNo: 'TK 2024' },
 *       { kind: 'intercity', from: 'ASR', to: 'AYT', carrier: 'AJ', flightNo: 'AJ 7531' },
 *       { kind: 'outbound',  from: 'AYT', to: 'IST', carrier: 'TK', flightNo: 'TK 2417' },
 *       { kind: 'outbound',  from: 'IST', to: 'JFK', carrier: 'TK', flightNo: 'TK 11'  },
 *     ],
 *   }
 */

/* ---------- Turkish destinations the tour can hop between ---------- */
const TURKEY_CITIES = [
  { slug: 'istanbul',  city: 'İstanbul',  iata: 'IST', region: 'Marmara',     blurb: 'İki kıtanın hikayesi — boğaz, çarşı, mimari',     image: 'linear-gradient(135deg, #B7312C 0%, #4A0E13 100%)' },
  { slug: 'ankara',    city: 'Ankara',    iata: 'ESB', region: 'İç Anadolu',  blurb: 'Başkent, müzeler, Anıtkabir',                       image: 'linear-gradient(135deg, #6B7C93 0%, #0F2244 100%)' },
  { slug: 'izmir',     city: 'İzmir',     iata: 'ADB', region: 'Ege',         blurb: 'Ege kıyıları, Çeşme, Efes',                          image: 'linear-gradient(135deg, #4DA6BE 0%, #1E5A7A 100%)' },
  { slug: 'antalya',   city: 'Antalya',   iata: 'AYT', region: 'Akdeniz',     blurb: 'Türkiye\'nin Rivierası — antik kentler, koylar',     image: 'linear-gradient(135deg, #F4B860 0%, #C57A1D 100%)' },
  { slug: 'kapadokya', city: 'Kapadokya', iata: 'ASR', region: 'İç Anadolu',  blurb: 'Peri bacaları, balon turları, yer altı şehirleri', image: 'linear-gradient(135deg, #D9A984 0%, #794C37 100%)' },
  { slug: 'bodrum',    city: 'Bodrum',    iata: 'BJV', region: 'Ege',         blurb: 'Mavi koylar, gulet turları, Halikarnas',           image: 'linear-gradient(135deg, #5DBED4 0%, #1A6D85 100%)' },
  { slug: 'dalaman',   city: 'Dalaman',   iata: 'DLM', region: 'Ege',         blurb: 'Ölüdeniz, Fethiye, Kaş — turkuaz şeridi',          image: 'linear-gradient(135deg, #7EC7A8 0%, #2E6B57 100%)' },
  { slug: 'konya',     city: 'Konya',     iata: 'KYA', region: 'İç Anadolu',  blurb: 'Mevlana, ilk başkent, manevi kalp',                image: 'linear-gradient(135deg, #C5A059 0%, #6B5028 100%)' },
  { slug: 'gaziantep', city: 'Gaziantep', iata: 'GZT', region: 'Güneydoğu',   blurb: 'UNESCO Gastronomi şehri — baklava, kebap, fıstık', image: 'linear-gradient(135deg, #D97757 0%, #6B1E18 100%)' },
  { slug: 'sanliurfa', city: 'Şanlıurfa', iata: 'GNY', region: 'Güneydoğu',   blurb: 'Göbeklitepe, Balıklıgöl, peygamberler şehri',      image: 'linear-gradient(135deg, #A85E36 0%, #4E2916 100%)' },
  { slug: 'trabzon',   city: 'Trabzon',   iata: 'TZX', region: 'Karadeniz',   blurb: 'Sumela, yaylalar, Karadeniz yeşili',               image: 'linear-gradient(135deg, #4B7C5F 0%, #1F3A2A 100%)' },
  { slug: 'pamukkale', city: 'Pamukkale', iata: 'DNZ', region: 'Ege',         blurb: 'Beyaz travertenler, Hierapolis antik kenti',       image: 'linear-gradient(135deg, #BCC8D6 0%, #5B6B82 100%)' },
];

/* Lookup by slug or IATA. */
function findCity(key) {
  return TURKEY_CITIES.find(c => c.slug === key || c.iata === key);
}

/* ---------- Pre-built packages ---------- */
const TOUR_PACKAGES = [
  {
    id: 'classic-trio',
    name: 'Klasik Üçlü',
    subtitle: 'En sevilen rota',
    description: 'İstanbul\'un derinliği, Kapadokya\'nın büyüsü, Antalya\'nın denizi — üç hayatta bir kez deneyim.',
    defaultDays: 14,
    accent: '#B7312C',
    citySlugs: ['istanbul', 'kapadokya', 'antalya'],
    tag: 'ÖNERİLEN',
  },
  {
    id: 'aegean-med',
    name: 'Ege & Akdeniz',
    subtitle: 'Mavi yolculuk',
    description: 'Antik kentler ve turkuaz koylar — İzmir\'den Bodrum\'a, oradan Antalya\'ya kadar.',
    defaultDays: 12,
    accent: '#4DA6BE',
    citySlugs: ['izmir', 'bodrum', 'antalya'],
    tag: 'YAZ',
  },
  {
    id: 'heritage-tour',
    name: 'Tarih Turu',
    subtitle: '12.000 yıllık miras',
    description: 'Göbeklitepe\'den Mevlana\'ya, Ayasofya\'dan Pamukkale\'ye — uygarlıkların izini sürmek.',
    defaultDays: 16,
    accent: '#C5A059',
    citySlugs: ['istanbul', 'sanliurfa', 'gaziantep', 'konya', 'pamukkale'],
    tag: 'KÜLTÜR',
  },
];

/* ---------- Inter-city flight matrix ---------- */
/* For every (from, to) we pick a carrier. TK is the default; AnadoluJet
   handles the secondary lines (Anatolia spokes). The flight number is
   deterministic so the same trip always shows the same numbers. */

const AJET_ROUTES = new Set([
  'ESB-AYT', 'ESB-ADB', 'ESB-BJV', 'ESB-DLM', 'ESB-DNZ',
  'AYT-ESB', 'AYT-ASR', 'AYT-DLM',
  'ASR-AYT', 'ASR-ADB',
  'ADB-ESB', 'ADB-AYT',
  'BJV-ESB',
  'KYA-ESB', 'KYA-AYT',
  'GZT-ESB', 'GZT-IST',
  'GNY-IST', 'GNY-ESB',
  'TZX-ESB',
  'DNZ-IST',
]);

function pickCarrier(from, to) {
  // International legs always TK (THY).
  if (from.length !== 3 || to.length !== 3) return 'TK';
  if (!findCity(from) && !findCity(to)) return 'TK';
  // Domestic routes going through IST → TK.
  if (from === 'IST' || to === 'IST') return 'TK';
  // Anatolian cross-hops → AnadoluJet if the matrix knows the line.
  return AJET_ROUTES.has(`${from}-${to}`) ? 'AJ' : 'TK';
}

/* Deterministic flight number from IATA pair so the same route reproduces. */
function flightNumberFor(from, to, carrier) {
  const hash = (s) => Array.from(s).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
  const base = Math.abs(hash(from + to)) % 9000 + 1000;
  return `${carrier === 'AJ' ? 'AJ' : 'TK'} ${base}`;
}

/** Build an intercity flight stub: carrier, flight number, dep/arr times.
 *  Times are heuristic — we'll replace with Duffel once the multi-city
 *  search endpoint accepts open jaw queries. */
function intercityFlight(from, to) {
  const carrier = pickCarrier(from, to);
  return {
    kind: 'intercity',
    from, to, carrier,
    flightNo: flightNumberFor(from, to, carrier),
    dep: ['07:30', '10:15', '13:45', '17:00', '20:30'][Math.abs(from.charCodeAt(0) + to.charCodeAt(0)) % 5],
    duration: '1sa 25dk',
    aircraft: carrier === 'AJ' ? 'Boeing 737-800' : 'Airbus A321neo',
  };
}

/* ---------- Even-day distribution ---------- */
/**
 * Spread totalDays across N cities, keeping the relative weights from the
 * package's defaultDays distribution. If no weights, distribute evenly.
 */
function distributeDays(totalDays, cityCount, weights) {
  const n = Math.max(1, cityCount);
  if (!weights || weights.length !== n) {
    weights = Array(n).fill(1);
  }
  const sum = weights.reduce((a, b) => a + b, 0);
  const raw  = weights.map(w => (w / sum) * totalDays);
  const days = raw.map(x => Math.floor(x));
  // Distribute the remainder by largest fractional part first.
  let remainder = totalDays - days.reduce((a, b) => a + b, 0);
  const frac = raw
    .map((x, i) => ({ i, f: x - Math.floor(x) }))
    .sort((a, b) => b.f - a.f);
  for (let i = 0; remainder > 0 && i < frac.length; i++, remainder--) days[frac[i].i] += 1;
  // Each city gets at least 1 night.
  return days.map(d => Math.max(1, d));
}

/** Build the canonical trip object for a package + total-days choice. */
function buildTour({ packageId, customSlugs, totalDays, fromCity, startDate }) {
  const pkg = TOUR_PACKAGES.find(p => p.id === packageId);
  const slugs = customSlugs && customSlugs.length ? customSlugs : pkg?.citySlugs || ['istanbul', 'kapadokya', 'antalya'];
  const cities = slugs.map(findCity).filter(Boolean);
  const totalsRaw = pkg ? pkg.citySlugs.map((s) => {
    const idx = pkg.citySlugs.indexOf(s);
    return defaultDayWeight(pkg, idx);
  }) : cities.map(() => 1);
  const days = distributeDays(totalDays || pkg?.defaultDays || 14, cities.length, totalsRaw);

  const segments = cities.map((c, i) => ({
    city: c.city,
    iata: c.iata,
    slug: c.slug,
    days: days[i],
    image: c.image,
  }));

  const flights = [];
  // International inbound: lands in Istanbul by default
  if (fromCity?.code && fromCity.code !== 'IST') {
    flights.push({
      kind: 'inbound', from: fromCity.code, to: 'IST',
      carrier: 'TK', flightNo: flightNumberFor(fromCity.code, 'IST', 'TK'),
      dep: '23:15', duration: '10sa 30dk', aircraft: 'Boeing 787-9',
    });
    // If first segment is not Istanbul, add IST → first city
    if (cities[0].iata !== 'IST') {
      flights.push(intercityFlight('IST', cities[0].iata));
    }
  }
  // Intercity hops between segments
  for (let i = 0; i < cities.length - 1; i++) {
    flights.push(intercityFlight(cities[i].iata, cities[i + 1].iata));
  }
  // International outbound: from last city → IST → home
  if (fromCity?.code && fromCity.code !== 'IST') {
    if (cities[cities.length - 1].iata !== 'IST') {
      flights.push(intercityFlight(cities[cities.length - 1].iata, 'IST'));
    }
    flights.push({
      kind: 'outbound', from: 'IST', to: fromCity.code,
      carrier: 'TK', flightNo: flightNumberFor('IST', fromCity.code, 'TK'),
      dep: '14:20', duration: '12sa 5dk', aircraft: 'Boeing 787-9',
    });
  }

  return {
    fromCity: fromCity || { code: 'IST', city: 'İstanbul', country: 'Türkiye' },
    totalDays: totalDays || pkg?.defaultDays || 14,
    startDate: startDate || null,
    packageId: pkg?.id || 'custom',
    packageName: pkg?.name || 'Özel Tur',
    segments,
    flights,
  };
}

/** Heuristic per-segment weights for packages (used by buildTour). */
function defaultDayWeight(pkg, idx) {
  // Slightly favour Istanbul (gateway) + last segment (rest)
  const slug = pkg.citySlugs[idx];
  if (slug === 'istanbul') return 1.4;
  if (slug === 'antalya' || slug === 'bodrum' || slug === 'dalaman') return 1.3;
  if (slug === 'kapadokya' || slug === 'pamukkale') return 0.8;
  return 1.0;
}

export {
  TURKEY_CITIES, TOUR_PACKAGES, findCity, buildTour,
  intercityFlight, pickCarrier, distributeDays,
};
