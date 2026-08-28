# Portfolio de Matías Oviedo - proyecto Next.js

Versión en Next.js (App Router + TypeScript) del portfolio, migrada desde el
prototipo estático en HTML. Pensada para exportarse como sitio 100% estático
y hostearse en AWS (S3 + CloudFront), con el chat de Tute como un backend
serverless aparte (API Gateway + Lambda). Ver `aws-roadmap.md` para el paso a
paso completo de la infraestructura.

## Estructura

```
app/
  layout.tsx        // layout raíz, metadata del sitio
  page.tsx           // arma la página con <HomeClient />
  globals.css         // todos los estilos (tokens de color, tipografía, etc.)
components/
  HomeClient.tsx      // compone todas las secciones + maneja la ref del chat
  Header.tsx           // nav + botón de tema
  ThemeToggle.tsx       // toggle claro/oscuro (persiste en localStorage)
  Hero.tsx
  About.tsx
  AskTute.tsx           // sección "Preguntale a Tute" con las 3 tarjetas
  Projects.tsx
  Skills.tsx
  Footer.tsx
  TuteWidget.tsx         // el widget flotante + panel de chat completo
lib/
  tuteImages.ts           // mapea cada estado de Tute a su .webp en /public
public/tute/                // las imágenes de Tute (reposo / hablando / pensando)
aws/lambda/tute-handler/     // el Lambda que va a responder el chat en AWS
```

## Cómo correrlo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000. El chat de Tute funciona en **modo demo** por
default (respuestas simuladas, sin pegarle a ninguna API) - así podés seguir
laburando el resto del sitio sin depender de que el backend ya esté listo.

## Dónde completar cosas (buscá "ACA REEMPLAZAR")

Dejé comentarios `ACA REEMPLAZAR` en todo el código en los lugares donde vas
a necesitar poner info real. Los principales:

- **`components/About.tsx`** - tu foto real en vez del placeholder.
- **`components/Projects.tsx`** - el link real a tu repo de GitHub.
- **`components/Footer.tsx`** - tu mail, LinkedIn y GitHub reales.
- **`.env.local.example`** - la URL del endpoint de API Gateway, una vez que
  esté desplegado (copiá este archivo a `.env.local` y completalo - ese
  archivo no se sube al repo).
- **`components/TuteWidget.tsx`** - cómo se lee la respuesta que devuelva tu
  Lambda (`data.reply`, ajustalo si tu backend devuelve otro formato).
- **`aws/lambda/tute-handler/index.mjs`** - acá hay varios: el system prompt
  real de Tute, qué proveedor de IA usar (Bedrock o Anthropic), la lógica de
  rate limiting con DynamoDB, y el dominio real para CORS.

## Build para producción (exportación estática)

```bash
npm run build
```

Esto genera la carpeta `/out` con el sitio 100% estático, lista para subir a
un bucket de S3 (ver `aws-roadmap.md`).

## Sobre el chat de Tute

El widget (`components/TuteWidget.tsx`) es un componente autocontenido:
maneja sus propios mensajes, el estado del avatar (`idle` / `thinking` /
`talking`) y el input. Se abre desde cualquier lado del sitio a través de un
`ref` (`TuteWidgetHandle`), así que si en algún momento agregás otro botón
que también deba abrir el chat, solo necesitás llamar a `tuteRef.current?.open()`.
