import React from 'react';

/* THY Route — line icons (Lucide-style, 24×24, stroke 2.25, round caps) */
const I = ({ size = 20, stroke = 2.25, children, style = {} }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>{children}</svg>
);

const Icon = {
  plane:    (p) => <I {...p}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></I>,
  planeTake:(p) => <I {...p}><path d="M3 21h18"/><path d="M5 17 9.5 5l1.2-.4c.4-.1.8.1 1 .4l3.3 6.5 4.6 1.7c.7.3 1.1 1 .9 1.7l-.3 1.1c-.2.7-1 1.1-1.7.9z"/></I>,
  arrowRight:(p)=> <I {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></I>,
  arrowLeft:(p) => <I {...p}><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></I>,
  swap:     (p) => <I {...p}><path d="M17 3 21 7 17 11M21 7H9"/><path d="M7 21 3 17 7 13M3 17H15"/></I>,
  search:   (p) => <I {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></I>,
  filter:   (p) => <I {...p}><path d="M3 5h18M6 12h12M10 19h4"/></I>,
  star:     (p) => <I {...p}><path d="m12 3 2.6 5.6 6.1.6-4.5 4.2 1.3 6L12 16.8 6.5 19.4l1.3-6L3.3 9.2l6.1-.6z"/></I>,
  pin:      (p) => <I {...p}><path d="M12 22s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/></I>,
  map:      (p) => <I {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/></I>,
  user:     (p) => <I {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></I>,
  users:    (p) => <I {...p}><circle cx="9" cy="8" r="4"/><path d="M2 21a7 7 0 0 1 14 0"/><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-6-7"/></I>,
  calendar: (p) => <I {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></I>,
  globe:    (p) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></I>,
  shield:   (p) => <I {...p}><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6z"/></I>,
  check:    (p) => <I {...p}><path d="m5 12 5 5L20 7"/></I>,
  x:        (p) => <I {...p}><path d="M6 6 18 18M18 6 6 18"/></I>,
  plus:     (p) => <I {...p}><path d="M12 5v14M5 12h14"/></I>,
  minus:    (p) => <I {...p}><path d="M5 12h14"/></I>,
  trash:    (p) => <I {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></I>,
  edit:     (p) => <I {...p}><path d="M14 4l6 6L9 21H3v-6z"/></I>,
  share:    (p) => <I {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.6 6.8-4.2M8.6 13.4l6.8 4.2"/></I>,
  link:     (p) => <I {...p}><path d="M10 13a5 5 0 0 0 7.5 0l3-3a5 5 0 1 0-7-7L12 4.5"/><path d="M14 11a5 5 0 0 0-7.5 0l-3 3a5 5 0 1 0 7 7L12 19.5"/></I>,
  bell:     (p) => <I {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9z"/><path d="M10 21a2 2 0 0 0 4 0"/></I>,
  cart:     (p) => <I {...p}><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l3 13h12l2-8H7"/></I>,
  utensils: (p) => <I {...p}><path d="M5 2v8a3 3 0 0 0 6 0V2M8 2v20"/><path d="M16 2v8h3v12"/></I>,
  museum:   (p) => <I {...p}><path d="M3 22h18M5 22V11M19 22V11M9 22V14M15 22V14M3 11h18L12 4z"/></I>,
  bed:      (p) => <I {...p}><path d="M2 18V8M22 18v-4a4 4 0 0 0-4-4H2"/><circle cx="6.5" cy="13.5" r="2"/><path d="M2 18h20"/></I>,
  shop:     (p) => <I {...p}><path d="M3 9h18l-1 11H4z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></I>,
  mountain: (p) => <I {...p}><path d="m3 20 6-10 4 6 2-3 6 7z"/></I>,
  clock:    (p) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></I>,
  download: (p) => <I {...p}><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/></I>,
  mail:     (p) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></I>,
  card:     (p) => <I {...p}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 11h18M7 16h3"/></I>,
  menu:     (p) => <I {...p}><path d="M4 6h16M4 12h16M4 18h16"/></I>,
  chevDown: (p) => <I {...p}><path d="m6 9 6 6 6-6"/></I>,
  chevRight:(p) => <I {...p}><path d="m9 6 6 6-6 6"/></I>,
  drag:     (p) => <I {...p}><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></I>,
  walk:     (p) => <I {...p}><circle cx="13" cy="4" r="2"/><path d="m9 22 3-8-3-2v-4l5 2 3 3"/><path d="m14 11 4 2 1 6"/></I>,
};

export { Icon };
