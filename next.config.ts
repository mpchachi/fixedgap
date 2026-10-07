import type { NextConfig } from "next";

// /plataforma: plataforma clínica de FixedGap (app de juegos + dashboard del médico).
// Es un build estático copiado en public/plataforma desde el repo de la plataforma
// (`npm run build:web` en FixedGapMVP/demo). No se enlaza desde la web y no se indexa.
const PLATAFORMA_HEADERS = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  // La cámara solo se usa aquí (reconocimiento de la mano en el navegador del paciente).
  { key: "Permissions-Policy", value: "camera=(self)" },
];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/plataforma", destination: "/plataforma/index.html" },
        // Dashboard (aplicación de una sola página): cualquier ruta interna → su index.html.
        { source: "/plataforma/dashboard", destination: "/plataforma/dashboard/index.html" },
        { source: "/plataforma/dashboard/:path((?!assets/|.*\\..*).*)", destination: "/plataforma/dashboard/index.html" },
      ],
    };
  },
  async headers() {
    return [
      { source: "/plataforma", headers: PLATAFORMA_HEADERS },
      { source: "/plataforma/:path*", headers: PLATAFORMA_HEADERS },
    ];
  },
};

export default nextConfig;
