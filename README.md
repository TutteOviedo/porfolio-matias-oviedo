# Portfolio de Matías Oviedo - proyecto Next.js

Portfolio en Next.js (App Router + TypeScript), migrado desde un prototipo
estático en HTML. Se exporta como sitio 100% estático (`output: 'export'` ->
carpeta `/out`) y se hostea en AWS (S3 + CloudFront + Route53). El chat de
"Tute" es un backend serverless aparte (API Gateway + Lambda); ver
`aws-roadmap.md` para el detalle de infraestructura.

## Páginas

El sitio tiene tres páginas más la 404:

- **`/`** - el portfolio. Hero, "Sobre mí", "Conocé a Tute", Proyectos, Skills
  y Contacto, todo en una sola página con anclas internas.
- **`/curriculum`** - CV interactivo (el "Cloud Resume Challenge"). Tiene su
  propio sistema tipográfico (Playfair Display + IBM Plex, cargadas con
  `next/font/google`; Bootstrap y Font Awesome vienen de CDN, solo en esta
  ruta), pero comparte el sistema de tema claro/oscuro con el resto del sitio
  (mismo toggle, mismos tokens de color). Incluye un contador de visitas real
  que le pega a la API del Cloud Resume Challenge y un botón de descarga del CV
  en PDF.
- **`/evals`** - panel de testing de Tute: qué casos de prueba le corro y
  cuáles pasan. No está en el nav; se llega desde la tarjeta "Cómo está hecho
  Tute" de la sección "Conocé a Tute", o desde los links que Tute deja en el
  chat. Hoy los casos son data de ejemplo, hardcodeada.
- **404** (`app/not-found.tsx`) - página propia, sin Header/Footer y sin el
  widget de Tute.

## Cómo correrlo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000. El chat de Tute funciona en **modo demo** por
default (respuestas simuladas, sin pegarle a ninguna API), así que se puede
laburar todo el front sin depender del backend.

## Internacionalización (ES / EN)

El sitio arranca en español y tiene un selector ES/EN en el nav (con banderas
en SVG, no emojis). La preferencia se guarda en `localStorage` y se aplica sin
recargar la página.

- **Diccionario:** `lib/i18n/dictionary.ts`. Un objeto `dictionary` organizado
  por sección (`nav`, `hero`, `about`, `askTute`, `projects`, `skills`,
  `footer`). Cada hoja es un `Entry`: `{ es: string; en?: string }`.
- **Provider:** `components/LanguageProvider.tsx` envuelve la app en el layout
  raíz y expone el hook `useLanguage()` -> `{ lang, setLanguage, t }`.
- **En los componentes:** `const { t } = useLanguage()` y después
  `t(dictionary.hero.titleLine1)`.
- **Fallback:** `translate()` devuelve el `en` solo si existe y no está vacío;
  si no, devuelve el `es`. Una clave sin traducir no rompe nada.

### `/evals` y `/curriculum` no están traducidas

Su texto vive hardcodeado en español en los componentes y no pasa por el
diccionario. `/evals` en particular va a cambiar de contenido, así que se deja
así por ahora: en modo EN se ve en español (por el fallback), y cuando el
contenido se estabilice se van moviendo las claves al diccionario de a poco
(cada clave sin `en` sigue cayendo al `es`).

### Agregar una clave nueva

1. Agregá el `Entry` en la sección que corresponda de `dictionary.ts`
   (`{ es: "...", en: "..." }`; el `en` podés completarlo después).
2. En el componente (tiene que ser client component), usá
   `t(dictionary.<seccion>.<clave>)`.

## El widget de Tute

- Vive en `components/TuteProvider.tsx`, montado **una sola vez en el layout
  raíz** (`app/layout.tsx`), no en `HomeClient`. Como el layout no se
  desmonta al navegar entre páginas, la conversación se mantiene al pasar de
  `/` a `/curriculum` o `/evals`.
- Solo se muestra en las rutas conocidas
  (`KNOWN_ROUTES = ["/", "/curriculum", "/evals"]`). Cualquier otra ruta - la
  404 incluida - queda sin widget automáticamente, sin tocar nada de esa
  página.
- `useTute()` devuelve una función para abrirlo desde cualquier componente
  (por ejemplo el botón "¡Preguntale!" de la home).
- `components/TuteWidget.tsx` es autocontenido: maneja sus mensajes, el estado
  del avatar (`idle` / `thinking` / `talking`, mapeado en `lib/tuteImages.ts`)
  y el input. En modo demo responde con un texto de relleno; cuando
  `NEXT_PUBLIC_TUTE_API_URL` está seteada, hace `POST` a ese endpoint.

## Sistema de tema

Un solo estado de verdad, en `lib/useTheme.ts`: el atributo `data-theme` en
`<html>` más la clave `theme` de `localStorage`. Lo usan tanto el
`ThemeToggle` del nav como el de `/curriculum` (es el mismo componente). Los
tokens de color se definen en `app/globals.css` (`:root` y
`[data-theme="dark"]`); `curriculum.css` los consume, así que el CV sigue el
mismo tema que el resto del sitio. El SSR arranca en `data-theme="light"` y
`useTheme` lo corrige al montar según `localStorage` / `prefers-color-scheme`.

## Deploy

Automático: el workflow `.github/workflows/deploy.yml` corre en **cada push a
`main`** y hace:

1. `npm install` + `npm run build` (genera `/out` por `output: 'export'`).
2. `aws s3 sync ./out s3://<bucket> --delete`.
3. `aws cloudfront create-invalidation --paths "/*"`.

No hay paso manual. Necesita estos secrets en el repo: `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `CLOUDFRONT_DISTRIBUTION_ID`
(región `us-east-1`).

Para revisar el estático a mano: `npm run build` y mirás `/out`.

### Basic Auth en producción

Mientras se termina de integrar el backend de Tute, el sitio en producción
está detrás de **Basic Auth**, implementado con una **CloudFront Function**
(viewer-request) sobre la distribución. Esa función no está en este repo (es
configuración de infra en AWS); el sitio local y el build no tienen esa capa.

## Qué falta completar

Buscá `ACA REEMPLAZAR` en el código. Lo que sigue pendiente hoy:

- **`components/Hero.tsx`** - la foto real de Matías (hoy el orb muestra el
  placeholder `[ foto de Matías ]`).
- **`components/Projects.tsx`** - la URL real del repo de JobFit (hoy el link
  apunta a `#`; el proyecto está en desarrollo).
- **`.env.local.example`** - `NEXT_PUBLIC_TUTE_API_URL`, la Invoke URL de API
  Gateway. Sin esto, el chat queda en modo demo. (Copiá el archivo a
  `.env.local`, que no se sube al repo.)
- **`components/TuteWidget.tsx`** - cómo se parsea la respuesta del Lambda
  (`data.reply`), el texto de relleno del modo demo, y la lógica placeholder
  que detecta la palabra "evals".
- **`app/evals/page.tsx`** - `EVAL_CATEGORIES` es data de ejemplo a mano, y el
  link "Ver en GitHub" apunta a `TU-USUARIO/ACA-REEMPLAZAR`.
- **`aws/lambda/tute-handler/index.mjs`** - el más grande: elegir proveedor de
  IA (Bedrock o Anthropic), el system prompt real de Tute, el tool use, el
  rate limiting con DynamoDB, el CORS con el dominio real y el llamado real al
  modelo. Es un esqueleto, no está desplegado.

Respecto de versiones anteriores del README, ya quedaron resueltos: el mail y
los links de LinkedIn y GitHub del footer, y el link de GitHub de la primera
tarjeta de Proyectos (Cloud Resume Challenge).

## Stack

Next.js 14.2 (App Router) - React 18.3 - TypeScript 5.5 - `lucide-react`
(íconos) - `next/font/google` (fuentes del CV). Sin framework de estilos: CSS
plano con custom properties en `globals.css` y `curriculum.css`; `/curriculum`
además usa la grilla de Bootstrap por CDN.

## Estructura

```
app/
  layout.tsx              layout raíz: metadata + <LanguageProvider><TuteProvider>
  page.tsx                /  -> <HomeClient />
  globals.css             tokens de color/tipografía + estilos del sitio y del widget
  not-found.tsx           404 (sin Header/Footer/widget)
  curriculum/
    layout.tsx            fuentes propias + Bootstrap/Font Awesome, solo en esta ruta
    page.tsx              /curriculum -> <CvPage />
    curriculum.css        estilos del CV, scopeados a .cv-page (solo tipografía/espaciado)
  evals/
    page.tsx              /evals -> Header + panel de evals (data hardcodeada) + Footer

components/
  HomeClient.tsx          compone las secciones del home
  Header.tsx              nav + selector de idioma + toggle de tema (se reusa en /evals)
  Hero / About / AskTute / Projects / Skills / Footer
  ThemeToggle.tsx         claro/oscuro (usa lib/useTheme)
  LanguageProvider.tsx    contexto de idioma + hook useLanguage()
  LanguageToggle.tsx      desplegable ES/EN con banderas SVG
  TuteProvider.tsx        monta el widget una vez en el layout; expone useTute()
  TuteWidget.tsx          widget flotante + panel de chat (autocontenido)
  curriculum/
    CvPage - CvHeader - CvFooter
    Experience - Certifications - Education
    SkillsSidebar - ProjectsSidebar
    VisitCounter          le pega a la API de visitas del Cloud Resume Challenge

lib/
  i18n/dictionary.ts      diccionario es/en por sección + translate()
  i18n/index.ts           re-export
  useTheme.ts             estado único de tema (data-theme + localStorage)
  tuteImages.ts           estados del avatar -> .webp en /public/tute

public/
  og-image.png
  tute/                   avatar de Tute (idle/talking/thinking, head/full)
  curriculum/             cv-matias-oviedo.pdf, favicon, apple-touch-icon

aws/lambda/tute-handler/  esqueleto del Lambda del chat (se despliega aparte)
.github/workflows/deploy.yml   build + deploy a S3 + invalidación de CloudFront
```
