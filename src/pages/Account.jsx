import React from 'react';
import { useT as useTA } from '../i18n.jsx';
import { Icon as AIcon } from '../icons.jsx';

/* THY Route — Account / Dashboard */
const ADS = window.THYRouteDesignSystem_cb84b4;
const { Button: ABtn } = ADS;

function AccountPage({ go }) {
  const t = useTA();
  const upcoming = [
    { id: 1, from: 'IST', to: 'FCO', fromCity: 'İstanbul', toCity: 'Roma',     date: '13 Haziran 2026', flight: 'TK 1855', pnr: 'SBA47R', status: 'KONFIRME', daysLeft: 6, hasRoute: true },
    { id: 2, from: 'IST', to: 'BCN', fromCity: 'İstanbul', toCity: 'Barselona',date: '02 Eylül 2026',  flight: 'TK 1857', pnr: 'BX12K9', status: 'PLANLANIYOR', daysLeft: 87, hasRoute: false },
  ];
  const past = [
    { id: 3, from: 'IST', to: 'CDG', fromCity: 'İstanbul', toCity: 'Paris',  date: '12 Şubat 2026', miles: 2540, satisfied: true },
    { id: 4, from: 'IST', to: 'AYT', fromCity: 'İstanbul', toCity: 'Antalya',date: '04 Ara 2025',   miles: 480,  satisfied: true },
    { id: 5, from: 'IST', to: 'LHR', fromCity: 'İstanbul', toCity: 'Londra', date: '20 Eki 2025',   miles: 2890, satisfied: true },
  ];

  /* ----- Saved routes state (so delete works) ----- */
  const [savedRoutes, setSavedRoutes] = React.useState([
    { id: 'rm-1', name: 'Roma Rotanız',          city: 'Roma',      country: 'İtalya',     places: 6,  miles: 2000, days: 3, color: 'linear-gradient(135deg, #D97757, #6B1E18)', updated: 'Bugün' },
    { id: 'rm-2', name: 'Paris Rotanız',         city: 'Paris',     country: 'Fransa',     places: 8,  miles: 3120, days: 4, color: 'linear-gradient(135deg, #6B7C93, #0F2244)', updated: '3 gün önce' },
    { id: 'rm-3', name: 'Barselona Rotanız',     city: 'Barselona', country: 'İspanya',    places: 5,  miles: 1680, days: 2, color: 'linear-gradient(135deg, #C5A059, #8B6630)', updated: '2 hafta önce' },
    { id: 'rm-4', name: 'Tokyo Rotanız',          city: 'Tokyo',     country: 'Japonya',    places: 12, miles: 5240, days: 6, color: 'linear-gradient(135deg, #E31837, #4A0E13)', updated: '1 ay önce' },
  ]);
  const deleteSavedRoute = (id) => {
    if (!confirm('Bu rotayı silmek istediğinizden emin misiniz?')) return;
    setSavedRoutes((rs) => rs.filter(r => r.id !== id));
  };

  /* ----- PNR lookup form ----- */
  const [pnr, setPnr] = React.useState('');
  const [pnrSurname, setPnrSurname] = React.useState('');
  const [pnrStatus, setPnrStatus] = React.useState(null); // 'loading' | 'found' | 'error'
  const [pnrResult, setPnrResult] = React.useState(null);
  const submitPnr = (e) => {
    e?.preventDefault();
    if (!pnr.trim() || !pnrSurname.trim()) return;
    setPnrStatus('loading');
    // simulated lookup — in production this hits the THY PNR API
    setTimeout(() => {
      const valid = /^[A-Z0-9]{6}$/i.test(pnr.trim());
      if (!valid) { setPnrStatus('error'); return; }
      // mocked successful response
      setPnrResult({
        pnr: pnr.toUpperCase().trim(),
        passenger: pnrSurname.trim().toUpperCase(),
        from: 'IST', to: 'FCO',
        fromCity: 'İstanbul', toCity: 'Roma',
        out: { flight: 'TK 1855', date: '13 Haz 2026', dep: '07:35', arr: '09:15' },
        ret: { flight: 'TK 1872', date: '20 Haz 2026', dep: '11:45', arr: '15:30' },
      });
      setPnrStatus('found');
    }, 800);
  };
  return (
    <div style={{ background: '#F3F5F8', minHeight: 'calc(100vh - 70px)' }}>
      {/* hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--thy-navy), #142D4F)', color: '#fff', padding: '40px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--thy-red), #8E211D)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, color: '#fff', fontFamily: 'var(--font-heading)',
              border: '3px solid var(--thy-gold)',
            }}>AD</div>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, color: 'var(--thy-gold-light)', letterSpacing: 2 }}>
                {t('ac.greet').toUpperCase()}
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, fontWeight: 800, margin: '2px 0 4px', letterSpacing: '-0.5px' }}>Ayşe Demir</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#B2C0D1' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 3, background: 'rgba(197,160,89,0.18)',
                  color: 'var(--thy-gold-light)', fontWeight: 800, letterSpacing: 1.5,
                  border: '1px solid rgba(197,160,89,0.4)',
                }}>★ {t('ac.miles.tier').toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>TK-21 47 39 02</span>
              </div>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(197,160,89,0.3)',
            borderRadius: 12, padding: '18px 24px', minWidth: 280,
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--thy-gold-light)', letterSpacing: 2 }}>
              {t('ac.miles.balance').toUpperCase()}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 32, fontWeight: 800, color: '#fff' }}>48.250</span>
              <span style={{ fontSize: 13, color: '#B2C0D1' }}>Mil</span>
            </div>
            <div style={{ marginTop: 12, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: '64%', height: '100%', background: 'linear-gradient(90deg, var(--thy-gold), var(--thy-gold-light))', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#7A8EAF', marginTop: 6, fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: 0.5 }}>
              <span>Elite Plus</span>
              <span>Bir sonraki: 25.000 Mil daha</span>
            </div>
          </div>
        </div>
      </div>

      {/* upcoming */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px' }}>
        {/* ---------- PNR LOOKUP ---------- */}
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
          padding: 24, marginBottom: 32, position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden style={{
            position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,83,165,0.06), transparent 70%)',
          }} />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{
              width: 44, height: 44, borderRadius: 10, background: 'rgba(0,83,165,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--thy-blue)',
              flexShrink: 0,
            }}>
              <AIcon.plane size={22} />
            </span>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--thy-blue)', letterSpacing: 2 }}>
                PNR İLE ROTA OLUŞTUR
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 800, color: 'var(--thy-navy)', margin: '4px 0 0' }}>
                Biletinizi alıp şimdi rotanızı çizebiliriz
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: '4px 0 0' }}>
                Yolculuğunuzu planınızı yapmadan da biletinizi alıp devam edebilirsiniz. PNR ve soyadınızı girin — sistem gidiş-dönüş bilgilerinizi alıp sizin için bir rota oluştursun.
              </p>
            </div>
          </div>

          {!pnrResult && (
            <form onSubmit={submitPnr} style={{ position: 'relative', display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 1.5, display: 'block', marginBottom: 4 }}>PNR / REZERVASYON KODU</label>
                <input value={pnr} onChange={(e) => setPnr(e.target.value.toUpperCase())} placeholder="Örn: SBA47R" maxLength={6}
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1.5px solid #E2E8F0', borderRadius: 6,
                    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: 'var(--thy-navy)',
                    letterSpacing: 2, outline: 'none', background: '#fff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--thy-blue)'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              <div style={{ flex: '1 1 200px' }}>
                <label style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 1.5, display: 'block', marginBottom: 4 }}>YOLCU SOYADI</label>
                <input value={pnrSurname} onChange={(e) => setPnrSurname(e.target.value)} placeholder="Soyadınız"
                  style={{
                    width: '100%', padding: '12px 14px',
                    border: '1.5px solid #E2E8F0', borderRadius: 6,
                    fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: 'var(--thy-navy)',
                    outline: 'none', background: '#fff',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--thy-blue)'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'} />
              </div>
              <button type="submit" disabled={pnrStatus === 'loading' || !pnr || !pnrSurname} style={{
                padding: '12px 22px', background: 'var(--thy-red-light)', color: '#fff',
                border: 'none', borderRadius: 6, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                opacity: (pnrStatus === 'loading' || !pnr || !pnrSurname) ? 0.55 : 1,
              }}>
                {pnrStatus === 'loading' ? 'Aranıyor…' : 'Rota oluştur →'}
              </button>
            </form>
          )}

          {pnrStatus === 'error' && (
            <div style={{
              marginTop: 14, padding: 12, background: 'rgba(239,46,31,0.06)',
              border: '1px solid rgba(239,46,31,0.2)', borderRadius: 6,
              fontSize: 12, color: 'var(--thy-red)', display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <AIcon.x size={14} /> PNR bulunamadı. PNR 6 haneli alfanümerik olmalıdır (örn: SBA47R).
            </div>
          )}

          {pnrResult && (
            <div style={{ marginTop: 4 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
                background: 'rgba(34,197,94,0.1)', color: '#16A34A', borderRadius: 3,
                fontSize: 10, fontWeight: 800, letterSpacing: 1.2, marginBottom: 14,
              }}>
                <AIcon.check size={11} stroke={3} /> PNR DOĞRULANDI
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[pnrResult.out, pnrResult.ret].map((leg, i) => (
                  <div key={i} style={{
                    padding: 16, background: '#F8FAFC', borderRadius: 8, border: '1px solid #E2E8F0',
                  }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: 'var(--thy-red)', letterSpacing: 1.5, marginBottom: 8 }}>
                      {i === 0 ? 'GİDİŞ' : 'DÖNÜŞ'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: 'var(--thy-navy)' }}>
                          {i === 0 ? pnrResult.from : pnrResult.to}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{leg.dep}</div>
                      </div>
                      <div style={{ flex: 1, position: 'relative', height: 1, background: '#CBD5E1' }}>
                        <AIcon.plane size={14} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%) rotate(45deg)', background: '#F8FAFC', padding: 2, color: 'var(--thy-red)' }} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: 'var(--thy-navy)' }}>
                          {i === 0 ? pnrResult.to : pnrResult.from}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{leg.arr}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{leg.date}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--thy-navy)' }}>{leg.flight}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 16, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ fontSize: 12, color: '#64748B' }}>
                  Yolcu: <strong style={{ color: 'var(--thy-navy)' }}>{pnrResult.passenger}</strong> · PNR: <strong style={{ color: 'var(--thy-navy)', fontFamily: 'var(--font-mono)' }}>{pnrResult.pnr}</strong>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => { setPnrResult(null); setPnrStatus(null); setPnr(''); setPnrSurname(''); }} style={{
                    padding: '10px 16px', background: '#fff', border: '1.5px solid #E2E8F0',
                    color: 'var(--thy-navy)', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  }}>Vazgeç</button>
                  <button onClick={() => go('route', { city: pnrResult.toCity, pnr: pnrResult.pnr })} style={{
                    padding: '10px 22px', background: 'var(--thy-red-light)', color: '#fff',
                    border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 800, cursor: 'pointer',
                  }}>Şimdi {pnrResult.toCity} rotanızı oluşturalım →</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--thy-navy)', margin: '0 0 16px' }}>{t('ac.upcoming')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {upcoming.map((trip) => (
            <div key={trip.id} style={{
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 22,
              transition: 'all .2s', cursor: 'pointer',
              boxShadow: '0 1px 0 rgba(0,0,0,0.02)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 30px rgba(10,22,40,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 0 rgba(0,0,0,0.02)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <span style={{
                  padding: '4px 10px', borderRadius: 3, fontSize: 9, fontWeight: 800, letterSpacing: 2,
                  background: trip.status === 'KONFIRME' ? 'rgba(34,197,94,0.12)' : 'rgba(0,83,165,0.12)',
                  color: trip.status === 'KONFIRME' ? '#16A34A' : 'var(--thy-blue)',
                }}>{trip.status}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#64748B' }}>
                  <span style={{
                    display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
                    background: '#22C55E', marginRight: 6, animation: 'pulseDot 2s infinite',
                  }} />
                  {trip.daysLeft} gün kaldı
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 800, color: 'var(--thy-navy)', lineHeight: 1 }}>{trip.from}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{trip.fromCity}</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ flex: 1, height: 1, background: '#CBD5E1' }} />
                  <AIcon.plane size={20} style={{ color: 'var(--thy-red)' }} />
                  <span style={{ flex: 1, height: 1, background: '#CBD5E1' }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 30, fontWeight: 800, color: 'var(--thy-navy)', lineHeight: 1 }}>{trip.to}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{trip.toCity}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0 0', borderTop: '1px solid #F1F5F9' }}>
                <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                  <span><span style={{ color: '#94A3B8' }}>Tarih </span><strong style={{ color: 'var(--thy-navy)' }}>{trip.date}</strong></span>
                  <span><span style={{ color: '#94A3B8' }}>Uçuş </span><strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--thy-navy)' }}>{trip.flight}</strong></span>
                  <span><span style={{ color: '#94A3B8' }}>PNR </span><strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--thy-navy)' }}>{trip.pnr}</strong></span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button onClick={(e) => { e.stopPropagation(); go('route', { city: trip.toCity }); }} style={{
                  flex: 1, padding: '10px 14px', background: trip.hasRoute ? 'var(--thy-red)' : '#fff',
                  border: trip.hasRoute ? 'none' : '1.5px solid var(--thy-red)',
                  color: trip.hasRoute ? '#fff' : 'var(--thy-red)',
                  borderRadius: 4, fontSize: 12, fontWeight: 800, cursor: 'pointer',
                }}>{trip.hasRoute ? t('ac.view.route') : 'Rotayı oluştur →'}</button>
                <button style={{
                  padding: '10px 14px', background: '#fff', border: '1px solid #E2E8F0',
                  color: 'var(--thy-navy)', borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}><AIcon.download size={13} /> E-bilet</button>
                <a href="https://www.turkishairlines.com/tr-tr/seyahat-bilgileri/rezervasyonum/" target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title="Rezervasyonu yönet (thy.com)"
                  style={{
                    padding: '10px 14px', background: '#fff', border: '1px solid #E2E8F0',
                    color: 'var(--thy-navy)', borderRadius: 4, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 6, textDecoration: 'none',
                  }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--thy-red)'; e.currentTarget.style.color = 'var(--thy-red)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = 'var(--thy-navy)'; }}>
                  <AIcon.x size={12} /> İptal
                </a>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--thy-navy)', margin: '40px 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          {t('ac.savedroutes')}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#94A3B8' }}>{savedRoutes.length}</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {savedRoutes.map((r) => (
            <div key={r.id} style={{
              background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden',
              transition: 'all .2s',
            }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 14px 30px rgba(10,22,40,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
              <div style={{
                position: 'relative', height: 110, background: r.color, color: '#fff', padding: 18,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden',
              }}>
                <img src="/assets/AnaEkran.png" alt="" style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                  opacity: 0.18, mixBlendMode: 'screen', pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, opacity: 0.85 }}>{r.country.toUpperCase()}</div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 800, letterSpacing: '-0.3px' }}>{r.name}</div>
                  </div>
                  <span style={{
                    padding: '4px 8px', borderRadius: 3, background: 'rgba(255,255,255,0.2)',
                    fontSize: 9, fontWeight: 800, letterSpacing: 1, border: '1px solid rgba(255,255,255,0.3)',
                  }}>{r.city.toUpperCase()}</span>
                </div>
                <div style={{ position: 'relative', display: 'flex', gap: 18, fontSize: 11 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><AIcon.pin size={11} /> {r.places} durak</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><AIcon.calendar size={11} /> {r.days} gün</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--thy-gold-light)', fontWeight: 800, fontFamily: 'var(--font-mono)' }}><AIcon.star size={11} /> +{r.miles.toLocaleString('tr-TR')} mil</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>Son güncelleme: {r.updated}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => deleteSavedRoute(r.id)} title="Rotayı sil" style={{
                    padding: '7px 9px', background: '#fff', border: '1px solid #E2E8F0',
                    color: '#94A3B8', borderRadius: 4, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    transition: 'all .15s',
                  }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--thy-red)'; e.currentTarget.style.borderColor = 'var(--thy-red)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = '#E2E8F0'; }}>
                    <AIcon.trash size={12} />
                  </button>
                  <button title={t('ac.download.pdf')} style={{
                    padding: '7px 10px', background: '#fff', border: '1px solid #E2E8F0',
                    color: 'var(--thy-navy)', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                  }}><AIcon.download size={12} /> PDF</button>
                  <button onClick={() => go('route', { city: r.city })} style={{
                    padding: '7px 14px', background: 'var(--thy-red)', border: 'none',
                    color: '#fff', borderRadius: 4, fontSize: 11, fontWeight: 800, cursor: 'pointer',
                  }}>{t('ac.view.route')}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {savedRoutes.length === 0 && (
          <div style={{
            padding: 28, background: '#fff', border: '1px dashed #CBD5E1', borderRadius: 12,
            textAlign: 'center', color: '#64748B', fontSize: 13,
          }}>
            Hiç kayıtlı rotanız kalmadı. <strong style={{ color: 'var(--thy-navy)' }}>Seyahat Rotası</strong>'ndan yeni bir rota oluşturabilirsiniz.
          </div>
        )}

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--thy-navy)', margin: '40px 0 16px' }}>{t('ac.past')}</h2>
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
          {past.map((trip, i) => (
            <div key={trip.id} style={{
              display: 'grid', gridTemplateColumns: '1fr auto auto auto',
              gap: 24, alignItems: 'center', padding: '16px 22px',
              borderTop: i ? '1px solid #F1F5F9' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 36, height: 36, borderRadius: 6, background: '#F3F5F8', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
                  <AIcon.plane size={18} />
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: 'var(--thy-navy)' }}>
                    <span>{trip.from}</span><AIcon.arrowRight size={12} /><span>{trip.to}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{trip.fromCity} → {trip.toCity}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#64748B' }}>{trip.date}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: 'var(--thy-gold)' }}>+{trip.miles.toLocaleString('tr-TR')} mil</div>
              <button style={{
                padding: '6px 14px', background: 'transparent', border: '1px solid #E2E8F0',
                borderRadius: 4, fontSize: 11, fontWeight: 700, color: 'var(--thy-navy)', cursor: 'pointer',
              }}>{t('ac.book.again')}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AccountPage };
