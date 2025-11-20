import Link from 'next/link';

const LEGACY_PATH = '/legacy/HydroManager_Source.html';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-10">
      <header className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400 font-semibold">HydroManager Pro</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
          Experiencia moderna lista para Vercel
        </h1>
        <p className="text-lg text-slate-300 max-w-3xl mx-auto">
          Migramos la vista HTML previa a un proyecto Next.js + Tailwind CSS preparado para despliegues
          inmediatos en Vercel, manteniendo el diseño original dentro de un contenedor seguro y
          optimizado.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href={LEGACY_PATH}
            className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-400"
            target="_blank"
          >
            Abrir vista completa
            <span aria-hidden className="text-xl">↗</span>
          </Link>
          <a
            href="https://nextjs.org/docs"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-slate-100 transition hover:border-white/30 hover:text-white"
            target="_blank"
            rel="noreferrer"
          >
            Documentación Next.js
          </a>
        </div>
      </header>

      <section className="rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div>
            <p className="text-sm font-semibold text-white">Vista previa incrustada</p>
            <p className="text-xs text-slate-400">El HTML original vive ahora en /public/legacy para un rendering estable.</p>
          </div>
          <div className="flex gap-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200 border border-emerald-400/30">
              ✓ Ready for Vercel
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-sky-500/10 px-3 py-1 text-sky-200 border border-sky-400/30">
              Next.js 14 + Tailwind CSS
            </span>
          </div>
        </div>
        <div className="bg-slate-900/60">
          <iframe
            src={LEGACY_PATH}
            className="w-full h-[1200px] border-0"
            loading="lazy"
            title="HydroManager Pro"
          />
        </div>
      </section>
    </main>
  );
}
