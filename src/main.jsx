import React from 'react';
import ReactDOM from 'react-dom/client';

// The design-system bundle is plain compiled JS that expects window.React.
// We expose React globally THEN load the bundle THEN mount the app.
window.React = React;
window.ReactDOM = ReactDOM;

async function bootstrap() {
  // 1) Load DS bundle (registers window.THYRouteDesignSystem_cb84b4)
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = '/_ds/_ds_bundle.js';
    s.onload = resolve;
    s.onerror = () => reject(new Error('Design system bundle failed to load'));
    document.head.appendChild(s);
  });

  // 2) Now safe to import the app
  const { default: App } = await import('./App.jsx');

  // 3) Render
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}

bootstrap().catch((err) => {
  console.error(err);
  document.body.innerHTML =
    '<div style="font-family:sans-serif;padding:40px;color:#B7312C">' +
    '<h1>Yükleme Hatası</h1><pre>' + err.message + '</pre></div>';
});
