import dynamic from "next/dynamic";
import { Suspense } from "react";
import Hero from "@/components/homePage/hero/Hero";
import WhyUs from "@/components/homePage/whyUs/WhyUs";
import BottomCTA from "@/components/homePage/bottomCTA/BottomCTA";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faq } from "@/components/homePage/faq/Faq";
import { services } from "@/components/homePage/services/services";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";
import { BEFORE_AFTER_IMAGES } from "@/components/homePage/beforeAfter/beforeAfter";
import Reviews from "@/components/homePage/reviews/Reviews";
import Gallery from "@/components/homePage/gallery/Gallery";
import Container from "@/components/shared/container/Container";
import SectionLoader from "@/components/shared/loader/SectionLoader";

const TextRevealCardsSliderSection = dynamic(
  () =>
    import(
      "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection"
    ),
  { ssr: false }
);

const BeforeAfterSection = dynamic(
  () =>
    import(
      "@/components/shared/sections/beforeAfterSection/BeforeAfterSection"
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Hero />
      <AboutUs />
      <Suspense fallback={<SectionLoader />}>
        <TextRevealCardsSliderSection
          _type="textReavealCardsSliderSection"
          type="textReavealCardsSliderSection"
          title={`Vores\ntjenester`}
          cards={services}
          linkButtonText="Gå til servicesiden"
          linkButtonLink="/byggeydelser"
        />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BeforeAfterSection
          _type="beforeAfterSection"
          type="beforeAfterSection"
          items={BEFORE_AFTER_IMAGES}
          uniqueKey="home-before-after"
        />
      </Suspense>
      <WhyUs />
      <Gallery />
      <BottomCTA />
      <Container>
        <FaqSection
          _type="faqSection"
          type="faqSection"
          description="Har du nogen spørgsmål?"
          items={faq}
          uniqueKey="home-faq"
        />
      </Container>
      <Reviews />
    </>
  );
}
