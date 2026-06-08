/**
 * Example Vercel serverless function — flights search.
 * Wrap your real THY (or 3rd-party) flight API here so the browser
 * never sees your API keys.
 *
 *   POST /api/flights  body: { from, to, date, pax }
 *   → 200 { flights: [...] }
 *
 * Deploy: this file is auto-detected by Vercel.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { from, to, date, pax } = req.body || {};
  if (!from?.code || !to?.code) return res.status(400).json({ error: 'from/to required' });

  // TODO — wire to real API. Example:
  //
  // const r = await fetch('https://api.turkishairlines.com/v1/flights', {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.THY_API_KEY}` },
  //   body: JSON.stringify({ origin: from.code, destination: to.code, date }),
  // });
  // const data = await r.json();
  // return res.status(200).json({ flights: data.flights.map(toClientShape) });

  // Stub:
  return res.status(200).json({
    flights: [
      { id:'a', airline:'Turkish Airlines', code:'TK 1855', dep:'08:25', arr:'10:15', from: from.code, to: to.code, duration:'3sa 50dk', stops:0, aircraft:'Boeing 737-800', co2:142, price:{ eco:'6.480', ext:'7.890', pri:'11.250' } },
    ],
  });
}
