'use client';

import Script from 'next/script';
import { legacyMarkup } from './legacyMarkup';

export default function Home() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-900 relative text-slate-800">
      <div dangerouslySetInnerHTML={{ __html: legacyMarkup }} />

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.9.0/proj4.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/shpjs@latest/dist/shp.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/@turf/turf/turf.min.js" strategy="beforeInteractive" />

      <Script id="google-maps-loader" strategy="beforeInteractive">{`
        const googleMapsApiKey = '${googleMapsApiKey ?? ''}';
        if (!googleMapsApiKey) {
          console.error('Google Maps API key is not configured. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.');
        }
        (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src='https://maps.'+c+'apis.com/maps/api/js?'+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
          key: googleMapsApiKey,
          v: "weekly",
        });
      `}</Script>

      <Script src="/scripts/hydro-manager.js" strategy="afterInteractive" />
    </main>
  );
}
