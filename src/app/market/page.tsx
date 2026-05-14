import { Market } from "@/components/market";
import { GlobeSection } from "@/components/globe-section";

export const metadata = {
  title: "Market — FixedGap",
};

export default function MarketPage() {
  return (
    <>
      <GlobeSection />
      <Market />
    </>
  );
}
