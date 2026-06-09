import React from 'react';
import { useT } from './i18n.jsx';
import { Icon } from './icons.jsx';

/**
 * THY Route — Mobile bottom tab bar.
 *
 * Renders on every page except `/auth`. Hidden on desktop via CSS
 * (`.mobile-nav { display: none }` baseline; `display: flex` at ≤ 768px).
 *
 * 5 tabs (same icon set as the mobile prototype):
 *   home    → Ana Sayfa (Uçuş Panosu)
 *   explore → Keşfet
 *   route   → Rota (Seyahat Rotası)
 *   wallet  → Cüzdan (M&S — goes to Account → wallet tab)
 *   account → Hesabım
 *
 * Tap highlight + active-state + safe-area aware bottom inset are
 * all handled in styles/mobile.css.
 */
function MobileNav({ route, go }) {
  const t = useT();

  const items = [
    { id: 'home',    label: t('nav.flights'), icon: 'plane',  target: 'home' },
    { id: 'explore', label: t('nav.explore'), icon: 'search', target: 'explore' },
    { id: 'route',   label: t('nav.route'),   icon: 'map',    target: 'route' },
    { id: 'wallet',  label: t('nav.miles'),   icon: 'star',   target: 'account' },
    { id: 'me',      label: t('nav.account'), icon: 'user',   target: 'account' },
  ];

  // Map current top-level route to which tab should be highlighted
  const activeTab =
    route === 'home'    ? 'home' :
    route === 'results' ? 'home' :
    route === 'explore' ? 'explore' :
    route === 'route'   ? 'route' :
    route === 'account' ? 'me' :
    null;

  return (
    <nav className="mobile-nav" aria-label="Mobil menü">
      {items.map((it) => {
        const isActive = activeTab === it.id;
        const Glyph = Icon[it.icon] || Icon.plane;
        return (
          <button
            key={it.id}
            onClick={(e) => { e.preventDefault(); go(it.target); }}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              padding: '8px 0 0',
              position: 'relative',
              color: isActive ? '#E8C97A' : 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-ui)',
              transition: 'color 200ms cubic-bezier(.4,0,.2,1)',
              WebkitTapHighlightColor: 'transparent',
            }}>
            {/* Active indicator pill above the icon */}
            {isActive && (
              <span style={{
                position: 'absolute',
                top: 0,
                width: 22,
                height: 3,
                borderRadius: 999,
                background: '#E8C97A',
                boxShadow: '0 0 8px rgba(197,160,89,0.6)',
              }} />
            )}
            <Glyph size={20} stroke={isActive ? 2.5 : 2.1} />
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 700 : 500,
              letterSpacing: 0.2,
              maxWidth: 60,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{it.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export { MobileNav };
