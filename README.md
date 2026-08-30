# Where is Kika? — Phaser + Capacitor

Primera versión jugable del concepto del mockup.

## Incluye
- Menú principal estilo mockup
- Selector de 30 niveles
- Juego de buscar a Kika entre muchos objetos
- Dificultad progresiva
- Temporizador
- 3 ayudas: lupa, iluminación y +15 segundos
- Monedas, tienda, estrellas y récords
- Progreso guardado en localStorage
- Configuración base de Capacitor para iOS/Android

## Ejecutar en navegador
```bash
npm install
npm run dev
```

## Compilar web
```bash
npm run build
```

## Preparar iOS y Android por primera vez
```bash
npx cap add ios
npx cap add android
npm run cap:sync
```

Después:
```bash
npm run cap:ios
npm run cap:android
```

## Próxima fase recomendada
Reemplazar los objetos emoji por assets ilustrados propios y usar una imagen/ilustración definitiva de Kika, además de añadir sonidos, animaciones, más escenarios y monetización opcional.
