/**
 * Vercel serverless function — flight search via Duffel API.
 *
 * Request:  POST /api/flights
 *           body: { from: {code,city}, to: {code,city}, date: "YYYY-MM-DD", pax }
 * Response: { flights: [...] }  (client-shape)
 *
 * Env var required:
 *   DUFFEL_ACCESS_TOKEN — your Duffel test or live token
 *
 * Falls back to a deterministic stub if Duffel is unavailable so the UI
 * always renders something during pitches & demos.
 */

const DUFFEL_API_VERSION = 'v2';
const DUFFEL_BASE = 'https://api.duffel.com/air';

/* ---------- Duffel call ---------- */

async function duffelOfferRequest({ from, to, date, pax = 1 }) {
  const token = process.env.DUFFEL_ACCESS_TOKEN;
  if (!token) throw new Error('DUFFEL_ACCESS_TOKEN not set');

  const body = {
    data: {
      slices: [{ origin: from, destination: to, departure_date: date }],
      passengers: Array.from({ length: pax }, () => ({ type: 'adult' })),
      cabin_class: 'economy', // Duffel returns all cabins anyway
    },
  };

  // 1. Create offer request (returnPossibleOffers excluded — Duffel splits these calls)
  const orRes = await fetch(`${DUFFEL_BASE}/offer_requests?return_offers=true`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Duffel-Version': DUFFEL_API_VERSION,
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!orRes.ok) {
    const text = await orRes.text();
    throw new Error(`Duffel offer_requests ${orRes.status}: ${text.slice(0, 200)}`);
  }
  const orData = await orRes.json();
  return orData.data?.offers || [];
}

/* ---------- shape adapter ----------
   Duffel offer → our client FlightCard shape */

function minutesBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 60000);
}
function formatDuration(min) {
  if (!min || min <= 0) return '—';
  const h = Math.floor(min / 60), m = min % 60;
  return `${h}sa ${m}dk`;
}
function formatTime(iso) {
  if (!iso) return '—';
  // Duffel times are local to airport
  return iso.slice(11, 16);
}

function toClient(offers) {
  // Group by Turkish Airlines first, then others; collapse duplicates by flight number.
  const seen = new Set();
  const items = [];

  for (const offer of offers) {
    const slice = offer.slices?.[0];
    if (!slice) continue;

    const seg = slice.segments?.[0];
    if (!seg) continue;
    const lastSeg = slice.segments[slice.segments.length - 1];

    const code = `${seg.marketing_carrier?.iata_code || '??'} ${seg.marketing_carrier_flight_number || ''}`.trim();
    if (seen.has(code)) continue;
    seen.add(code);

    const isBiz   = offer.cabin_class === 'business' || /business/i.test(offer.cabin_class_marketing_name || '');
    const baseFare = parseFloat(offer.total_amount || '0');

    // We'll show this as Economy by default; for a Business row Duffel sends a separate offer.
    items.push({
      id: offer.id,
      airline: seg.marketing_carrier?.name || 'Turkish Airlines',
      code,
      dep: formatTime(seg.departing_at),
      arr: formatTime(lastSeg.arriving_at),
      from: seg.origin?.iata_code || '',
      to:   lastSeg.destination?.iata_code || '',
      fromCity: seg.origin?.city_name || seg.origin?.name || '',
      toCity:   lastSeg.destination?.city_name || lastSeg.destination?.name || '',
      duration: formatDuration(slice.duration ? parseDuration(slice.duration) : minutesBetween(seg.departing_at, lastSeg.arriving_at)),
      stops: Math.max(0, (slice.segments?.length || 1) - 1),
      aircraft: seg.aircraft?.name || '—',
      co2: Math.round(parseFloat(offer.total_emissions_kg || '0')) || null,
      seats: { eco: null, biz: null },           // Duffel doesn't expose seat counts
      price: {
        eco: isBiz ? '—' : baseFare,
        biz: isBiz ? baseFare : '—',
      },
      _currency: offer.total_currency || 'TRY',
    });
  }
  return items;
}

function parseDuration(iso) {
  // ISO 8601 duration "PT2H40M"
  const m = /PT(?:(\d+)H)?(?:(\d+)M)?/.exec(iso || '');
  if (!m) return 0;
  return (parseInt(m[1] || '0', 10) * 60) + parseInt(m[2] || '0', 10);
}

/* ---------- Stub (used on failure or when no token) ---------- */

function STUB({ from, to }) {
  return [
    { id:'stub-a', airline:'Turkish Airlines', code:'TK 1861', dep:'07:35', arr:'09:15', from, to, fromCity:'İstanbul', toCity:'Roma', duration:'2sa 40dk', stops:0, aircraft:'Airbus A350-900', co2:142, seats:{eco:24,biz:5}, price:{eco:18835, biz:77631} },
    { id:'stub-b', airline:'Turkish Airlines', code:'TK 1865', dep:'12:30', arr:'14:10', from, to, fromCity:'İstanbul', toCity:'Roma', duration:'2sa 40dk', stops:0, aircraft:'Airbus A321neo',   co2:138, seats:{eco:18,biz:0}, price:{eco:21560, biz:'—'} },
    { id:'stub-c', airline:'Turkish Airlines', code:'TK 1863', dep:'16:45', arr:'18:25', from, to, fromCity:'İstanbul', toCity:'Roma', duration:'2sa 40dk', stops:0, aircraft:'Airbus A350-900', co2:142, seats:{eco:32,biz:9}, price:{eco:19120, biz:71400} },
    { id:'stub-d', airline:'Turkish Airlines', code:'TK 1361', dep:'21:50', arr:'23:35', from, to, fromCity:'İstanbul', toCity:'Roma', duration:'2sa 45dk', stops:0, aircraft:'Airbus A321neo',   co2:124, seats:{eco:22,biz:4}, price:{eco:22480, biz:78900} },
  ];
}

/* ---------- Handler ---------- */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  try {
    const { from, to, date, pax } = req.body || {};
    if (!from?.code || !to?.code) {
      return res.status(400).json({ error: 'from.code and to.code required' });
    }
    const searchDate = date || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);

    let flights;
    try {
      const offers = await duffelOfferRequest({
        from: from.code, to: to.code, date: searchDate, pax: pax?.adult || 1,
      });
      flights = toClient(offers);
      if (!flights.length) flights = STUB({ from: from.code, to: to.code });
    } catch (e) {
      console.warn('[duffel] failed, using stub —', e.message);
      flights = STUB({ from: from.code, to: to.code });
    }

    return res.status(200).json({ flights, source: flights[0]?.id?.startsWith('stub-') ? 'stub' : 'duffel' });
  } catch (err) {
    console.error('[api/flights] crash —', err);
    return res.status(500).json({ error: 'internal', flights: STUB({ from: 'IST', to: 'FCO' }) });
  }
}
