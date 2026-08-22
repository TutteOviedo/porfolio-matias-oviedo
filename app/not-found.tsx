import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Esta página no existe</h1>
      <img src="/tute/tute-thinking-full.webp" alt="Tute pensando" className="not-found-img" />
      <Link href="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </main>
  );
}
