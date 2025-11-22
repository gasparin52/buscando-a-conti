# Buscando a Conti

Minijuego tipo "Buscando a Wally" hecho con Vue 3 + Vite.

## Cómo jugar

Haz clic en la escena para encontrar al personaje oculto. Si aciertas, verás un highlight y un mensaje de éxito. Si fallas, verás un mensaje de pista.

## Cómo agregar o modificar niveles

Edita el array `scenes` en `App.vue`:
```js
const scenes = [
  {
    image: '/src/assets/escena1.jpg',
    target: { left: 62, top: 38, width: 6, height: 10 },
  },
  // ...más escenas
];
```
- `left`, `top`, `width`, `height` son porcentajes relativos a la imagen.
- Ajusta estos valores para que el área coincida con el personaje.

## Cómo subir imágenes

Coloca tus imágenes en `src/assets` y referencia la ruta en el array de escenas.

## Hotspot visible solo en desarrollo

La prop `showHotspot` en `<WhereIsWaldoGame>` permite mostrar/ocultar el área objetivo.

## Instalación y ejecución

1. Instala dependencias:
   ```
   npm install
   ```
2. Ejecuta en modo desarrollo:
   ```
   npm run dev
   ```

## Créditos

Hecho por gasparin52.
