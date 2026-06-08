/**
 * THY Route — PDF export.
 *
 * Builds a printer-friendly PDF of the active route: cover with the city
 * and a small THY-style mark, day-by-day timeline of stops, partner-mile
 * totals, and a footer linking back to thyroute.com.
 *
 * Uses jsPDF (pure JS, no native deps). The PDF is downloaded directly via
 * the browser so it works in Vercel SSR builds without any server.
 */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const RED   = [183, 49, 44];
const NAVY  = [10, 22, 40];
const GOLD  = [197, 160, 89];
const TEXT  = [30, 41, 59];
const MUTED = [100, 116, 139];
const GREY  = [226, 232, 240];

/**
 * jsPDF's built-in Helvetica is Latin-1 only — unicode chars like ğ, ş, ı
 * come out as garbled &-escape sequences. Until we bundle a proper TTF
 * font, transliterate Turkish chars to their ASCII equivalents so the
 * output is at least readable on any printer.
 */
function tr(s) {
  if (s == null) return '';
  return String(s)
    .replace(/Ç/g, 'C').replace(/ç/g, 'c')
    .replace(/Ğ/g, 'G').replace(/ğ/g, 'g')
    .replace(/İ/g, 'I').replace(/ı/g, 'i')
    .replace(/Ö/g, 'O').replace(/ö/g, 'o')
    .replace(/Ş/g, 'S').replace(/ş/g, 's')
    .replace(/Ü/g, 'U').replace(/ü/g, 'u');
}

/** Draw a small THY-style mark (red square with TR crane silhouette + wordmark). */
function drawLogo(doc, x, y) {
  // red square badge
  doc.setFillColor(...RED);
  doc.roundedRect(x, y, 26, 26, 3, 3, 'F');
  // simplified crane mark inside (cross of white triangles)
  doc.setFillColor(255, 255, 255);
  doc.triangle(x + 7, y + 19, x + 13, y + 8,  x + 19, y + 19, 'F');
  doc.triangle(x + 9, y + 16, x + 13, y + 11, x + 17, y + 16, 'F');
  // Wordmark
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TURKISH AIRLINES', x + 34, y + 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text('ROUTE', x + 34, y + 22);
}

/**
 * @param {object} opts
 *   - city        — destination city, e.g. "Roma"
 *   - routeName   — user-given name of the route
 *   - places      — full array of place objects (with .inRoute, .order, .time, .name, .catLabel, .partner, .miles)
 *   - totalMiles  — sum of partner miles
 *   - daysCount   — number of days in plan (defaults to 3)
 *   - shareLink   — optional URL to put on the cover page
 */
export function downloadRoutePdf({ city = 'Roma', routeName, places = [], totalMiles = 0, daysCount = 3, shareLink = '' }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  /* -------- Cover band -------- */
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 160, 'F');
  doc.setFillColor(...RED);
  doc.rect(0, 130, W, 30, 'F');

  drawLogo(doc, 40, 36);

  doc.setTextColor(...GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(tr('YOLCULUGUN HER METREKARESI'), 40, 80);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.text(tr((routeName || `${city} Rotaniz`).toUpperCase()), 40, 110);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(tr(`${city} . ${daysCount} gun . ${places.filter(p => p.inRoute).length} durak`), 40, 148);

  /* -------- Mile chip on right -------- */
  doc.setFillColor(...GOLD);
  doc.roundedRect(W - 200, 70, 160, 50, 6, 6, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(tr('TAHMINI MIL'), W - 188, 88);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`+${totalMiles.toLocaleString('tr-TR')}`, W - 188, 110);

  /* -------- Day-by-day plan -------- */
  let y = 200;
  const routed = places
    .filter(p => p.inRoute && p.order != null)
    .sort((a, b) => a.order - b.order);

  const perDay = Math.max(1, Math.ceil(routed.length / daysCount));
  const dayBuckets = Array.from({ length: daysCount }, (_, i) =>
    routed.slice(i * perDay, (i + 1) * perDay)
  );

  dayBuckets.forEach((dayPlaces, dayIdx) => {
    if (!dayPlaces.length) return;

    // Page break if next block won't fit
    const blockH = 30 + dayPlaces.length * 22;
    if (y + blockH > H - 80) { doc.addPage(); y = 60; }

    // Day header
    doc.setFillColor(...RED);
    doc.rect(40, y, 80, 22, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`GUN ${dayIdx + 1}`, 60, y + 15);

    doc.setTextColor(...NAVY);
    doc.setFontSize(11);
    doc.text(
      tr(`${['Pazartesi', 'Sali', 'Carsamba', 'Persembe', 'Cuma', 'Cumartesi', 'Pazar'][dayIdx % 7]} . ${dayPlaces.length} durak`),
      130, y + 15,
    );

    y += 32;

    autoTable(doc, {
      startY: y,
      head: [['Saat', 'Yer', 'Kategori', 'Mil']],
      body: dayPlaces.map((p) => [
        tr(p.time || '—'),
        tr(p.name),
        tr(p.catLabel || ''),
        p.partner ? `+${p.miles.toLocaleString('tr-TR')}` : '—',
      ]),
      headStyles: { fillColor: GREY, textColor: NAVY, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 9, textColor: TEXT },
      columnStyles: {
        0: { cellWidth: 50, fontStyle: 'bold', textColor: RED },
        1: { cellWidth: 260 },
        2: { cellWidth: 100, textColor: MUTED },
        3: { cellWidth: 60, halign: 'right', textColor: GOLD, fontStyle: 'bold' },
      },
      margin: { left: 40, right: 40 },
      theme: 'grid',
      styles: { lineColor: GREY, lineWidth: 0.4, cellPadding: 6 },
    });

    y = (doc.lastAutoTable?.finalY || y) + 18;
  });

  /* -------- Footer on every page -------- */
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(...GREY);
    doc.line(40, H - 50, W - 40, H - 50);
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.setFont('helvetica', 'normal');
    doc.text(tr('THY Route . Turk Hava Yollari A.O. istiraki'), 40, H - 32);
    doc.text(`Sayfa ${i} / ${pageCount}`, W - 80, H - 32);
    if (shareLink) {
      doc.setTextColor(...RED);
      doc.text(shareLink, 40, H - 18);
    }
  }

  const safe = tr((routeName || `${city}-Rotam`)).replace(/[^a-z0-9-]/gi, '_');
  doc.save(`THYRoute-${safe}.pdf`);
}
