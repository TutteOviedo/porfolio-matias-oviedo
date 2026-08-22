/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' genera un sitio 100% estático (carpeta /out) — sin servidor,
  // listo para subir a S3 + CloudFront tal como definimos en el roadmap de AWS.
  // El chat de Tute NO usa las API routes de Next: le pega directo a un endpoint
  // de API Gateway (ver components/TuteWidget.tsx y aws/lambda/tute-handler).
  output: 'export',

  images: {
    // La optimización de imágenes de next/image necesita un servidor corriendo.
    // Como exportamos un sitio estático, la desactivamos y servimos los .webp tal cual.
    unoptimized: true,
  },
};

export default nextConfig;
