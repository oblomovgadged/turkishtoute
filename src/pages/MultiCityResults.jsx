import React from 'react';
import { useT, useMoney } from '../i18n.jsx';
import { Icon as MIcon } from '../icons.jsx';
import { calcEarnedMiles } from '../services/miles.js';
import { findCity } from '../data/turkeyTour.js';

/**
 * THY Route — Multi-city ("Türkiye Turu") results page.
 *
 * Renders the auto-built itinerary as a stack of segments + the inter-city
 * flights between them. The user can:
 *   - re-order segments by drag (not yet — planned)
 *   - change city count / days (via "Düzenle" — opens a modal that
 *     surfaces the same controls as the Home page's TurkeyTourPanel)
 *   - hit "Rotamı oluştur" to advance to the multi-city Route Builder.
 *
 * Inter-city flights are auto-selected by the system using the THY/AJet
 * matrix in `turkeyTour.js`. The user can swap times via "Düzenle".
 */
function MultiCityResultsPage({ go, search }) {
  const t = useT();
  const money = useMoney();
  const tour = search?.tour;

  // Sanity guard: if no tour data was passed, fall back to home.
  if (!tour) {
    return (
      <div style={{ padding: 60, textAlign: 'center', color: 'var(--thy-navy)' }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Tur verisi bulunamadı</div>
        <button onClick={() => go('home')} style={{
          padding: '10px 22px', background: 'var(--thy-red)', color: '#fff',
          border: 'none', borderRadius: 4, fontWeight: 800, cursor: 'pointer',
        }}>Ana sayfaya dön →</button>
      </div>
    );
  }

  const { fromCity, segments, flights, totalDays, packageName } = tour;
  const intercity = flights.filter(f => f.kind === 'intercity');
  const inbound  = flights.find(f => f.kind === 'inbound');
  const outbound = flights.find(f => f.kind === 'outbound');

  // Price estimation — we don't hit Duffel for the multi-leg case yet.
  // Use a simple heuristic: international round trip ~22.000 TL + 3.500 TL
  // per inter-city leg.
  const intlPrice = 22000;
  const domesticPrice = 3500;
  const totalPrice = intlPrice + (intercity.length * domesticPrice);

  // Miles potential — sum each leg via the existing calculator.
  const totalMiles =
    (inbound  ? calcEarnedMiles(inbound.from,  inbound.to,  'eco').miles : 0) +
    (outbound ? calcEarnedMiles(outbound.from, outbound.to, 'eco').miles : 0) +
    intercity.reduce((sum, f) => sum + calcEarnedMiles(f.from, f.to, 'eco').miles, 0);

  return (
    <div style={{ background: '#F3F5F8', minHeight: '100vh' }}>
      {/* Hero header — emphasise it's a multi-city plan */}
      <div style={{ background: 'linear-gradient(135deg, var(--thy-navy) 0%, #142D4F 100%)', color: '#fff', padding: '32px 32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--thy-gold-light)', marginBottom: 8 }}>
            TÜRKİYE TURU · OTOMATİK PLAN HAZIR
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 18 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
                {packageName} · {totalDays} gün
              </h1>
              <div style={{ color: '#B2C0D1', marginTop: 6, fontSize: 14 }}>
                {fromCity.city} ({fromCity.code}) → {segments.map(s => s.city).join(' → ')} → {fromCity.city}
              </div>
            </div>
            <button onClick={() => go('home')} style={{
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', padding: '10px 18px', borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <MIcon.edit size={13} /> Aramayı düzenle
            </button>
          </div>
        </div>
      </div>

      {/* Main column */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <main>
          {/* International inbound */}
          {inbound && (
            <FlightCard kind="inbound" flight={inbound} note={`${fromCity.city} (${fromCity.code}) → İstanbul (IST)`} />
          )}

          {/* City segments + intercity flights */}
          {segments.map((seg, i) => (
            <React.Fragment key={seg.iata}>
              <SegmentCard seg={seg} dayNumStart={dayStart(segments, i)} />
              {intercity[i] && (
                <FlightCard kind="intercity" flight={intercity[i]} note={`${seg.city} → ${segments[i + 1]?.city}`} />
              )}
            </React.Fragment>
          ))}

          {/* International outbound */}
          {outbound && (
            <FlightCard kind="outbound" flight={outbound} note={`İstanbul (IST) → ${fromCity.city} (${fromCity.code})`} />
          )}

          {/* Empty-state */}
          {segments.length === 0 && (
            <div style={{ padding: 40, background: '#fff', borderRadius: 10, textAlign: 'center', color: '#64748B' }}>
              Hiç şehir seçilmedi. <button onClick={() => go('home')} style={{ color: 'var(--thy-red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Ana sayfaya dönün</button>.
            </div>
          )}
        </main>

        {/* Sticky summary */}
        <aside style={{ position: 'sticky', top: 90, alignSelf: 'flex-start' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 22, border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(10,22,40,0.06)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: '#64748B', marginBottom: 16 }}>YOLCULUK ÖZETİ</div>

            <Row label="Toplam süre"     value={`${totalDays} gün`} />
            <Row label="Şehir sayısı"    value={`${segments.length}`} />
            <Row label="Yurt içi uçuş"   value={`${intercity.length}`} />
            <Row label="Uluslararası"    value={inbound && outbound ? '2 (gidiş-dönüş)' : '—'} />

            <div style={{ borderTop: '2px solid var(--thy-navy)', marginTop: 14, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--thy-navy)', letterSpacing: 1.5 }}>TAHMİNİ TOPLAM</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: 'var(--thy-navy)' }}>{money(totalPrice)}</span>
            </div>

            <div style={{
              marginTop: 14, padding: 12, borderRadius: 8,
              background: 'linear-gradient(135deg, rgba(197,160,89,0.12), rgba(197,160,89,0.04))',
              border: '1px solid rgba(197,160,89,0.3)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--thy-gold)', letterSpacing: 1.5 }}>TAHMİNİ MİL</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: 'var(--thy-navy)' }}>
                +{totalMiles.toLocaleString('tr-TR')}
              </div>
            </div>

            <button
              onClick={() => go('route', {
                city: segments[0]?.city || 'İstanbul',
                tour, // pass the whole tour so Route Builder can show city tabs
                multi: true,
              })}
              style={{
                marginTop: 18, width: '100%', padding: '14px 18px',
                background: 'var(--thy-red-light)', color: '#fff',
                border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: 'pointer',
              }}>
              Rotamı oluştur →
            </button>

            <div style={{
              marginTop: 12, padding: 12, background: '#F8FAFC', borderRadius: 6,
              fontSize: 11, color: '#64748B', lineHeight: 1.5, display: 'flex', gap: 8,
            }}>
              <MIcon.shield size={14} style={{ color: 'var(--thy-blue)', flexShrink: 0 }} />
              <div>THY Route bilet satışı yapmaz. Bu plan ile <strong style={{ color: 'var(--thy-navy)' }}>thy.com</strong>'da çoklu uçuş araması yapabilirsiniz. Plan kaydedilecek.</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/** Returns the cumulative day index for the start of segment i. */
function dayStart(segments, i) {
  let s = 1;
  for (let j = 0; j < i; j++) s += segments[j].days;
  return s;
}

function Row({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
      <span style={{ color: '#64748B' }}>{label}</span>
      <span style={{ fontWeight: 800, color: 'var(--thy-navy)' }}>{value}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   SegmentCard — one city block in the tour
   ────────────────────────────────────────────── */
function SegmentCard({ seg, dayNumStart }) {
  const city = findCity(seg.slug || seg.iata);
  return (
    <div style={{
      background: '#fff', borderRadius: 12, marginBottom: 12,
      border: '1px solid #E2E8F0', overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(0,0,0,0.02)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'stretch', minHeight: 132,
      }}>
        {/* Image bar */}
        <div style={{
          width: 180, background: seg.image || city?.image || 'var(--thy-navy)',
          color: '#fff', padding: '18px 16px', position: 'relative', flexShrink: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, opacity: 0.85 }}>
              {city?.region?.toUpperCase() || 'TÜRKİYE'}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 21, fontWeight: 800, letterSpacing: '-0.3px', marginTop: 2 }}>
              {seg.city}
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, letterSpacing: 1, opacity: 0.85 }}>
            {seg.iata}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                Gün <strong style={{ color: 'var(--thy-navy)', fontFamily: 'var(--font-mono)' }}>{dayNumStart}</strong>
                {' '}–{' '}
                <strong style={{ color: 'var(--thy-navy)', fontFamily: 'var(--font-mono)' }}>{dayNumStart + seg.days - 1}</strong>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800,
                padding: '3px 10px', borderRadius: 3,
                background: 'rgba(183,49,44,0.1)', color: 'var(--thy-red)', letterSpacing: 0.5,
              }}>
                {seg.days} GÜN
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--thy-navy)', marginTop: 8, lineHeight: 1.5 }}>
              {city?.blurb || ''}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
            <span style={{ fontSize: 11, color: '#64748B' }}>
              Bu şehir için rotanızı oluşturup yerel önerileri göreceksiniz.
            </span>
            <button style={{
              padding: '6px 12px', background: 'transparent', border: '1px solid #E2E8F0',
              color: 'var(--thy-navy)', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}>
              <MIcon.edit size={11} /> Gün sayısını değiştir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   FlightCard — international or intercity hop
   ────────────────────────────────────────────── */
function FlightCard({ kind, flight, note }) {
  const isAJ = flight.carrier === 'AJ';
  const isIntl = kind === 'inbound' || kind === 'outbound';
  const carrierName = isAJ ? 'AnadoluJet' : 'Turkish Airlines';
  const accent = isAJ ? '#FFB81C' : 'var(--thy-red)';
  const arr = computeArrival(flight.dep, flight.duration);
  return (
    <div style={{
      display: 'flex', alignItems: 'stretch', marginBottom: 12, borderRadius: 8,
      background: isIntl ? '#fff' : '#F8FAFC',
      border: `1px solid ${isIntl ? '#E2E8F0' : '#F1F5F9'}`,
      overflow: 'hidden',
    }}>
      <div style={{
        width: 6, background: accent, flexShrink: 0,
      }} />
      <div style={{ flex: 1, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 200 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
            padding: '3px 7px', background: accent, color: '#fff', borderRadius: 3,
          }}>
            {isIntl ? (kind === 'inbound' ? 'GİDİŞ' : 'DÖNÜŞ') : 'YURT İÇİ'}
          </span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)' }}>
              {carrierName}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#64748B', fontWeight: 700 }}>
              {flight.flightNo}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, justifyContent: 'center', minWidth: 280 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: 'var(--thy-navy)', lineHeight: 1 }}>{flight.dep}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#64748B', fontWeight: 700, marginTop: 4 }}>{flight.from}</div>
          </div>
          <div style={{ flex: 1, position: 'relative', maxWidth: 140 }}>
            <div style={{ textAlign: 'center', fontSize: 10, color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>{flight.duration}</div>
            <div style={{ height: 1, background: '#CBD5E1', margin: '6px 0', position: 'relative' }}>
              <MIcon.plane size={13} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%) rotate(45deg)', background: '#fff', padding: 2, color: accent }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 10, color: '#94A3B8' }}>{flight.aircraft}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: 'var(--thy-navy)', lineHeight: 1 }}>{arr}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#64748B', fontWeight: 700, marginTop: 4 }}>{flight.to}</div>
          </div>
        </div>

        <button style={{
          padding: '7px 12px', background: 'transparent', border: '1px solid #E2E8F0',
          color: 'var(--thy-navy)', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
        }}>
          <MIcon.edit size={11} /> Düzenle
        </button>
      </div>
    </div>
  );
}

/** Add duration string ("1sa 25dk" or "10sa 30dk") to a HH:MM time. */
function computeArrival(dep, durStr) {
  if (!dep || !durStr) return '—';
  const [h, m] = dep.split(':').map(Number);
  const match = /(\d+)\s*sa(?:\s*(\d+)\s*dk)?/.exec(durStr);
  if (!match) return '—';
  const dh = parseInt(match[1], 10) || 0;
  const dm = parseInt(match[2], 10) || 0;
  let total = h * 60 + m + dh * 60 + dm;
  total = total % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export { MultiCityResultsPage };
