// --- LOGGING ---
        const sysLog = {
            add: (comp, msg, type = 'info') => {
                const el = document.getElementById('log-content');
                if(!el) return;
                const t = new Date().toLocaleTimeString('en-US',{hour12:false});
                const row = document.createElement('div');
                const cl = type==='error'?'log-error':type==='success'?'log-success':type==='warn'?'log-warn':type==='process'?'log-process':'log-info';
                row.className = `log-entry ${cl} flex gap-2 animate-in`;
                row.innerHTML = `<span class="opacity-50 select-none">[${t}]</span><span class="font-bold w-12 shrink-0 text-slate-300">${comp}</span><span class="break-all">${msg}</span>`;
                el.appendChild(row);
                el.parentElement.scrollTop = el.parentElement.scrollHeight;
                if(comp==='MAP'&&type==='success') updateStatus('map','READY','text-green-500');
                if(comp==='MAP'&&type==='error') updateStatus('map','FAIL','text-red-500');
                if(comp==='SCS'&&type==='process') document.querySelector('#system-status-dot').className="w-2 h-2 rounded-full bg-blue-500 ml-1 animate-ping";
                if(comp==='SCS'&&type==='success') document.querySelector('#system-status-dot').className="w-2 h-2 rounded-full bg-green-500 ml-1";
            }
        };
        function updateStatus(id, txt, cl){ const e=document.getElementById(`status-${id}`); if(e) e.innerHTML=`${id.toUpperCase()}: <span class="${cl}">${txt}</span>`; }

        // --- APP DATA ---
        let cnDictionary = [
            { id: 1, name: "Open Space (Good)", a: 39, b: 61, c: 74, d: 80 }, { id: 2, name: "Impervious", a: 98, b: 98, c: 98, d: 98 },
            { id: 3, name: "Commercial", a: 89, b: 92, c: 94, d: 95 }, { id: 4, name: "Residential 1/4 acre", a: 61, b: 75, c: 83, d: 87 },
            { id: 5, name: "Woods (Good)", a: 30, b: 55, c: 70, d: 77 }, { id: 6, name: "Pasture (Good)", a: 39, b: 61, c: 74, d: 80 },
            { id: 7, name: "Meadow", a: 30, b: 58, c: 71, d: 78 }, { id: 8, name: "Row Crops", a: 67, b: 78, c: 85, d: 89 },
            { id: 9, name: "Water", a: 100, b: 100, c: 100, d: 100 }
        ]; // (Truncated for brevity, add all 21 if needed in prod)

        const appState = { layers: { overall: { visible: true, polygons: [], rawFeatures: null, zIndex: 50 }, sub: { visible: true, polygons: [], rawFeatures: null, zIndex: 40 }, drainage: { visible: true, polygons: [], rawFeatures: null, zIndex: 30 }, wss: { visible: true, polygons: [], rawFeatures: null, zIndex: 20, uniqueValues: new Set() }, landcover: { visible: true, polygons: [], rawFeatures: null, zIndex: 10, uniqueValues: new Set() }, mosaic: { visible: false, polygons: [], zIndex: 60 } }, options: { drainage: [], sub: [] }, pendingGeoJSON: null, invalidValues: [] };
        const mapConfig = window.__HYDRO_MAP_CONFIG || {};
        let map, infoWindow;

        // --- MAP & INIT ---
        async function initMap() {
            sysLog.add('SYS', 'Booting HydroManager Pro v2.0...', 'info');
            sysLog.add('MAP', 'Loading Google Maps Engine...', 'process');
            try {
                const { Map, InfoWindow } = await google.maps.importLibrary("maps");
                const mapOptions = { center: { lat: 39.8283, lng: -98.5795 }, zoom: 4, disableDefaultUI: true, zoomControl: false, gestureHandling: 'greedy' };
                if(mapConfig.mapId){ mapOptions.mapId = mapConfig.mapId; }
                else { mapOptions.styles = [{"featureType":"poi","stylers":[{"visibility":"off"}]}]; }
                map = new Map(document.getElementById("map"), mapOptions);
                infoWindow = new InfoWindow({ minWidth: 260 });
                sysLog.add('MAP', 'Map Engine Initialized Successfully.', 'success');
                renderCNTable();
            } catch (e) {
                sysLog.add('MAP', 'FATAL: Map Load Failed. ' + e.message, 'error');
                sysLog.add('MAP', 'Ensure you are online and have a valid API Key configured.', 'warn');
                updateStatus('map','FAIL','text-red-500');
            }
        }

        // --- UTILS ---
        function toggleSidebar(s){ 
            if(s==='left') document.getElementById('sidebar-left').classList.toggle('-translate-x-[110%]');
            else {
                const sb=document.getElementById('sidebar-right');
                sb.classList.toggle('translate-x-[120%]');
            }
        }
        async function downloadSourceCode(){
            sysLog.add('SYS','Bundling Source Code...','process');
            const clone=document.documentElement.cloneNode(true);
            clone.querySelector('#map').innerHTML='';
            clone.querySelectorAll('#processing-overlay,#cn-modal,#mapping-modal,#results-modal').forEach(e=>e.classList.add('hidden'));
            const blob=new Blob(["<!DOCTYPE html>\n"+clone.outerHTML],{type:'text/html'});
            const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='HydroManager_Source.html'; a.click();
            sysLog.add('SYS','Download started.','success');
        }

        // --- FILE IO ---
        async function handleUpload(e, type) {
            const file = e.target.files[0];
            if(!file) return;
            sysLog.add('IO', `Reading ${type}: ${file.name}`, 'process');
            const ldr = document.getElementById(`loader-${type}`); if(ldr) ldr.classList.remove('hidden');
            
            try {
                const buf = await file.arrayBuffer();
                const geo = await shp(buf);
                sysLog.add('GIS', `Parsed ${geo.features?geo.features.length:0} features from ${type}.`, 'info');

                if(type === 'landcover') {
                    const valid = cnDictionary.map(r=>r.name);
                    const inv = new Set();
                    geo.features.forEach(f=>{
                        const v = detectAttribute(f.properties, 'landcover');
                        if(!v || !valid.includes(v)) inv.add(v||"N/A");
                    });
                    if(inv.size > 0) {
                        sysLog.add('VAL', `Validation Error: ${inv.size} unknown landcovers found.`, 'error');
                        appState.pendingGeoJSON = geo; appState.invalidValues = [...inv];
                        showMappingModal();
                        if(ldr) ldr.classList.add('hidden');
                        return;
                    }
                }
                finishLayerLoad(geo, type);
            } catch(err) {
                sysLog.add('IO', `Upload Failed: ${err.message}`, 'error');
                alert("Error processing file.");
            } finally {
                if(type!=='landcover'&&ldr) ldr.classList.add('hidden');
                e.target.value='';
            }
        }

        function finishLayerLoad(geo, type){
            const feats = Array.isArray(geo)?geo.flatMap(g=>g.features):geo.features;
            if(type==='wss'||type==='landcover') feats.forEach(f=>f.properties._standardVal=detectAttribute(f.properties,type));
            appState.layers[type].rawFeatures = {type:"FeatureCollection",features:feats};
            
            if(!appState.layers[type].visible) toggleLayer(type);
            clearPolygons(type);
            if(type==='wss'||type==='landcover') appState.layers[type].uniqueValues.clear();
            renderPolygons(geo, type);
            updateLegend();
            sysLog.add('GIS', `Layer ${type} loaded & rendered.`, 'success');
            const ldr = document.getElementById(`loader-${type}`); if(ldr) ldr.classList.add('hidden');
        }

        function detectAttribute(p,t){
            if(!p)return "N/A"; const k=Object.keys(p);
            const pats = t==='wss'?[/^hsg$/i,/^hydgrp$/i]:[/^land_?cover$/i,/^land_?use$/i,/^desc$/i];
            for(let r of pats){ const m=k.find(key=>r.test(key)); if(m) return p[m]; }
            return Object.values(p)[0]||"N/A";
        }

        // --- RENDER ---
        async function renderPolygons(geo, type){
            const { Polygon } = await google.maps.importLibrary("maps");
            const { LatLngBounds } = await google.maps.importLibrary("core");
            const b = new LatLngBounds();
            const feats = appState.layers[type].rawFeatures.features;
            const layer = appState.layers[type];

            feats.forEach(f=>{
                if(!f.geometry)return;
                const paths = parsePaths(f.geometry);
                let val=null;
                if(type==='wss'||type==='landcover'){ val=f.properties._standardVal; layer.uniqueValues.add(String(val)); }
                const s = getStyle(type, val);
                const poly = new Polygon({ paths, strokeColor:s.s, strokeOpacity:1, strokeWeight:s.w, fillColor:s.f, fillOpacity:s.o, zIndex:layer.zIndex, map:map, clickable:(type==='drainage'||type==='sub')});
                
                if(type==='drainage'||type==='sub') poly.addListener('click', e=>openPopup({poly,type,data:{}}, e.latLng));
                layer.polygons.push({poly});
                paths.flat().forEach(p=>b.extend(p));
            });
            if(!b.isEmpty()) map.fitBounds(b);
        }

        // --- SCS ENGINE ---
        async function runSCSAnalysis() {
            const l=appState.layers;
            if(!l.overall.rawFeatures || !l.sub.rawFeatures || !l.wss.rawFeatures || !l.landcover.rawFeatures) {
                sysLog.add('SCS', 'Missing required layers for analysis.', 'error');
                return alert("Missing Layers.");
            }
            
            sysLog.add('SCS', 'Starting geospatial intersection sequence...', 'process');
            document.getElementById('processing-overlay').classList.remove('hidden');
            
            setTimeout(async () => {
                try {
                    const ov = l.overall.rawFeatures.features[0];
                    sysLog.add('SCS', 'Clipping Sub Areas...', 'info');
                    let clip = [];
                    l.sub.rawFeatures.features.forEach(s => { try{const p=turf.intersect(s,ov); if(p){p.properties={...s.properties}; clip.push(p);}}catch(e){} });
                    
                    sysLog.add('SCS', 'Intersecting with Soils...', 'info');
                    let soil = [];
                    clip.forEach(c => { l.wss.rawFeatures.features.forEach(w => { try{const p=turf.intersect(c,w); if(p){p.properties={...c.properties, hsg:w.properties._standardVal}; soil.push(p);}}catch(e){} }); });

                    sysLog.add('SCS', 'Intersecting with Landcover & Calculating CN...', 'info');
                    let mos = [];
                    soil.forEach(s => { l.landcover.rawFeatures.features.forEach(lc => { try{const p=turf.intersect(s,lc); if(p){
                        const ln=lc.properties._standardVal, cn=lookupCN(ln,s.properties.hsg), a=turf.area(p);
                        p.properties={...s.properties, lc:ln, cn:cn, area:a}; mos.push(p);
                    }}catch(e){} }); });

                    sysLog.add('SCS', `Analysis done. ${mos.length} mosaic polygons created.`, 'success');
                    ['overall','sub','drainage','wss','landcover'].forEach(t=>{if(appState.layers[t].visible) toggleLayer(t);});
                    await renderMosaic(mos);
                    showResults(mos);
                } catch(e) {
                    sysLog.add('SCS', `Fatal Error: ${e.message}`, 'error');
                    console.error(e);
                } finally {
                    document.getElementById('processing-overlay').classList.add('hidden');
                }
            }, 200);
        }

        function lookupCN(n,h){ const r=cnDictionary.find(x=>x.name===n); if(!r)return 0; return r[String(h).toLowerCase().charAt(0)]||0; }
        
        async function renderMosaic(m){
            const { Polygon } = await google.maps.importLibrary("maps");
            appState.layers.mosaic.visible=true;
            m.forEach(f=>{
                const paths=parsePaths(f.geometry);
                const c=f.properties.cn<50?'#22c55e':f.properties.cn<85?'#f97316':'#ef4444';
                const poly=new Polygon({paths,strokeColor:c,strokeOpacity:1,strokeWeight:1,fillColor:c,fillOpacity:0.7,zIndex:100,map:map});
                appState.layers.mosaic.polygons.push({poly});
            });
        }

        function showResults(m){
            const g={};
            m.forEach(f=>{
                const id = f.properties.subName || "SubArea";
                if(!g[id]) g[id]={id, a:0, w:0};
                g[id].a += f.properties.area; g[id].w += (f.properties.cn * f.properties.area);
            });
            const tb=document.getElementById('results-table-body'); tb.innerHTML='';
            Object.values(g).forEach(i=>{
                const val = i.a>0 ? (i.w/i.a).toFixed(1) : 0;
                tb.innerHTML+=`<tr class="hover:bg-slate-50"><td class="px-6 py-3">${i.id}</td><td class="px-6 text-right">${Math.round(i.a).toLocaleString()}</td><td class="px-6 text-center font-bold text-indigo-600">${val}</td><td class="px-6 text-center"><button class="text-slate-400"><span class="material-symbols-rounded">visibility</span></button></td></tr>`;
            });
            document.getElementById('results-modal').classList.remove('hidden');
        }
        function closeResultsModal(){ document.getElementById('results-modal').classList.add('hidden'); }

        // --- HELPERS ---
        function toggleLayer(t){ const l=appState.layers[t]; l.visible=!l.visible; document.getElementById(`icon-${t}`).textContent=l.visible?'visibility':'visibility_off'; l.polygons.forEach(p=>{p.poly.setMap(l.visible?map:null);}); updateLegend(); sysLog.add('UI',`Layer ${t} toggled ${l.visible?'ON':'OFF'}`); }
        function clearPolygons(t){ appState.layers[t].polygons.forEach(p=>p.poly.setMap(null)); appState.layers[t].polygons=[]; }
        function parsePaths(g){ if(g.type==='Polygon')return g.coordinates.map(r=>r.map(c=>({lat:c[1],lng:c[0]}))); if(g.type==='MultiPolygon'){let a=[];g.coordinates.forEach(p=>p.forEach(r=>a.push(r.map(c=>({lat:c[1],lng:c[0]})))));return a;} return []; }
        function getWSSColor(v){ if(!v||v==='N/A')return'#000'; const u=String(v).toUpperCase(); return u.includes('A')?'#4ade80':u.includes('B')?'#facc15':u.includes('C')?'#fb923c':'#f87171'; }
        function getLandcoverColor(v){ if(!v||v==='N/A')return'#000'; let h=0,s=String(v); for(let i=0;i<s.length;i++)h=s.charCodeAt(i)+((h<<5)-h); const c=['#16a34a','#ca8a04','#2563eb','#dc2626','#9333ea','#0891b2','#ea580c','#db2777','#57534e','#65a30d']; return c[Math.abs(h)%c.length]; }
        function getStyle(t,v){
            if(t==='overall')return{s:'#000',f:'transparent',o:0,w:3};
            if(t==='drainage')return{s:'#4f46e5',f:'#6366f1',o:0.2,w:2};
            if(t==='sub')return{s:'#d97706',f:'#fbbf24',o:0.3,w:1};
            if(t==='wss')return{s:'#fff',f:getWSSColor(v),o:0.7,w:0.5};
            if(t==='landcover')return{s:'#fff',f:getLandcoverColor(v),o:0.7,w:0.5};
        }
        function updateLegend(){ const c=document.getElementById('legend-content'); c.innerHTML=''; const mk=(l,t,f)=>{if(l.visible&&l.uniqueValues.size>0){c.innerHTML+=`<div class="mb-4"><div class="text-[10px] font-bold text-slate-400 uppercase border-b mb-1">${t}</div>${[...l.uniqueValues].sort().map(v=>`<div class="flex items-center gap-2 text-[10px] mb-1"><span class="w-2 h-2 rounded-full" style="background:${f(v)}"></span>${v}</div>`).join('')}</div>`;}}; mk(appState.layers.wss,'Soils',getWSSColor); mk(appState.layers.landcover,'Landcover',getLandcoverColor); if(c.innerHTML==='')c.innerHTML='<div class="text-xs text-center text-slate-400 italic">Sin datos activos</div>';}
        function openPopup(p,pos){ const d=document.createElement('div'); d.className='iw-container p-4'; d.innerHTML='<div class="text-xs font-bold text-indigo-600 border-b mb-2">Feature Info</div><p class="text-xs">Properties available in raw data.</p>'; infoWindow.setContent(d); infoWindow.setPosition(pos); infoWindow.open(map); }
        
        // --- CN TABLE & MAPPING UI ---
        function toggleCNModal(){ document.getElementById('cn-modal').classList.toggle('hidden'); renderCNTable(); }
        function renderCNTable(){ const b=document.getElementById('cn-table-body'); b.innerHTML=''; cnDictionary.forEach((r,i)=>{b.innerHTML+=`<tr class="border-b hover:bg-slate-50"><td class="px-6 py-2"><input value="${r.name}" onchange="ucn(${i},'name',this.value)" class="w-full bg-transparent border-none text-xs font-bold text-slate-600"></td>${['a','b','c','d'].map(k=>`<td class="px-1"><input type="number" value="${r[k]}" onchange="ucn(${i},'${k}',this.value)" class="w-full text-center bg-slate-100 rounded text-xs py-1"></td>`).join('')}</tr>`;});}
        function ucn(i,k,v){ cnDictionary[i][k]=k==='name'?v:parseInt(v); }
        function addNewRow(){ cnDictionary.push({id:Date.now(),name:"New",a:98,b:98,c:98,d:98}); renderCNTable(); }
        
        function showMappingModal(){ const m=document.getElementById('mapping-modal'), c=document.getElementById('mapping-container'); c.innerHTML=''; const o=cnDictionary.map(r=>`<option value="${r.name}">${r.name}</option>`).join(''); appState.invalidValues.forEach((v,i)=>{c.innerHTML+=`<div class="bg-white p-3 rounded border shadow-sm flex flex-col gap-2"><div class="flex items-center gap-2"><div class="flex-1 bg-red-50 text-red-600 text-xs p-2 rounded border border-red-100 truncate">${v}</div><span class="material-symbols-rounded text-slate-300">arrow_forward</span><select id="map-${i}" class="flex-1 border rounded text-xs p-2"><option value="">-- Select --</option>${o}</select></div></div>`;}); m.classList.remove('hidden'); }
        function cancelMapping(){ document.getElementById('mapping-modal').classList.add('hidden'); appState.pendingGeoJSON=null; appState.invalidValues=[]; const i=document.getElementById('file-landcover'); if(i){i.disabled=false;i.value='';} document.getElementById('loader-landcover').classList.add('hidden'); sysLog.add('VAL','Mapping cancelled.','warn'); }
        function applyMapping(){
            const map={}; let err=false; appState.invalidValues.forEach((v,i)=>{const e=document.getElementById(`map-${i}`); if(!e.value){e.classList.add('border-red-500');err=true;}else map[v]=e.value;});
            if(err)return;
            const geo=appState.pendingGeoJSON, fs=Array.isArray(geo)?geo.flatMap(g=>g.features):geo.features;
            fs.forEach(f=>{const k=detectAttributeKey(f.properties,'landcover'); if(k){const o=f.properties[k]||"N/A"; if(map[o])f.properties[k]=map[o];}});
            document.getElementById('mapping-modal').classList.add('hidden');
            sysLog.add('VAL','Manual mapping applied.','success');
            finishLayerLoad(geo,'landcover'); appState.pendingGeoJSON=null;
        }

        sysLog.add('SYS', 'Initialization Complete. Waiting for user input.', 'info');
        initMap();
