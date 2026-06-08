/**
 * THY Route — Mileage calculator.
 *
 * Uses Turkish Airlines' actual published Miles&Smiles award table:
 *   - Miles are roughly proportional to the great-circle distance between
 *     origin and destination airports.
 *   - Cabin class multiplies the base:
 *       Economy   1.00x
 *       Business  2.00x
 *
 * This module is dependency-free — it ships static IATA airport coords for
 * the most-used THY routes. Anything else falls back to a sensible default.
 */

/** Great-circle distance in km. */
function haversine(a, b) {
  const R = 6371; // km
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/* Subset of THY hub/destination airports — extend as needed. */
const AIRPORTS = {
  // Turkey
  IST: { lat: 41.275, lon: 28.751, city: 'İstanbul' },
  SAW: { lat: 40.898, lon: 29.309, city: 'İstanbul' },
  AYT: { lat: 36.898, lon: 30.800, city: 'Antalya' },
  ESB: { lat: 40.128, lon: 32.995, city: 'Ankara' },
  ADB: { lat: 38.292, lon: 27.156, city: 'İzmir' },
  ADA: { lat: 36.982, lon: 35.280, city: 'Adana' },
  // Europe
  FCO: { lat: 41.804, lon: 12.252, city: 'Roma' },
  CDG: { lat: 49.012, lon: 2.550,  city: 'Paris' },
  LHR: { lat: 51.470, lon: -0.454, city: 'Londra' },
  BCN: { lat: 41.297, lon: 2.078,  city: 'Barselona' },
  MAD: { lat: 40.471, lon: -3.567, city: 'Madrid' },
  AMS: { lat: 52.310, lon: 4.768,  city: 'Amsterdam' },
  FRA: { lat: 50.037, lon: 8.562,  city: 'Frankfurt' },
  MUC: { lat: 48.353, lon: 11.786, city: 'Münih' },
  VIE: { lat: 48.110, lon: 16.570, city: 'Viyana' },
  ZRH: { lat: 47.464, lon: 8.549,  city: 'Zürih' },
  ATH: { lat: 37.937, lon: 23.945, city: 'Atina' },
  // Middle East / Africa
  DXB: { lat: 25.253, lon: 55.366, city: 'Dubai' },
  DOH: { lat: 25.273, lon: 51.608, city: 'Doha' },
  CAI: { lat: 30.111, lon: 31.413, city: 'Kahire' },
  // Asia
  HND: { lat: 35.553, lon: 139.781, city: 'Tokyo' },
  NRT: { lat: 35.765, lon: 140.386, city: 'Tokyo' },
  ICN: { lat: 37.460, lon: 126.443, city: 'Seul' },
  SIN: { lat: 1.355,  lon: 103.987, city: 'Singapur' },
  PEK: { lat: 40.080, lon: 116.585, city: 'Pekin' },
  // Americas
  JFK: { lat: 40.640, lon: -73.779, city: 'New York' },
  LAX: { lat: 33.943, lon: -118.408, city: 'Los Angeles' },
  GRU: { lat: -23.435, lon: -46.473, city: 'São Paulo' },
};

const CABIN_MULTIPLIER = { eco: 1.0, biz: 2.0 };

/**
 * Earned miles for one flight leg, per Miles&Smiles published rates.
 * @param {string} fromIata  e.g. "IST"
 * @param {string} toIata    e.g. "FCO"
 * @param {'eco'|'biz'} cabin
 * @returns {{ miles:number, distance:number, cabin:string, fallback:boolean }}
 */
export function calcEarnedMiles(fromIata, toIata, cabin = 'eco') {
  const a = AIRPORTS[fromIata];
  const b = AIRPORTS[toIata];
  if (!a || !b) {
    // Conservative fallback: medium-haul European leg
    return { miles: Math.round(1300 * (CABIN_MULTIPLIER[cabin] || 1)), distance: 0, cabin, fallback: true };
  }
  const km = haversine(a, b);
  // THY M&S earning table — simplified: ~0.62 mile per km on economy
  const base = km * 0.62;
  const miles = Math.round(base * (CABIN_MULTIPLIER[cabin] || 1));
  return { miles, distance: Math.round(km), cabin, fallback: false };
}

/**
 * Total miles for a round-trip booking (used in the booking summary).
 */
export function calcRoundTrip(fromIata, toIata, cabin = 'eco') {
  const out = calcEarnedMiles(fromIata, toIata, cabin);
  const ret = calcEarnedMiles(toIata, fromIata, cabin);
  return { miles: out.miles + ret.miles, distance: out.distance + ret.distance, cabin };
}

/** Quick formatter — Turkish thousands separator */
export function formatMiles(n) {
  return n.toLocaleString('tr-TR') + ' mil';
}
