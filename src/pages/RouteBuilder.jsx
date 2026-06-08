import React from 'react';
import { useT as useTR } from '../i18n.jsx';
import { Icon as RBIcon } from '../icons.jsx';
import { Tracker as RBTracker } from './Results.jsx';

/* THY Route — Route Builder (interactive map + day plan + places + co-pilot + miles) */
const RBDS = window.THYRouteDesignSystem_cb84b4;
const { Button: RBBtn, Badge: RBBadge } = RBDS;

/* ---------- Faux map (SVG, Roma layout) ---------- */
function FakeMap({ places, selectedId, onSelectPlace, onAddPoint, copilots }) {
  // base svg is 800x600 — viewport for plotting
  const ref = React.useRef(null);
  const [hoverPlace, setHoverPlace] = React.useState(null);

  const handleClick = (e) => {
    const svg = ref.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const cursor = pt.matrixTransform(svg.getScreenCTM().inverse());
    onAddPoint({ x: Math.round(cursor.x), y: Math.round(cursor.y) });
  };

  // route order = places.filter(p => p.inRoute).sort((a,b)=>a.order-b.order)
  const routed = places.filter(p => p.inRoute && p.order != null).sort((a, b) => a.order - b.order);

  // construct curved path between routed points
  const pathD = routed.length >= 2 ? routed.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = routed[i - 1];
    const cx = (prev.x + p.x) / 2 + (p.y - prev.y) * 0.15;
    const cy = (prev.y + p.y) / 2 - (p.x - prev.x) * 0.15;
    return `${acc} Q ${cx} ${cy}, ${p.x} ${p.y}`;
  }, '') : '';

  return (
    <div style={{ position: 'relative', height: '100%', borderRadius: 12, overflow: 'hidden', background: '#E8EEF5' }}>
      <svg ref={ref} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" onClick={handleClick}
        style={{ width: '100%', height: '100%', cursor: 'crosshair', display: 'block' }}>
        <defs>
          <pattern id="streets" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill="#E8EEF5" />
            <path d="M0,30 L60,30 M30,0 L30,60" stroke="#CDD9E8" strokeWidth="0.5" />
            <path d="M0,15 L60,15 M0,45 L60,45 M15,0 L15,60 M45,0 L45,60" stroke="#DBE3EE" strokeWidth="0.3" />
          </pattern>
          <pattern id="parks" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#D4E6CC" />
            <circle cx="20" cy="20" r="1" fill="#A8C29D" />
          </pattern>
          <linearGradient id="river" x1="0" x2="1">
            <stop offset="0%" stopColor="#9BC1E4" />
            <stop offset="100%" stopColor="#B5D2EB" />
          </linearGradient>
        </defs>

        {/* base */}
        <rect width="800" height="600" fill="url(#streets)" />
        {/* parks (Villa Borghese-ish) */}
        <path d="M 540 80 Q 660 100, 700 180 Q 720 250, 660 280 Q 580 290, 540 230 Z" fill="url(#parks)" opacity="0.85" />
        <path d="M 80 380 Q 60 460, 130 510 Q 230 530, 280 470 Q 270 410, 200 390 Z" fill="url(#parks)" opacity="0.85" />
        {/* river */}
        <path d="M -20 100 Q 100 200, 180 260 T 260 360 T 280 480 T 380 580 L 420 620 L 360 620 Q 240 580, 200 460 T 80 220 L 0 130 Z" fill="url(#river)" opacity="0.75" />

        {/* major streets */}
        <path d="M 100 480 L 360 360 L 480 380 L 660 280" stroke="#fff" strokeWidth="6" fill="none" opacity="0.9" />
        <path d="M 200 80 L 320 240 L 420 380 L 540 540" stroke="#fff" strokeWidth="6" fill="none" opacity="0.9" />
        <path d="M 480 100 L 480 380 L 540 540" stroke="#fff" strokeWidth="4" fill="none" opacity="0.85" />

        {/* district labels */}
        <g style={{ fontFamily: 'system-ui', fontSize: 11, fontWeight: 700, fill: '#6B7C93', textTransform: 'uppercase', letterSpacing: 1, pointerEvents: 'none' }}>
          <text x="220" y="200">CENTRO STORICO</text>
          <text x="100" y="430">TRASTEVERE</text>
          <text x="580" y="160">VILLA BORGHESE</text>
          <text x="500" y="500">TESTACCIO</text>
        </g>

        {/* route polyline (animated) */}
        {pathD && (
          <g style={{ pointerEvents: 'none' }}>
            <path d={pathD} stroke="#B7312C" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeDasharray="0 0"
              style={{ filter: 'drop-shadow(0 2px 4px rgba(183,49,44,0.3))' }} />
            <path d={pathD} stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="6 8"
              style={{ animation: 'planeFly 6s linear infinite' }} />
          </g>
        )}

        {/* all places */}
        {places.map((p) => {
          const isRouted = p.inRoute;
          const isSelected = p.id === selectedId;
          return (
            <g key={p.id} onClick={(e) => { e.stopPropagation(); onSelectPlace(p.id); }}
               onMouseEnter={() => setHoverPlace(p.id)}
               onMouseLeave={() => setHoverPlace(null)}
               style={{ cursor: 'pointer' }}>
              {isSelected && <circle cx={p.x} cy={p.y} r="20" fill="rgba(183,49,44,0.18)" />}
              {hoverPlace === p.id && !isSelected && <circle cx={p.x} cy={p.y} r="16" fill="rgba(10,22,40,0.1)" />}
              <circle cx={p.x} cy={p.y} r={isRouted ? 11 : 7}
                fill={isRouted ? (p.order != null ? '#B7312C' : '#fff') : '#fff'}
                stroke={isRouted ? '#B7312C' : (p.partner ? '#C5A059' : '#0F2244')}
                strokeWidth={isRouted ? 3 : 2.5} />
              {isRouted && p.order != null && (
                <text x={p.x} y={p.y + 4} textAnchor="middle"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 800, fill: '#fff', pointerEvents: 'none' }}>
                  {p.order + 1}
                </text>
              )}
              {p.partner && !isRouted && (
                <circle cx={p.x + 6} cy={p.y - 6} r="4" fill="#C5A059" stroke="#fff" strokeWidth="1" />
              )}
            </g>
          );
        })}

        {/* co-pilot cursors */}
        {copilots.map((cp) => (
          <g key={cp.name} style={{ pointerEvents: 'none', transition: 'transform .5s cubic-bezier(0.16,1,0.3,1)', transform: `translate(${cp.x}px, ${cp.y}px)` }}>
            <path d="M 0 0 L 12 4 L 6 6 L 4 12 Z" fill={cp.color} stroke="#fff" strokeWidth="1.2" />
            <rect x="10" y="13" rx="3" ry="3" width={cp.name.length * 6 + 10} height="16" fill={cp.color} />
            <text x={15} y={24} style={{ fontFamily: 'system-ui', fontSize: 10, fontWeight: 800, fill: '#fff' }}>{cp.name}</text>
          </g>
        ))}
      </svg>

      {/* map controls overlay */}
      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[<RBIcon.plus size={16}/>, <RBIcon.minus size={16}/>].map((ic, i) => (
          <button key={i} style={{
            width: 36, height: 36, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', color: 'var(--thy-navy)',
          }}>{ic}</button>
        ))}
      </div>

      {/* helper hint */}
      <div style={{
        position: 'absolute', top: 16, left: 16, padding: '8px 12px',
        background: 'rgba(255,255,255,0.95)', border: '1px solid #E2E8F0',
        borderRadius: 999, fontSize: 11, fontWeight: 700, color: 'var(--thy-navy)',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <RBIcon.plus size={12} stroke={3} /> Haritada bir yere tıklayın — rotaya eklensin
      </div>

      {/* legend */}
      <div style={{
        position: 'absolute', bottom: 16, left: 16, background: 'rgba(255,255,255,0.95)', borderRadius: 8,
        padding: '12px 14px', fontSize: 11, color: 'var(--thy-navy)',
        border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontWeight: 800, marginBottom: 6, letterSpacing: 1, fontSize: 10 }}>HARİTA</div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#B7312C', border: '2px solid #fff', boxShadow: '0 0 0 1px #B7312C' }} /> Rotada
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff', border: '2px solid #0F2244' }} /> Öneri
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#C5A059' }} /> Mil partneri
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Day plan (vertical timeline, draggable cards) ---------- */
function DayPlan({ places, onRemove, onReorder, onSelect, selectedId }) {
  const t = useTR();
  const routed = places.filter(p => p.inRoute && p.order != null).sort((a, b) => a.order - b.order);
  const dragIdx = React.useRef(null);

  // group into 3 days arbitrarily by index
  const days = [[], [], []];
  routed.forEach((p, i) => days[Math.floor(i / 3) % 3].push(p));

  return (
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {days.map((dayPlaces, dIdx) => dayPlaces.length > 0 && (
        <div key={dIdx}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: 'var(--thy-red)', letterSpacing: 2 }}>{t('rb.day').toUpperCase()} {dIdx + 1}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)' }}>
                {['Perşembe 14 Haz', 'Cuma 15 Haz', 'Cumartesi 16 Haz'][dIdx]}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#64748B', fontWeight: 700 }}>
              {dayPlaces.length} durak
            </div>
          </div>
          {dayPlaces.map((p) => (
            <div key={p.id}
              draggable
              onDragStart={() => { dragIdx.current = p.order; }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); if (dragIdx.current != null) onReorder(dragIdx.current, p.order); dragIdx.current = null; }}
              onClick={() => onSelect(p.id)}
              style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px',
                borderRadius: 6, background: selectedId === p.id ? 'rgba(183,49,44,0.06)' : '#fff',
                border: `1px solid ${selectedId === p.id ? 'rgba(183,49,44,0.3)' : '#F1F5F9'}`,
                cursor: 'grab', marginBottom: 6, transition: 'all .15s',
              }}
              onMouseEnter={(e) => { if (selectedId !== p.id) e.currentTarget.style.background = '#F8FAFC'; }}
              onMouseLeave={(e) => { if (selectedId !== p.id) e.currentTarget.style.background = '#fff'; }}
            >
              <span style={{ color: '#CBD5E1', marginTop: 2, cursor: 'grab' }}>
                <RBIcon.drag size={14} />
              </span>
              <span style={{
                width: 26, height: 26, borderRadius: '50%', background: 'var(--thy-red)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, fontFamily: 'var(--font-mono)', flexShrink: 0,
              }}>{p.order + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: 1 }}>
                  {p.time}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <CatIcon cat={p.cat} /> {p.catLabel}
                  {p.partner && <span style={{ marginLeft: 4, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: 'var(--thy-gold)', padding: '2px 6px', background: 'rgba(197,160,89,0.12)', borderRadius: 3 }}>+{p.miles} MIL</span>}
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); onRemove(p.id); }} style={{
                background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4,
              }} title="Rotadan çıkar">
                <RBIcon.x size={14} />
              </button>
            </div>
          ))}
          {dIdx < days.length - 1 && days[dIdx + 1].length > 0 && (
            <div style={{
              margin: '8px 0 4px 30px', padding: '6px 10px',
              borderLeft: '2px dashed #CBD5E1', fontSize: 11, color: '#64748B',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <RBIcon.bed size={12} /> <span>Gece konaklama — Hotel Artemide</span>
            </div>
          )}
        </div>
      ))}
      {routed.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: '#64748B', fontSize: 13 }}>
          Henüz rota boş. <strong style={{ color: 'var(--thy-navy)' }}>Yerler</strong> sekmesinden ekleyin veya haritadan tıklayın.
        </div>
      )}
    </div>
  );
}

function CatIcon({ cat }) {
  const map = {
    museum:   <RBIcon.museum size={12} />,
    rest:     <RBIcon.utensils size={12} />,
    hotel:    <RBIcon.bed size={12} />,
    shop:     <RBIcon.shop size={12} />,
    view:     <RBIcon.mountain size={12} />,
    other:    <RBIcon.pin size={12} />,
  };
  return <span style={{ color: '#94A3B8' }}>{map[cat] || map.other}</span>;
}

/* ---------- Places browser (filter chips + grid) ---------- */
function PlacesBrowser({ places, onAdd, onSelect, selectedId }) {
  const t = useTR();
  const [filter, setFilter] = React.useState('all');
  const cats = [
    { id: 'all',    label: t('rb.places.all') },
    { id: 'museum', label: t('rb.places.museum'),  icon: <RBIcon.museum size={12} /> },
    { id: 'rest',   label: t('rb.places.rest'),    icon: <RBIcon.utensils size={12} /> },
    { id: 'hotel',  label: t('rb.places.hotel'),   icon: <RBIcon.bed size={12} /> },
    { id: 'shop',   label: t('rb.places.shop'),    icon: <RBIcon.shop size={12} /> },
    { id: 'view',   label: t('rb.places.view'),    icon: <RBIcon.mountain size={12} /> },
  ];
  const filtered = places.filter(p => filter === 'all' || p.cat === filter);
  return (
    <div style={{ padding: 18 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {cats.map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', borderRadius: 4,
            border: `1.5px solid ${filter === c.id ? 'var(--thy-gold)' : '#E2E8F0'}`,
            background: filter === c.id ? 'rgba(197,160,89,0.1)' : '#fff',
            color: filter === c.id ? 'var(--thy-gold)' : 'var(--thy-navy)',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all .15s',
          }}>{c.icon}{c.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map((p) => (
          <div key={p.id} onClick={() => onSelect(p.id)} style={{
            display: 'flex', gap: 12, padding: 12, borderRadius: 6,
            background: selectedId === p.id ? 'rgba(0,83,165,0.06)' : '#F8FAFC',
            border: `1px solid ${selectedId === p.id ? 'rgba(0,83,165,0.3)' : 'transparent'}`,
            cursor: 'pointer', transition: 'all .15s', alignItems: 'center',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 6, background: `hsl(${(p.id * 47) % 360}, 30%, 70%)`,
              flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            }}>{<CatIcon cat={p.cat} />}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                <RBIcon.star size={10} style={{ color: 'var(--thy-gold)' }} /> {p.rating} · {p.catLabel} · {p.duration}
              </div>
              {p.partner && (
                <div style={{ marginTop: 4, fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: 'var(--thy-gold)', letterSpacing: 1 }}>
                  +{p.miles} MIL · ANLAŞMALI
                </div>
              )}
            </div>
            <button onClick={(e) => { e.stopPropagation(); onAdd(p.id); }} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 4,
              background: p.inRoute ? 'rgba(34,197,94,0.12)' : 'var(--thy-red)',
              border: p.inRoute ? '1px solid rgba(34,197,94,0.3)' : 'none',
              color: p.inRoute ? '#16A34A' : '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer',
            }}>{p.inRoute ? t('rb.places.added') : t('rb.places.add')}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Miles panel ---------- */
// Static M&S partner directory grouped by category.
const MS_PARTNERS_BY_CAT = {
  hotel: [
    { name: 'Hilton',            offer: '500 mil / gece',     brand: 'H' },
    { name: 'Marriott Bonvoy',   offer: '650 mil / gece',     brand: 'M' },
    { name: 'Wyndham',           offer: '450 mil / gece',     brand: 'W' },
    { name: 'Hotel Artemide',    offer: '500 mil / gece',     brand: 'A' },
  ],
  rental: [
    { name: 'Sixt',              offer: '1.000 mil / gün',    brand: 'S' },
    { name: 'Avis',              offer: '750 mil / gün',      brand: 'A' },
    { name: 'Europcar',          offer: '600 mil / gün',      brand: 'E' },
  ],
  vip: [
    { name: 'Comfort Pass · IGA',offer: '300 mil / transfer', brand: 'C' },
    { name: 'TravelChair VIP',   offer: '250 mil / yolculuk', brand: 'T' },
    { name: 'BluePort Transfer', offer: '200 mil / transfer', brand: 'B' },
  ],
  tours: [
    { name: 'TUI',               offer: '5 mil / 1 €',        brand: 'T' },
    { name: 'GetYourGuide',      offer: '2 mil / 1 €',        brand: 'G' },
    { name: 'Setur',             offer: '3 mil / 1 ₺',        brand: 'S' },
  ],
  finance: [
    { name: 'Garanti Miles&Smiles Visa', offer: '2 mil / 1 ₺',   brand: 'G' },
    { name: 'Yapı Kredi World',          offer: '1 mil / 1 ₺',   brand: 'Y' },
    { name: 'Akbank Wings',              offer: '1.5 mil / 1 ₺', brand: 'A' },
  ],
  rest: [
    { name: 'Trastevere — Da Enzo', offer: '1.500 mil / yemek',  brand: 'D' },
    { name: 'Roscioli',             offer: '1.200 mil / yemek',  brand: 'R' },
    { name: 'Mikla',                offer: '1.500 mil / yemek',  brand: 'M' },
  ],
};
const MS_CAT_META = [
  { id: 'hotel',   key: 'ms.cat.hotel',   icon: <RBIcon.bed      size={14} /> },
  { id: 'rental',  key: 'ms.cat.rental',  icon: <RBIcon.shop     size={14} /> },
  { id: 'vip',     key: 'ms.cat.vip',     icon: <RBIcon.plane    size={14} /> },
  { id: 'tours',   key: 'ms.cat.tours',   icon: <RBIcon.map      size={14} /> },
  { id: 'finance', key: 'ms.cat.finance', icon: <RBIcon.card     size={14} /> },
  { id: 'rest',    key: 'ms.cat.rest',    icon: <RBIcon.utensils size={14} /> },
];

function MilesPanel({ places, onAdd }) {
  const t = useTR();
  const partners = places.filter(p => p.partner);
  const inRouteMiles = partners.filter(p => p.inRoute).reduce((sum, p) => sum + p.miles, 0);
  const [openCat, setOpenCat] = React.useState({ hotel: true, rental: false, vip: false, tours: false, finance: false, rest: false });
  const toggleCat = (id) => setOpenCat(s => ({ ...s, [id]: !s[id] }));

  return (
    <div style={{ padding: 18 }}>
      <div style={{
        padding: 18, borderRadius: 8,
        background: 'linear-gradient(135deg, rgba(197,160,89,0.18), rgba(197,160,89,0.04))',
        border: '1px solid rgba(197,160,89,0.3)', marginBottom: 16,
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'var(--thy-gold)' }}>
          {t('rb.miles.title').toUpperCase()}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 800, color: 'var(--thy-navy)', marginTop: 4 }}>
          +{inRouteMiles.toLocaleString('tr-TR')} <span style={{ fontSize: 14, color: '#64748B' }}>MIL</span>
        </div>
        <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
          Rotanızdaki {partners.filter(p => p.inRoute).length} anlaşmalı yerden
        </div>
      </div>

      {MS_CAT_META.map((cat) => {
        const partnersInCat = MS_PARTNERS_BY_CAT[cat.id] || [];
        const open = openCat[cat.id];
        return (
          <div key={cat.id} style={{ marginBottom: 10, border: '1px solid #F1F5F9', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
            <button onClick={() => toggleCat(cat.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', background: open ? 'rgba(197,160,89,0.08)' : '#fff',
              border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--thy-navy)' }}>
                <span style={{ color: 'var(--thy-gold)' }}>{cat.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 800 }}>{t(cat.key)}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#94A3B8', fontWeight: 700 }}>
                  {partnersInCat.length}
                </span>
              </span>
              <RBIcon.chevDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s', color: '#94A3B8' }} />
            </button>
            {open && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 10, borderTop: '1px solid #F1F5F9' }}>
                {partnersInCat.map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 12, alignItems: 'center', padding: 10,
                    background: '#F8FAFC', borderRadius: 6,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 6, background: 'var(--thy-gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, flexShrink: 0,
                    }}>{p.brand}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--thy-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--thy-gold)', letterSpacing: 0.5 }}>{p.offer}</div>
                    </div>
                    <button style={{
                      padding: '5px 10px', fontSize: 10, fontWeight: 800,
                      border: '1px solid var(--thy-gold)',
                      background: 'transparent', color: 'var(--thy-gold)',
                      borderRadius: 3, cursor: 'pointer', letterSpacing: 1, whiteSpace: 'nowrap',
                    }}>EKLE</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Co-pilot panel (invite link + activity) ---------- */
function CoPilotPanel({ copilots, onInvite, link }) {
  const t = useTR();
  const [copied, setCopied] = React.useState(false);
  const activity = [
    { who: 'Mehmet', what: '"Trastevere — Da Enzo" yerini ekledi', when: '2dk önce', color: '#C5A059' },
    { who: 'Mehmet', what: 'Gün 2 sırasını değiştirdi', when: '5dk önce', color: '#C5A059' },
    { who: 'Siz',    what: '"Colosseum" yerini ekledi',    when: '8dk önce', color: '#B7312C' },
    { who: 'Mehmet', what: 'Rotaya katıldı', when: '12dk önce', color: '#C5A059' },
  ];
  return (
    <div style={{ padding: 18 }}>
      <div style={{
        padding: 18, borderRadius: 8, background: 'var(--thy-navy)', color: '#fff', marginBottom: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--thy-gold-light)', letterSpacing: 2 }}>
            YARDIMCI PİLOTLAR
          </div>
          <div style={{ display: 'flex' }}>
            {copilots.map((c, i) => (
              <span key={c.name} title={c.name} style={{
                width: 26, height: 26, borderRadius: '50%', background: c.color, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, border: '2px solid var(--thy-navy)', marginLeft: i ? -6 : 0,
              }}>{c.name[0]}</span>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 13, color: '#B2C0D1', margin: '0 0 12px' }}>{t('rb.share.help')}</p>
        <div style={{ display: 'flex', gap: 6, padding: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)' }}>
          <input readOnly value={link} style={{
            flex: 1, background: 'transparent', border: 'none', color: '#fff', padding: '8px 10px',
            fontFamily: 'var(--font-mono)', fontSize: 12, outline: 'none',
          }} />
          <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} style={{
            padding: '8px 14px', background: copied ? '#16A34A' : 'var(--thy-gold)', color: '#fff',
            border: 'none', borderRadius: 4, fontSize: 11, fontWeight: 800, cursor: 'pointer', letterSpacing: 1,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {copied ? <><RBIcon.check size={12} stroke={3} /> {t('rb.share.copied')}</> : <><RBIcon.link size={12} /> {t('rb.share.copy')}</>}
          </button>
        </div>
        <button onClick={onInvite} style={{
          marginTop: 12, width: '100%', padding: 10, background: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4,
          fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <RBIcon.mail size={13} /> E-posta ile davet et
        </button>
      </div>

      <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 2, marginBottom: 10 }}>SON ETKİNLİK</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {activity.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < activity.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
            <span style={{
              width: 26, height: 26, borderRadius: '50%', background: a.color, color: '#fff', flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800,
            }}>{a.who[0]}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: 'var(--thy-navy)' }}>
                <strong style={{ fontWeight: 800 }}>{a.who}</strong> {a.what}
              </div>
              <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{a.when}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Main RouteBuilder page ---------- */
function RouteBuilderPage({ go, summary }) {
  const t = useTR();
  const city = summary?.city || 'Roma';

  // initial places (Roma)
  const initial = [
    { id: 1, name: 'Colosseum',           cat: 'museum', catLabel: 'Müze',     x: 420, y: 360, rating: 4.7, duration: '2sa', time: '09:00', partner: false, inRoute: true, order: 0 },
    { id: 2, name: 'Foro Romano',         cat: 'museum', catLabel: 'Tarihi',   x: 400, y: 320, rating: 4.6, duration: '1.5sa', time: '11:30', partner: false, inRoute: true, order: 1 },
    { id: 3, name: 'Pantheon',            cat: 'museum', catLabel: 'Tarihi',   x: 300, y: 240, rating: 4.8, duration: '1sa',   time: '14:00', partner: false, inRoute: true, order: 2 },
    { id: 4, name: 'Trastevere — Da Enzo',cat: 'rest',   catLabel: 'Restoran', x: 160, y: 380, rating: 4.5, duration: '2sa',   time: '20:00', partner: true,  partnerSub: 'M&S - 1.500 mil/yemek', miles: 1500, inRoute: true, order: 3 },
    { id: 5, name: 'Trevi Çeşmesi',       cat: 'view',   catLabel: 'Manzara',  x: 340, y: 200, rating: 4.7, duration: '30dk',  time: '10:00', partner: false, inRoute: true, order: 4 },
    { id: 6, name: 'Hotel Artemide',      cat: 'hotel',  catLabel: 'Otel',     x: 380, y: 160, rating: 4.6, duration: '—',     time: '21:00', partner: true,  partnerSub: 'M&S - 500 mil/gece',    miles: 500,  inRoute: true, order: 5 },
    { id: 7, name: 'Vatikan Müzesi',      cat: 'museum', catLabel: 'Müze',     x: 200, y: 200, rating: 4.8, duration: '3sa',   time: '',     partner: false, inRoute: false, order: null },
    { id: 8, name: 'Borghese Galerisi',   cat: 'museum', catLabel: 'Müze',     x: 620, y: 180, rating: 4.7, duration: '2sa',   time: '',     partner: false, inRoute: false, order: null },
    { id: 9, name: 'Mercato di Testaccio',cat: 'shop',   catLabel: 'Pazar',    x: 450, y: 510, rating: 4.4, duration: '1.5sa', time: '',     partner: true,  partnerSub: 'M&S - 2 mil/1 TL', miles: 800,  inRoute: false, order: null },
    { id: 10, name: 'Roscioli',           cat: 'rest',   catLabel: 'Restoran', x: 280, y: 280, rating: 4.6, duration: '2sa',   time: '',     partner: true,  partnerSub: 'M&S - 1.200 mil/yemek', miles: 1200, inRoute: false, order: null },
    { id: 11, name: 'Hotel de Russie',    cat: 'hotel',  catLabel: 'Lüks otel',x: 360, y: 110, rating: 4.9, duration: '—',     time: '',     partner: true,  partnerSub: 'M&S - 1.000 mil/gece',   miles: 1000, inRoute: false, order: null },
    { id: 12, name: 'Piazza Navona',      cat: 'view',   catLabel: 'Meydan',   x: 270, y: 220, rating: 4.7, duration: '45dk',  time: '',     partner: false, inRoute: false, order: null },
  ];

  const [places, setPlaces] = React.useState(initial);
  const [tab, setTab] = React.useState('route');
  const [selectedId, setSelectedId] = React.useState(1);
  const [tickShare, setTickShare] = React.useState(false);

  // Multi-route management (persists in localStorage)
  const STORAGE_KEY = 'thyroute_saved_routes';
  const [savedRoutes, setSavedRoutes] = React.useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (parsed && parsed.length) return parsed;
    } catch (e) {}
    return [{ id: 'rm-1', name: `${city} Rotam`, city }];
  });
  const [activeRouteId, setActiveRouteId] = React.useState(() => {
    const stored = localStorage.getItem('thyroute_active_route');
    return stored || 'rm-1';
  });
  const activeRoute = savedRoutes.find(r => r.id === activeRouteId) || savedRoutes[0];
  const [routeNameDraft, setRouteNameDraft] = React.useState(activeRoute?.name || '');
  const [editingName, setEditingName] = React.useState(false);
  const [showRoutes, setShowRoutes] = React.useState(false);
  const [showShare, setShowShare] = React.useState(false);
  const [shareToast, setShareToast] = React.useState('');

  React.useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRoutes)); }, [savedRoutes]);
  React.useEffect(() => { localStorage.setItem('thyroute_active_route', activeRouteId); }, [activeRouteId]);
  React.useEffect(() => { setRouteNameDraft(activeRoute?.name || ''); }, [activeRouteId]);

  const commitRouteName = () => {
    const v = routeNameDraft.trim() || activeRoute.name;
    setSavedRoutes(rs => rs.map(r => r.id === activeRouteId ? { ...r, name: v } : r));
    setEditingName(false);
  };
  const addNewRoute = () => {
    const id = `rm-${Date.now()}`;
    const name = `Yeni Rota ${savedRoutes.length + 1}`;
    setSavedRoutes(rs => [...rs, { id, name, city }]);
    setActiveRouteId(id);
    setShowRoutes(false);
  };
  const deleteRoute = (id) => {
    if (savedRoutes.length <= 1) return;
    setSavedRoutes(rs => rs.filter(r => r.id !== id));
    if (id === activeRouteId) setActiveRouteId(savedRoutes.find(r => r.id !== id).id);
  };
  const handleShare = (kind) => {
    setShowShare(false);
    const msg = kind === 'pdf' ? 'PDF olarak indiriliyor…' :
                kind === 'png' ? 'Görsel olarak indiriliyor…' :
                                 '✓ Bağlantı kopyalandı';
    setShareToast(msg);
    if (kind === 'copy') navigator.clipboard?.writeText('https://thyroute.com/r/' + activeRouteId).catch(() => {});
    setTimeout(() => setShareToast(''), 2200);
  };

  // close menus on outside click
  React.useEffect(() => {
    if (!showRoutes && !showShare) return;
    const h = (e) => {
      if (!e.target.closest('.routes-menu')) setShowRoutes(false);
      if (!e.target.closest('.share-menu'))  setShowShare(false);
    };
    const id = setTimeout(() => document.addEventListener('click', h), 0);
    return () => { clearTimeout(id); document.removeEventListener('click', h); };
  }, [showRoutes, showShare]);

  // co-pilot Mehmet cursor — moves toward various places periodically
  const [copilots, setCopilots] = React.useState([
    { name: 'Mehmet', color: '#C5A059', x: 460, y: 340 },
  ]);
  React.useEffect(() => {
    const id = setInterval(() => {
      setCopilots((prev) => prev.map((c) => {
        const targets = places.filter(p => p.inRoute);
        const t = targets[Math.floor(Math.random() * targets.length)];
        return { ...c, x: t.x + (Math.random() * 40 - 20), y: t.y + (Math.random() * 40 - 20) };
      }));
    }, 3500);
    return () => clearInterval(id);
  }, [places]);

  const selected = places.find(p => p.id === selectedId);

  const addToRoute = (id) => setPlaces((prev) => {
    const t = prev.find(p => p.id === id);
    if (t.inRoute) {
      // remove
      const after = prev.map(p => p.id === id ? { ...p, inRoute: false, order: null, time: '' } : p);
      // re-number remaining
      let i = 0;
      return after.map(p => p.inRoute ? { ...p, order: i++ } : p);
    }
    const used = prev.filter(p => p.inRoute).length;
    const time = `${(9 + used) % 23}:${used % 2 === 0 ? '00' : '30'}`.padStart(5, '0');
    return prev.map(p => p.id === id ? { ...p, inRoute: true, order: used, time } : p);
  });

  const addPointFromMap = (pt) => {
    setPlaces((prev) => {
      const newId = Math.max(...prev.map(p => p.id)) + 1;
      const order = prev.filter(p => p.inRoute).length;
      return [...prev, {
        id: newId, name: `Yeni Durak ${newId}`, cat: 'other', catLabel: 'Kullanıcı pini',
        x: pt.x, y: pt.y, rating: 0, duration: '—', time: `${(9 + order) % 23}:00`,
        partner: false, inRoute: true, order,
      }];
    });
  };

  const removeFromRoute = (id) => addToRoute(id);

  const reorder = (from, to) => {
    setPlaces((prev) => {
      const routed = prev.filter(p => p.inRoute).sort((a, b) => a.order - b.order);
      const [moved] = routed.splice(from, 1);
      routed.splice(to, 0, moved);
      const newOrders = {};
      routed.forEach((p, i) => { newOrders[p.id] = i; });
      return prev.map(p => p.inRoute ? { ...p, order: newOrders[p.id] } : p);
    });
  };

  const routedCount = places.filter(p => p.inRoute).length;
  const totalMiles = places.filter(p => p.inRoute && p.partner).reduce((sum, p) => sum + p.miles, 0);

  const tabs = [
    { id: 'route',   label: t('rb.tab.route'),   icon: <RBIcon.map size={14} /> },
    { id: 'places',  label: t('rb.tab.places'),  icon: <RBIcon.pin size={14} /> },
    { id: 'miles',   label: t('rb.tab.miles'),   icon: <RBIcon.star size={14} /> },
    { id: 'copilot', label: t('rb.tab.copilot'), icon: <RBIcon.users size={14} /> },
  ];

  return (
    <div style={{ background: '#F3F5F8', minHeight: 'calc(100vh - 70px)' }}>
      <RBTracker step={2} />
      {/* hero header */}
      <div style={{ background: 'linear-gradient(135deg, var(--thy-navy) 0%, #142D4F 100%)', color: '#fff', padding: '24px 32px', position: 'relative' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ minWidth: 320 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--thy-gold-light)', letterSpacing: 2, marginBottom: 6 }}>
              {t('rb.eyebrow')} · {city.toUpperCase()}
            </div>

            {/* Route name (editable) + saved-routes dropdown */}
            <div className="routes-menu" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, position: 'relative' }}>
              {editingName ? (
                <input autoFocus value={routeNameDraft}
                  onChange={(e) => setRouteNameDraft(e.target.value)}
                  onBlur={commitRouteName}
                  onKeyDown={(e) => { if (e.key === 'Enter') commitRouteName(); if (e.key === 'Escape') { setRouteNameDraft(activeRoute.name); setEditingName(false); } }}
                  style={{
                    fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800,
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(197,160,89,0.5)',
                    color: '#fff', padding: '4px 10px', borderRadius: 4, outline: 'none',
                    letterSpacing: '-0.5px', minWidth: 280,
                  }} />
              ) : (
                <h1 onClick={() => setEditingName(true)} title="Düzenlemek için tıklayın" style={{
                  fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, margin: 0,
                  letterSpacing: '-0.5px', cursor: 'pointer', borderBottom: '2px dashed transparent',
                  transition: 'border-color .15s',
                }} onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = 'rgba(197,160,89,0.5)'}
                   onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = 'transparent'}>
                  {activeRoute?.name || `${city} Rotanız`}
                </h1>
              )}

              <button onClick={() => setShowRoutes(s => !s)} title="Rotalarım" style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', borderRadius: 4, padding: '6px 10px', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700,
              }}>
                {savedRoutes.length} <RBIcon.chevDown size={12} />
              </button>

              {showRoutes && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0, minWidth: 280,
                  background: '#fff', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  overflow: 'hidden', zIndex: 50,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', padding: '10px 14px 6px', letterSpacing: 1.5 }}>
                    {t('rb.routes.title').toUpperCase()}
                  </div>
                  {savedRoutes.map((r) => (
                    <div key={r.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', background: r.id === activeRouteId ? '#F3F5F8' : '#fff',
                      borderTop: '1px solid #F1F5F9',
                    }}>
                      <button onClick={() => { setActiveRouteId(r.id); setShowRoutes(false); }} style={{
                        flex: 1, background: 'transparent', border: 'none', cursor: 'pointer',
                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
                        color: 'var(--thy-navy)', fontSize: 13, fontWeight: 700,
                      }}>
                        <RBIcon.map size={14} style={{ color: 'var(--thy-red)' }} />
                        {r.name}
                        {r.id === activeRouteId && <span style={{ fontSize: 9, color: '#16A34A', fontWeight: 800, letterSpacing: 1 }}>AKTİF</span>}
                      </button>
                      {savedRoutes.length > 1 && r.id !== activeRouteId && (
                        <button onClick={() => deleteRoute(r.id)} title="Sil" style={{
                          background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 4,
                        }}><RBIcon.trash size={13} /></button>
                      )}
                    </div>
                  ))}
                  <button onClick={addNewRoute} style={{
                    width: '100%', padding: '12px 14px', background: 'var(--thy-red)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    fontSize: 12, fontWeight: 800, letterSpacing: 0.3,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    <RBIcon.plus size={14} stroke={3} /> {t('rb.routes.new')}
                  </button>
                </div>
              )}
            </div>

            <p style={{ fontSize: 13, color: '#B2C0D1', margin: '6px 0 0' }}>{t('rb.summary')}</p>
          </div>

          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <Stat label={t('rb.day').toUpperCase()} value="3" />
            <Stat label="DURAK" value={routedCount} />
            <Stat label={t('rb.totalwalk').toUpperCase()} value="11 km" />
            <Stat label={t('rb.estmiles').toUpperCase()} value={`+${totalMiles.toLocaleString('tr-TR')}`} accent="gold" />

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setTab('copilot')} style={{
                padding: '10px 14px', background: 'var(--thy-gold)', border: 'none', color: '#fff',
                borderRadius: 4, fontSize: 12, fontWeight: 800, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <RBIcon.users size={14} /> {t('rb.share')}
              </button>

              <div className="share-menu" style={{ position: 'relative' }}>
                <button onClick={() => setShowShare(s => !s)} title={t('rb.share.btn')} style={{
                  padding: '10px 12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                  borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  <RBIcon.share size={14} /> {t('rb.share.btn')}
                </button>
                {showShare && (
                  <div style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 240,
                    background: '#fff', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    overflow: 'hidden', zIndex: 50,
                  }}>
                    {[
                      { id: 'pdf',  icon: <RBIcon.download size={14} />, label: t('rb.share.pdf') },
                      { id: 'png',  icon: <RBIcon.download size={14} />, label: t('rb.share.png') },
                      { id: 'copy', icon: <RBIcon.link     size={14} />, label: t('rb.share.copy') },
                    ].map((opt, i) => (
                      <button key={opt.id} onClick={() => handleShare(opt.id)} style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                        padding: '12px 14px', background: '#fff', border: 'none',
                        borderTop: i ? '1px solid #F1F5F9' : 'none', cursor: 'pointer',
                        textAlign: 'left', color: 'var(--thy-navy)', fontSize: 13, fontWeight: 700,
                      }} onMouseEnter={(e) => e.currentTarget.style.background = '#F3F5F8'}
                         onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}>
                        {opt.icon} {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button style={{
                padding: '10px 14px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                <RBIcon.mail size={14} /> {t('rb.report')}
              </button>
            </div>
          </div>
        </div>

        {/* share toast */}
        {shareToast && (
          <div style={{
            position: 'absolute', bottom: -22, left: '50%', transform: 'translateX(-50%)',
            padding: '10px 18px', background: 'rgba(34,197,94,0.95)', color: '#fff',
            borderRadius: 999, fontSize: 12, fontWeight: 800, letterSpacing: 0.5,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)', zIndex: 30,
          }}>{shareToast}</div>
        )}
      </div>

      {/* main 2-col layout */}
      <div style={{ margin: '0 auto', padding: '14px 12px 14px 20px', display: 'grid', gridTemplateColumns: '1fr 540px', gap: 12, height: 'calc(100vh - 70px - 96px - 60px)' }}>
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(10,22,40,0.06)' }}>
          <FakeMap
            places={places}
            selectedId={selectedId}
            onSelectPlace={setSelectedId}
            onAddPoint={addPointFromMap}
            copilots={copilots}
          />
        </div>
        <div style={{ background: '#fff', borderRadius: 12, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(10,22,40,0.06)', overflow: 'hidden' }}>
          {/* tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0' }}>
            {tabs.map((tb) => (
              <button key={tb.id} onClick={() => setTab(tb.id)} style={{
                flex: 1, padding: '14px 6px', background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                fontSize: 13, fontWeight: 700, color: tab === tb.id ? 'var(--thy-red)' : '#64748B',
                borderBottom: `2px solid ${tab === tb.id ? 'var(--thy-red)' : 'transparent'}`,
                transition: 'color .15s, border-color .15s',
                whiteSpace: 'nowrap',
              }}>{tb.icon} {tb.label}</button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }} className="scroll-thin">
            {tab === 'route'   && <DayPlan places={places} onRemove={removeFromRoute} onReorder={reorder} onSelect={setSelectedId} selectedId={selectedId} />}
            {tab === 'places'  && <PlacesBrowser places={places} onAdd={addToRoute} onSelect={setSelectedId} selectedId={selectedId} />}
            {tab === 'miles'   && <MilesPanel places={places} onAdd={addToRoute} />}
            {tab === 'copilot' && <CoPilotPanel copilots={copilots} onInvite={()=>{}} link="https://thyroute.com/r/rm-9k4Xa-2qf" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: '#B2C0D1', letterSpacing: 1.5 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: accent === 'gold' ? 'var(--thy-gold-light)' : '#fff', lineHeight: 1 }}>{value}</div>
    </div>
  );
}

export { RouteBuilderPage };
