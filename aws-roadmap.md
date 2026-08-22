# Roadmap de AWS — Portfolio + Tute

Qué vamos a levantar en AWS, en qué orden, y por qué cada pieza. Pensado para
alguien que ya tiene el Cloud Resume Challenge andando (S3 + CloudFront +
Route53 + algo de Lambda/DynamoDB), así que reutilizamos ese mismo patrón en
vez de inventar uno nuevo.

## Arquitectura objetivo, de un vistazo

```
Visitante
   │
   ├── matiasoviedo.com.ar (Route53) ──► CloudFront ──► S3 (sitio Next.js exportado, estático)
   │
   └── Widget de Tute ──► fetch a API Gateway ──► Lambda (tute-handler) ──┬──► Bedrock o API de Anthropic
                                                                            └──► DynamoDB (rate limiting)
                                                        │
                                                        └──► CloudWatch (logs y métricas)
```

Dos piezas separadas a propósito:

1. **El sitio** es 100% estático (HTML/CSS/JS generado por `next build` con
   `output: 'export'`) → no necesita servidor, se sirve solo desde S3 +
   CloudFront. Barato, rápido, y es el mismo patrón que ya usás en el Cloud
   Resume Challenge.
2. **El chat de Tute** sí necesita ejecutar código en el momento (llamar a un
   modelo de IA) → eso va en Lambda, detrás de API Gateway. El front le pega
   a esa API por HTTP, nada más.

Esta separación es justamente lo que le da consistencia a tu propio
portfolio: es el mismo patrón serverless que mostrás en el Cloud Resume
Challenge, aplicado de nuevo acá.

---

## Fase 0 — Antes de tocar nada

- **Cuenta de AWS y CLI configurado.** Si ya desplegaste el Cloud Resume
  Challenge, esto ya lo tenés. `aws configure` con un usuario IAM (no el root)
  con permisos acotados a los servicios que vas a usar.
- **Confirmar que `matiasoviedo.com.ar` ya está como Hosted Zone en Route53.**
  Si ya lo usás para el Cloud Resume Challenge, es el mismo — no hay que crear
  nada nuevo acá, solo vamos a sumar registros.
- **Decidir si el nuevo sitio reemplaza al Cloud Resume Challenge en el
  dominio raíz, o si conviven en subrutas/subdominios.** Recomendación: el
  portfolio nuevo pasa a ser el sitio principal (`matiasoviedo.com.ar`), y el
  Cloud Resume Challenge queda linkeado desde ahí como uno de los proyectos
  (tal como está armado en `components/Projects.tsx`) — no hace falta que
  compitan por el mismo dominio.

---

## Fase 1 — Frontend estático (S3 + CloudFront + Route53)

**Por qué así:** es la misma arquitectura que el Cloud Resume Challenge, así
que ya sabés cómo se comporta, y aparte es literalmente gratis o casi gratis
para el tráfico de un portfolio personal.

1. **Bucket S3** para el sitio (podés reusar el bucket del Cloud Resume
   Challenge si querés todo junto, o crear uno nuevo — más prolijo si en
   algún momento querés versionar/desplegar cada proyecto por separado).
   Sin hosting público directo del bucket: el acceso público lo maneja
   CloudFront (Origin Access Control), el bucket queda privado.
2. **Build del sitio:** `npm run build` genera `/out` con todo el HTML/CSS/JS
   estático. Ese es el contenido que se sube al bucket (`aws s3 sync ./out
   s3://tu-bucket --delete`).
3. **Certificado SSL (ACM)** para `matiasoviedo.com.ar`, en la región
   `us-east-1` (CloudFront lo exige ahí específicamente, sin importar en qué
   región esté el resto).
4. **Distribución de CloudFront** apuntando al bucket como origen, con el
   certificado de ACM, y comportamiento configurado para servir `index.html`
   como default y como error 404 (típico para sitios de una sola página con
   anclas internas como el nuestro).
5. **Route53:** registro tipo A (alias) apuntando el dominio a la
   distribución de CloudFront.
6. **Invalidación de caché** después de cada deploy (`aws cloudfront
   create-invalidation --distribution-id XXXX --paths "/*"`), para que
   CloudFront no siga sirviendo la versión vieja del sitio.

---

## Fase 2 — Backend de Tute (Lambda + API Gateway)

**Por qué así:** el chat necesita ejecutar lógica real (armar el prompt,
llamar al modelo, eventualmente usar herramientas) — eso no puede vivir en un
sitio estático. Lambda cobra solo por uso, así que para un portfolio con
tráfico bajo/medio el costo es mínimo o nulo (dentro del free tier).

1. **Elegir el proveedor de IA:**
   - **AWS Bedrock** — todo se queda dentro de AWS, no hay que guardar una API
     key de un tercero, los permisos se manejan con IAM. Necesitás pedir
     acceso al modelo que quieras usar desde la consola de Bedrock (algunos
     requieren aprobación, que suele ser instantánea).
   - **API de Anthropic directa** — más simple de programar si ya conocés el
     SDK, pero necesitás guardar la API key en **Secrets Manager** (nunca
     como variable de entorno en texto plano en producción, y mucho menos
     hardcodeada en el código).
   Cualquiera de las dos funciona con el esqueleto que ya te dejé en
   `aws/lambda/tute-handler/index.mjs`.
2. **Función Lambda** (`tute-handler`): recibe el mensaje del visitante, arma
   el prompt con el system prompt de Tute, llama al modelo, devuelve la
   respuesta. El esqueleto ya maneja CORS y la estructura básica — folta
   completar el llamado real al modelo y el system prompt (marcado con
   `ACA REEMPLAZAR` en el archivo).
3. **Rol de IAM de la Lambda:** permisos mínimos necesarios — invocar Bedrock
   si elegiste esa opción, leer el secret de Secrets Manager si elegiste
   Anthropic directo, y leer/escribir en la tabla de DynamoDB del rate
   limiting (Fase 3).
4. **API Gateway (HTTP API, no REST API — es más simple y más barata para
   este caso):** una sola ruta `POST /tute` que dispara la Lambda. Configurás
   CORS acá directamente (permitiendo solo tu dominio real, no `*`, una vez
   que el sitio esté funcionando).
5. **Variable de entorno del front:** una vez que tengas la Invoke URL de API
   Gateway, la pegás en `.env.local` como `NEXT_PUBLIC_TUTE_API_URL` y
   volvés a buildear el sitio.

---

## Fase 3 — Control de costos y abuso

**Por qué:** un chat conectado a una API de IA es el único componente de todo
esto que puede generarte un costo variable e impredecible si alguien lo usa
de forma abusiva (o si el sitio se viraliza). Esta fase es la que evita
sorpresas en la factura.

1. **Tabla DynamoDB** (`tute-rate-limit` o el nombre que prefieras) con la IP
   (o un ID de sesión) como partition key, y un contador + timestamp. La
   Lambda la consulta antes de llamar al modelo: si superó el límite en la
   ventana de tiempo, corta ahí y devuelve una respuesta genérica sin gastar
   ni un token de la API.
2. **Throttling en API Gateway:** un límite de requests por segundo a nivel
   de la API completa, como segunda barrera además del rate limit por
   usuario.
3. **AWS Budgets:** una alerta de presupuesto mensual (podés poner un umbral
   bajo, como USD 5 o 10) que te avisa por mail si el gasto se empieza a ir
   de rango — señal temprana de que algo raro está pasando.

---

## Fase 4 — Observabilidad

**Por qué:** para poder ver qué le preguntan a Tute, si está fallando, y de
paso tener contenido real para la futura página de evals que hablamos.

1. **CloudWatch Logs** de la Lambda — vienen activados por default, no hay
   que configurar nada extra, pero conviene revisarlos cada tanto al
   principio.
2. **Métricas básicas:** cantidad de invocaciones, errores, duración — todo
   esto ya lo trackea CloudWatch automáticamente para cualquier Lambda /
   API Gateway, sin trabajo adicional.
3. (Opcional, más adelante) **Un dashboard simple de CloudWatch** con esas
   métricas, que podrías incluso llegar a mostrar como parte de la sección
   "detrás de escena" del sitio.

---

## Fase 5 — Deploys (opcional pero recomendado)

Para no tener que subir archivos a mano cada vez:

1. **Frontend:** un GitHub Action simple que en cada push a `main` corre
   `npm run build` y sincroniza `/out` al bucket S3 + invalida CloudFront.
2. **Lambda:** se puede desplegar a mano al principio (subís el `.zip` de
   `aws/lambda/tute-handler` desde la consola o con `aws lambda
   update-function-code`), y más adelante, si querés, migrar a algo como AWS
   SAM o CDK para manejar toda la infraestructura como código — no es
   necesario para arrancar, es una mejora para más adelante.

---

## Orden sugerido para ir armando esto

1. Fase 1 completa (sitio estático funcionando en el dominio) — es la base y
   no depende de nada más.
2. Fase 2, pero probando la Lambda primero desde la consola de AWS (con un
   evento de prueba) antes de conectarla al front — así aislás errores.
3. Fase 3 **antes** de compartir el link con nadie más allá de vos — es la
   parte que te protege de un costo inesperado.
4. Fase 4 en paralelo a la 3, son casi gratis y te dan visibilidad desde el
   día uno.
5. Fase 5 cuando el resto ya esté estable — automatizar algo que todavía
   cambia mucho no ahorra tiempo, ahorra tiempo cuando ya se volvió rutina.

## Sobre los costos

Para un portfolio personal con tráfico bajo/medio, la gran mayoría de esto
entra dentro del free tier de AWS (S3, CloudFront, Lambda, API Gateway,
DynamoDB tienen niveles gratuitos generosos para este volumen). El único
costo variable real es el de las llamadas al modelo de IA (Bedrock o
Anthropic), que es exactamente lo que la Fase 3 existe para controlar.
