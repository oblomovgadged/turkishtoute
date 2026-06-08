import React from 'react';
import { useT as useTE } from '../i18n.jsx';
import { Icon as EIcon } from '../icons.jsx';

/* THY Route — Explore destinations */
function ExplorePage({ go }) {
  const t = useTE();
  const [region, setRegion] = React.useState('all');
  const regions = [
    { id: 'all', label: 'Tümü' },
    { id: 'eur', label: 'Avrupa' },
    { id: 'asia', label: 'Asya' },
    { id: 'mid', label: 'Orta Doğu' },
    { id: 'na', label: 'Kuzey Amerika' },
    { id: 'tr', label: 'Yurtiçi' },
  ];
  const dests = [
    { code: 'FCO', city: 'Roma',      country: 'İtalya',          region: 'eur', price: '6.480', miles: 2840, hrs: '3sa 50dk', tag: 'POPÜLER', grad: 'linear-gradient(135deg, #D97757, #6B1E18)' },
    { code: 'CDG', city: 'Paris',     country: 'Fransa',          region: 'eur', price: '7.940', miles: 3120, hrs: '3sa 50dk', tag: null, grad: 'linear-gradient(135deg, #6B7C93, #0F2244)' },
    { code: 'BCN', city: 'Barselona', country: 'İspanya',         region: 'eur', price: '5.890', miles: 3680, hrs: '4sa 5dk',  tag: null, grad: 'linear-gradient(135deg, #C5A059, #8B6630)' },
    { code: 'LHR', city: 'Londra',    country: 'Birleşik Krallık',region: 'eur', price: '7.240', miles: 3640, hrs: '4sa 15dk', tag: null, grad: 'linear-gradient(135deg, #4A5568, #1A202C)' },
    { code: 'AMS', city: 'Amsterdam', country: 'Hollanda',        region: 'eur', price: '6.780', miles: 3210, hrs: '4sa 5dk',  tag: 'YENİ', grad: 'linear-gradient(135deg, #5B5197, #2D2670)' },
    { code: 'ATH', city: 'Atina',     country: 'Yunanistan',      region: 'eur', price: '3.240', miles: 1080, hrs: '1sa 30dk', tag: 'KISA HAT', grad: 'linear-gradient(135deg, #4A8FB5, #1F4E6F)' },
    { code: 'JFK', city: 'New York',  country: 'ABD',             region: 'na',  price: '24.800',miles: 8410, hrs: '11sa 40dk', tag: 'MEVSİMSEL', grad: 'linear-gradient(135deg, #142D4F, #050B14)' },
    { code: 'LAX', city: 'Los Angeles', country: 'ABD',           region: 'na',  price: '28.900',miles: 9820, hrs: '13sa 20dk', tag: null, grad: 'linear-gradient(135deg, #E89B43, #8B4513)' },
    { code: 'HND', city: 'Tokyo',     country: 'Japonya',         region: 'asia',price: '32.450',miles: 10240, hrs: '12sa 10dk', tag: null, grad: 'linear-gradient(135deg, #E31837, #4A0E13)' },
    { code: 'BKK', city: 'Bangkok',   country: 'Tayland',         region: 'asia',price: '14.250',miles: 7820, hrs: '9sa 15dk',  tag: null, grad: 'linear-gradient(135deg, #B7312C, #DBA02C)' },
    { code: 'DXB', city: 'Dubai',     country: 'BAE',             region: 'mid', price: '8.120', miles: 3210, hrs: '4sa 5dk',   tag: null, grad: 'linear-gradient(135deg, #D9BE84, #794C37)' },
    { code: 'AYT', city: 'Antalya',   country: 'Türkiye',         region: 'tr',  price: '1.890', miles: 480,  hrs: '1sa 5dk',   tag: 'YURTİÇİ', grad: 'linear-gradient(135deg, #4A8FB5, #1A4870)' },
  ];
  const filtered = region === 'all' ? dests : dests.filter(d => d.region === region);
  return (
    <div style={{ background: '#F3F5F8', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ background: 'linear-gradient(180deg, var(--thy-navy), #142D4F)', color: '#fff', padding: '60px 32px', position: 'relative', overflow: 'hidden' }}>
        <img src="/assets/AnaEkran.png" alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: 0.18, mixBlendMode: 'screen',
        }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'var(--thy-gold-light)', marginBottom: 14 }}>
            345+ UÇUŞ NOKTASI · 130 ÜLKE
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 42, fontWeight: 800, letterSpacing: '-1px', margin: '0 0 12px', lineHeight: 1.05 }}>
            {t('ex.title')}
          </h1>
          <p style={{ fontSize: 16, color: '#B2C0D1', maxWidth: 540, margin: 0 }}>{t('ex.sub')}</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 24 }}>
          {regions.map((r) => (
            <button key={r.id} onClick={() => setRegion(r.id)} style={{
              padding: '8px 16px', borderRadius: 999,
              border: `1.5px solid ${region === r.id ? 'var(--thy-red)' : '#E2E8F0'}`,
              background: region === r.id ? 'var(--thy-red)' : '#fff',
              color: region === r.id ? '#fff' : 'var(--thy-navy)',
              fontSize: 12, fontWeight: 700, cursor: 'pointer',
            }}>{r.label}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.map((d) => (
            <button key={d.code} onClick={() => go('results', { from: { city: 'İstanbul', code: 'IST' }, to: { city: d.city, code: d.code } })}
              style={{
                position: 'relative', height: 240, borderRadius: 12, border: 'none', overflow: 'hidden',
                cursor: 'pointer', background: d.grad, color: '#fff', padding: 0, textAlign: 'left',
                boxShadow: '0 4px 14px rgba(10,22,40,0.1)',
                transition: 'transform .25s, box-shadow .25s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(10,22,40,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(10,22,40,0.1)'; }}>
              <img src="/assets/AnaEkran.png" alt="" style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                opacity: 0.16, mixBlendMode: 'screen',
              }} />
              <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(10,22,40,0.7) 100%)' }} />
              {d.tag && (
                <span style={{
                  position: 'absolute', top: 14, left: 14, fontSize: 9, fontWeight: 800, letterSpacing: 2,
                  background: 'rgba(255,255,255,0.95)', color: 'var(--thy-red)', padding: '5px 10px', borderRadius: 3,
                }}>{d.tag}</span>
              )}
              <div style={{ position: 'absolute', inset: 0, padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, letterSpacing: 2, color: 'rgba(255,255,255,0.95)' }}>
                  IST → {d.code}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.5px' }}>{d.city}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 12 }}>{d.country}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800 }}>{d.price}</span>
                        <span style={{ fontSize: 12, opacity: 0.85 }}>TL'den</span>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--thy-gold-light)', marginTop: 2, fontWeight: 700 }}>
                        +{d.miles.toLocaleString('tr-TR')} mil · {d.hrs}
                      </div>
                    </div>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
                    }}>
                      <EIcon.arrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ExplorePage };
