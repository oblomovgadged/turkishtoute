import React from 'react';
import { useT } from '../i18n.jsx';
import { Icon } from '../icons.jsx';
import { HeroBg, SectionHeader } from '../shell.jsx';
import { searchAirports } from '../data/airports.js';

/* THY Route — Home page (hero with search, how it works, popular routes, partners) */
const HomeDS = window.THYRouteDesignSystem_cb84b4;
const { Button: HomeButton } = HomeDS;

/* ---------- Booking search card (inline, like turkishairlines.com) ---------- */
function HomeBookingCard({ onSearch }) {
  const t = useT();
  const [trip, setTrip] = React.useState('round');
  const [from, setFrom] = React.useState({ city: 'İstanbul', code: 'IST' });
  const [to, setTo] = React.useState({ city: 'Roma', code: 'FCO' });
  const [pax, setPax] = React.useState({ adult: 1, child: 0, cabin: 'ECO' });
  const [showFrom, setShowFrom] = React.useState(false);
  const [showTo, setShowTo] = React.useState(false);
  const [showDates, setShowDates] = React.useState(false);
  const [showPax, setShowPax] = React.useState(false);
  const [dates, setDates] = React.useState({ go: '13 Haz', back: '28 Haz' });

  // Search the THY destination directory (140+ airports across 6 continents,
  // multiple airports per city — see src/data/airports.js).
  const cities = React.useMemo(() => searchAirports('', 200), []);

  const swap = () => { const a = from; setFrom(to); setTo(a); };

  return (
    <div style={{
      width: '100%', background: '#fff', borderRadius: 8,
      padding: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.22), 0 2px 0 rgba(255,255,255,0.4) inset',
      color: 'var(--thy-navy)',
      position: 'relative',
      // Float above the next section so the airport autocomplete dropdown
      // is never clipped by sibling content.
      zIndex: 50,
    }}>
      {/* Trip type radios */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[['round', t('search.round')], ['oneway', t('search.oneway')], ['stop', t('search.stop')], ['multi', t('search.multi')]].map(([k, l]) => (
            <Radio key={k} label={l} checked={trip === k} onClick={() => setTrip(k)} />
          ))}
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', color: '#64748B' }}>
          <span style={{ width: 18, height: 18, borderRadius: 4, border: '2px solid #94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
          {t('search.miles')}
        </label>
      </div>

      {/* Inline grid */}
      <div style={{ display: 'flex', position: 'relative', background: '#F3F5F8', border: '1px solid #E2E8F0', borderRadius: 6 }}>
        <Cell w="24%" first onClick={() => { setShowFrom(true); setShowTo(false); setShowDates(false); setShowPax(false); }}>
          <Lbl>{t('search.from')}</Lbl>
          <Val>{from.city} <Mono>({from.code})</Mono></Val>
          <Sub>{t('search.from.sub')}</Sub>
          {showFrom && <Dropdown items={cities.filter(c => c.code !== to.code)} onPick={(c) => { setFrom(c); setShowFrom(false); }} onClose={() => setShowFrom(false)} />}
        </Cell>
        <button onClick={swap} aria-label="swap" style={{
          position: 'absolute', left: '24%', top: '50%', transform: 'translate(-50%,-50%)', zIndex: 10,
          width: 34, height: 34, background: '#fff', border: '1px solid #E2E8F0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--thy-navy)', cursor: 'pointer',
        }}>
          <Icon.swap size={16} stroke={2.5} />
        </button>
        <Cell w="24%" onClick={() => { setShowTo(true); setShowFrom(false); setShowDates(false); setShowPax(false); }} style={{ paddingLeft: 28 }}>
          <Lbl>{t('search.to')}</Lbl>
          <Val>{to.city} <Mono>({to.code})</Mono></Val>
          <Sub>{t('search.to.sub')}</Sub>
          {showTo && <Dropdown items={cities.filter(c => c.code !== from.code)} onPick={(c) => { setTo(c); setShowTo(false); }} onClose={() => setShowTo(false)} />}
        </Cell>
        <Cell w="22%" onClick={() => { setShowDates(s => !s); setShowFrom(false); setShowTo(false); setShowPax(false); }}>
          <Lbl>{t('search.date')}</Lbl>
          <Val>{dates.go}{trip === 'round' && ` — ${dates.back}`}</Val>
          <Sub>{trip === 'round' ? '15 gece' : 'Tek yön'}</Sub>
          {showDates && <DatesPopover onPick={(d) => { setDates(d); setShowDates(false); }} onClose={() => setShowDates(false)} trip={trip} />}
        </Cell>
        <Cell w="16%" onClick={() => { setShowPax(s => !s); setShowFrom(false); setShowTo(false); setShowDates(false); }}>
          <Lbl>{t('search.passengers')}</Lbl>
          <Val>{pax.adult + pax.child} Yolcu / {pax.cabin}</Val>
          <Sub>Ekonomi & Business</Sub>
          {showPax && <PaxPopover pax={pax} setPax={setPax} onClose={() => setShowPax(false)} />}
        </Cell>
        <button onClick={() => onSearch({ from, to, trip, dates, pax })} style={{
          width: '14%', background: 'var(--thy-red-light)', color: '#fff',
          fontWeight: 700, fontSize: 15, border: 'none',
          borderTopRightRadius: 6, borderBottomRightRadius: 6, cursor: 'pointer',
          fontFamily: 'var(--font-ui)', position: 'relative', overflow: 'hidden',
          transition: 'background .2s',
        }} onMouseEnter={(e)=>e.currentTarget.style.background='var(--thy-red)'} onMouseLeave={(e)=>e.currentTarget.style.background='var(--thy-red-light)'}>
          {t('search.cta')}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="#" style={{ fontSize: 13, fontWeight: 700, color: 'var(--thy-navy)' }}>{t('search.airports')}</a>
          <a href="#" style={{ fontSize: 13, fontWeight: 700, color: 'var(--thy-navy)' }}>{t('search.recent')}</a>
        </div>
        <a href="#" style={{ fontSize: 12, color: '#64748B', textDecoration: 'underline' }}>{t('search.kvkk')}</a>
      </div>
    </div>
  );
}

/* small inline parts for the search card */
const Lbl = ({ children }) => (
  <span style={{ fontSize: 10, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 2 }}>{children}</span>
);
const Val = ({ children }) => (
  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--thy-navy)', display: 'block', lineHeight: 1.2 }}>{children}</span>
);
const Sub = ({ children }) => (
  <span style={{ fontSize: 11, fontWeight: 500, color: '#64748B', lineHeight: 1.2 }}>{children}</span>
);
const Mono = ({ children }) => (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#64748B' }}>{children}</span>
);

function Cell({ children, w, first, last, style = {}, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: w, padding: '12px 16px 10px', minHeight: 68, position: 'relative', cursor: 'pointer',
        borderRight: '1px solid #E2E8F0',
        borderTopLeftRadius: first ? 6 : 0, borderBottomLeftRadius: first ? 6 : 0,
        background: hover ? '#EBF1F9' : 'transparent',
        transition: 'background .15s',
        ...style,
      }}>
      {children}
    </div>
  );
}

function Radio({ label, checked, onClick }) {
  return (
    <label onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, color: 'var(--thy-navy)' }}>
      <span style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${checked ? 'var(--thy-blue)' : '#94A3B8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--thy-blue)', transform: checked ? 'scale(1)' : 'scale(0)', transition: 'transform 0.15s' }} />
      </span>
      {label}
    </label>
  );
}

function Dropdown({ items, onPick, onClose }) {
  const [q, setQ] = React.useState('');
  // Live search via the airport directory. Falls back to the prop's `items`
  // for the empty query so the page still renders quickly.
  const filtered = q.trim() ? searchAirports(q, 40) : items.slice(0, 40);

  // Group by city so multi-airport cities (IST+SAW, HND+NRT, LHR+LGW+STN)
  // are shown together as one collapsible row.
  const grouped = React.useMemo(() => {
    const byCity = new Map();
    for (const a of filtered) {
      const key = `${a.city}__${a.country}`;
      if (!byCity.has(key)) byCity.set(key, { city: a.city, country: a.country, airports: [] });
      byCity.get(key).airports.push(a);
    }
    return Array.from(byCity.values());
  }, [filtered]);

  React.useEffect(() => {
    const h = (e) => { if (!e.target.closest('.popover')) onClose(); };
    setTimeout(() => document.addEventListener('click', h), 0);
    return () => document.removeEventListener('click', h);
  }, [onClose]);

  return (
    <div className="popover" onClick={(e)=>e.stopPropagation()} style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: 380,
      background: '#fff', borderRadius: 8, border: '1px solid #E2E8F0',
      boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
      // Sit above the page's stacking context — hero + sections below.
      zIndex: 9999,
      padding: 12, maxHeight: 420, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, background: '#F3F5F8', marginBottom: 8 }}>
        <Icon.search size={14} stroke={2.5} />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Şehir, havalimanı adı veya IATA kodu"
          style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 13, flex: 1, color: 'var(--thy-navy)' }} />
      </div>
      <div className="scroll-thin" style={{ maxHeight: 350, overflowY: 'auto' }}>
        {grouped.length === 0 && (
          <div style={{ padding: 20, textAlign: 'center', fontSize: 12, color: '#94A3B8' }}>Sonuç bulunamadı</div>
        )}
        {grouped.map((g) => (
          <div key={g.city + g.country} style={{ marginBottom: 4 }}>
            {/* City header row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 10px 4px', borderBottom: '1px solid #F1F5F9',
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)' }}>{g.city}</div>
                <div style={{ fontSize: 10, color: '#94A3B8', letterSpacing: 0.3 }}>{g.country}</div>
              </div>
              {g.airports.length > 1 && (
                <span style={{
                  fontSize: 9, fontWeight: 800, color: 'var(--thy-blue)', letterSpacing: 1,
                  padding: '2px 6px', background: 'rgba(0,83,165,0.08)', borderRadius: 3,
                }}>{g.airports.length} HAVALİMANI</span>
              )}
            </div>
            {/* Airport rows */}
            {g.airports.map((a) => (
              <button key={a.code} onClick={() => onPick(a)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 10px', background: 'transparent', border: 'none', cursor: 'pointer',
                borderRadius: 6, textAlign: 'left', marginTop: 2,
              }} onMouseEnter={(e)=>e.currentTarget.style.background='#F3F5F8'} onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <Icon.plane size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</span>
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: 'var(--thy-red)',
                  padding: '3px 7px', background: 'rgba(183,49,44,0.08)', borderRadius: 4,
                  flexShrink: 0, marginLeft: 8,
                }}>{a.code}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function DatesPopover({ onPick, onClose, trip }) {
  React.useEffect(() => {
    const h = (e) => { if (!e.target.closest('.popover')) onClose(); };
    setTimeout(() => document.addEventListener('click', h), 0);
    return () => document.removeEventListener('click', h);
  }, [onClose]);
  const months = [
    { name: 'Haziran', short: 'Haz' }, { name: 'Temmuz', short: 'Tem' },
  ];
  const daysIn = (idx) => idx === 0 ? 30 : 31;
  const [go, setGo] = React.useState(13);
  const [back, setBack] = React.useState(28);
  return (
    <div className="popover" onClick={(e)=>e.stopPropagation()} style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: 620,
      background: '#fff', borderRadius: 8, border: '1px solid #E2E8F0',
      boxShadow: '0 20px 40px rgba(0,0,0,0.18)', zIndex: 9999, padding: 16,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {months.map((m, idx) => (
          <div key={m.name}>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)', textAlign: 'center', marginBottom: 12 }}>{m.name} 2026</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, fontSize: 11 }}>
              {['Pt','Sa','Ça','Pe','Cu','Ct','Pz'].map(d => <div key={d} style={{ textAlign: 'center', color: '#94A3B8', fontWeight: 700, padding: '6px 0' }}>{d}</div>)}
              {Array.from({ length: daysIn(idx) }, (_, i) => i + 1).map(d => {
                const isGo   = idx === 0 && d === go;
                const isBack = idx === 0 && d === back && trip === 'round';
                const isIn   = idx === 0 && d > go && d < back && trip === 'round';
                return (
                  <button key={d} onClick={() => {
                    if (trip !== 'round') { setGo(d); onPick({ go: `${d} ${m.short}`, back: '' }); return; }
                    if (d <= go) { setGo(d); }
                    else { setBack(d); onPick({ go: `${go} ${m.short}`, back: `${d} ${m.short}` }); }
                  }}
                    style={{
                      padding: '8px 0', textAlign: 'center', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                      border: 'none', borderRadius: 4,
                      background: isGo || isBack ? 'var(--thy-red)' : isIn ? 'rgba(183,49,44,0.1)' : 'transparent',
                      color: isGo || isBack ? '#fff' : 'var(--thy-navy)',
                    }}>{d}</button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaxPopover({ pax, setPax, onClose }) {
  React.useEffect(() => {
    const h = (e) => { if (!e.target.closest('.popover')) onClose(); };
    setTimeout(() => document.addEventListener('click', h), 0);
    return () => document.removeEventListener('click', h);
  }, [onClose]);
  const row = (label, key) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F3F5F8' }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--thy-navy)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setPax(p => ({ ...p, [key]: Math.max(0, p[key] - (key==='adult'?1:1)) }))} style={btnS}>−</button>
        <span style={{ fontSize: 14, fontWeight: 800, minWidth: 16, textAlign: 'center' }}>{pax[key]}</span>
        <button onClick={() => setPax(p => ({ ...p, [key]: p[key] + 1 }))} style={btnS}>+</button>
      </div>
    </div>
  );
  const btnS = { width: 28, height: 28, border: '1px solid #E2E8F0', background: '#fff', borderRadius: 6, fontSize: 16, fontWeight: 800, cursor: 'pointer', color: 'var(--thy-navy)' };
  return (
    <div className="popover" onClick={(e)=>e.stopPropagation()} style={{
      position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 300,
      background: '#fff', borderRadius: 8, border: '1px solid #E2E8F0',
      boxShadow: '0 20px 40px rgba(0,0,0,0.18)', zIndex: 9999, padding: 16,
    }}>
      {row('Yetişkin', 'adult')}
      {row('Çocuk (2-11)', 'child')}
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B', letterSpacing: 0.5, marginBottom: 8 }}>KABİN SINIFI</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {['ECO', 'BUSINESS'].map(c => (
            <button key={c} onClick={() => setPax(p => ({ ...p, cabin: c }))} style={{
              padding: '8px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              border: `1.5px solid ${pax.cabin === c ? 'var(--thy-red)' : '#E2E8F0'}`,
              background: pax.cabin === c ? 'rgba(183,49,44,0.06)' : '#fff',
              color: pax.cabin === c ? 'var(--thy-red)' : 'var(--thy-navy)',
              borderRadius: 6,
            }}>{c}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- How it works (4 steps) ---------- */
function HowItWorks() {
  const t = useT();
  const steps = [
    { n: '01', icon: <Icon.planeTake size={28} stroke={1.8} />, title: t('home.step1.title'), desc: t('home.step1.desc'), color: 'var(--thy-blue)' },
    { n: '02', icon: <Icon.map      size={28} stroke={1.8} />, title: t('home.step2.title'), desc: t('home.step2.desc'), color: 'var(--thy-red)' },
    { n: '03', icon: <Icon.users    size={28} stroke={1.8} />, title: t('home.step3.title'), desc: t('home.step3.desc'), color: '#0F2244' },
    { n: '04', icon: <Icon.star     size={28} stroke={1.8} />, title: t('home.step4.title'), desc: t('home.step4.desc'), color: 'var(--thy-gold)' },
  ];
  return (
    <section style={{ padding: '80px 32px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader eyebrow={t('home.howit')} title={
          <span>Uçmak hikayenin <span style={{ color: 'var(--thy-red)' }}>yarısı</span>. Diğer yarısını biz hazırlıyoruz.</span>
        } />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24,
              position: 'relative', overflow: 'hidden',
              transition: 'transform .25s, box-shadow .25s, border-color .25s',
            }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 14px 40px rgba(10,22,40,0.12)'; e.currentTarget.style.borderColor=s.color; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='#E2E8F0'; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <span style={{ width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, background: `${s.color}10` }}>
                  {s.icon}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: '#CBD5E1', letterSpacing: 1.5 }}>{s.n}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 800, color: 'var(--thy-navy)', margin: '0 0 8px', lineHeight: 1.25 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0, lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Popular routes (image cards) ---------- */
function PopularRoutes({ go }) {
  const t = useT();
  const routes = [
    { from: 'IST', to: 'FCO', city: 'Roma', country: 'İtalya', price: '6.480', img: 'linear-gradient(135deg, #D97757 0%, #B7312C 60%, #6B1E18 100%)', tag: 'ÖNERİLEN' },
    { from: 'IST', to: 'CDG', city: 'Paris', country: 'Fransa', price: '7.940', img: 'linear-gradient(135deg, #6B7C93 0%, #0F2244 100%)', tag: null },
    { from: 'IST', to: 'BCN', city: 'Barselona', country: 'İspanya', price: '5.890', img: 'linear-gradient(135deg, #C5A059 0%, #8B6630 100%)', tag: null },
    { from: 'IST', to: 'JFK', city: 'New York', country: 'ABD', price: '24.800', img: 'linear-gradient(135deg, #142D4F 0%, #050B14 100%)', tag: 'MEVSİMSEL' },
    { from: 'IST', to: 'HND', city: 'Tokyo', country: 'Japonya', price: '32.450', img: 'linear-gradient(135deg, #E31837 0%, #4A0E13 100%)', tag: null },
    { from: 'IST', to: 'DXB', city: 'Dubai', country: 'BAE', price: '8.120', img: 'linear-gradient(135deg, #D9BE84 0%, #794C37 100%)', tag: null },
  ];
  return (
    <section style={{ padding: '80px 32px', background: '#F3F5F8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <SectionHeader eyebrow={t('home.popular')} title="Bu hafta İstanbul'dan" />
          <a href="#" onClick={(e)=>{e.preventDefault(); go('explore');}} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, fontWeight: 700, color: 'var(--thy-red)',
          }}>Tüm uçuş noktaları <Icon.arrowRight size={14} /></a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {routes.map((r) => (
            <button key={r.to} onClick={() => go('results', { from: { city: 'İstanbul', code: 'IST' }, to: { city: r.city, code: r.to } })}
              style={{
                position: 'relative', height: 220, borderRadius: 12, border: 'none',
                cursor: 'pointer', overflow: 'hidden', textAlign: 'left',
                background: r.img, color: '#fff', padding: 0,
                boxShadow: '0 4px 14px rgba(10,22,40,0.1)',
                transition: 'transform .3s, box-shadow .3s',
              }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 20px 40px rgba(10,22,40,0.2)'; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 4px 14px rgba(10,22,40,0.1)'; }}>
              {/* world map overlay */}
              <img src="/assets/AnaEkran.png" alt="" aria-hidden style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.16, mixBlendMode: 'screen',
              }} />
              {/* gradient overlay for contrast */}
              <div aria-hidden style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg, transparent 30%, rgba(10,22,40,0.6) 100%)',
              }} />
              {r.tag && (
                <span style={{
                  position: 'absolute', top: 16, left: 16, fontSize: 9, fontWeight: 800, letterSpacing: 2,
                  background: 'rgba(255,255,255,0.95)', color: 'var(--thy-red)', padding: '5px 10px', borderRadius: 3,
                }}>{r.tag}</span>
              )}
              <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, letterSpacing: 1.5 }}>
                  <span>{r.from}</span>
                  <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
                  <Icon.plane size={12} />
                  <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.6)' }} />
                  <span>{r.to}</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px' }}>{r.city}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 10 }}>{r.country}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, opacity: 0.75 }}>BAŞLANGIÇ</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontSize: 22, fontWeight: 800 }}>{r.price}</span>
                        <span style={{ fontSize: 13, opacity: 0.85 }}>TL</span>
                      </div>
                    </div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.4)',
                    }}>
                      <Icon.arrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Miles & Smiles partner showcase ---------- */
function PartnerShowcase() {
  const t = useT();
  const partners = [
    { name: 'Hilton',         cat: 'Konaklama',  miles: '500 Mil / gece', color: '#142D4F' },
    { name: 'Sixt',           cat: 'Araç Kiralama', miles: '1.000 Mil / gün', color: '#FF8C00' },
    { name: 'Zorlu Center',   cat: 'Alışveriş', miles: '2 Mil / 1 TL', color: '#B7312C' },
    { name: 'Mikla',          cat: 'Yemek',     miles: '1.500 Mil', color: '#0F2244' },
    { name: 'Pera Müzesi',    cat: 'Kültür',    miles: '300 Mil', color: '#794C37' },
    { name: 'Borusan Otto',   cat: 'Müzayede',  miles: '1 Mil / 1 TL', color: '#0053A5' },
  ];
  return (
    <section style={{ position: 'relative', padding: '80px 32px', background: 'linear-gradient(180deg, #0A1628 0%, #142D4F 100%)', color: '#fff', overflow: 'hidden' }}>
      <img src="/assets/panorama.png" alt="" aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', opacity: 0.06, pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--thy-gold-light)', marginBottom: 12 }}>
            {t('home.partners')}
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px', margin: 0, lineHeight: 1.15, maxWidth: 720 }}>
            {t('home.partners.sub')}
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {partners.map((p) => (
            <div key={p.name} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.085)',
              borderRadius: 8, padding: 18, transition: 'all .25s',
              backdropFilter: 'blur(8px)',
            }}
              onMouseEnter={(e)=>{ e.currentTarget.style.borderColor='rgba(197,160,89,0.4)'; e.currentTarget.style.background='rgba(255,255,255,0.075)'; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.085)'; e.currentTarget.style.background='rgba(255,255,255,0.045)'; }}>
              <div style={{
                width: 48, height: 48, borderRadius: 8, background: p.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: '#fff',
              }}>{p.name[0]}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#B2C0D1', letterSpacing: 0.3 }}>{p.cat}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: 'var(--thy-gold-light)', letterSpacing: 0.5 }}>{p.miles}</div>
                <div style={{ fontSize: 10, color: '#7A8EAF', letterSpacing: 1, marginTop: 2 }}>KAZANIM</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Collaborative-route promo (split with mockup) ---------- */
function CoPilotPromo({ go }) {
  return (
    <section style={{ padding: '80px 32px', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'var(--thy-red)', marginBottom: 12 }}>
            YARDIMCI PİLOT MODU
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800, letterSpacing: '-0.5px', margin: '0 0 16px', lineHeight: 1.1, color: 'var(--thy-navy)' }}>
            Aynı haritada,<br/>iki çift göz.
          </h2>
          <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.6, margin: '0 0 24px' }}>
            Bir bağlantı paylaşın — eşiniz, ailen veya dostunuz aynı rotayı sizinle birlikte düzenler.
            Eklenen her yer ikinizde de anında belirir. Mil kazanımları paylaşılır.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <HomeButton variant="primary" onClick={() => go('route')}>Demo'yu deneyin →</HomeButton>
            <HomeButton variant="secondary" onClick={() => go('explore')} style={{ color: 'var(--thy-navy)', borderColor: '#E2E8F0', background: '#fff' }}>Daha fazla</HomeButton>
          </div>
        </div>
        <div style={{
          position: 'relative', borderRadius: 16, overflow: 'hidden',
          background: 'linear-gradient(165deg, #0A1628 0%, #142D4F 60%, #1A3A60 100%)',
          padding: 32, color: '#fff', boxShadow: '0 30px 60px rgba(10,22,40,0.25)',
          minHeight: 380,
        }}>
          <img src="/assets/AnaEkran.png" alt="" aria-hidden style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.22, mixBlendMode: 'screen', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, letterSpacing: 2 }}>ROMA · GÜN 2</div>
              <div style={{ display: 'flex', gap: -4 }}>
                {['A', 'M'].map((l, i) => (
                  <span key={l} style={{
                    width: 28, height: 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    background: i === 0 ? 'var(--thy-red)' : 'var(--thy-gold)', color: '#fff',
                    fontWeight: 800, fontSize: 12, border: '2px solid #0A1628', marginLeft: i ? -8 : 0,
                  }}>{l}</span>
                ))}
              </div>
            </div>
            {[
              { t: '09:00', n: 'Colosseum', a: 'Ayşe ekledi', c: 'rgba(197,160,89,0.95)' },
              { t: '11:30', n: 'Foro Romano', a: '', c: 'rgba(255,255,255,0.85)' },
              { t: '14:00', n: 'Trastevere — Da Enzo', a: 'Mehmet ekledi · Anlaşmalı', c: 'rgba(255,255,255,0.85)', miles: '+1.500 Mil' },
              { t: '17:00', n: 'Trevi Çeşmesi', a: '', c: 'rgba(255,255,255,0.85)' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, padding: '12px 14px',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: row.c, minWidth: 44 }}>{row.t}</span>
                <span style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{row.n}</div>
                  {row.a && <div style={{ fontSize: 11, color: '#B2C0D1' }}>{row.a}</div>}
                </span>
                {row.miles && (
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: 'var(--thy-gold-light)', padding: '4px 8px', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 3 }}>
                    {row.miles}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Bottom call-to-explore ---------- */
function FinalCTA({ go }) {
  return (
    <section style={{ padding: '60px 32px', background: '#F3F5F8' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        background: 'linear-gradient(135deg, #B7312C 0%, #8E211D 100%)',
        borderRadius: 16, padding: '40px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', right: -40, top: -40, width: 280, height: 280, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)',
        }} />
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: 2, opacity: 0.85, marginBottom: 8 }}>
            HAZIR MISINIZ?
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>
            Bir bilet alın, şehri biz sizinle gezelim.
          </h2>
        </div>
        <HomeButton variant="gold" size="lg" onClick={() => go('home', null, true)}>Uçuş ara →</HomeButton>
      </div>
    </section>
  );
}

/* ---------- Home assembly ---------- */
function HomePage({ go, onSearch }) {
  const t = useT();
  return (
    <div>
      <HeroBg tall>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px 48px' }}>
          <div style={{ color: '#fff', maxWidth: 700, textShadow: '0 4px 16px rgba(0,0,0,0.4)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
              letterSpacing: 3, color: 'var(--thy-gold-light)', marginBottom: 16,
            }}>{t('home.eyebrow')}</div>
            <h1 style={{
              fontFamily: 'var(--font-heading)', fontSize: 42, fontWeight: 900,
              letterSpacing: '-1px', margin: '0 0 14px', lineHeight: 1.08, textWrap: 'balance',
            }}>{t('home.headline')}</h1>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.9)', margin: '0 0 24px', lineHeight: 1.5, maxWidth: 600 }}>
              {t('home.subhead')}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{
                fontSize: 13, fontWeight: 700, color: '#fff', border: '1.5px solid #fff',
                padding: '10px 28px', borderRadius: 4, background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)', cursor: 'pointer',
              }}>{t('home.cta.explore')}</button>
              <button onClick={() => go('explore')} style={{
                fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)',
                border: 'none', padding: '10px 0', background: 'transparent', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>Tüm uçuş noktaları <Icon.arrowRight size={14} /></button>
            </div>
          </div>
          <div style={{ marginTop: 40 }}>
            <HomeBookingCard onSearch={onSearch} />
          </div>
          {/* trust strip */}
          <div style={{
            marginTop: 24, display: 'flex', gap: 28, color: 'rgba(255,255,255,0.85)',
            fontSize: 12, fontWeight: 600, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {[
              { ic: <Icon.shield size={14} />, t: '7/24 KVKK Güvencesi' },
              { ic: <Icon.star size={14} />,   t: 'Skytrax 4★ Havayolu' },
              { ic: <Icon.globe size={14} />,  t: '345+ Uçuş noktası' },
              { ic: <Icon.users size={14} />,  t: 'Star Alliance üyesi' },
            ].map((x, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{x.ic} {x.t}</span>
            ))}
          </div>
        </div>
      </HeroBg>
      <HowItWorks />
      <PopularRoutes go={go} />
      <CoPilotPromo go={go} />
      <PartnerShowcase />
      <FinalCTA go={go} />
    </div>
  );
}

export { HomePage };
