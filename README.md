# Where is Kika? — Phaser + Capacitor

Hidden-object mobile game prototype built with Phaser 3, Vite and Capacitor.

## New illustrated-level engine
Levels are now rendered as a single complete illustration (`public/assets/levels/*.webp`) instead of many independent sticker sprites. Kika's location is stored as normalized coordinates in `src/levels.js`, so the hit area adapts to any phone size.

The project includes six illustrated Sala compositions as the visual prototype. New finished levels only require:
1. Add a WebP illustration to `public/assets/levels/`.
2. Add its image path and Kika coordinates in `src/levels.js`.

## Run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

## Capacitor
```bash
npx cap add ios
npx cap add android
npm run cap:sync
```
