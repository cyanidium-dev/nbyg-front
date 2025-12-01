import Hero from "@/components/homePage/hero/Hero";
import { services } from "@/components/homePage/services/services";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <TextRevealCardsSliderSection
        _type="textReavealCardsSliderSection"
        type="textReavealCardsSliderSection"
        title={`Vores\ntjenester`}
        cards={services}
        linkButtonText="Gå til servicesiden"
        linkButtonLink="/byggeydelser"
      />
    </>
  );
}
