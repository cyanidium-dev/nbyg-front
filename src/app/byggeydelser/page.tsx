import { ctaData } from "@/components/byggeydelserPage/cta/ctaData";
import Hero from "@/components/byggeydelserPage/hero/Hero";
import Services from "@/components/byggeydelserPage/services/Services";
import CtaSection from "@/components/shared/sections/ctaSection/CtaSection";
import Container from "@/components/shared/container/Container";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faqList } from "@/components/byggeydelserPage/faq/faqList";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { SERVICES_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: SERVICES_PAGE_QUERY,
    path: "/byggeydelser",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Byggeydelser",
    href: "/byggeydelser",
  },
];

export default async function ByggeydelserPage() {
  const schemaJson = await getPageSchemaJson(SERVICES_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
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
