export const legacyMarkup = `<!-- MAP CANVAS -->
<div class="absolute inset-0 z-0 bg-slate-200" id="map" style="overflow: hidden;"></div>
<!-- NAV BAR -->
<nav class="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 w-[95%] max-w-7xl pointer-events-none">
<div class="glass rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-lg shadow-slate-200/50 pointer-events-auto">
<div class="flex items-center gap-3">
<div class="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
<span class="material-symbols-rounded text-xl">water_drop</span>
</div>
<div class="flex flex-col">
<h1 class="font-bold text-slate-800 text-sm leading-tight tracking-tight">HydroManager <span class="text-blue-600">Pro</span></h1>
<span class="text-[10px] text-slate-500 font-medium">System Monitor Active</span>
</div>
</div>
<div class="flex items-center gap-2 md:gap-3">
<button class="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition" onclick="toggleSidebar('left')">
<span class="material-symbols-rounded">layers</span>
</button>
<div class="hidden md:flex items-center gap-2">
<button class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group" onclick="downloadSourceCode()" title="Descargar Código HTML">
<span class="material-symbols-rounded text-lg text-slate-400 group-hover:text-blue-500">code</span>
<span class="hidden lg:inline">Source</span>
</button>
<div class="h-5 w-px bg-slate-200 mx-1"></div>
<button class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all" onclick="toggleCNModal()">
<span class="material-symbols-rounded text-lg text-slate-400">database</span> Base CN
                    </button>
<button class="group relative overflow-hidden flex items-center gap-2 pl-3 pr-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all ml-1" id="btn-run-scs" onclick="runSCSAnalysis()">
<div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
<span class="material-symbols-rounded relative z-10 text-lg">play_circle</span>
<span class="relative z-10">RUN SCS</span>
</button>
</div>
<button class="flex items-center gap-1 pl-3 pr-2 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-semibold transition-all border border-slate-200" onclick="toggleSidebar('right')">
<span class="material-symbols-rounded text-lg">terminal</span>
<span class="hidden md:inline">Log</span>
<div class="w-2 h-2 rounded-full bg-yellow-500 ml-1 animate-pulse" id="system-status-dot"></div>
</button>
</div>
</div>
</nav>
<!-- BASEMAP SWITCHER -->
<div class="absolute top-24 right-4 z-30 pointer-events-auto">
  <div class="bg-white/90 backdrop-blur border border-slate-200 rounded-xl shadow-lg shadow-slate-200/40 flex divide-x divide-slate-200 overflow-hidden">
    <button id="basemap-roadmap" class="px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition" onclick="setBaseMapType('roadmap')">
      <span class="material-symbols-rounded align-middle text-base mr-1">map</span>Mapa
    </button>
    <button id="basemap-satellite" class="px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition" onclick="setBaseMapType('satellite')">
      <span class="material-symbols-rounded align-middle text-base mr-1">globe_asia</span>Satélite
    </button>
    <button id="basemap-hybrid" class="px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition" onclick="setBaseMapType('hybrid')">
      <span class="material-symbols-rounded align-middle text-base mr-1">satellite_alt</span>Híbrido
    </button>
    <button id="basemap-terrain" class="px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition hidden md:inline-flex items-center" onclick="setBaseMapType('terrain')">
      <span class="material-symbols-rounded align-middle text-base mr-1">landscape</span>Terreno
    </button>
  </div>
</div>
<!-- LEFT SIDEBAR (Layers) -->
<aside class="absolute top-24 left-4 bottom-6 w-80 z-20 sidebar-transition transform -translate-x-[110%] md:translate-x-0 flex flex-col gap-4 pointer-events-none" id="sidebar-left">
<div class="glass rounded-2xl flex-1 flex flex-col overflow-hidden shadow-xl pointer-events-auto ring-1 ring-black/5">
<div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white/50">
<h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><span class="material-symbols-rounded text-base">stack</span> Capas</h2>
<span class="text-[9px] font-mono bg-slate-100 text-slate-500 px-2 py-1 rounded-md">.ZIP (SHP)</span>
</div>
<div class="flex-1 overflow-y-auto p-4 space-y-3">
<!-- Layers with IDs for JS -->
<div class="layer-item group bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-3 transition-all shadow-sm" data-layer="overall">
<div class="flex justify-between items-start mb-3">
<div class="flex items-center gap-2.5">
<div class="w-2.5 h-2.5 rounded border-2 border-slate-800 bg-transparent"></div>
<div><div class="text-xs font-bold text-slate-700">Overall Boundary</div><div class="text-[9px] text-slate-400">Límite del Proyecto</div></div>
</div>
<button class="text-slate-300 hover:text-blue-600 transition" onclick="toggleLayer('overall')"><span class="material-symbols-rounded text-lg" id="icon-overall">visibility</span></button>
</div>
<label class="relative flex items-center justify-center w-full py-2 border border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50 transition group-hover:border-slate-300">
<div class="flex items-center gap-1.5 pointer-events-none"><span class="material-symbols-rounded text-sm text-slate-400">upload</span><span class="text-[10px] font-semibold text-slate-500" id="label-overall">Cargar</span></div>
<input accept=".zip" class="hidden" id="file-overall" onchange="handleUpload(event, 'overall')" type="file">
<div class="spinner absolute right-3 hidden" id="loader-overall"></div>
</label>
</div>
<div class="layer-item group bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-3 transition-all shadow-sm" data-layer="drainage">
<div class="flex justify-between items-start mb-3">
<div class="flex items-center gap-2.5">
<div class="w-2.5 h-2.5 rounded bg-indigo-500 shadow-sm"></div>
<div><div class="text-xs font-bold text-slate-700">Drainage Areas</div><div class="text-[9px] text-slate-400">Puntos (DP)</div></div>
</div>
<button class="text-slate-300 hover:text-indigo-600 transition" onclick="toggleLayer('drainage')"><span class="material-symbols-rounded text-lg" id="icon-drainage">visibility</span></button>
</div>
<label class="relative flex items-center justify-center w-full py-2 border border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
<div class="flex items-center gap-1.5 pointer-events-none"><span class="material-symbols-rounded text-sm text-indigo-300">upload</span><span class="text-[10px] font-semibold text-indigo-400" id="label-drainage">Cargar</span></div>
<input accept=".zip" class="hidden" id="file-drainage" onchange="handleUpload(event, 'drainage')" type="file">
<div class="spinner absolute right-3 hidden !border-slate-200 !border-l-indigo-500" id="loader-drainage"></div>
</label>
</div>
<!-- Sub, WSS, Landcover skipped for brevity in manual DOM but required for JS (assumed created similarly) -->
<div class="layer-item group bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-3 transition-all shadow-sm" data-layer="sub">
<div class="flex justify-between items-start mb-3">
<div class="flex items-center gap-2.5"><div class="w-2.5 h-2.5 rounded bg-amber-400 shadow-sm"></div><div><div class="text-xs font-bold text-slate-700">Sub Areas</div><div class="text-[9px] text-slate-400">Divisiones</div></div></div>
<button class="text-slate-300 hover:text-amber-500 transition" onclick="toggleLayer('sub')"><span class="material-symbols-rounded text-lg" id="icon-sub">visibility</span></button>
</div>
<label class="relative flex items-center justify-center w-full py-2 border border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-amber-50 transition"><div class="flex items-center gap-1.5 pointer-events-none"><span class="material-symbols-rounded text-sm text-amber-300">upload</span><span class="text-[10px] font-semibold text-amber-500" id="label-sub">Cargar</span></div><input accept=".zip" class="hidden" id="file-sub" onchange="handleUpload(event, 'sub')" type="file"><div class="spinner absolute right-3 hidden !border-slate-200 !border-l-amber-500" id="loader-sub"></div></label>
</div>
<div class="layer-item group bg-white hover:bg-slate-50 border border-slate-100 rounded-xl p-3 transition-all shadow-sm" data-layer="wss">
<div class="flex justify-between items-start mb-3">
<div class="flex items-center gap-2.5"><div class="w-2.5 h-2.5 rounded bg-emerald-500 shadow-sm"></div><div><div class="text-xs font-bold text-slate-700">WSS (Soils)</div><div class="text-[9px] text-emerald-600 font-medium">HSG Data</div></div></div>
<button class="text-slate-300 hover:text-emerald-600 transition" onclick="toggleLayer('wss')"><span class="material-symbols-rounded text-lg" id="icon-wss">visibility</span></button>
</div>
<label class="relative flex items-center justify-center w-full py-2 border border-dashed border-slate-200 rounded-lg cursor-pointer hover:bg-emerald-50 transition"><div class="flex items-center gap-1.5 pointer-events-none"><span class="material-symbols-rounded text-sm text-emerald-300">upload</span><span class="text-[10px] font-semibold text-emerald-600" id="label-wss">Cargar</span></div><input accept=".zip" class="hidden" id="file-wss" onchange="handleUpload(event, 'wss')" type="file"><div class="spinner absolute right-3 hidden !border-slate-200 !border-l-emerald-500" id="loader-wss"></div></label>
</div>
<div class="layer-item group bg-white hover:bg-slate-50 border border-teal-100 rounded-xl p-3 transition-all shadow-sm ring-1 ring-teal-50" data-layer="landcover">
<div class="flex justify-between items-start mb-3">
<div class="flex items-center gap-2.5"><div class="w-2.5 h-2.5 rounded bg-teal-500 shadow-sm"></div><div><div class="text-xs font-bold text-slate-700">Landcover</div><div class="text-[9px] text-teal-600 font-medium">Auto-Validación</div></div></div>
<button class="text-teal-300 hover:text-teal-600 transition" onclick="toggleLayer('landcover')"><span class="material-symbols-rounded text-lg" id="icon-landcover">visibility</span></button>
</div>
<label class="relative flex items-center justify-center w-full py-2 border border-dashed border-teal-200 rounded-lg cursor-pointer hover:bg-teal-50 transition"><div class="flex items-center gap-1.5 pointer-events-none"><span class="material-symbols-rounded text-sm text-teal-400">upload</span><span class="text-[10px] font-semibold text-teal-600" id="label-landcover">Cargar</span></div><input accept=".zip" class="hidden" id="file-landcover" onchange="handleUpload(event, 'landcover')" type="file"><div class="spinner absolute right-3 hidden !border-teal-100 !border-l-teal-500" id="loader-landcover"></div></label>
</div>
</div>
</div>
</aside>
<!-- RIGHT SIDEBAR (System Log) -->
<aside class="absolute top-24 right-4 bottom-6 w-80 z-20 sidebar-transition transform translate-x-0 flex flex-col gap-4 pointer-events-none" id="sidebar-right">
<div class="bg-slate-900 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl pointer-events-auto border border-slate-800" id="log-panel">
<div class="px-4 py-3 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
<div class="flex items-center gap-2">
<span class="material-symbols-rounded text-slate-400 text-base">terminal</span>
<span class="text-xs font-bold text-slate-300 uppercase tracking-widest">System Diagnostic</span>
</div>
<div class="flex gap-2"><span class="w-2 h-2 rounded-full bg-slate-700 animate-pulse"></span></div>
</div>
<div class="flex-1 overflow-y-auto p-0 bg-slate-900 log-scroll relative">
<div class="flex flex-col" id="log-content"><div class="log-entry log-info flex gap-2 animate-in"><span class="opacity-50 select-none">[15:21:31]</span><span class="font-bold w-12 shrink-0 text-slate-300">SYS</span><span class="break-all">Initialization Complete. Waiting for user input.</span></div><div class="log-entry log-info flex gap-2 animate-in"><span class="opacity-50 select-none">[15:21:31]</span><span class="font-bold w-12 shrink-0 text-slate-300">SYS</span><span class="break-all">Booting HydroManager Pro v2.0...</span></div><div class="log-entry log-process flex gap-2 animate-in"><span class="opacity-50 select-none">[15:21:31]</span><span class="font-bold w-12 shrink-0 text-slate-300">MAP</span><span class="break-all">Loading Google Maps Engine...</span></div><div class="log-entry log-success flex gap-2 animate-in"><span class="opacity-50 select-none">[15:21:31]</span><span class="font-bold w-12 shrink-0 text-slate-300">MAP</span><span class="break-all">Map Engine Initialized Successfully.</span></div><div class="log-entry log-process flex gap-2 animate-in"><span class="opacity-50 select-none">[15:24:13]</span><span class="font-bold w-12 shrink-0 text-slate-300">SYS</span><span class="break-all">Bundling Source Code...</span></div></div>
</div>
<div class="p-3 bg-slate-950 border-t border-slate-800 text-[9px] text-slate-500 font-mono grid grid-cols-2 gap-2">
<div id="status-map">MAP: <span class="text-green-500">READY</span></div>
<div id="status-gis">GIS: <span class="text-yellow-500">WAITING</span></div>
<div id="status-db">CN DB: <span class="text-green-500">LOADED</span></div>
<div id="status-mem">MEM: <span class="text-green-500">OK</span></div>
</div>
</div>
<!-- Legend (Collapsible) -->
<div class="glass rounded-xl p-4 shadow-xl animate-in overflow-y-auto max-h-64 pointer-events-auto ring-1 ring-black/5" id="legend-container">
<div class="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
<span class="material-symbols-rounded text-slate-400 text-sm">map</span>
<span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Leyenda Activa</span>
</div>
<div class="space-y-4" id="legend-content">
<div class="text-[10px] text-slate-400 italic text-center py-2">No hay capas activas.</div>
</div>
</div>
</aside>
<!-- LOADING OVERLAY -->
<div class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center hidden transition-opacity duration-300" id="processing-overlay">
<div class="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-in text-center max-w-xs mx-4">
<div class="spinner !w-12 !h-12 !border-4 !border-slate-100 !border-l-blue-600 mb-5"></div>
<h2 class="text-lg font-bold text-slate-800">Procesando Geometrías</h2>
<p class="text-xs text-slate-500 mt-2 leading-relaxed">Realizando intersecciones espaciales...</p>
</div>
</div>
<!-- MODALS -->
<!-- 1. CN DB -->
<div class="fixed inset-0 z-50 hidden flex items-center justify-center p-4" id="cn-modal">
<div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onclick="toggleCNModal()"></div>
<div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] z-10 animate-in">
<div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
<h2 class="text-base font-bold text-slate-800">Base de Datos CN</h2>
<button class="text-slate-400 hover:text-slate-700" onclick="toggleCNModal()"><span class="material-symbols-rounded">close</span></button>
</div>
<div class="flex-1 overflow-auto bg-slate-50/50">
<table class="w-full text-sm text-left text-slate-600">
<thead class="text-xs text-slate-400 uppercase bg-slate-50 border-b border-slate-200 sticky top-0">
<tr>
<th class="px-6 py-3">Land Cover</th><th class="px-2 py-3 text-center bg-green-50">A</th><th class="px-2 py-3 text-center bg-yellow-50">B</th><th class="px-2 py-3 text-center bg-orange-50">C</th><th class="px-2 py-3 text-center bg-red-50">D</th><th class="px-2 text-center"></th>
</tr>
</thead>
<tbody class="divide-y divide-slate-100 bg-white" id="cn-table-body"><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Open Space (Good)" onchange="ucn(0,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="39" onchange="ucn(0,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="61" onchange="ucn(0,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="74" onchange="ucn(0,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="80" onchange="ucn(0,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Impervious" onchange="ucn(1,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="98" onchange="ucn(1,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="98" onchange="ucn(1,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="98" onchange="ucn(1,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="98" onchange="ucn(1,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Commercial" onchange="ucn(2,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="89" onchange="ucn(2,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="92" onchange="ucn(2,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="94" onchange="ucn(2,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="95" onchange="ucn(2,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Residential 1/4 acre" onchange="ucn(3,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="61" onchange="ucn(3,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="75" onchange="ucn(3,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="83" onchange="ucn(3,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="87" onchange="ucn(3,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Woods (Good)" onchange="ucn(4,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="30" onchange="ucn(4,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="55" onchange="ucn(4,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="70" onchange="ucn(4,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="77" onchange="ucn(4,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Pasture (Good)" onchange="ucn(5,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="39" onchange="ucn(5,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="61" onchange="ucn(5,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="74" onchange="ucn(5,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="80" onchange="ucn(5,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Meadow" onchange="ucn(6,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="30" onchange="ucn(6,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="58" onchange="ucn(6,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="71" onchange="ucn(6,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="78" onchange="ucn(6,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Row Crops" onchange="ucn(7,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="67" onchange="ucn(7,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="78" onchange="ucn(7,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="85" onchange="ucn(7,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="89" onchange="ucn(7,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr><tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="Water" onchange="ucn(8,'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td><td class="px-1"><input type="number" value="100" onchange="ucn(8,'a',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="100" onchange="ucn(8,'b',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="100" onchange="ucn(8,'c',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td><td class="px-1"><input type="number" value="100" onchange="ucn(8,'d',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td></tr></tbody>
</table>
</div>
<div class="px-6 py-4 border-t border-slate-100 bg-white rounded-b-2xl flex justify-between">
<button class="text-blue-600 text-xs font-bold flex items-center gap-1 hover:bg-blue-50 px-3 py-2 rounded" onclick="addNewRow()"><span class="material-symbols-rounded text-base">add</span> Add</button>
<button class="px-6 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg shadow-lg" onclick="toggleCNModal()">Done</button>
</div>
</div>
</div>
<!-- 2. MAPPING -->
<div class="fixed inset-0 z-50 hidden flex items-center justify-center p-4" id="mapping-modal">
<div class="absolute inset-0 bg-red-900/20 backdrop-blur-sm"></div>
<div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl z-10 overflow-hidden border-t-4 border-red-500 animate-in">
<div class="p-6 bg-red-50/50 border-b border-red-100 flex gap-4 items-start">
<div class="bg-white p-2.5 rounded-full shadow-sm text-red-500"><span class="material-symbols-rounded text-2xl">warning</span></div>
<div><h3 class="text-lg font-bold text-slate-900">Datos No Reconocidos</h3><p class="text-sm text-slate-600">Homologa los valores para continuar.</p></div>
</div>
<div class="p-6 max-h-[50vh] overflow-y-auto bg-slate-50 space-y-3" id="mapping-container"></div>
<div class="p-4 border-t border-slate-100 bg-white flex justify-end gap-3">
<button class="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg" onclick="cancelMapping()">Cancelar</button>
<button class="px-6 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg shadow-md" onclick="applyMapping()">Corregir</button>
</div>
</div>
</div>
<!-- 3. RESULTS -->
<div class="fixed inset-0 z-50 hidden flex items-center justify-center p-6" id="results-modal">
<div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onclick="closeResultsModal()"></div>
<div class="bg-white w-full md:max-w-5xl rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] animate-slide-up">
<div class="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
<h2 class="text-lg font-bold text-slate-800">Resultados SCS (Weighted CN)</h2>
<button class="text-slate-400 hover:text-slate-700" onclick="closeResultsModal()"><span class="material-symbols-rounded">close</span></button>
</div>
<div class="flex-1 overflow-y-auto p-0 bg-slate-50/50">
<table class="w-full text-sm text-left text-slate-600">
<thead class="text-xs text-slate-500 uppercase bg-white border-b border-slate-200 sticky top-0">
<tr>
<th class="px-6 py-3">Sub Area</th><th class="px-6 py-3 text-right">Area (m²)</th><th class="px-6 py-3 text-center bg-indigo-50 text-indigo-700 font-bold border-l border-r">Weighted CN</th><th class="px-6 text-center"></th>
</tr>
</thead>
<tbody class="divide-y divide-slate-200 bg-white" id="results-table-body"></tbody>
</table>
</div>
<div class="p-5 border-t border-slate-100 bg-white rounded-b-3xl flex justify-end">
<button class="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl" onclick="closeResultsModal()">Cerrar</button>
</div>
</div>
</div>`;
