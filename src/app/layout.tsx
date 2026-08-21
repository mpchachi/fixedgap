import type { Metadata } from "next";
// BEFORE — to revert if needed:
// import { Inter } from "next/font/google";
// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });

// DM Sans (commented):
// import { DM_Sans } from "next/font/google";
// const dmSans = DM_Sans({
//   variable: "--font-dm-sans",
//   subsets: ["latin"],
//   weight: ['300', '400', '500', '600', '700', '800'],
// });

// Testing Plus Jakarta Sans:
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "FixedGap — Post-Stroke Rehabilitation Platform",
  description: "AI-powered rehabilitation platform for stroke recovery. Computer vision biomechanics analysis for neurological rehabilitation.",
  openGraph: {
    title: "FixedGap — Post-Stroke Rehabilitation Platform",
    description: "AI-powered rehabilitation platform for stroke recovery. Computer vision biomechanics analysis for neurological rehabilitation.",
    url: 'https://fixedgap.com', // Cambia esto por tu dominio real cuando lo tengas
    siteName: 'FixedGap',
    images: [
      {
        url: '/og-image.jpg', // Ruta a tu imagen Open Graph
        width: 1200,
        height: 630,
        alt: 'FixedGap - Post-Stroke Rehabilitation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FixedGap — Post-Stroke Rehabilitation Platform",
    description: "AI-powered rehabilitation platform for stroke recovery. Computer vision biomechanics analysis for neurological rehabilitation.",
    images: ['/og-image.jpg'], // Misma imagen para Twitter
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.jpeg', type: 'image/jpeg' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
