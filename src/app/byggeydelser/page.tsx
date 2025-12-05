import { ctaData } from "@/components/byggeydelserPage/cta/ctaData";
import Hero from "@/components/byggeydelserPage/hero/Hero";
import Services from "@/components/byggeydelserPage/services/Services";
import CtaSection from "@/components/shared/sections/ctaSection/CtaSection";

export default function ByggeydelserPage() {
  return (
    <>
      <Hero />
      <Services />
      <CtaSection {...ctaData} uniqueKey={"byggeydelser-contact-cta"} />
    </>
  );
}
