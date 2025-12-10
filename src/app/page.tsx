import Hero from "@/components/homePage/hero/Hero";
import WhyUs from "@/components/homePage/whyUs/WhyUs";
import BottomCTA from "@/components/homePage/bottomCTA/BottomCTA";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faq } from "@/components/homePage/faq/Faq";
import { services } from "@/components/homePage/services/services";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection";
import { BEFORE_AFTER_IMAGES } from "@/components/homePage/beforeAfter/beforeAfter";
import Reviews from "@/components/homePage/reviews/Reviews";
import Gallery from "@/components/homePage/gallery/Gallery";
import Container from "@/components/shared/container/Container";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";
import { HOME_PAGE_QUERY } from "@/lib/queries";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: HOME_PAGE_QUERY,
    path: "/",
  });
}

export default async function Home() {
  const schemaJson = await getPageSchemaJson(HOME_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
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
