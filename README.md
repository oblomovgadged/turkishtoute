# Mobile v1 — değişiklik paketi

## Bu klasörde 5 dosya var. Hepsini repo köküne kopyalayın:

| Dosya | Yeni mi / Var mı | Ne yapıyor |
|---|---|---|
| `src/styles/mobile.css` | **YENİ** | Tüm mobil responsive media query'leri |
| `src/MobileNav.jsx`     | **YENİ** | Alt tab bar (Ana sayfa · Keşfet · Rota · M&S · Hesabım) |
| `src/main.jsx`          | Üzerine yaz | `mobile.css`'i import eder |
| `src/App.jsx`           | Üzerine yaz | `<MobileNav>`'i render eder |
| `index.html`            | Üzerine yaz | viewport-fit, theme-color, apple-mobile-web-app meta etiketleri |

## Kurulum

```bash
cd thy-route
# bu 5 dosyayı kopyaladıktan sonra:
npm run dev
```

Sonra:
- Tarayıcı penceresini telefon boyutuna daraltın (≤ 768px)
- VEYA cep telefonundan Vercel'deki canlı linki açın
- Alt tab bar otomatik belirir
- Üst nav otomatik gizlenir
- Tüm gridler tek sütuna düşer

## Sonra ne yapacağız

Şu an "kaba" mobil katman. Bir sonraki adımda:
- Home arama formu mobile-first hâle gelecek
- RouteBuilder map full-screen + bottom sheet
- Booking sayfası alt-üst dizim
- Splash + onboarding (mobile prototipinden)

Sen test ettikten sonra söyle, hangi sayfa öncelikli ondan başlayalım.