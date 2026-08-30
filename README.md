# Where is Kika? — Phaser + Capacitor v6

Versión visual renovada del juego móvil de búsqueda de Kika.

## Cambios v6
- Menú rediseñado para usar la ilustración completa como protagonista, sin sticker flotante de Kika.
- Pantallas de escenarios y niveles más cercanas al mockup original.
- HUD del juego rehecho con barra superior y dock inferior más integrados al arte.
- Pantalla de victoria usa un retrato recortado desde el arte ilustrado, no el SVG tipo sticker anterior.
- Botones, paneles, sombras, bordes y navegación rehechos con un lenguaje visual más premium.
- Mantiene Phaser + Vite + Capacitor y guardado local.

## Probar
```bash
npm install
npm run dev
```

## Build web
```bash
npm run build
```

## Capacitor
```bash
npm run cap:sync
npx cap add ios
npx cap add android
```

## Vercel
Vercel puede detectar Vite automáticamente. El directorio de salida es `dist`.
