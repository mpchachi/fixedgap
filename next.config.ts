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
  // Dev only: lets local tooling load the page through 127.0.0.1 as well as localhost.
  allowedDevOrigins: ["127.0.0.1"],
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
  async redirects() {
    const to = (source: string, destination: string) => ({ source, destination, permanent: false });
    return [
      // Product
      to("/product/experience", "/product#exercises"),
      to("/product/biomarkers", "/product#biomarkers"),
      to("/product/dashboard", "/product#dashboard"),
      to("/demo", "/product#demo"),
      // Science
      to("/science/evidence", "/science#evidence"),
      to("/science/validation", "/science#foundation"),
      to("/science/references", "/science#references"),
      // Company
      to("/company/about", "/company"),
      to("/company/team", "/company#team"),
      to("/company/media", "/awards"),
      // Removed pages
      to("/pricing", "/contact"),
      to("/market", "/"),
      to("/contact/faq", "/contact#faq"),
      to("/contact/who-we-work-with", "/contact"),
    ];
  },
};

export default nextConfig;
