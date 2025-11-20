import { CheckCircleIcon, CloudArrowUpIcon, MapIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const layers = [
  { name: 'Hidrografía', items: ['Ríos', 'Canales', 'Breaklines'] },
  { name: 'Topografía', items: ['Nodos', 'Curvas de Nivel', 'Secciones Transversales'] },
  { name: 'Catastro', items: ['Parcelas', 'Manzanas', 'Variables Isohadas'] },
];

const processingSteps = [
  {
    title: '1. Ingesta Geoespacial',
    description: 'Sube shapefiles, KML o GeoJSON y normaliza los CRS automáticamente.',
    status: 'Completado',
  },
  {
    title: '2. Procesamiento de Geometrías',
    description: 'Snap de nodos, ruptura de aristas, topología válida y filtrado de geometrías duplicadas.',
    status: 'Optimizado',
  },
  {
    title: '3. Modelación Hidrológica',
    description: 'Calcula curvas IDF, CN ponderados, lluvias de diseño y caudales pico en segundos.',
    status: 'Listo',
  },
];

const logs = [
  { type: 'log-info', text: 'Cargadas 5 capas (hidrografía, CN, suelo, rugosidad, pendientes).' },
  { type: 'log-success', text: 'SCS Weighted CN calculado: 78.3 (Δ 0.4 respecto a versión previa).' },
  { type: 'log-warn', text: 'Sección 12: SR > 60 %, se recomienda dividir el reach.' },
  { type: 'log-success', text: 'Lluvia de diseño (T=25 años) generada con Gumbel: 83 mm en 2h.' },
  { type: 'log-error', text: 'No se reconoció el valor "Suelo: Gravoso". Homologar con base USDA.' },
];

const hydrology = [
  { label: 'CN Ponderado', value: '78.3', hint: 'AMC II | Land cover mixto' },
  { label: 'Infiltración (Horton)', value: '12.6 mm/h', hint: 'f0: 32 mm/h • fc: 8 mm/h' },
  { label: 'Tiempo de Concentración', value: '42 min', hint: 'Kirpich • Tc ajustado por rugosidad' },
  { label: 'Caudal Pico', value: '18.4 m³/s', hint: 'Método SCS UH • Área 1.4 km²' },
];

const designRain = [
  { label: 'Gumbel (T=25)', value: '83 mm', hint: 'β=19.2 • α=33.7' },
  { label: 'Blom (T=50)', value: '102 mm', hint: 'β=21.4 • α=41.1' },
  { label: 'Factor de Desagregación', value: '0.68', hint: 'Para evento 2h sobre 24h' },
  { label: 'Índice de Persistencia', value: '0.73', hint: 'Ensambles NOAA + pluviografías' },
];

const table = [
  { suelo: 'A', uso: 'Pavimento', n: '0.012', sr: '2%', cn: '98', area: '13 ha' },
  { suelo: 'B', uso: 'Pradera', n: '0.28', sr: '18%', cn: '68', area: '7 ha' },
  { suelo: 'C', uso: 'Cultivos', n: '0.35', sr: '22%', cn: '78', area: '5 ha' },
  { suelo: 'D', uso: 'Bosque', n: '0.45', sr: '55%', cn: '72', area: '3 ha' },
];

const quickActions = [
  { label: 'Subir capas', icon: CloudArrowUpIcon },
  { label: 'Validar topología', icon: CheckCircleIcon },
  { label: 'Explorar mapa', icon: MapIcon },
  { label: 'Publicar en Vercel', icon: RocketLaunchIcon },
];

export default function Page() {
  return (
    <main className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 pb-10 pt-8 md:pt-12">
      <div className="absolute inset-x-10 top-10 h-64 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-title">HydroManager Pro</p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Modelación hidrológica asistida por datos y mapas en vivo
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Lleva tu flujo de trabajo desde el shapefile hasta el hidrograma de salida con un stack moderno,
            componentes reutilizables y despliegue instantáneo en Vercel.
          </p>
        </div>
        <div className="flex gap-2">
          {quickActions.map((item) => (
            <button
              key={item.label}
              className="glass-panel flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white hover:border-brand-400/60 hover:text-brand-50 transition"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="glass-panel p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge bg-brand-500/20 text-brand-100 ring-1 ring-brand-400/40">
              Mapa en vivo
            </span>
            <span className="badge bg-emerald-400/10 text-emerald-100 ring-1 ring-emerald-400/40">CRS auto</span>
            <span className="badge bg-slate-100/5 text-slate-200 ring-1 ring-white/10">Stack Next.js</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.2),transparent_25%),radial-gradient(circle_at_70%_0,rgba(16,185,129,0.2),transparent_25%)]" />
              <div className="relative flex h-64 items-center justify-center rounded-lg border border-white/10 bg-slate-900/50 text-sm text-slate-300">
                <div className="flex flex-col items-center gap-2 text-center">
                  <MapIcon className="h-10 w-10 text-brand-200" />
                  <p className="font-semibold text-white">Canvas geoespacial listo para Google Maps / MapLibre</p>
                  <p className="text-xs text-slate-300">
                    Renderiza vectores, marcas y etiquetas sin dependencias globales. Ajusta estilos con Tailwind.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="glass-panel p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Coordenadas</p>
                <p className="metric">-34.597° , -58.437°</p>
                <p className="text-xs text-slate-400">Lat/Lon • EPSG:4326 • Resolución 0.3 m</p>
              </div>
              <div className="glass-panel p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Área de estudio</p>
                <p className="metric">1.43 km²</p>
                <p className="text-xs text-slate-400">Red drenaje 12.5 km • 3 estaciones lluvia</p>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Capas</p>
            <span className="badge bg-emerald-400/10 text-emerald-100 ring-1 ring-emerald-400/40">Topología verificada</span>
          </div>
          <div className="space-y-3">
            {layers.map((layer) => (
              <div key={layer.name} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-sm font-semibold text-white">{layer.name}</p>
                <p className="mt-1 text-xs text-slate-300">{layer.items.join(' • ')}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <span className="badge bg-slate-100/5 ring-1 ring-white/10">Shapefile</span>
            <span className="badge bg-slate-100/5 ring-1 ring-white/10">GeoJSON</span>
            <span className="badge bg-slate-100/5 ring-1 ring-white/10">KML/KMZ</span>
            <span className="badge bg-slate-100/5 ring-1 ring-white/10">TIFF/DEM</span>
          </div>
        </div>
      </section>

      <section className="glass-panel p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="section-title">Workflow</p>
            <h2 className="text-2xl font-semibold text-white">Pipeline reproducible listo para CI/CD</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Desacopla etapas de carga, validación y cálculo en componentes reutilizables. Exporta a API o UI sin
              depender del navegador. Perfecto para entornos serverless de Vercel.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="badge bg-brand-500/20 text-brand-100 ring-1 ring-brand-400/40">Vercel Edge Ready</span>
            <span className="badge bg-indigo-500/20 text-indigo-100 ring-1 ring-indigo-400/40">Streaming React</span>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {processingSteps.map((step) => (
            <div key={step.title} className="glass-panel p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{step.status}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[3fr,2fr]">
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Resultados SCS</p>
            <span className="badge bg-emerald-400/10 text-emerald-100 ring-1 ring-emerald-400/40">Weighted CN</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {hydrology.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
                <p className="text-xs text-slate-300">{item.hint}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Bitácora</p>
            <div className="mt-2 space-y-1">
              {logs.map((log, idx) => (
                <p key={idx} className={`log-entry ${log.type}`}>
                  {log.text}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title">Lluvia de diseño</p>
            <span className="badge bg-sky-400/10 text-sky-100 ring-1 ring-sky-400/40">Curva IDF</span>
          </div>
          <div className="grid gap-3">
            {designRain.map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
                <p className="text-xs text-slate-300">{item.hint}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Tabla CN / Rugosidad</p>
            <div className="mt-3 overflow-hidden rounded-lg border border-white/10">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-white/5 text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-3 py-2">Suelo</th>
                    <th className="px-3 py-2">Uso</th>
                    <th className="px-3 py-2">n</th>
                    <th className="px-3 py-2">SR</th>
                    <th className="px-3 py-2">CN</th>
                    <th className="px-3 py-2">Área</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white/5' : 'bg-white/0'}>
                      <td className="px-3 py-2 font-semibold text-white">{row.suelo}</td>
                      <td className="px-3 py-2">{row.uso}</td>
                      <td className="px-3 py-2">{row.n}</td>
                      <td className="px-3 py-2">{row.sr}</td>
                      <td className="px-3 py-2">{row.cn}</td>
                      <td className="px-3 py-2">{row.area}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-title">Código listo para Vercel</p>
            <h3 className="text-xl font-semibold text-white">Next.js 14 + App Router + Tailwind 3.4</h3>
            <p className="text-sm text-slate-300">
              Sin scripts globales, sin dependencias bloqueantes. El HTML original se reescribió en componentes React
              con datos tipados y estilos reutilizables.
            </p>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <span className="code-pill">npm install</span>
            <span className="code-pill">npm run dev</span>
            <span className="code-pill">npm run build</span>
            <span className="code-pill">vercel --prod</span>
          </div>
        </div>
      </section>
    </main>
  );
}
