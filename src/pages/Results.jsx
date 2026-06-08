import React from 'react';
import { useT, useLang, useMoney } from '../i18n.jsx';
import { Icon as RIcon } from '../icons.jsx';
import { SectionHeader as RSec } from '../shell.jsx';

/* THY Route — Results: 3-step tracker, round-trip flow, Economy/Business detail */
const ResultsDS = window.THYRouteDesignSystem_cb84b4;
const { Badge: RBadge, Button: RBtn } = ResultsDS;

/* ──────────────────────────────────────────────
   3-STEP TRACKER — Gidiş / Dönüş / Rotanı oluştur
   step prop: 0=outbound, 1=return, 2=route-build
   ────────────────────────────────────────────── */
function Tracker({ step }) {
  const t = useT();
  const steps = [t('res.tracker1'), t('res.tracker2'), t('res.tracker3')];
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '20px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 14 }}>
        {steps.map((label, i) => {
          const done = i < step, active = i === step;
          return (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: i > step ? 0.45 : 1 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-mono)',
                  background: done ? 'var(--thy-blue)' : active ? 'var(--thy-red)' : '#F3F5F8',
                  color: done || active ? '#fff' : '#94A3B8',
                  border: active ? '3px solid rgba(183,49,44,0.18)' : '1px solid #E2E8F0',
                }}>{done ? <RIcon.check size={14} stroke={3}/> : i + 1}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: active ? 'var(--thy-navy)' : '#64748B' }}>{label}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: done ? 'var(--thy-blue)' : '#E2E8F0' }} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Filters
   ────────────────────────────────────────────── */
function FilterGroup({ title, children }) {
  return (
    <div style={{ paddingBottom: 18, marginBottom: 18, borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 2, marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
function CheckRow({ label, sub, checked, onClick }) {
  return (
    <label onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', cursor: 'pointer' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? 'var(--thy-blue)' : '#CBD5E1'}`,
          background: checked ? 'var(--thy-blue)' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        }}>{checked && <RIcon.check size={12} stroke={3.5} />}</span>
        <span style={{ fontSize: 13, color: 'var(--thy-navy)', fontWeight: 600 }}>{label}</span>
      </span>
      {sub && <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>{sub}</span>}
    </label>
  );
}

/* ──────────────────────────────────────────────
   Cabin tile (Economy / Business header card)
   ────────────────────────────────────────────── */
function CabinTile({ kind, fare, selected, onClick, money }) {
  const t = useT();
  const isEco = kind === 'eco';
  const labelKey = isEco ? 'res.economy' : 'res.business';
  const accent = isEco ? '#0B6E6F' : '#794C37';
  const tintBg = selected ? '#F2F7F7' : '#F8FAFC';
  const seatsHint = fare?.seats != null && fare.seats <= 5 ? t('res.last', { n: fare.seats }) : null;

  return (
    <button onClick={onClick} disabled={!fare?.price} style={{
      flex: 1, textAlign: 'left', padding: 0, borderRadius: 8,
      border: `1.5px solid ${selected ? 'var(--thy-red)' : '#E2E8F0'}`,
      background: '#fff', cursor: fare?.price ? 'pointer' : 'not-allowed',
      transition: 'border-color .15s, transform .15s',
      opacity: fare?.price ? 1 : 0.55,
    }} onMouseEnter={(e)=>{ if (fare?.price) e.currentTarget.style.transform='translateY(-1px)'; }}
       onMouseLeave={(e)=>{ e.currentTarget.style.transform='none'; }}>
      <div style={{
        background: isEco ? '#EAF1F5' : '#F4E9DB',
        padding: '8px 14px',
        borderTopLeftRadius: 6, borderTopRightRadius: 6,
        borderBottom: `1px solid ${selected ? 'var(--thy-red)' : '#E2E8F0'}`,
        fontSize: 12, fontWeight: 800, color: 'var(--thy-navy)', letterSpacing: 0.3,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>{t(labelKey)}</span>
        {selected && <span style={{ fontSize: 10, color: 'var(--thy-red)', fontWeight: 800, letterSpacing: 1.2 }}>✓ {t('res.selected').toUpperCase()}</span>}
      </div>
      <div style={{ padding: '14px 18px', background: tintBg }}>
        <div style={{ fontSize: 11, color: '#64748B', marginBottom: 4 }}>{t('res.perpax')}</div>
        {fare?.price ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `2px solid ${selected ? 'var(--thy-red)' : '#CBD5E1'}`,
                background: selected ? 'var(--thy-red)' : '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>{selected && <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 19, fontWeight: 800, color: 'var(--thy-navy)' }}>
                {money(fare.price)}
              </span>
            </div>
            {seatsHint && <div style={{ fontSize: 11, color: 'var(--thy-red)', fontWeight: 700, marginTop: 6 }}>{seatsHint}</div>}
          </>
        ) : (
          <div style={{ fontSize: 16, fontWeight: 800, color: '#94A3B8', textAlign: 'center', padding: '6px 0' }}>{t('res.full')}</div>
        )}
      </div>
    </button>
  );
}

/* ──────────────────────────────────────────────
   Package comparison table (Eco subfares OR Business subfares)
   ────────────────────────────────────────────── */
const PKG_ROWS = [
  { id: 'cabin',  label: 'res.pkg.cabin',  icon: '🧳' },
  { id: 'bag',    label: 'res.pkg.bag',    icon: '🎒' },
  { id: 'seat',   label: 'res.pkg.seat',   icon: '💺' },
  { id: 'change', label: 'res.pkg.change', icon: '🔄' },
  { id: 'refund', label: 'res.pkg.refund', icon: '↩️' },
  { id: 'miles',  label: 'res.pkg.miles',  icon: '✦' },
  { id: 'fast',   label: 'res.pkg.fast',   icon: '⚡' },
  { id: 'lounge', label: 'res.pkg.lounge', icon: '🛋️' },
];

const ECO_PKGS = [
  { id: 'eco',  name: 'EcoFly',   feat: { cabin: '1 × 8 kg', bag: '✗',    seat: '✗',          change: '✗',           refund: '✗',          miles: '1000 Mil', fast: '✗', lounge: '✗' } },
  { id: 'extra',name: 'ExtraFly', feat: { cabin: '1 × 8 kg', bag: '23 kg', seat: '✗',          change: '3.218 ₺ kesinti', refund: '✗',     miles: '1000 Mil', fast: '✗', lounge: '✗' } },
  { id: 'flex', name: 'FlexFly',  feat: { cabin: '1 × 8 kg', bag: '23 kg', seat: 'Standart',    change: '✓',           refund: '4.138 ₺ kesinti', miles: '1150 Mil', fast: '✗', lounge: '✗' }, recommended: true },
  { id: 'prime',name: 'PrimeFly', feat: { cabin: '1 × 8 kg', bag: '30 kg', seat: 'Ön sıra+std', change: '✓',           refund: '✓',          miles: '1300 Mil', fast: '✓', lounge: '✗' } },
];
const BIZ_PKGS = [
  { id: 'bfly',  name: 'BusinessFly',   feat: { cabin: '2 × 8 kg', bag: '30 kg', seat: 'Standart', change: '5.517 ₺ kesinti', refund: '✗', miles: '1500 Mil', fast: '✓', lounge: '✓' } },
  { id: 'bprime',name: 'BusinessPrime', feat: { cabin: '2 × 8 kg', bag: '40 kg', seat: 'Standart', change: '✓',              refund: '✓', miles: '1950 Mil', fast: '✓', lounge: '✓' } },
];

function FareCell({ v }) {
  if (v === '✓') return <RIcon.check size={16} stroke={3} style={{ color: '#16A34A' }} />;
  if (v === '✗') return <RIcon.x     size={14} stroke={2.5} style={{ color: '#CBD5E1' }} />;
  return <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--thy-navy)' }}>{v}</span>;
}

function PackageTable({ kind, flight, money, onContinue }) {
  const t = useT();
  const pkgs = kind === 'eco' ? ECO_PKGS : BIZ_PKGS;
  const basePrice = parseInt(String(flight.price[kind === 'eco' ? 'eco' : 'biz']).replace(/[.\s]/g, ''), 10);
  const pkgPrices = kind === 'eco'
    ? { eco: basePrice, extra: basePrice + 1240, flex: basePrice + 2020, prime: basePrice + 3720 }
    : { bfly: basePrice, bprime: basePrice + 4140 };

  const [chosen, setChosen] = React.useState(pkgs.find(p => p.recommended)?.id || pkgs[0].id);
  const cols = pkgs.length + 1;
  const sCls = kind === 'eco' ? 'S sınıfı' : 'D sınıfı';

  return (
    <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, marginTop: 12, overflow: 'hidden' }}>
      {/* header row */}
      <div style={{ display: 'grid', gridTemplateColumns: `220px repeat(${pkgs.length}, 1fr) 160px`, background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ padding: '14px 18px', fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)' }}>{t('res.pkg')}</div>
        {pkgs.map((p) => (
          <div key={p.id} style={{
            padding: '14px 12px', textAlign: 'center', position: 'relative',
            borderLeft: '1px solid #E2E8F0',
            background: chosen === p.id ? 'rgba(0,83,165,0.04)' : 'transparent',
          }}>
            {p.recommended && (
              <span style={{
                position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--thy-blue)', color: '#fff', fontSize: 9, fontWeight: 800,
                letterSpacing: 1, padding: '2px 10px', borderRadius: '0 0 4px 4px',
              }}>{t('res.recommended').toUpperCase()}</span>
            )}
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--thy-navy)', marginTop: p.recommended ? 4 : 0 }}>{p.name}</div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{sCls}</div>
          </div>
        ))}
        <div style={{ padding: '14px 12px', borderLeft: '1px solid #E2E8F0' }} />
      </div>
      {/* feature rows */}
      {PKG_ROWS.map((row) => (
        <div key={row.id} style={{
          display: 'grid', gridTemplateColumns: `220px repeat(${pkgs.length}, 1fr) 160px`,
          borderTop: '1px solid #F1F5F9',
        }}>
          <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--thy-navy)' }}>
            <span style={{ fontSize: 14 }}>{row.icon}</span>{t(row.label)}
          </div>
          {pkgs.map((p) => (
            <div key={p.id} style={{
              padding: '12px 8px', borderLeft: '1px solid #F1F5F9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: chosen === p.id ? 'rgba(0,83,165,0.04)' : 'transparent',
            }}>
              <FareCell v={p.feat[row.id]} />
            </div>
          ))}
          <div style={{ borderLeft: '1px solid #F1F5F9' }} />
        </div>
      ))}
      {/* price + select footer */}
      <div style={{
        display: 'grid', gridTemplateColumns: `220px repeat(${pkgs.length}, 1fr) 160px`,
        borderTop: '1px solid #E2E8F0',
      }}>
        <div />
        {pkgs.map((p) => {
          const sel = chosen === p.id;
          return (
            <button key={p.id} onClick={() => setChosen(p.id)} style={{
              padding: '16px 0', textAlign: 'center', cursor: 'pointer',
              background: sel ? 'var(--thy-red)' : '#F8FAFC',
              border: 'none', borderLeft: '1px solid #E2E8F0',
              color: sel ? '#fff' : 'var(--thy-navy)',
              fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, letterSpacing: 0.3,
              transition: 'background .15s',
            }}>
              {money(pkgPrices[p.id])}
            </button>
          );
        })}
        <div style={{ borderLeft: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
          <button onClick={() => onContinue({ packageId: chosen, packageName: pkgs.find(p => p.id === chosen).name, price: pkgPrices[chosen], cabin: kind })} style={{
            padding: '10px 16px', borderRadius: 4, border: 'none',
            background: 'var(--thy-red)', color: '#fff', fontSize: 12, fontWeight: 800,
            cursor: 'pointer', letterSpacing: 0.3, whiteSpace: 'nowrap',
          }}>
            {t('res.continue')}
          </button>
        </div>
      </div>
      {/* Business class promo box */}
      {kind === 'biz' && (
        <div style={{
          padding: 18, background: 'linear-gradient(135deg, #F8F3EA, #F4E9DB)',
          borderTop: '1px solid #E2E8F0', display: 'flex', gap: 18, alignItems: 'center',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--thy-navy)', marginBottom: 6 }}>Business Class</div>
            <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5, maxWidth: 460 }}>
              Türk konukseverliğini göklere taşıdık! Business Class'ta konforlu koltuklar, özel ikram servisi,
              en sevilen filmler ve müziklerle yolculuğunuzu keyifli bir deneyime dönüştürüyoruz.
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11, fontWeight: 700 }}>
            {['Maksimum konfor', 'Özel ikram', 'Ekstra bagaj', 'Lounge deneyimi'].map((p) => (
              <span key={p} style={{
                padding: '8px 14px', background: '#fff', borderRadius: 6,
                color: 'var(--thy-navy)', boxShadow: '0 1px 4px rgba(10,22,40,0.06)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}>{p}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   FlightRow — Economy/Business tiles + expandable detail
   ────────────────────────────────────────────── */
function FlightRow({ flight, expanded, onToggle, selectedKind, onSelect, money, onContinue }) {
  const t = useT();
  return (
    <div style={{
      background: '#fff', borderRadius: 8,
      border: `1px solid ${selectedKind ? 'var(--thy-red)' : '#E2E8F0'}`,
      boxShadow: selectedKind ? '0 10px 30px rgba(183,49,44,0.10)' : '0 1px 0 rgba(0,0,0,0.02)',
      marginBottom: 12, overflow: 'hidden', transition: 'border-color .2s, box-shadow .2s',
    }}>
      <div style={{ padding: '18px 22px', display: 'grid', gridTemplateColumns: '2.6fr 2.4fr 80px', gap: 18, alignItems: 'center' }}>
        {/* Left — times + airline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: 'var(--thy-navy)', lineHeight: 1 }}>{flight.dep}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#64748B', marginTop: 4 }}>{flight.from}</div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{flight.fromCity}</div>
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#64748B', fontFamily: 'var(--font-mono)' }}>
              {flight.stops === 0 ? 'Direkt' : `${flight.stops} aktarma`}
            </div>
            <div style={{ height: 1, background: '#CBD5E1', margin: '6px 0', position: 'relative' }}>
              <RIcon.plane size={14} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%) rotate(45deg)', background: '#fff', padding: 2, color: 'var(--thy-red)' }} />
            </div>
            <div style={{ textAlign: 'center', fontSize: 10, color: '#94A3B8', marginTop: 4 }}>{flight.duration}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 800, color: 'var(--thy-navy)', lineHeight: 1 }}>{flight.arr}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: '#64748B', marginTop: 4 }}>{flight.to}</div>
            <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 2 }}>{flight.toCity}</div>
          </div>
        </div>

        {/* Middle — Economy + Business tiles */}
        <div style={{ display: 'flex', gap: 8 }}>
          <CabinTile kind="eco" fare={{ price: flight.price.eco, seats: flight.seats?.eco }}
            selected={selectedKind === 'eco'}
            onClick={() => onSelect('eco')}
            money={money} />
          <CabinTile kind="biz" fare={{ price: flight.price.biz, seats: flight.seats?.biz }}
            selected={selectedKind === 'biz'}
            onClick={() => onSelect('biz')}
            money={money} />
        </div>

        {/* Right — expand chevron */}
        <button onClick={onToggle} style={{
          background: 'transparent', border: '1px solid #E2E8F0', cursor: 'pointer',
          borderRadius: 6, padding: '8px 10px', color: 'var(--thy-blue)',
          display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700,
        }}>
          Detay <RIcon.chevDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
        </button>
      </div>

      {/* Airline meta row */}
      <div style={{
        padding: '8px 22px', background: '#F8FAFC', borderTop: '1px solid #F1F5F9',
        display: 'flex', alignItems: 'center', gap: 14, fontSize: 11, color: '#64748B',
      }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            width: 18, height: 18, borderRadius: 3, background: 'var(--thy-red)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <img src="/assets/logo-badge.png" alt="" style={{ height: 12, filter: 'brightness(0) invert(1)' }} />
          </span>
          <strong style={{ color: 'var(--thy-navy)' }}>{flight.airline}</strong>
          <span style={{ fontFamily: 'var(--font-mono)' }}>· {flight.code}</span>
        </span>
        <span>Uçak tipi: {flight.aircraft}</span>
        <span>CO₂: {flight.co2} kg</span>
      </div>

      {/* Expanded fare detail */}
      {selectedKind && (
        <div style={{ padding: 18, background: '#F3F5F8' }}>
          <PackageTable kind={selectedKind} flight={flight} money={money} onContinue={(pkg) => onContinue(flight, pkg)} />
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Selection summary bar (sticky top, shows outbound+return picks)
   ────────────────────────────────────────────── */
function SelectionBar({ outbound, returnLeg, totalPrice, money, onModify, onContinue, t }) {
  return (
    <div style={{
      position: 'sticky', top: 70, zIndex: 60,
      background: 'var(--thy-navy)', color: '#fff',
      padding: '14px 32px', borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <Leg label="GİDİŞ" leg={outbound} />
          {returnLeg && <Leg label="DÖNÜŞ" leg={returnLeg} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {totalPrice && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: '#B2C0D1', letterSpacing: 1, fontWeight: 700 }}>TOPLAM</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 800, color: 'var(--thy-gold-light)' }}>
                {money(totalPrice)}
              </div>
            </div>
          )}
          <button onClick={onContinue} style={{
            padding: '10px 18px', background: 'var(--thy-red-light)', color: '#fff',
            border: 'none', borderRadius: 4, fontWeight: 800, fontSize: 13, cursor: 'pointer',
          }}>{t('res.proceedroute')}</button>
        </div>
      </div>
    </div>
  );
}
function Leg({ label, leg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: '#B2C0D1' }}>{label}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800 }}>
        <span>{leg.flight.from}</span><RIcon.arrowRight size={12} stroke={2.5} /><span>{leg.flight.to}</span>
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#B2C0D1' }}>{leg.flight.dep}–{leg.flight.arr}</span>
      <span style={{
        fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 3, letterSpacing: 0.5,
        background: leg.pkg?.cabin === 'biz' ? 'rgba(197,160,89,0.25)' : 'rgba(255,255,255,0.12)',
        color: leg.pkg?.cabin === 'biz' ? 'var(--thy-gold-light)' : '#fff',
      }}>{leg.pkg?.packageName || leg.pkg?.cabin?.toUpperCase()}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Single flight list (shared by Outbound + Return steps)
   ────────────────────────────────────────────── */
function FlightList({ search, leg, money, onContinue, onModify, isReturn = false }) {
  const t = useT();
  const [expandedId, setExpandedId] = React.useState(null);
  const [selectedKind, setSelectedKind] = React.useState({}); // id → 'eco'|'biz'
  const [sort, setSort] = React.useState('cheap');
  const [direct, setDirect] = React.useState(false);
  const [times, setTimes] = React.useState({ morning: true, noon: true, evening: true });
  const [priceMax, setPriceMax] = React.useState(60000);

  const from = isReturn ? (search?.to?.code   || 'FCO') : (search?.from?.code || 'IST');
  const to   = isReturn ? (search?.from?.code || 'IST') : (search?.to?.code   || 'FCO');
  const fromCity = isReturn ? (search?.to?.city || 'Roma')     : (search?.from?.city || 'İstanbul');
  const toCity   = isReturn ? (search?.from?.city || 'İstanbul'): (search?.to?.city   || 'Roma');

  const flights = [
    { id: 'a', airline: 'Turkish Airlines', code: 'TK 1855', dep: '07:35', arr: '09:15', from, to, fromCity, toCity, duration: '2sa 40dk', stops: 0, aircraft: 'Airbus A350-900 — Geniş gövde', co2: 142, seats: { eco: 24, biz: 5  }, price: { eco: '15.111', biz: '48.072' } },
    { id: 'b', airline: 'Turkish Airlines', code: 'TK 1859', dep: '12:30', arr: '14:10', from, to, fromCity, toCity, duration: '2sa 40dk', stops: 0, aircraft: 'Airbus A321-200neo — Dar gövde',  co2: 138, seats: { eco: 18, biz: 0  }, price: { eco: '27.523', biz: '—' } },
    { id: 'c', airline: 'Turkish Airlines', code: 'TK 1863', dep: '16:45', arr: '18:25', from, to, fromCity, toCity, duration: '2sa 40dk', stops: 0, aircraft: 'Airbus A350-900 — Geniş gövde', co2: 142, seats: { eco: 32, biz: 9  }, price: { eco: '15.111', biz: '41.039' } },
    { id: 'd', airline: 'Turkish Airlines', code: 'TK 1873', dep: '21:30', arr: '23:20', from, to, fromCity, toCity, duration: '2sa 50dk', stops: 0, aircraft: 'Airbus A321neo',                  co2: 124, seats: { eco: 22, biz: 4  }, price: { eco: '18.450', biz: '52.209' } },
    { id: 'e', airline: 'Turkish Airlines', code: 'TK 1867', dep: '19:05', arr: '21:05', from, to, fromCity, toCity, duration: '3sa 0dk',  stops: 1, aircraft: 'Boeing 737-800 / A321',           co2: 198, seats: { eco: 41, biz: 12 }, price: { eco: '14.290', biz: '38.980' } },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
      <aside style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 20, height: 'fit-content', position: 'sticky', top: 200 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--thy-navy)', letterSpacing: 2, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <RIcon.filter size={14} /> {t('res.filters')}
        </div>
        <FilterGroup title={t('res.stops')}>
          <CheckRow label={t('res.direct')} sub="4" checked={direct} onClick={() => setDirect(d => !d)} />
          <CheckRow label="1 Aktarma" sub="1" checked={true} onClick={() => {}} />
        </FilterGroup>
        <FilterGroup title={t('res.times')}>
          <CheckRow label={t('res.morning')}  sub="2" checked={times.morning} onClick={() => setTimes(s => ({ ...s, morning: !s.morning }))} />
          <CheckRow label={t('res.noon')}     sub="2" checked={times.noon}    onClick={() => setTimes(s => ({ ...s, noon: !s.noon }))} />
          <CheckRow label={t('res.evening')}  sub="1" checked={times.evening} onClick={() => setTimes(s => ({ ...s, evening: !s.evening }))} />
        </FilterGroup>
        <FilterGroup title={t('res.airlines')}>
          <CheckRow label="Turkish Airlines" sub="5" checked={true} onClick={() => {}} />
        </FilterGroup>
        <div style={{ paddingBottom: 6 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#64748B', letterSpacing: 2, marginBottom: 12 }}>{t('res.price')}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--thy-navy)', marginBottom: 8 }}>
            <span>{money('14.290')}</span>
            <span>{money(priceMax)}</span>
          </div>
          <input type="range" min="14290" max="60000" step="500" value={priceMax} onChange={(e) => setPriceMax(+e.target.value)}
            style={{ width: '100%', accentColor: 'var(--thy-red)' }} />
        </div>
      </aside>

      <main>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: '#64748B' }}>
            <strong style={{ color: 'var(--thy-navy)', fontSize: 16 }}>{flights.length} uçuş</strong> bulundu
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[['cheap', t('res.sort.cheap')], ['fast', t('res.sort.fast')], ['early', t('res.sort.early')]].map(([k, l]) => (
              <button key={k} onClick={() => setSort(k)} style={{
                fontSize: 12, fontWeight: 700, padding: '8px 14px', cursor: 'pointer',
                border: `1px solid ${sort === k ? 'var(--thy-navy)' : '#E2E8F0'}`,
                background: sort === k ? 'var(--thy-navy)' : '#fff',
                color: sort === k ? '#fff' : 'var(--thy-navy)',
                borderRadius: 4,
              }}>{l}</button>
            ))}
          </div>
        </div>
        {flights.map((f) => (
          <FlightRow
            key={f.id} flight={f}
            expanded={expandedId === f.id || !!selectedKind[f.id]}
            onToggle={() => setExpandedId(prev => prev === f.id ? null : f.id)}
            selectedKind={selectedKind[f.id]}
            onSelect={(kind) => setSelectedKind(prev => ({ ...prev, [f.id]: prev[f.id] === kind ? null : kind }))}
            money={money}
            onContinue={(flight, pkg) => onContinue({ flight, pkg })}
          />
        ))}

        <div style={{
          marginTop: 24, padding: 18, borderRadius: 8,
          background: 'linear-gradient(135deg, rgba(197,160,89,0.12), rgba(197,160,89,0.04))',
          border: '1px solid rgba(197,160,89,0.3)', display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--thy-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <RIcon.star size={22} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--thy-navy)' }}>Miles&Smiles ile kazanın</div>
            <div style={{ fontSize: 13, color: '#64748B' }}>Bu uçuştan <strong>2.840 mil</strong> kazanın ve indirimli bilet alın.</div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ──────────────────────────────────────────────
   ResultsPage — orchestrates the 2-leg flow
   ────────────────────────────────────────────── */
function ResultsPage({ go, search }) {
  const t = useT();
  const money = useMoney();
  const trip = search?.trip || 'round';
  const isRound = trip === 'round';

  // step: 'out' = pick outbound, 'ret' = pick return, 'done' = ready to go to route
  const [step, setStep] = React.useState('out');
  const [outbound, setOutbound] = React.useState(null);
  const [returnLeg, setReturnLeg] = React.useState(null);

  const totalPrice = (outbound?.pkg?.price || 0) + (returnLeg?.pkg?.price || 0);

  const handleOutbound = (sel) => {
    setOutbound(sel);
    if (isRound) {
      setStep('ret');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep('done');
    }
  };
  const handleReturn = (sel) => {
    setReturnLeg(sel);
    setStep('done');
  };
  const goRoute = () => {
    go('route', {
      city: search?.to?.city || 'Roma',
      flights: { out: outbound, ret: returnLeg },
    });
  };

  const trackerStep = step === 'out' ? 0 : step === 'ret' ? 1 : 2;

  return (
    <div style={{ background: '#F3F5F8', minHeight: '100vh' }}>
      <Tracker step={trackerStep} />

      {/* Picked-flights sticky bar (visible after first selection) */}
      {outbound && (
        <SelectionBar outbound={outbound} returnLeg={returnLeg} totalPrice={totalPrice || null}
          money={money} t={t} onContinue={goRoute} />
      )}

      {/* Heading row */}
      <div style={{ background: '#fff', borderBottom: '1px solid #E2E8F0', padding: '20px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--thy-navy)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span>{step === 'ret' ? (search?.to?.city || 'Roma') : (search?.from?.city || 'İstanbul')}</span>
              <RIcon.arrowRight size={18} style={{ color: 'var(--thy-red)' }} />
              <span>{step === 'ret' ? (search?.from?.city || 'İstanbul') : (search?.to?.city || 'Roma')}</span>
            </div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
              {step === 'ret' ? t('res.title.ret') : t('res.title.out')} · 1 Yetişkin
            </div>
          </div>
          <button onClick={() => go('home')} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: 700, color: 'var(--thy-red)',
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}><RIcon.edit size={13} /> {t('res.modify')}</button>
        </div>
      </div>

      {/* OUT or RET list */}
      {step === 'out' && <FlightList search={search} leg="out" money={money} onContinue={handleOutbound} />}
      {step === 'ret' && <FlightList search={search} leg="ret" money={money} onContinue={handleReturn} isReturn />}

      {/* DONE — review & continue */}
      {step === 'done' && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 32px' }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E2E8F0', padding: 28, boxShadow: '0 20px 50px rgba(10,22,40,0.06)' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px',
              background: 'rgba(34,197,94,0.1)', color: '#16A34A', borderRadius: 3,
              fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 14,
            }}><RIcon.check size={12} stroke={3} /> UÇUŞLAR SEÇİLDİ</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800, color: 'var(--thy-navy)', margin: '0 0 18px' }}>
              Yolculuğunuz hazır
            </h2>

            {[outbound, returnLeg].filter(Boolean).map((leg, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderTop: '1px solid #F1F5F9' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 800, color: 'var(--thy-red)', letterSpacing: 1.5, minWidth: 50 }}>
                  {i === 0 ? 'GİDİŞ' : 'DÖNÜŞ'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--thy-navy)' }}>{leg.flight.from} → {leg.flight.to} · {leg.flight.dep}-{leg.flight.arr}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>{leg.flight.code} · {leg.flight.aircraft} · {leg.pkg.packageName}</div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800, color: 'var(--thy-navy)' }}>{money(leg.pkg.price)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 4px', borderTop: '2px solid var(--thy-navy)' }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: 2 }}>TOPLAM</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 800, color: 'var(--thy-navy)' }}>{money(totalPrice)}</span>
            </div>

            <div style={{
              marginTop: 22, padding: 16, background: '#F8FAFC', borderRadius: 6,
              fontSize: 13, color: '#64748B', display: 'flex', gap: 10,
            }}>
              <RIcon.shield size={16} style={{ color: 'var(--thy-blue)', flexShrink: 0 }} />
              <div>THY Route bilet satışı yapmaz. Bileti satın almak için "thy.com'da satın al" butonunu kullanın. Bilet alındıktan sonra Rotanızı oluşturmaya devam edebilirsiniz.</div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <a href="https://www.turkishairlines.com" target="_blank" rel="noopener noreferrer" style={{
                flex: 1, padding: '14px 18px', background: '#fff', border: '1.5px solid var(--thy-navy)',
                color: 'var(--thy-navy)', borderRadius: 4, fontSize: 13, fontWeight: 800,
                textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
                <RIcon.link size={14} /> {t('res.buyonthy')}
              </a>
              <button onClick={goRoute} style={{
                flex: 1, padding: '14px 18px', background: 'var(--thy-red-light)', color: '#fff',
                border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 800, cursor: 'pointer',
              }}>{t('res.proceedroute')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ResultsPage, Tracker };
