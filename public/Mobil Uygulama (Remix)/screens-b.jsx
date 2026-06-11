// screens-b.jsx — Map/Route, CoPilot, MS, Notifications, Profile

// ───────────────────────────────────────────────────────────
// 6) MAP / ROUTE — dark cockpit, multi-city plan w/ boarding pass
// ───────────────────────────────────────────────────────────
function MapScreen({ t, nav, k }) {
  const u = useThyTweaks(t, { dark: true });
  const topPad = k === 'ios' ? 50 : 14;
  return (
    <div className="thy-screen is-dark screen-enter" style={{
      position: 'relative', minHeight: '100%', overflow: 'hidden',
      background: '#050B14', fontFamily: u.font,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* live "map" */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img src={(typeof window !== 'undefined' && window.__resources?.routeMap) || 'assets/AnaEkran.png'} alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'saturate(0.55) brightness(0.85)',
          }} />
        {/* navy tint overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(5,11,20,0.35) 0%, rgba(5,11,20,0) 30%, rgba(5,11,20,0.95) 100%)',
        }} />

        {/* route arc */}
        <svg viewBox="0 0 360 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} preserveAspectRatio="none">
          <defs>
            <linearGradient id="arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={u.accent.fg} stopOpacity="0.0"/>
              <stop offset="0.2" stopColor={u.accent.fg} stopOpacity="0.9"/>
              <stop offset="0.8" stopColor={u.accent.fg} stopOpacity="0.9"/>
              <stop offset="1" stopColor={u.accent.fg} stopOpacity="0.0"/>
            </linearGradient>
          </defs>
          <path d="M 50 200 Q 180 60 310 180" fill="none" stroke="url(#arc)" strokeWidth="2.5" strokeDasharray="6 5" />
          <path d="M 310 180 Q 280 220 200 240" fill="none" stroke="#C5A05988" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* pins */}
        {[
          { x: 12, y: 60, code: 'IST', label: 'İstanbul' },
          { x: 84, y: 52, code: 'FCO', label: 'Roma',     primary: true },
          { x: 50, y: 75, code: 'AYT', label: 'Antalya'   },
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
            transform: 'translate(-50%, -100%)',
          }}>
            <div style={{
              padding: '4px 8px', borderRadius: 6,
              background: p.primary ? u.accent.bg : 'rgba(10,22,40,0.85)',
              border: `1px solid ${p.primary ? u.accent.fg : 'rgba(255,255,255,0.18)'}`,
              fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 11,
              color: '#fff', letterSpacing: 1,
              boxShadow: p.primary ? `0 0 14px ${u.accent.glow}` : '0 4px 10px rgba(0,0,0,0.4)',
              whiteSpace: 'nowrap',
            }}>{p.code} · {p.label}</div>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: p.primary ? u.accent.fg : '#fff',
              margin: '6px auto 0', border: '2px solid rgba(5,11,20,0.6)',
              boxShadow: p.primary ? `0 0 12px ${u.accent.glow}` : 'none',
            }} />
          </div>
        ))}

        {/* top controls */}
        <div style={{
          position: 'absolute', top: topPad, left: 14, right: 14,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <button onClick={() => nav('board')} style={{
            background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 10, padding: '8px 10px', color: '#fff', cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}><Icon name="arrowL" size={14} /></button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[ 'plus', 'location', 'edit' ].map(i => (
              <button key={i} style={{
                width: 38, height: 38, borderRadius: 10,
                background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff', cursor: 'pointer',
                backdropFilter: 'blur(8px)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name={i} size={15} /></button>
            ))}
          </div>
        </div>
      </div>

      {/* Plan panel — overlapping */}
      <div style={{
        marginTop: -28, position: 'relative', zIndex: 2,
        background: 'linear-gradient(180deg, rgba(15,34,68,0.96) 0%, rgba(10,22,40,1) 60%)',
        borderTop: '1px solid rgba(197,160,89,0.2)',
        borderRadius: '20px 20px 0 0',
        padding: '16px 18px 0',
        flex: 1, display: 'flex', flexDirection: 'column',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      }}>
        {/* drag handle */}
        <div style={{
          width: 38, height: 4, background: 'rgba(255,255,255,0.22)',
          borderRadius: 2, margin: '0 auto 14px',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <SectionLabel dark accent={u.accent} style={{ color: u.accent.fg }}>{u.lang === 'tr' ? 'ROTA PLANI' : 'ROUTE PLAN'}</SectionLabel>
          <span style={{ fontSize: 10, color: '#7A8EAF', fontFamily: 'var(--font-mono)' }}>TRIP-0042</span>
        </div>
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19,
          color: '#fff', margin: '2px 0 12px', letterSpacing: -0.3,
        }}>{u.lang === 'tr' ? 'Roma + Antalya Yaz Turu' : 'Rome + Antalya Summer Tour'}</h2>

        {/* timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <RouteStop u={u} city="İstanbul" code="IST" date={u.lang === 'tr' ? '17 Haz · 14:25' : 'Jun 17 · 14:25'} kind="start" />
          <RouteStop u={u} city="Roma" code="FCO" date={u.lang === 'tr' ? '17 Haz · 16:50' : 'Jun 17 · 16:50'} kind="active" mile="2.840" />
          <div style={{ paddingLeft: 22 }}>
            <BoardingPass
              flightCode="TK 2412"
              fromCode="FCO" toCode="AYT"
              fromCity="Roma" toCity="Antalya"
            />
            <div style={{
              fontSize: 9, fontWeight: 800, letterSpacing: 1.5,
              color: u.accent.fg, marginTop: 4, textTransform: 'uppercase',
            }}>{u.c.domesticLeg}</div>
          </div>
          <RouteStop u={u} city="Antalya" code="AYT" date={u.lang === 'tr' ? '24 Haz · 09:10' : 'Jun 24 · 09:10'} kind="end" mile="1.120" />
        </div>

        {/* add stop */}
        <button style={{
          marginTop: 14, padding: '12px 14px', width: '100%',
          background: 'rgba(255,255,255,0.045)', border: '1px dashed rgba(255,255,255,0.18)',
          borderRadius: 12, color: u.accent.fg, fontWeight: 700, fontSize: 12,
          fontFamily: u.font, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}><Icon name="plus" size={14} color={u.accent.fg} /> {u.c.addStop}</button>

        <div style={{ marginTop: 'auto' }}>
          <AppTabBar active="map" onChange={(id) => nav(id === 'home' ? 'board' : id === 'search' ? 'search' : id === 'map' ? 'map' : id === 'wallet' ? 'ms' : 'profile')} {...u} />
        </div>
      </div>
    </div>
  );
}

function RouteStop({ u, city, code, date, kind, mile }) {
  const isActive = kind === 'active';
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <div style={{
        width: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch',
      }}>
        <div style={{
          width: 12, height: 12, borderRadius: '50%',
          background: isActive ? u.accent.fg : kind === 'end' ? '#fff' : 'transparent',
          border: '2px solid ' + (isActive ? u.accent.fg : 'rgba(255,255,255,0.5)'),
          boxShadow: isActive ? `0 0 10px ${u.accent.glow}` : 'none',
          flexShrink: 0,
        }} />
        {kind !== 'end' && <div style={{ flex: 1, width: 1, background: 'rgba(255,255,255,0.18)' }} />}
      </div>
      <div style={{
        flex: 1, padding: '10px 12px',
        background: 'rgba(255,255,255,0.045)',
        border: '1px solid ' + (isActive ? 'rgba(197,160,89,0.3)' : 'rgba(255,255,255,0.085)'),
        borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 13, color: '#fff', letterSpacing: 0.5 }}>{code}</span>
            <span style={{ fontSize: 12, color: '#B2C0D1' }}>{city}</span>
            {isActive && <StatusBadge kind="success" dark style={{ marginLeft: 4 }}>{u.c.inFlight}</StatusBadge>}
          </div>
          <div style={{ fontSize: 10, color: '#7A8EAF', marginTop: 2, fontFamily: 'var(--font-mono)' }}>{date}</div>
        </div>
        {mile && <MileChip value={`+${mile} mi`} />}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// 7) CO-PILOT — light, share PILOT ID + invite, illustrated
// ───────────────────────────────────────────────────────────
function CoPilotScreen({ t, nav, k }) {
  const u = useThyTweaks(t, { dark: false });
  const topPad = k === 'ios' ? 50 : 16;
  const toast = useToast();
  const [copied, setCopied] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const pid = 'PT-4830-RM';

  const copy = () => {
    setCopied(true);
    toast({ type: 'success', icon: '✓', children: u.lang === 'tr' ? 'Pilot ID kopyalandı' : 'Pilot ID copied' });
    setTimeout(() => setCopied(false), 1800);
  };
  const sendInvite = () => {
    if (!email) return toast({ type: 'error', icon: '!', children: u.lang === 'tr' ? 'E-posta gerekli' : 'Email required' });
    toast({ type: 'success', icon: '✈', children: u.lang === 'tr' ? `Davet ${email} adresine gönderildi` : `Invite sent to ${email}` });
    setEmail('');
  };

  return (
    <div className="thy-screen screen-enter" style={{
      minHeight: '100%', background: '#F3F5F8', fontFamily: u.font,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* hero with two avatars */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, #0A1628 0%, ${u.accent.deep} 80%, ${u.accent.bg} 100%)`,
        padding: `${topPad}px 18px 30px`, color: '#fff',
      }}>
        <RouteMapBg opacity={0.12} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={() => nav('board')} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '8px 10px', color: '#fff', cursor: 'pointer',
          }}><Icon name="arrowL" size={14} /></button>
        </div>

        <div style={{ position: 'relative', textAlign: 'center', marginTop: 20 }}>
          {/* dual avatars */}
          <div style={{ display: 'inline-flex', position: 'relative', marginBottom: 16 }}>
            <Avatar initials="A" tint={u.accent.fg} pos="left" />
            <Avatar initials="M" tint="#fff" pos="right" />
            <span style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)', zIndex: 2,
              width: 28, height: 28, borderRadius: '50%',
              background: '#fff', color: u.accent.bg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
            }}><Icon name="link" size={14} /></span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 800,
            margin: 0, letterSpacing: -0.3,
          }}>{u.c.coPilot}</h1>
          <p style={{ color: '#B2C0D1', fontSize: 13, margin: '6px 24px 0' }}>
            {u.c.coPilotDesc}
          </p>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        {/* PILOT ID card */}
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
          boxShadow: '0 10px 28px rgba(10,22,40,0.10)',
          padding: 16,
        }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5, color: '#94A3B8' }}>{u.c.inviteCode}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <span style={{
              flex: 1, fontFamily: 'var(--font-mono)', fontWeight: 800,
              fontSize: 28, color: '#0A1628', letterSpacing: 2,
              background: '#F3F5F8', border: '1px dashed #CBD5E1',
              borderRadius: 10, padding: '12px 14px',
            }}>{pid}</span>
            <button onClick={copy} style={{
              width: 48, height: 48, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: copied ? '#16A34A' : `${u.accent.bg}14`,
              color: copied ? '#fff' : u.accent.bg,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 200ms',
            }}><Icon name={copied ? 'check' : 'copy'} size={18} /></button>
          </div>
          <div style={{ fontSize: 11, color: '#64748B', marginTop: 10, lineHeight: 1.5 }}>
            {u.lang === 'tr'
              ? 'Bu kimliği paylaşın — rotanız iki cihazda da canlı eşlenecek.'
              : 'Share this ID — your route will sync live across both devices.'}
          </div>
        </div>

        {/* email invite */}
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
          padding: 14, marginTop: 12,
        }}>
          <ThyInput light
            label={u.lang === 'tr' ? 'E-POSTA İLE DAVET ET' : 'INVITE BY EMAIL'}
            placeholder="mehmet@example.com"
            icon={<Icon name="mail" size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ marginTop: 10 }}>
            <ThyButton variant="primary" size="lg" fullWidth icon="✉" onClick={sendInvite}>
              {u.c.sendInvite}
            </ThyButton>
          </div>
        </div>

        {/* active co-pilots */}
        <div style={{ marginTop: 18 }}>
          <SectionLabel style={{ marginBottom: 8 }}>{u.lang === 'tr' ? 'AKTİF YARDIMCI PİLOTLAR' : 'ACTIVE CO-PILOTS'}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <CoPilotRow u={u} name="Mehmet K." since={u.lang === 'tr' ? '2 saat aktif' : 'Active 2h'} live />
            <CoPilotRow u={u} name="Selin A." since={u.lang === 'tr' ? 'Dün katıldı' : 'Joined yesterday'} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <AppTabBar active="home" onChange={(id) => nav(id === 'home' ? 'board' : id === 'search' ? 'search' : id === 'map' ? 'map' : id === 'wallet' ? 'ms' : 'profile')} {...u} />
      </div>
    </div>
  );
}

function Avatar({ initials, tint, pos }) {
  return (
    <div style={{
      width: 72, height: 72, borderRadius: '50%',
      background: `linear-gradient(135deg, ${tint}, ${tint}AA)`,
      border: '3px solid #0A1628', color: '#0A1628',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 28,
      marginLeft: pos === 'right' ? -22 : 0,
      boxShadow: '0 8px 22px rgba(0,0,0,0.3)',
      position: 'relative', zIndex: pos === 'left' ? 1 : 0,
    }}>{initials}</div>
  );
}

function CoPilotRow({ u, name, since, live }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
      padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: `linear-gradient(135deg, ${u.accent.bg}, ${u.accent.deep})`,
        color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: 14,
      }}>{name[0]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0A1628' }}>{name}</div>
        <div style={{ fontSize: 11, color: '#64748B' }}>{since}</div>
      </div>
      {live ? <StatusBadge kind="success">{u.lang === 'tr' ? 'CANLI' : 'LIVE'}</StatusBadge>
            : <Icon name="chevR" size={14} color="#94A3B8" />}
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// 8) MILES & SMILES — dark, miles balance, fare tier, partners
// ───────────────────────────────────────────────────────────
function MilesScreen({ t, nav, k }) {
  const u = useThyTweaks(t, { dark: true });
  const topPad = k === 'ios' ? 50 : 14;
  const toast = useToast();
  const [tab, setTab] = React.useState('overview');
  const [cat, setCat] = React.useState('all');
  return (
    <div className="thy-screen is-dark screen-enter" style={{
      minHeight: '100%', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #050B14 0%, #0A1628 40%, #0F2244 100%)',
      fontFamily: u.font, display: 'flex', flexDirection: 'column',
    }}>
      <RouteMapBg opacity={0.06} />

      <div style={{ position: 'relative', padding: `${topPad}px 18px 14px`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => nav('board')} style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '8px 10px', color: '#fff', cursor: 'pointer',
        }}><Icon name="arrowL" size={14} /></button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#7A8EAF', letterSpacing: 2 }}>
          MILES&SMILES
        </div>
        <button style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 10, padding: '8px 10px', color: '#fff', cursor: 'pointer',
        }}><Icon name="qr" size={14} /></button>
      </div>

      {/* Membership card */}
      <div style={{ padding: '8px 16px 0' }}>
        <div style={{
          position: 'relative', overflow: 'hidden', padding: '18px 18px 16px',
          borderRadius: 16, color: '#0A1628',
          background: 'linear-gradient(135deg, #E8C97A 0%, #C5A059 35%, #A0813C 75%, #C5A059 100%)',
          boxShadow: '0 14px 36px rgba(197,160,89,0.36), 0 1px 0 rgba(255,255,255,0.3) inset',
        }}>
          {/* shimmer band */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: '-30%', width: '40%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
            transform: 'skewX(-20deg)',
          }} />
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2.5 }}>ELITE PLUS · TK</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 800, letterSpacing: -0.3, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Aylin Kaya
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.5, marginTop: 2, opacity: 0.7 }}>
                4218 ····  ····  2107
              </div>
            </div>
            <Crane dark={false} size={26} />
          </div>

          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, opacity: 0.7 }}>{u.c.miles.toUpperCase()}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 26, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1 }}>
                87.420
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, opacity: 0.7 }}>{u.lang === 'tr' ? 'STATÜ' : 'STATUS'}</div>
              <div style={{ fontWeight: 800, fontSize: 13 }}>{u.lang === 'tr' ? '12.580 mil ile ELITE' : '12,580 mi to ELITE'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ padding: '14px 16px 0' }}>
        <ThyTabs value={tab} onChange={setTab} items={[
          { id: 'overview', label: u.lang === 'tr' ? 'GENEL' : 'OVERVIEW' },
          { id: 'partners', label: u.lang === 'tr' ? 'PARTNERLER' : 'PARTNERS' },
          { id: 'history',  label: u.lang === 'tr' ? 'GEÇMİŞ' : 'HISTORY' },
        ]} />
      </div>

      {/* offer chip ladder */}
      <div style={{ padding: '14px 16px 4px' }}>
        <SectionLabel dark accent={u.accent} style={{ color: u.accent.fg, marginBottom: 8 }}>
          {u.lang === 'tr' ? 'HIZLI MİL KAZAN' : 'EARN QUICKLY'}
        </SectionLabel>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { i: 'plane', l: u.lang === 'tr' ? 'Uçuş' : 'Flight' },
            { i: 'bed',   l: u.lang === 'tr' ? 'Otel'  : 'Hotel' },
            { i: 'car',   l: u.lang === 'tr' ? 'Araç'  : 'Car' },
            { i: 'coffee',l: u.lang === 'tr' ? 'Yeme'  : 'Dine' },
          ].map(o => (
            <div key={o.i} style={{
              flex: 1, padding: '12px 6px', borderRadius: 10,
              background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.085)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              fontFamily: u.font, color: '#fff',
            }}>
              <Icon name={o.i} size={18} color={u.accent.fg} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#B2C0D1' }}>{o.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <SectionLabel dark accent={u.accent} style={{ color: u.accent.fg }}>{u.c.partners.toUpperCase()}</SectionLabel>
          <span style={{ fontSize: 10, color: '#7A8EAF', fontFamily: 'var(--font-mono)' }}>21 {u.lang === 'tr' ? 'tane' : 'partners'}</span>
        </div>

        {/* category chips */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          <ThyChip active={cat==='all'}    onClick={() => setCat('all')}>{u.lang === 'tr' ? 'Tümü' : 'All'}</ThyChip>
          <ThyChip active={cat==='hotel'}  onClick={() => setCat('hotel')} icon={<Icon name="bed" size={12} />}>{u.lang === 'tr' ? 'Konaklama' : 'Hotels'}</ThyChip>
          <ThyChip active={cat==='car'}    onClick={() => setCat('car')} icon={<Icon name="car" size={12} />}>{u.lang === 'tr' ? 'Araç' : 'Cars'}</ThyChip>
          <ThyChip active={cat==='bank'}   onClick={() => setCat('bank')} icon={<Icon name="cardIcon" size={12} />}>{u.lang === 'tr' ? 'Banka' : 'Bank'}</ThyChip>
          <ThyChip active={cat==='dining'} onClick={() => setCat('dining')} icon={<Icon name="coffee" size={12} />}>{u.lang === 'tr' ? 'Yeme' : 'Dining'}</ThyChip>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PartnerItem name="Hilton" offer={u.lang === 'tr' ? 'Konaklama başına 500 Mil' : '500 mi per stay'} icon={<Icon name="bed" size={16} />} actionLabel={u.lang === 'tr' ? 'Haritada Bul' : 'Find'} />
          <PartnerItem name="Avis" offer={u.lang === 'tr' ? 'Kiralama başına min. 125 Mil' : 'min. 125 mi per rental'} icon={<Icon name="car" size={16} />} actionLabel={u.lang === 'tr' ? 'Haritada Bul' : 'Find'} />
          <PartnerItem name="Garanti BBVA" offer={u.lang === 'tr' ? 'Her 5 TL\'ye 1 Mil' : '1 mi per 5 TL spend'} icon={<Icon name="cardIcon" size={16} />} actionLabel={u.lang === 'tr' ? 'Aktifleştir' : 'Activate'} />
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 14 }}>
        <AppTabBar active="wallet" onChange={(id) => nav(id === 'home' ? 'board' : id === 'search' ? 'search' : id === 'map' ? 'map' : id === 'wallet' ? 'ms' : 'profile')} {...u} />
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// 9) NOTIFICATIONS — light, list with status icons
// ───────────────────────────────────────────────────────────
function NotificationsScreen({ t, nav, k }) {
  const u = useThyTweaks(t, { dark: false });
  const topPad = k === 'ios' ? 50 : 16;
  const toast = useToast();
  const [filter, setFilter] = React.useState('all');
  return (
    <div className="thy-screen screen-enter" style={{
      minHeight: '100%', background: '#F3F5F8', fontFamily: u.font,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        background: '#fff', padding: `${topPad}px 16px 14px`,
        borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => nav('board')} style={{
            background: '#F3F5F8', border: '1px solid #E2E8F0', borderRadius: 10,
            padding: '8px 10px', cursor: 'pointer',
          }}><Icon name="arrowL" size={14} color="#0A1628" /></button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 20, color: '#0A1628', letterSpacing: -0.2 }}>
              {u.c.notifications}
            </div>
            <div style={{ fontSize: 11, color: '#64748B' }}>
              {u.lang === 'tr' ? '3 okunmamış' : '3 unread'}
            </div>
          </div>
          <button onClick={() => toast({ type: 'success', icon: '✓', children: u.lang === 'tr' ? 'Tümü okundu sayıldı' : 'Marked all as read' })} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: u.accent.bg, fontWeight: 700, fontSize: 11, fontFamily: u.font,
          }}>{u.lang === 'tr' ? 'Tümünü okundu say' : 'Mark all read'}</button>
        </div>

        {/* filter chips */}
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          <ThyChip light active={filter==='all'}     onClick={() => setFilter('all')}>{u.lang === 'tr' ? 'Tümü' : 'All'}</ThyChip>
          <ThyChip light active={filter==='flight'}  onClick={() => setFilter('flight')} icon={<Icon name="plane" size={12} />}>{u.lang === 'tr' ? 'Uçuş' : 'Flight'}</ThyChip>
          <ThyChip light active={filter==='miles'}   onClick={() => setFilter('miles')} icon={<Icon name="star" size={12} />}>{u.c.miles}</ThyChip>
          <ThyChip light active={filter==='social'}  onClick={() => setFilter('social')} icon={<Icon name="link" size={12} />}>{u.lang === 'tr' ? 'Sosyal' : 'Social'}</ThyChip>
        </div>
      </div>

      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <SectionLabel style={{ margin: '4px 4px 6px' }}>{u.c.today.toUpperCase()}</SectionLabel>

        <NotifRow u={u} unread
          tint={u.accent}
          icon="plane"
          title={u.lang === 'tr' ? 'TK 1853 için biniş açıldı' : 'Boarding open for TK 1853'}
          body={u.lang === 'tr' ? 'Kapı A12 · 14:25 kalkış' : 'Gate A12 · departs 14:25'}
          time={u.lang === 'tr' ? '12 dk önce' : '12m ago'}
          cta={u.c.boardingPass}
          onCta={() => nav('boarding')}
        />
        <NotifRow u={u} unread
          tint={{ bg: '#C5A059', fg: '#C5A059', glow: 'rgba(197,160,89,0.4)' }}
          icon="star"
          title={u.lang === 'tr' ? '2.840 Mil hesabınıza eklendi' : '2,840 miles added to your account'}
          body={u.lang === 'tr' ? 'TK 1721 uçuşunuzdan kazanım' : 'Earned from flight TK 1721'}
          time={u.lang === 'tr' ? '1 sa önce' : '1h ago'}
        />
        <NotifRow u={u} unread
          tint={{ bg: '#16A34A', fg: '#16A34A', glow: 'rgba(34,197,94,0.4)' }}
          icon="link"
          title={u.lang === 'tr' ? 'Mehmet rotanıza katıldı' : 'Mehmet joined your route'}
          body={u.lang === 'tr' ? 'TRIP-0042 · Roma + Antalya' : 'TRIP-0042 · Rome + Antalya'}
          time={u.lang === 'tr' ? '3 sa önce' : '3h ago'}
        />

        <SectionLabel style={{ margin: '12px 4px 6px' }}>{u.c.earlier.toUpperCase()}</SectionLabel>

        <NotifRow u={u}
          tint={{ bg: '#0053A5', fg: '#0053A5', glow: 'rgba(0,83,165,0.3)' }}
          icon="bell"
          title={u.lang === 'tr' ? 'IST → AMS fiyat alarmı tetiklendi' : 'IST → AMS price alert triggered'}
          body={u.lang === 'tr' ? '4.890 TL · dün 5.640 TL idi' : '4,890 TL · was 5,640 TL yesterday'}
          time={u.lang === 'tr' ? 'Dün' : 'Yesterday'}
        />
        <NotifRow u={u}
          tint={{ bg: '#94A3B8', fg: '#64748B', glow: 'rgba(148,163,184,0.3)' }}
          icon="shield"
          title={u.lang === 'tr' ? 'Pasaport süresi 90 gün' : 'Passport expires in 90 days'}
          body={u.lang === 'tr' ? 'Belgeleriniz seyahat için uygun' : 'Documents valid for travel'}
          time="03 Haz"
        />
      </div>

      <div style={{ marginTop: 'auto' }}>
        <AppTabBar active="home" onChange={(id) => nav(id === 'home' ? 'board' : id === 'search' ? 'search' : id === 'map' ? 'map' : id === 'wallet' ? 'ms' : 'profile')} {...u} />
      </div>
    </div>
  );
}

function NotifRow({ u, tint, icon, title, body, time, unread, cta, onCta }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12,
      padding: '12px 12px', display: 'flex', alignItems: 'flex-start', gap: 12,
      boxShadow: unread ? '0 4px 14px rgba(10,22,40,0.06)' : 'none',
      position: 'relative',
    }}>
      {unread && <span style={{
        position: 'absolute', top: 14, right: 12, width: 7, height: 7,
        borderRadius: '50%', background: u.accent.fg,
      }} />}
      <span style={{
        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
        background: `${tint.bg}1A`, color: tint.fg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name={icon} size={18} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#0A1628', lineHeight: 1.3 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2, lineHeight: 1.4 }}>{body}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
          <span style={{ fontSize: 10, color: '#94A3B8', fontFamily: 'var(--font-mono)', letterSpacing: 0.5 }}>{time}</span>
          {cta && (
            <button onClick={onCta} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: u.accent.bg, fontWeight: 700, fontSize: 11, fontFamily: u.font,
            }}>{cta} →</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────
// 10) PROFILE — light, hero membership, settings list
// ───────────────────────────────────────────────────────────
function ProfileScreen({ t, nav, k }) {
  const u = useThyTweaks(t, { dark: false });
  const topPad = k === 'ios' ? 50 : 16;
  const toast = useToast();
  const [tab, setTab] = React.useState('account');
  return (
    <div className="thy-screen screen-enter" style={{
      minHeight: '100%', background: '#F3F5F8', fontFamily: u.font,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A1628 0%, #0F2244 80%, #1B3868 100%)',
        padding: `${topPad}px 18px 70px`, color: '#fff',
      }}>
        <RouteMapBg opacity={0.10} />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => nav('board')} style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '8px 10px', color: '#fff', cursor: 'pointer',
          }}><Icon name="arrowL" size={14} /></button>
          <button style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 10, padding: '8px 10px', color: '#fff', cursor: 'pointer',
          }}><Icon name="edit" size={14} /></button>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 14, marginTop: 18 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg, ${u.accent.fg}, ${u.accent.deep})`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 28, color: '#fff',
            border: '3px solid rgba(255,255,255,0.15)',
            boxShadow: `0 8px 20px ${u.accent.glow}`,
          }}>AK</div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 19, fontWeight: 800 }}>Aylin Kaya</div>
            <div style={{ fontSize: 11, color: '#B2C0D1', fontFamily: 'var(--font-mono)', marginTop: 2, letterSpacing: 0.5 }}>
              aylin.kaya@example.com
            </div>
            <div style={{ marginTop: 6 }}>
              <StatusBadge kind="gold" dark>✦ ELITE PLUS · 87.420 mi</StatusBadge>
            </div>
          </div>
        </div>
      </div>

      {/* stats strip overlapping hero */}
      <div style={{ padding: '0 16px', marginTop: -50 }}>
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14,
          boxShadow: '0 10px 28px rgba(10,22,40,0.08)',
          display: 'flex', justifyContent: 'space-around', padding: 16,
        }}>
          <ProfileStat label={u.lang === 'tr' ? 'Uçuş' : 'Flights'} v="42" />
          <Divider />
          <ProfileStat label={u.lang === 'tr' ? 'Ülke' : 'Countries'} v="18" />
          <Divider />
          <ProfileStat label={u.lang === 'tr' ? 'Mil' : 'Miles'} v="87.4K" />
        </div>
      </div>

      {/* tabs */}
      <div style={{ padding: '20px 16px 0' }}>
        <ThyTabs light value={tab} onChange={setTab}
          style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid #E2E8F0', background: '#fff' }}
          items={[
            { id: 'account',     label: u.lang === 'tr' ? 'HESAP'      : 'ACCOUNT' },
            { id: 'preferences', label: u.lang === 'tr' ? 'TERCİHLER'  : 'PREFS' },
            { id: 'security',    label: u.lang === 'tr' ? 'GÜVENLİK'   : 'SECURITY' },
          ]} />
      </div>

      {/* settings list */}
      <div style={{ padding: '14px 16px 24px' }}>
        <SectionLabel style={{ marginBottom: 10 }}>{u.lang === 'tr' ? 'HESAP' : 'ACCOUNT'}</SectionLabel>
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden',
        }}>
          <SettingRow icon="cardIcon" tint={u.accent} label={u.c.paymentMethods} sub={u.lang === 'tr' ? '2 kart kayıtlı' : '2 cards on file'} />
          <RowDivider />
          <SettingRow icon="doc" tint={u.accent} label={u.c.documents} sub={u.lang === 'tr' ? 'Pasaport · ehliyet' : 'Passport · license'} />
          <RowDivider />
          <SettingRow icon="bellAlt" tint={u.accent} label={u.lang === 'tr' ? 'Bildirim ayarları' : 'Notifications'} sub={u.lang === 'tr' ? 'Uçuş & fiyat alarmları' : 'Flight & price alerts'} />
        </div>

        <SectionLabel style={{ margin: '18px 0 10px' }}>{u.c.settings.toUpperCase()}</SectionLabel>
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden',
        }}>
          <SettingRow icon="globe" tint={u.accent} label={u.c.language} sub={u.lang === 'tr' ? 'Türkçe (TR)' : 'English (EN)'} />
          <RowDivider />
          <SettingRow icon="moon" tint={u.accent} label={u.lang === 'tr' ? 'Görünüm' : 'Appearance'} sub={u.lang === 'tr' ? 'Otomatik (cihaz)' : 'Auto (device)'} />
          <RowDivider />
          <SettingRow icon="shield" tint={u.accent} label={u.c.privacy} sub={u.lang === 'tr' ? 'KVKK · veri tercihleri' : 'Data preferences'} />
        </div>

        <SectionLabel style={{ margin: '18px 0 10px' }}>{u.lang === 'tr' ? 'SEYAHAT' : 'TRAVEL'}</SectionLabel>
        <div style={{
          background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden',
        }}>
          <button onClick={() => nav('history')} style={settingRowBtn}>
            <SettingRow icon="history" tint={u.accent} label={u.lang === 'tr' ? 'Uçuş geçmişi' : 'Flight history'} sub="42 uçuş · 18 ülke" />
          </button>
          <RowDivider />
          <button onClick={() => nav('lounge')} style={settingRowBtn}>
            <SettingRow icon="coffee" tint={u.accent} label={u.lang === 'tr' ? 'Lounge erişimi' : 'Lounge access'} sub={u.lang === 'tr' ? 'Elite Plus · sınırsız' : 'Elite Plus · unlimited'} />
          </button>
          <RowDivider />
          <button onClick={() => nav('help')} style={settingRowBtn}>
            <SettingRow icon="headset" tint={u.accent} label={u.lang === 'tr' ? 'Yardım merkezi' : 'Help center'} sub={u.lang === 'tr' ? '7/24 destek' : 'Support 24/7'} />
          </button>
        </div>

        <ThyButton variant="secondary" size="lg" fullWidth icon="→"
          onClick={() => toast({ type: 'info', icon: '⚠', children: u.lang === 'tr' ? 'Çıkış yapıldı' : 'Signed out' })}
          style={{ marginTop: 16, color: u.accent.bg, borderColor: u.accent.bg + '55' }}
        >
          {u.c.signOut}
        </ThyButton>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
          v2.4.1 · TRIP-0042
        </div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <AppTabBar active="me" onChange={(id) => nav(id === 'home' ? 'board' : id === 'search' ? 'search' : id === 'map' ? 'map' : id === 'wallet' ? 'ms' : 'profile')} {...u} />
      </div>
    </div>
  );
}

function ProfileStat({ label, v }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 20, color: '#0A1628', letterSpacing: -0.3 }}>{v}</div>
      <div style={{ fontSize: 10, color: '#64748B', fontWeight: 700, letterSpacing: 1, marginTop: 2, textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
}
function Divider() {
  return <div style={{ width: 1, background: '#E2E8F0' }} />;
}
const settingRowBtn = {
  width: '100%', background: 'transparent', border: 'none', padding: 0,
  cursor: 'pointer', textAlign: 'left', display: 'block',
};
function SettingRow({ icon, tint, label, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px', cursor: 'pointer',
    }}>
      <span style={{
        width: 34, height: 34, borderRadius: 9, flexShrink: 0,
        background: `${tint.bg}14`, color: tint.bg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon name={icon} size={16} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: '#0A1628' }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>{sub}</div>}
      </div>
      <Icon name="chevR" size={14} color="#94A3B8" />
    </div>
  );
}

Object.assign(window, {
  MapScreen, CoPilotScreen, MilesScreen, NotificationsScreen, ProfileScreen,
});
