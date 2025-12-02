import Hero from "@/components/homePage/hero/Hero";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faq } from "@/components/homePage/faq/Faq";
import { services } from "@/components/homePage/services/services";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection";
import { BEFORE_AFTER_IMAGES } from "@/components/homePage/beforeAfter/beforeAfter";

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
      <BeforeAfterSection
        _type="beforeAfterSection"
        type="beforeAfterSection"
        items={BEFORE_AFTER_IMAGES}
        uniqueKey="home-before-after"
      />
      <FaqSection
        _type="faqSection"
        type="faqSection"
        description="Har du nogen spørgsmål?"
        items={faq}
        uniqueKey="home-faq"
      />
    </>
  );
}
