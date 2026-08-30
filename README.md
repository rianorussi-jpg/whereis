# Where is Kika? — Phaser + Capacitor

Versión visual mejorada inspirada en el mockup: interfaz colorida, estilo casual mobile, escenarios, selector de niveles, tienda y juego de buscar a Kika.

## Probar localmente
```bash
npm install
npm run dev
```

## Subir a GitHub + Vercel
1. Sube **todo el contenido de esta carpeta** al repositorio.
2. En Vercel importa el repositorio.
3. Framework Preset: **Vite** (normalmente se detecta solo).
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Deploy.

## Capacitor
```bash
npm run build
npx cap add ios
npx cap add android
npm run cap:sync
```

## Incluye
- Menú principal estilo mockup
- Kika ilustrada como asset SVG
- Pantalla de escenarios
- 30 niveles
- Tablero con muchos stickers/objetos
- Dificultad progresiva
- Temporizador y 3 ayudas
- Pantalla de victoria con 1–3 estrellas
- Monedas, tienda y récords
- Progreso guardado en localStorage
- Base preparada para iOS/Android con Capacitor
