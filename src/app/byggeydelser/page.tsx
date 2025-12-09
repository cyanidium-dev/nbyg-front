import { ctaData } from "@/components/byggeydelserPage/cta/ctaData";
import Hero from "@/components/byggeydelserPage/hero/Hero";
import Services from "@/components/byggeydelserPage/services/Services";
import CtaSection from "@/components/shared/sections/ctaSection/CtaSection";
import Container from "@/components/shared/container/Container";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faqList } from "@/components/byggeydelserPage/faq/faqList";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getDefaultMetadata("/byggeydelser");
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Byggeydelser",
    href: "/byggeydelser",
  },
];

export default function ByggeydelserPage() {
  return (
    <>
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      <Services />
      <CtaSection {...ctaData} uniqueKey={"byggeydelser-contact-cta"} />
      <Container>
        <FaqSection
          _type="faqSection"
          type="faqSection"
          items={faqList}
          uniqueKey="byggeydelser-faq"
        />
      </Container>
    </>
  );
}
