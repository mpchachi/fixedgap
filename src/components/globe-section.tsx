"use client";

import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const markers: GlobeMarker[] = [
  {
    lat: 40.4168,
    lng: -3.7038,
    src: "https://flagcdn.com/w80/es.png",
    label: "Spain",
    info: "~0.8M stroke survivors",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://flagcdn.com/w80/us.png",
    label: "New York",
    info: "~1.8M stroke survivors (Northeast)",
  },
  {
    lat: 34.0522,
    lng: -118.2437,
    src: "https://flagcdn.com/w80/us.png",
    label: "Los Angeles",
    info: "~1.7M stroke survivors (West)",
  },
  {
    lat: 41.8781,
    lng: -87.6298,
    src: "https://flagcdn.com/w80/us.png",
    label: "Chicago",
    info: "~1.5M stroke survivors (Midwest)",
  },
  {
    lat: 25.7617,
    lng: -80.1918,
    src: "https://flagcdn.com/w80/us.png",
    label: "Miami",
    info: "~1.3M stroke survivors (Southeast)",
  },
  {
    lat: 52.52,
    lng: 13.405,
    src: "https://flagcdn.com/w80/de.png",
    label: "Germany",
    info: "~1.2M stroke survivors",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    src: "https://flagcdn.com/w80/fr.png",
    label: "France",
    info: "~1.1M stroke survivors",
  },
];

export function GlobeSection() {
  return (
    <section className="pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8 animate-on-scroll">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
            Go-to-market
          </p>
          <h2 className="font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">
            From Madrid to the world
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto mt-4 leading-relaxed">
            Starting in Spain, expanding to the U.S., Germany, and France —
            targeting the largest post-stroke rehabilitation markets where remote
            monitoring is most needed.
          </p>
          <p className="text-xs text-slate-400 mt-4">
            Hover over the flags to explore each market
          </p>
        </div>
      </div>

      <Globe3D
        markers={markers}
        className="h-[450px] md:h-[550px]"
        config={{
          atmosphereColor: "#6482b9",
          atmosphereIntensity: 0.4,
          showAtmosphere: true,
          bumpScale: 3,
          autoRotateSpeed: 0.4,
        }}
        onMarkerClick={(marker) => {
          console.log("Clicked:", marker.label);
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-on-scroll delay-2">
          {[
            { city: "Madrid", label: "HQ & First Pilots" },
            { city: "New York", label: "U.S. Market Entry" },
            { city: "Berlin", label: "DiGA Pathway" },
            { city: "Paris", label: "EU Expansion" },
          ].map((item) => (
            <div key={item.city} className="text-center p-4 rounded-xl bg-white/60 border border-slate-200">
              <p className="text-sm font-semibold text-slate-900">{item.city}</p>
              <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
