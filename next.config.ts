import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    const to = (source: string, destination: string) => ({ source, destination, permanent: false });
    return [
      // Product
      to('/product/experience', '/product#exercises'),
      to('/product/biomarkers', '/product#biomarkers'),
      to('/product/dashboard', '/product#dashboard'),
      to('/demo', '/product#demo'),
      // Science
      to('/science/evidence', '/science#evidence'),
      to('/science/validation', '/science#foundation'),
      to('/science/references', '/science#references'),
      // Company
      to('/company/about', '/company'),
      to('/company/team', '/company#team'),
      to('/company/media', '/#awards'),
      // Removed pages
      to('/pricing', '/contact'),
      to('/market', '/'),
      to('/contact/faq', '/contact#faq'),
      to('/contact/who-we-work-with', '/contact'),
    ];
  },
};

export default nextConfig;
