import { Suspense } from "react";
import Hero from "@/components/homePage/hero/Hero";
import WhyUs from "@/components/homePage/whyUs/WhyUs";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faq } from "@/components/homePage/faq/Faq";
import { services } from "@/components/homePage/services/services";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";
import { BEFORE_AFTER_IMAGES } from "@/components/homePage/beforeAfter/beforeAfter";
import Container from "@/components/shared/container/Container";
import SectionLoader from "@/components/shared/loader/SectionLoader";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection.lazy";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection.lazy";
import Gallery from "@/components/homePage/gallery/Gallery.lazy";
import Reviews from "@/components/homePage/reviews/Reviews.lazy";
import BottomCTA from "@/components/homePage/bottomCTA/BottomCTA.lazy";
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
      <Suspense fallback={<SectionLoader />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <BottomCTA />
      </Suspense>
      <Container>
        <FaqSection
          _type="faqSection"
          type="faqSection"
          description="Har du nogen spørgsmål?"
          items={faq}
          uniqueKey="home-faq"
        />
      </Container>
      <Suspense fallback={<SectionLoader />}>
        <Reviews />
      </Suspense>
    </>
  );
}
