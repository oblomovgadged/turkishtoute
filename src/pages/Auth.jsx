import React from 'react';
import { useT as useTAu } from '../i18n.jsx';
import { Icon as AuIcon } from '../icons.jsx';

/* THY Route — Auth (sign in / sign up modal-style page) */
function AuthPage({ go }) {
  const t = useTAu();
  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      background: '#fff',
    }}>
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(165deg, #0A1628 0%, #142D4F 60%, #B7312C 100%)',
        color: '#fff', padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <img src="/assets/AnaEkran.png" alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: 0.22, mixBlendMode: 'screen',
        }} />
        <div style={{ position: 'relative' }}>
          <img src="/assets/thy-logo-horizontal-ondark.svg" alt="THY" style={{ height: 32 }} />
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: 'var(--thy-gold-light)', letterSpacing: 3, marginBottom: 14 }}>
            MILES & SMILES
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 800, letterSpacing: '-1px', margin: '0 0 16px', lineHeight: 1.1, maxWidth: 480 }}>
            Yolculuğunuz hesabınızla başlasın.
          </h1>
          <p style={{ fontSize: 14, color: '#B2C0D1', lineHeight: 1.6, maxWidth: 440, margin: 0 }}>
            Geçmiş uçuşlar, oluşturduğunuz rotalar ve mil bakiyeniz tek panelde. Her uçuşun rotası,
            her rotanın yardımcı pilotu.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 24 }}>
            {[{ n: '48K+', l: 'Aktif üye' }, { n: '345', l: 'Uçuş noktası' }, { n: '4.7★', l: 'Memnuniyet' }].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: '#fff' }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#B2C0D1', letterSpacing: 0.5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ maxWidth: 380, width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--thy-red)', letterSpacing: 2, marginBottom: 12 }}>
            {t('au.welcome').toUpperCase()}
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, fontWeight: 800, color: 'var(--thy-navy)', letterSpacing: '-0.5px', margin: '0 0 8px' }}>
            Giriş yapın
          </h2>
          <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 28px' }}>{t('au.sub')}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 1 }}>{t('au.member').toUpperCase()}</span>
              <input defaultValue="TK-21 47 39 02" style={{
                padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: 6,
                fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--thy-navy)', outline: 'none',
              }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 1 }}>{t('au.password').toUpperCase()}</span>
              <input type="password" defaultValue="••••••••••" style={{
                padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: 6,
                fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--thy-navy)', outline: 'none',
              }} />
            </label>
            <a href="#" style={{ fontSize: 12, color: 'var(--thy-blue)', textAlign: 'right', fontWeight: 700, marginTop: -6 }}>{t('au.forgot')}</a>
            <button onClick={() => go('account')} style={{
              padding: '14px 16px', background: 'var(--thy-red-light)', color: '#fff',
              border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 800, cursor: 'pointer',
              transition: 'background .15s',
            }} onMouseEnter={(e)=>e.target.style.background='var(--thy-red)'} onMouseLeave={(e)=>e.target.style.background='var(--thy-red-light)'}>
              {t('au.signin')}
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', color: '#94A3B8', fontSize: 11 }}>
            <span style={{ flex: 1, height: 1, background: '#E2E8F0' }} /> VEYA <span style={{ flex: 1, height: 1, background: '#E2E8F0' }} />
          </div>

          <button style={{
            width: '100%', padding: '12px 16px', background: '#fff',
            border: '1.5px solid var(--thy-navy)', color: 'var(--thy-navy)',
            borderRadius: 6, fontSize: 13, fontWeight: 800, cursor: 'pointer',
          }}>{t('au.signup')}</button>

          <div style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>
            🛡️ KVKK uyarınca veri güvenliği · 3D Secure · ISO 27001
          </div>
        </div>
      </div>
    </div>
  );
}

export { AuthPage };
