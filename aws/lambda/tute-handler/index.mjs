// Lambda que atiende al chat de Tute.
// Se invoca desde el front (components/TuteWidget.tsx) vía API Gateway,
// con un POST a NEXT_PUBLIC_TUTE_API_URL y body: { message: "..." }.
//
// Este archivo es un ESQUELETO funcional pero con partes a completar.
// Buscá los comentarios "ACA REEMPLAZAR" antes de desplegar.

// ACA REEMPLAZAR: elegí un proveedor de IA y descomentá/completá el bloque
// correspondiente. Dos caminos típicos:
//
//  A) Bedrock (100% dentro de AWS, no necesita guardar una API key de
//     terceros — solo permisos IAM en el rol del Lambda):
//       import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
//       const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });
//
//  B) API de Anthropic directa (necesitás guardar la API key en AWS Secrets
//     Manager o como variable de entorno del Lambda, NUNCA hardcodeada acá):
//       import Anthropic from "@anthropic-ai/sdk";
//       const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ACA REEMPLAZAR: system prompt real de Tute — quién es Matías, qué puede
// contar Tute, y sobre todo qué NO puede responder (para que ahí dispare la
// respuesta tipo "Mati no me deja responder sobre eso" que definieron al
// principio).
const SYSTEM_PROMPT = `
Sos Tute, el asistente del portfolio de Matías Oviedo.
ACA REEMPLAZAR: pegá acá la info real de Matías (experiencia, proyectos,
stack) y las reglas de tono/límites que quieras que Tute respete.
`;

// ACA REEMPLAZAR (opcional, para el punto de "tool use" que armaron): acá
// van las herramientas reales que Tute puede llamar, por ejemplo traer info
// de un proyecto desde un JSON en S3 o desde la API de GitHub.
// const tools = [ ... ];

// --------- Rate limiting simple con DynamoDB (control de costos/abuso) ----------
// ACA REEMPLAZAR: descomentá y completá cuando tengas la tabla creada
// (ver aws-roadmap.md, paso "DynamoDB para rate limiting").
//
// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
// const ddbClient = new DynamoDBClient({});
// const ddb = DynamoDBDocumentClient.from(ddbClient);
// const RATE_LIMIT_TABLE = process.env.RATE_LIMIT_TABLE; // ACA REEMPLAZAR: nombre real de la tabla
// const MAX_MESSAGES_PER_WINDOW = 20; // ajustá según tu presupuesto

async function checkRateLimit(clientIp) {
  // ACA REEMPLAZAR: implementación real. Idea general:
  // 1) leer (o crear) un item en DynamoDB con key = clientIp
  // 2) si superó MAX_MESSAGES_PER_WINDOW en la ventana de tiempo, devolver false
  // 3) si no, incrementar el contador y devolver true
  return true; // por ahora no bloquea a nadie — reemplazar antes de producción
}

// CORS: ACA REEMPLAZAR "*" por tu dominio real (https://matiasoviedo.com.ar)
// una vez que el sitio esté funcionando, para que solo tu propio front pueda
// llamar a este endpoint.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event) => {
  // Preflight de CORS
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const userMessage = (body.message || "").toString().slice(0, 2000); // límite básico de largo

    if (!userMessage.trim()) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: "Falta el mensaje" }),
      };
    }

    const clientIp = event.requestContext?.http?.sourceIp || "unknown";
    const allowed = await checkRateLimit(clientIp);
    if (!allowed) {
      return {
        statusCode: 429,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          reply: "Che, vamos despacio 😅 probá de nuevo en un rato.",
        }),
      };
    }

    // ACA REEMPLAZAR: acá va el llamado real al modelo (Bedrock o Anthropic),
    // pasándole SYSTEM_PROMPT + userMessage (y las tools, si las sumaste).
    // Ejemplo con el SDK de Anthropic (opción B de arriba):
    //
    // const response = await anthropic.messages.create({
    //   model: "claude-sonnet-4-6",
    //   max_tokens: 500,
    //   system: SYSTEM_PROMPT,
    //   messages: [{ role: "user", content: userMessage }],
    // });
    // const reply = response.content[0].text;

    const reply =
      "ACA REEMPLAZAR: esta es una respuesta de ejemplo — todavía no está" +
      " conectado el modelo de IA real.";

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        reply: "Uy, tuve un problema para responder. Probá de nuevo.",
      }),
    };
  }
};
