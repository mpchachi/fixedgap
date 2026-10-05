import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geist = Geist({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fixedgap.com"),
  title: "FixedGap | See Recovery Between Visits",
  description:
    "Camera-based motor recovery monitoring for stroke care, designed for patients at home and clinical teams.",
  openGraph: {
    title: "FixedGap | See Recovery Between Visits",
    description:
      "Camera-based motor recovery monitoring for stroke care, designed for patients at home and clinical teams.",
    url: "https://fixedgap.com",
    siteName: "FixedGap",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FixedGap",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixedGap | See Recovery Between Visits",
    description:
      "Camera-based motor recovery monitoring for stroke care, designed for patients at home and clinical teams.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
