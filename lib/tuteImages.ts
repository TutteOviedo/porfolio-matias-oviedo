// Los 3 estados del avatar de Tute. Los .webp viven en /public/tute.
// "head" = recorte de cara/busto, para el avatar chico del header del chat.
// "full" = cuerpo completo con fondo transparente, para el personaje flotante.
//
// ACA REEMPLAZAR: si en algún momento sumás más estados (por ejemplo un
// "error" para cuando la API falla), agregá el .webp correspondiente en
// /public/tute y una entrada nueva acá + en el tipo TuteState más abajo.

export type TuteState = "idle" | "talking" | "thinking";

export const TUTE_HEAD_IMAGES: Record<TuteState, string> = {
  idle: "/tute/tute-idle-head.webp",
  talking: "/tute/tute-talking-head.webp",
  thinking: "/tute/tute-thinking-head.webp",
};

export const TUTE_FULL_IMAGES: Record<TuteState, string> = {
  idle: "/tute/tute-idle-full.webp",
  talking: "/tute/tute-talking-full.webp",
  thinking: "/tute/tute-thinking-full.webp",
};
