# Easy Podcast — Instrucciones para Claude Code / Copilot

## Stack
- React 18 + Vite + Capacitor (Android)
- Todo el código de la app está en `src/App.jsx`
- Build: `npx vite build` → genera `www/` → `npx cap sync` → compilar con Gradle

## Convenciones
- Estilos inline con objetos JS (no CSS externo, no Tailwind)
- Iconos como componentes SVG inline
- Estado global con `useState` en el componente raíz `App`
- Persistencia con `localStorage`

## Lo que NO está implementado aún
- Audio real (el reproductor simula tiempo con un timer)
- API de podcasts (datos hardcodeados)
- Notificaciones / Media Session

## Dispositivo de prueba
- Pixel 8a conectado por USB
- `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`
