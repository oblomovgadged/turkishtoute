/**
 * Google Maps loader + helpers.
 *
 * SETUP:
 *   1. https://console.cloud.google.com → enable Maps JavaScript API + Places API
 *   2. Get API key
 *   3. Add to .env.local as VITE_GOOGLE_MAPS_KEY
 *
 * Usage:
 *   const google = await loadMaps();
 *   const map = new google.maps.Map(el, { center, zoom: 13 });
 */

const KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;
let promise = null;

export function loadMaps() {
  if (!KEY) return Promise.reject(new Error('Google Maps key missing (VITE_GOOGLE_MAPS_KEY)'));
  if (promise) return promise;
  promise = new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google);
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&language=tr`;
    s.async = true; s.defer = true;
    s.onload = () => resolve(window.google);
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return promise;
}

/* ---- Tiny helpers ---- */

/** Drop a marker on the given map. */
export function dropMarker(google, map, { lat, lng, title, icon, onClick }) {
  const marker = new google.maps.Marker({ position: { lat, lng }, map, title, icon });
  if (onClick) marker.addListener('click', onClick);
  return marker;
}

/** Draw a polyline between an ordered list of [{lat,lng}] points. */
export function drawRoute(google, map, points, color = '#B7312C') {
  return new google.maps.Polyline({
    path: points, map,
    geodesic: true,
    strokeColor: color, strokeOpacity: 0.95, strokeWeight: 4,
  });
}

/** Reverse-geocode a place id → human address (uses Places API). */
export async function placeDetails(google, placeId) {
  return new Promise((resolve, reject) => {
    const svc = new google.maps.places.PlacesService(document.createElement('div'));
    svc.getDetails({ placeId, fields: ['name','formatted_address','geometry','rating','photos','types'] },
      (res, status) => status === 'OK' ? resolve(res) : reject(new Error(status)));
  });
}
