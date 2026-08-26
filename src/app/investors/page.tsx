import { Plus_Jakarta_Sans } from "next/font/google";
import ScrollCanvas from "./ScrollCanvas";
import "./globals.css";
import type { Metadata } from "next";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FixedGap - Investors",
  description: "Remote motor monitoring for post-stroke patients. Pre-Seed: $500,000.",
};

export default function InvestorsPage() {
  return (
    <div className={plusJakarta.className} style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, background: '#000' }}>
      <ScrollCanvas />
    </div>
  );
}
