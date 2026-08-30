# Where is Kika? — Phaser + Capacitor

Versión visual renovada del juego de búsqueda de Kika.

## Cambios principales de esta actualización
- Menú principal rehecho con arte del propio juego a pantalla completa.
- Interfaz más cercana al mockup original: paneles marrón/dorado, botones con volumen, HUD compacto y barra inferior.
- Se eliminaron los emojis/stickers de la navegación principal y se sustituyeron por iconos vectoriales dibujados en Phaser.
- Selector de escenarios con preview real de los niveles.
- Pantalla de niveles completamente rediseñada.
- HUD del nivel con pausa, reloj y nivel en cápsulas.
- Botones de pistas rediseñados como controles circulares de juego.
- Tienda y récords actualizados al mismo lenguaje visual.
- Los niveles siguen usando ilustraciones completas WebP, no composiciones de stickers.

## Ejecutar
```bash
npm install
npm run dev
```

## Vercel
Vercel detecta Vite automáticamente. Si pide configuración:
- Build Command: `npm run build`
- Output Directory: `dist`

## Capacitor
```bash
npm run build
npx cap add ios
npx cap add android
npm run cap:sync
```
