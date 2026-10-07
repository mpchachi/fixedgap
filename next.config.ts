import type { NextConfig } from "next";

// /plataforma: plataforma clínica de FixedGap (app de juegos + dashboard del médico).
// Vive en su propio proyecto de Vercel (`fixedgap-plataforma`, repo DiariodeArrieta) y aquí
// solo se sirve a través de un rewrite: así los cambios de la plataforma no redespliegan la
// web. No se enlaza desde la web y no se indexa.
const PLATAFORMA = "https://fixedgap-plataforma.vercel.app";
const PLATAFORMA_HEADERS = [
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  // La cámara solo se usa aquí (reconocimiento de la mano en el navegador del paciente).
  { key: "Permissions-Policy", value: "camera=(self)" },
];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/plataforma", destination: `${PLATAFORMA}/plataforma/` },
        { source: "/plataforma/:path*", destination: `${PLATAFORMA}/plataforma/:path*` },
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
