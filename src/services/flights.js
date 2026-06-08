/**
 * Flight search service.
 *
 * Production: hits a Vercel serverless function at /api/flights that
 * wraps the real THY (or third-party) flight API.
 *
 * Dev fallback: returns a static stub so the UI still renders without backend.
 *
 * SETUP:
 *   - Create /api/flights.js in your Vercel project (or set VITE_FLIGHTS_ENDPOINT
 *     to point at your existing endpoint).
 *   - The endpoint should accept POST { from, to, date, pax, cabin } and return
 *     { flights: [...] } in roughly the shape below.
 */

const ENDPOINT = import.meta.env.VITE_FLIGHTS_ENDPOINT || '/api/flights';

/**
 * @param {Object} q  query
 * @param {{code:string, city:string}} q.from
 * @param {{code:string, city:string}} q.to
 * @param {string} q.date         e.g. "2026-06-13"
 * @param {{adult:number,child:number,cabin:string}} q.pax
 * @returns {Promise<{flights: Array}>}
 */
export async function searchFlights(q) {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(q),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[flights] endpoint failed, returning stub —', err.message);
    return { flights: STUB_FLIGHTS(q) };
  }
}

/* ---- Dev stub ---- */
function STUB_FLIGHTS(q) {
  const from = q.from?.code || 'IST';
  const to   = q.to?.code   || 'FCO';
  return [
    { id:'a', airline:'Turkish Airlines', code:'TK 1855', dep:'08:25', arr:'10:15', from, to, duration:'3sa 50dk', stops:0, aircraft:'Boeing 737-800',  co2:142, price:{ eco:'6.480', ext:'7.890', pri:'11.250' } },
    { id:'b', airline:'Turkish Airlines', code:'TK 1859', dep:'11:55', arr:'13:50', from, to, duration:'3sa 55dk', stops:0, aircraft:'Airbus A321',      co2:138, price:{ eco:'6.890', ext:'8.290', pri:'11.650' } },
    { id:'c', airline:'AnadoluJet',       code:'TK 7102', dep:'15:10', arr:'17:05', from, to, duration:'3sa 55dk', stops:0, aircraft:'Boeing 737-MAX 8', co2:128, price:{ eco:'5.890', ext:'7.380', pri:'—' } },
    { id:'d', airline:'Turkish Airlines', code:'TK 1863', dep:'17:45', arr:'21:55', from, to, duration:'6sa 10dk', stops:1, aircraft:'Boeing 737-800',   co2:198, price:{ eco:'5.290', ext:'6.890', pri:'10.490' } },
    { id:'e', airline:'Turkish Airlines', code:'TK 1873', dep:'21:30', arr:'23:20', from, to, duration:'3sa 50dk', stops:0, aircraft:'Airbus A321neo',   co2:124, price:{ eco:'7.180', ext:'8.640', pri:'12.080' } },
  ];
}

/* ---- Bookings (stub — wire to your /api/bookings endpoint) ---- */
export async function createBooking(payload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Booking failed');
  return res.json();
}
