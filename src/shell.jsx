import React from 'react';
import { useT, useLang, useCurrency, CURRENCIES } from './i18n.jsx';
import { Icon } from './icons.jsx';

/* THY Route — Shell: Header, Footer, container helpers */
const DS = window.THYRouteDesignSystem_cb84b4;
const { Button, Badge } = DS;

/* ------------------------------------------------------------------
   HEADER — dark navy strip, THY crane logo, primary nav, lang + user.
   Translucent over the hero gradient; solid on inner pages.
   ------------------------------------------------------------------ */
function Header({ route, go, transparent = false }) {
  const t = useT();
  const { lang, setLang } = useLang();
  const { currency, setCurrency } = useCurrency();
  const [showCur, setShowCur] = React.useState(false);

  // close currency menu when clicking outside
  React.useEffect(() => {
    if (!showCur) return;
    const h = (e) => { if (!e.target.closest('.cur-menu')) setShowCur(false); };
    const id = setTimeout(() => document.addEventListener('click', h), 0);
    return () => { clearTimeout(id); document.removeEventListener('click', h); };
  }, [showCur]);

  const nav = [
    { key: 'flights',  to: 'home',    label: t('nav.flights') },
    { key: 'explore',  to: 'explore', label: t('nav.explore') },
    { key: 'route',    to: 'route',   label: t('nav.route') },
    { key: 'miles',    to: 'account', label: t('nav.miles') },
  ];
  const activeKey =
    route === 'home' ? 'flights' :
    route === 'results' ? 'flights' :
    route === 'route' ? 'route' :
    route === 'explore' ? 'explore' :
    route === 'account' ? 'miles' : '';

  return (
    <header style={{
      height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: transparent ? 'rgba(10,22,40,0.55)' : 'rgba(10,22,40,0.97)',
      borderBottom: transparent ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.06)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      position: 'sticky', top: 0, zIndex: 200, padding: '0 32px',
    }}>
      <div style={{ width: '100%', maxWidth: 1280, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); go('home'); }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/assets/thy-logo-horizontal-ondark.svg" alt="Turkish Airlines" style={{ height: 24, display: 'block' }} />
          <span style={{
            display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 8px',
            border: '1px solid rgba(197,160,89,0.45)',
            background: 'linear-gradient(90deg, rgba(197,160,89,0.18), rgba(197,160,89,0.04))',
            borderRadius: 3,
            color: '#E8C97A', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px',
          }}>ROUTE</span>
        </a>

        <nav style={{ display: 'flex', gap: 4 }}>
          {nav.map((n) => (
            <a key={n.key} href="#" onClick={(e) => { e.preventDefault(); go(n.to); }} style={{
              fontSize: 13, fontWeight: 600, padding: '8px 14px',
              color: activeKey === n.key ? '#fff' : 'rgba(255,255,255,0.82)',
              borderBottom: `2px solid ${activeKey === n.key ? 'var(--thy-red-light)' : 'transparent'}`,
              transition: 'color .2s, border-color .2s',
            }}>{n.label}</a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)',
            color: '#fff', padding: '6px 12px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
          }}>
            <Icon.globe size={13} stroke={2.4} />{lang.toUpperCase()}
          </button>

          <div className="cur-menu" style={{ position: 'relative' }}>
            <button onClick={() => setShowCur(s => !s)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)',
              color: '#fff', padding: '6px 10px', borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
            }}>
              {CURRENCIES[currency].symbol} {currency}
              <Icon.chevDown size={12} stroke={2.4} />
            </button>
            {showCur && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                width: 180, background: '#fff', borderRadius: 6,
                boxShadow: '0 20px 40px rgba(0,0,0,0.25)', overflow: 'hidden', zIndex: 50,
              }}>
                {Object.values(CURRENCIES).map((c) => (
                  <button key={c.code} onClick={() => { setCurrency(c.code); setShowCur(false); }} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', background: currency === c.code ? '#F3F5F8' : '#fff',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    color: 'var(--thy-navy)', fontSize: 12, fontWeight: 700,
                  }} onMouseEnter={(e) => e.currentTarget.style.background = '#F3F5F8'}
                     onMouseLeave={(e) => e.currentTarget.style.background = currency === c.code ? '#F3F5F8' : '#fff'}>
                    <span>{c.label}</span>
                    {currency === c.code && <Icon.check size={14} stroke={3} style={{ color: 'var(--thy-red)' }} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => go('account')} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: '1.5px solid rgba(255,255,255,0.7)', color: '#fff',
            padding: '6px 16px 6px 12px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            <Icon.user size={14} stroke={2.4} /> {t('nav.account')}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------
   FOOTER — dark, link-dense, panorama silhouette behind.
   ------------------------------------------------------------------ */
function Footer({ go }) {
  const t = useT();
  const cols = [
    { title: t('ft.product'), links: [
        { label: t('nav.flights'), to: 'home' },
        { label: t('nav.explore'), to: 'explore' },
        { label: t('nav.route'),   to: 'route' },
        { label: t('nav.miles'),   to: 'account' },
    ]},
    { title: t('ft.company'), links: [
        { label: 'Hakkımızda / About' },
        { label: 'Basın / Press' },
        { label: 'Kariyer / Careers' },
        { label: 'Sürdürülebilirlik' },
    ]},
    { title: t('ft.help'), links: [
        { label: 'Yardım merkezi' },
        { label: 'İletişim' },
        { label: 'Online check-in' },
        { label: 'Uçuş durumu' },
    ]},
    { title: t('ft.legal'), links: [
        { label: 'KVKK' },
        { label: 'Gizlilik' },
        { label: 'Çerezler' },
        { label: 'Şartlar' },
    ]},
  ];
  return (
    <footer style={{
      position: 'relative', background: 'linear-gradient(180deg, #0A1628 0%, #050B14 100%)',
      color: '#B2C0D1', padding: '64px 32px 28px', marginTop: 0, overflow: 'hidden',
    }}>
      <img src="/assets/panorama.png" alt="" aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%',
        opacity: 0.08, pointerEvents: 'none', maxHeight: 200, objectFit: 'cover', objectPosition: 'bottom',
      }} />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(4, 1fr)', gap: 36, marginBottom: 56 }}>
          <div>
            <img src="/assets/thy-logo-horizontal-ondark.svg" alt="Turkish Airlines" style={{ height: 26 }} />
            <p style={{ fontSize: 13, lineHeight: 1.6, color: '#7A8EAF', marginTop: 16, maxWidth: 280 }}>
              {t('home.subhead').slice(0, 110)}…
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              {['IST', 'SAW', 'ESB'].map(c => (
                <span key={c} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, letterSpacing: 1.5,
                  color: '#E8C97A', padding: '5px 9px', border: '1px solid rgba(197,160,89,0.3)', borderRadius: 3,
                }}>{c}</span>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: '#fff', marginBottom: 16 }}>{c.title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href="#" onClick={(e) => { e.preventDefault(); if (l.to && go) go(l.to); }} style={{
                      fontSize: 13, color: '#B2C0D1', transition: 'color .2s',
                    }} onMouseEnter={(e)=>e.target.style.color='#E8C97A'} onMouseLeave={(e)=>e.target.style.color='#B2C0D1'}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 12, color: '#7A8EAF',
        }}>
          <span>{t('ft.copy')}</span>
          <span style={{ fontFamily: 'var(--font-mono)', letterSpacing: 2, fontSize: 10 }}>
            STAR ALLIANCE MEMBER · IATA TK · ICAO THY
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------
   Hero gradient background (used on home & inner page heros).
   ------------------------------------------------------------------ */
function HeroBg({ children, tall = false }) {
  return (
    <div style={{
      position: 'relative',
      // High stacking context so a dropdown opened inside the booking card
      // visibly overlays the next-section content (e.g. "Nasıl Çalışır").
      zIndex: 5,
      position: 'relative',
      background: 'linear-gradient(165deg, #0A1628 0%, #142D4F 40%, #1A3A60 55%, #B7312C 85%, #E31837 100%)',
      minHeight: tall ? 540 : 360,
      // overflow:visible so the airport-search dropdown inside the booking
      // card can extend below the hero's bottom edge. The image is clipped
      // by clipPath on the <img> itself, so we don't need the outer hidden.
      overflow: 'visible',
    }}>
      <img src="/assets/AnaEkran.png" alt="" aria-hidden style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        opacity: 0.22, pointerEvents: 'none', mixBlendMode: 'screen',
        clipPath: 'inset(0)',
      }} />
      {/* subtle vignette */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.08), transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Section header (uppercase eyebrow + display heading)
   ------------------------------------------------------------------ */
function SectionHeader({ eyebrow, title, sub, align = 'left', children }) {
  return (
    <div style={{ textAlign: align, marginBottom: 32 }}>
      {eyebrow && (
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700,
          letterSpacing: 2, color: 'var(--thy-red)', marginBottom: 12,
        }}>{eyebrow}</div>
      )}
      {title && (
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800,
          color: 'var(--thy-navy)', letterSpacing: '-0.5px', margin: 0, lineHeight: 1.15,
        }}>{title}</h2>
      )}
      {sub && (
        <p style={{ fontSize: 15, color: '#64748B', marginTop: 10, maxWidth: 640, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
          {sub}
        </p>
      )}
      {children}
    </div>
  );
}

export { Header, Footer, HeroBg, SectionHeader };
