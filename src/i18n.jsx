import React from 'react';

/* THY Route — i18n strings + language + currency context */
const STR = {
  /* ---------- Global / nav ---------- */
  'nav.flights':        { tr: 'Uçuş Bileti',        en: 'Flights' },
  'nav.explore':        { tr: 'Keşfet',             en: 'Explore' },
  'nav.route':          { tr: 'Seyahat Rotası',     en: 'Travel Route' },
  'nav.miles':          { tr: 'Miles&Smiles',       en: 'Miles&Smiles' },
  'nav.help':           { tr: 'Yardım',             en: 'Help' },
  'nav.login':          { tr: 'Giriş Yap',          en: 'Sign in' },
  'nav.account':        { tr: 'Hesabım',            en: 'My account' },

  /* ---------- Home / hero ---------- */
  'home.eyebrow':       { tr: 'YOLCULUĞUN HER METREKARESİ', en: 'EVERY METRE OF THE JOURNEY' },
  'home.headline':      { tr: 'Yalnızca uçmuyorsunuz — şehri de sizinle keşfediyoruz.', en: 'You don\'t just fly — we explore the city with you.' },
  'home.subhead':       { tr: 'Biletinizi alın, varış şehrinde sizin için bir rota hazırlayalım. Beğenmediğinizi çıkarın, yerinize bir yer ekleyin, bir dostunuzla birlikte düzenleyin.', en: 'Buy your ticket and we\'ll prepare a route in your arrival city. Drop what you don\'t like, add your own, edit together with a friend.' },
  'home.howit':         { tr: 'NASIL ÇALIŞIR',       en: 'HOW IT WORKS' },
  'home.step1.title':   { tr: 'Uçuşunuzu seçin',    en: 'Pick your flight' },
  'home.step1.desc':    { tr: 'Klasik THY arama deneyimi — fareler, aktarmalar, fiyatlar yan yana.', en: 'Classic THY search — fares, layovers and prices side-by-side.' },
  'home.step2.title':   { tr: 'Otomatik rota oluşur', en: 'Your route appears' },
  'home.step2.desc':    { tr: 'Varış şehri için günlük plan, AI ile hazırlanır — yürüme mesafeleri, açılış saatleri dahil.', en: 'A day-by-day plan for your destination — walking distances and opening hours included.' },
  'home.step3.title':   { tr: 'Yardımcı pilotunuzu çağırın', en: 'Invite your co-pilot' },
  'home.step3.desc':    { tr: 'Bir bağlantı paylaşın; eşiniz, ailen veya dostunuz aynı haritayı sizinle düzenler.', en: 'Share one link — your partner, family or friend edits the same map with you.' },
  'home.step4.title':   { tr: 'Yerinde mil kazanın', en: 'Earn miles on the ground' },
  'home.step4.desc':    { tr: 'Rotanıza anlaşmalı yerleri ekleyin: konaklama, yemek, müze. Mil otomatik düşer.', en: 'Add partner stops to your route — hotels, restaurants, museums. Miles credit automatically.' },
  'home.popular':       { tr: 'POPÜLER ROTALAR',    en: 'POPULAR ROUTES' },
  'home.partners':      { tr: 'MİLES&SMILES PARTNERLERİ', en: 'MILES&SMILES PARTNERS' },
  'home.partners.sub':  { tr: 'Şehirde yapacağınız her şey — uçuş kadar değerlidir.', en: 'Everything you do on the ground — as rewarding as the flight itself.' },
  'home.cta.search':    { tr: 'Uçuş ara →',         en: 'Search flights →' },
  'home.cta.explore':   { tr: 'Keşfet',             en: 'Explore' },

  /* ---------- Search form ---------- */
  'search.round':       { tr: 'Gidiş - Dönüş',      en: 'Round trip' },
  'search.oneway':      { tr: 'Tek yön',            en: 'One way' },
  'search.stop':        { tr: 'İstanbul\'da Stopover', en: 'Istanbul Stopover' },
  'search.multi':       { tr: 'Çoklu uçuş',         en: 'Multi-city' },
  'search.miles':       { tr: 'Ödül bilet — Millerinizle bilet alın', en: 'Award ticket — pay with miles' },
  'search.from':        { tr: 'Nereden',            en: 'From' },
  'search.from.sub':    { tr: 'Tüm havalimanları',  en: 'All airports' },
  'search.to':          { tr: 'Nereye',             en: 'To' },
  'search.to.sub':      { tr: 'Gideceğiniz şehir',  en: 'Your destination' },
  'search.date':        { tr: 'Tarih',              en: 'Dates' },
  'search.passengers':  { tr: 'Yolcu / Kabin Sınıfı', en: 'Passengers / Cabin' },
  'search.cta':         { tr: 'Uçuş ara →',         en: 'Search flights →' },
  'search.airports':    { tr: '🌐 Tüm uçuş noktalarını gör', en: '🌐 All destinations' },
  'search.recent':      { tr: '🔍 Önceki aramalarım', en: '🔍 Recent searches' },
  'search.kvkk':        { tr: '🛡️ KVKK & Gizlilik Politikası', en: '🛡️ Privacy Policy' },

  /* ---------- Tracker (3 steps now) ---------- */
  'res.tracker1':       { tr: 'Gidiş Uçuşu',        en: 'Outbound' },
  'res.tracker2':       { tr: 'Dönüş Uçuşu',        en: 'Return' },
  'res.tracker3':       { tr: 'Rotanı oluştur',     en: 'Build route' },

  /* ---------- Results ---------- */
  'res.modify':         { tr: 'Aramayı düzenle →',  en: 'Modify search →' },
  'res.title.out':      { tr: 'Gidiş — 13 Haziran Cumartesi', en: 'Outbound — Saturday 13 June' },
  'res.title.ret':      { tr: 'Dönüş — 28 Haziran Cumartesi', en: 'Return — Saturday 28 June' },
  'res.filters':        { tr: 'FİLTRELER',          en: 'FILTERS' },
  'res.sort':           { tr: 'Sıralama',           en: 'Sort by' },
  'res.sort.cheap':     { tr: 'En ucuz',            en: 'Cheapest' },
  'res.sort.fast':      { tr: 'En hızlı',           en: 'Fastest' },
  'res.sort.early':     { tr: 'En erken',           en: 'Earliest' },
  'res.stops':          { tr: 'AKTARMA',            en: 'STOPS' },
  'res.direct':         { tr: 'Aktarmasız',         en: 'Direct only' },
  'res.times':          { tr: 'KALKIŞ SAATİ',       en: 'DEPARTURE' },
  'res.morning':        { tr: 'Sabah (06–12)',      en: 'Morning (06–12)' },
  'res.noon':           { tr: 'Öğlen (12–18)',      en: 'Afternoon (12–18)' },
  'res.evening':        { tr: 'Akşam (18–24)',      en: 'Evening (18–24)' },
  'res.airlines':       { tr: 'HAVAYOLU',           en: 'AIRLINES' },
  'res.price':          { tr: 'FİYAT ARALIĞI',      en: 'PRICE RANGE' },
  'res.economy':        { tr: 'Economy',            en: 'Economy' },
  'res.business':       { tr: 'Business',           en: 'Business' },
  'res.perpax':         { tr: 'Yolcu başına',       en: 'Per passenger' },
  'res.last':           { tr: 'Bu fiyata son {n} koltuk', en: 'Last {n} seats at this price' },
  'res.full':           { tr: 'Dolu',               en: 'Sold out' },
  'res.recommended':    { tr: 'Önerilen',           en: 'Recommended' },
  'res.pkg':            { tr: 'Paket detayları',    en: 'Package details' },
  'res.pkg.cabin':      { tr: 'Kabin bagajı',       en: 'Cabin baggage' },
  'res.pkg.bag':        { tr: 'Bagaj hakkı',        en: 'Checked baggage' },
  'res.pkg.seat':       { tr: 'Koltuk seçimi',      en: 'Seat selection' },
  'res.pkg.change':     { tr: 'Ücretsiz değişiklik',en: 'Free change' },
  'res.pkg.refund':     { tr: 'Kesintisiz iade',    en: 'Full refund' },
  'res.pkg.miles':      { tr: 'Mil',                en: 'Miles' },
  'res.pkg.fast':       { tr: 'Fast track',         en: 'Fast track' },
  'res.pkg.lounge':     { tr: 'Business Lounge',    en: 'Business Lounge' },
  'res.continue':       { tr: 'Bu paketle devam et →', en: 'Continue with this package →' },
  'res.return.skip':    { tr: 'Dönüş seçimi (tek yön — atlandı)', en: 'Return (one-way — skipped)' },
  'res.buyonthy':       { tr: 'Bu uçuşu thy.com\'da satın al', en: 'Buy on thy.com' },
  'res.proceedroute':   { tr: 'Rotamı oluştur →',    en: 'Build my route →' },
  'res.selected':       { tr: 'Seçildi',             en: 'Selected' },

  /* ---------- Route Builder ---------- */
  'rb.eyebrow':         { tr: 'YERDEKİ YOLCULUK',   en: 'JOURNEY ON THE GROUND' },
  'rb.title':           { tr: 'Roma Rotanız',        en: 'Your Roma route' },
  'rb.summary':         { tr: 'AI ile hazırlandı — istediğiniz gibi düzenleyin.', en: 'Hand-crafted by AI — edit it any way you like.' },
  'rb.tab.route':       { tr: 'Rotam',               en: 'My route' },
  'rb.tab.places':      { tr: 'Yerler',              en: 'Places' },
  'rb.tab.miles':       { tr: 'Miles&Smiles',        en: 'Miles&Smiles' },
  'rb.tab.copilot':     { tr: 'Yardımcı Pilot',      en: 'Co-pilot' },
  'rb.day':             { tr: 'Gün',                 en: 'Day' },
  'rb.totalwalk':       { tr: 'Toplam yürüyüş',      en: 'Total walking' },
  'rb.estmiles':        { tr: 'Tahmini mil',         en: 'Est. miles' },
  'rb.places.all':      { tr: 'Tümü',                en: 'All' },
  'rb.places.rest':     { tr: 'Restoran',            en: 'Restaurants' },
  'rb.places.museum':   { tr: 'Müze',                en: 'Museums' },
  'rb.places.hotel':    { tr: 'Otel',                en: 'Hotels' },
  'rb.places.shop':     { tr: 'Alışveriş',           en: 'Shopping' },
  'rb.places.view':     { tr: 'Manzara',             en: 'Scenic' },
  'rb.places.add':      { tr: 'Rotaya ekle',         en: 'Add to route' },
  'rb.places.added':    { tr: '✓ Rotada',            en: '✓ In route' },
  'rb.share':           { tr: 'Yardımcı pilot çağır', en: 'Invite co-pilot' },
  'rb.share.btn':       { tr: 'Paylaş',              en: 'Share' },
  'rb.share.pdf':       { tr: 'PDF olarak indir',    en: 'Download as PDF' },
  'rb.share.png':       { tr: 'Görsel olarak indir', en: 'Download as image' },
  'rb.share.copy':      { tr: 'Bağlantıyı kopyala',  en: 'Copy link' },
  'rb.share.copied':    { tr: '✓ Kopyalandı',        en: '✓ Copied' },
  'rb.share.help':      { tr: 'Bağlantıyı paylaşın — birlikte düzenleyin.', en: 'Share the link — edit together.' },
  'rb.miles.title':     { tr: 'Rotanızdaki mil potansiyeli', en: 'Miles on your route' },
  'rb.miles.partner':   { tr: 'Anlaşmalı yer',       en: 'Partner' },
  'rb.miles.add':       { tr: 'Rotaya ekle',         en: 'Add to route' },
  'rb.save':            { tr: 'Rotayı kaydet',       en: 'Save route' },
  'rb.report':          { tr: 'Rapor olarak gönder', en: 'Send as report' },
  'rb.print':           { tr: 'Yazdır',              en: 'Print' },
  'rb.routes.title':    { tr: 'Rotalarım',           en: 'My routes' },
  'rb.routes.new':      { tr: 'Yeni rota',           en: 'New route' },
  'rb.routes.rename':   { tr: 'Yeniden adlandır',    en: 'Rename' },
  'rb.routes.delete':   { tr: 'Sil',                 en: 'Delete' },

  /* ---------- M&S categories ---------- */
  'ms.cat.hotel':       { tr: 'Konaklama / Otel',           en: 'Accommodation' },
  'ms.cat.rental':      { tr: 'Araç Kiralama',              en: 'Car Rental' },
  'ms.cat.vip':         { tr: 'Havalimanı VIP Taşımacılık', en: 'Airport VIP Transfer' },
  'ms.cat.tours':       { tr: 'Acenta ve Gezi Turları',     en: 'Agencies & Tours' },
  'ms.cat.finance':     { tr: 'Finans ve Bankacılık',       en: 'Finance & Banking' },
  'ms.cat.rest':        { tr: 'Yemek',                       en: 'Dining' },

  /* ---------- Account ---------- */
  'ac.greet':           { tr: 'Hoş geldiniz',        en: 'Welcome back' },
  'ac.upcoming':        { tr: 'Yaklaşan yolculuklar', en: 'Upcoming trips' },
  'ac.past':            { tr: 'Geçmiş yolculuklar',  en: 'Past trips' },
  'ac.savedroutes':     { tr: 'Kayıtlı Rotalarım',   en: 'Saved Routes' },
  'ac.miles.balance':   { tr: 'Miles&Smiles bakiyesi', en: 'Miles&Smiles balance' },
  'ac.miles.tier':      { tr: 'Elite Plus',          en: 'Elite Plus' },
  'ac.view.route':      { tr: 'Rotaya git →',        en: 'Open route →' },
  'ac.book.again':      { tr: 'Tekrar uç',           en: 'Book again' },
  'ac.download.pdf':    { tr: 'PDF indir',           en: 'Download PDF' },

  /* ---------- Explore ---------- */
  'ex.title':           { tr: 'Nereye uçacaksınız?', en: 'Where to next?' },
  'ex.sub':             { tr: 'Her şehir, sizden önce bir kez planlandı.', en: 'Every city — pre-planned, just for you.' },

  /* ---------- Auth ---------- */
  'au.welcome':         { tr: 'Yolculuğa giriş',     en: 'Welcome aboard' },
  'au.sub':             { tr: 'Miles&Smiles hesabınızla giriş yapın.', en: 'Sign in with Miles&Smiles.' },
  'au.member':          { tr: 'Miles&Smiles No / E-posta', en: 'Miles&Smiles No. / Email' },
  'au.password':        { tr: 'Şifre',               en: 'Password' },
  'au.signin':          { tr: 'Giriş yap →',         en: 'Sign in →' },
  'au.signup':          { tr: 'Hesap oluştur',       en: 'Create account' },
  'au.forgot':          { tr: 'Şifremi unuttum',     en: 'Forgot password' },

  /* ---------- Footer ---------- */
  'ft.product':         { tr: 'ÜRÜN',                en: 'PRODUCT' },
  'ft.company':         { tr: 'ŞİRKET',              en: 'COMPANY' },
  'ft.help':            { tr: 'DESTEK',              en: 'SUPPORT' },
  'ft.legal':           { tr: 'YASAL',               en: 'LEGAL' },
  'ft.copy':            { tr: '© 2026 THY Route. Türk Hava Yolları A.O. iştiraki.', en: '© 2026 THY Route. A Turkish Airlines venture.' },
};

/* ----- Currency: TRY / USD / EUR. Static rates so prototype is deterministic. */
const CURRENCIES = {
  TRY: { symbol: '₺', code: 'TRY', label: 'TRY · Türk Lirası',  rateFromTRY: 1.0 },
  USD: { symbol: '$', code: 'USD', label: 'USD · US Dollar',    rateFromTRY: 1 / 38.5 },
  EUR: { symbol: '€', code: 'EUR', label: 'EUR · Euro',         rateFromTRY: 1 / 41.2 },
};

/** Parse a TRY price string like "6.480" or "15.111" → number */
function parseTRY(str) {
  if (typeof str === 'number') return str;
  if (!str || str === '—') return null;
  return parseInt(String(str).replace(/[.\s]/g, ''), 10) || null;
}

const LangContext     = React.createContext({ lang: 'tr', setLang: () => {} });
const CurrencyContext = React.createContext({ currency: 'TRY', setCurrency: () => {} });

function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => localStorage.getItem('thyroute_lang') || 'tr');
  const [currency, setCurrency] = React.useState(() => localStorage.getItem('thyroute_cur') || 'TRY');
  React.useEffect(() => { localStorage.setItem('thyroute_lang', lang); document.documentElement.lang = lang; }, [lang]);
  React.useEffect(() => { localStorage.setItem('thyroute_cur', currency); }, [currency]);
  const lValue = React.useMemo(() => ({ lang, setLang }), [lang]);
  const cValue = React.useMemo(() => ({ currency, setCurrency }), [currency]);
  return (
    <LangContext.Provider value={lValue}>
      <CurrencyContext.Provider value={cValue}>
        {children}
      </CurrencyContext.Provider>
    </LangContext.Provider>
  );
}

function useLang() { return React.useContext(LangContext); }
function useCurrency() { return React.useContext(CurrencyContext); }

function useT() {
  const { lang } = useLang();
  return (key, vars) => {
    let str = (STR[key] && STR[key][lang]) || key;
    if (vars) Object.keys(vars).forEach((k) => { str = str.replace('{' + k + '}', vars[k]); });
    return str;
  };
}

/** Returns a `format(tryAmount)` function that converts + formats in active currency. */
function useMoney() {
  const { currency } = useCurrency();
  const { lang } = useLang();
  const c = CURRENCIES[currency] || CURRENCIES.TRY;
  return (tryAmount) => {
    const n = parseTRY(tryAmount);
    if (n == null) return '—';
    const converted = n * c.rateFromTRY;
    const formatted = new Intl.NumberFormat(lang === 'tr' ? 'tr-TR' : 'en-US', {
      maximumFractionDigits: currency === 'TRY' ? 0 : 0,
      minimumFractionDigits: 0,
    }).format(Math.round(converted));
    return currency === 'TRY' ? `${formatted} ${c.symbol}` : `${c.symbol}${formatted}`;
  };
}

export { LangProvider, useLang, useCurrency, useT, useMoney, STR, CURRENCIES };
