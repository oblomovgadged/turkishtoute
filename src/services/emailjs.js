/**
 * EmailJS service — send the trip route as a styled email.
 *
 * SETUP:
 *   1. https://dashboard.emailjs.com → create Service (Gmail / SMTP / etc.)
 *   2. Create a Template — fields like {{to_email}}, {{trip_html}}, {{user_name}}
 *   3. Add Service ID + Template ID + Public Key to .env.local
 */

import emailjs from '@emailjs/browser';

const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

const enabled = Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);

if (enabled) {
  emailjs.init({ publicKey: PUBLIC_KEY });
} else {
  console.warn('[emailjs] disabled — missing VITE_EMAILJS_* env vars.');
}

/**
 * Send the trip report.
 *   to    — recipient email
 *   name  — recipient name
 *   trip  — { city, days, places: [{name, time, …}], totalMiles }
 */
export async function sendTripReport({ to, name, trip }) {
  if (!enabled) throw new Error('EmailJS not configured');

  // Build a simple HTML block for the template
  const placesHtml = trip.places.map((p) => `
    <tr>
      <td style="padding:8px 12px;font-family:monospace;color:#64748B">${p.time || ''}</td>
      <td style="padding:8px 12px;font-weight:600">${p.name}</td>
    </tr>`).join('');
  const tripHtml = `
    <h2 style="color:#0A1628;font-family:Arial,sans-serif">${trip.city} Rotanız</h2>
    <p style="color:#64748B">${trip.days} gün · ${trip.places.length} durak${trip.totalMiles ? ` · +${trip.totalMiles} mil` : ''}</p>
    <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">${placesHtml}</table>
  `;

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email: to,
    user_name: name,
    trip_html: tripHtml,
  });
}

export { enabled };
