import Hero from "@/components/omOsPage/hero/Hero";
import HistorySection from "@/components/omOsPage/historySection/HistorySection";
import IdeaSection from "@/components/omOsPage/ideaSection/IdeaSection";
import ValuesSection from "@/components/omOsPage/valuesSection/ValuesSection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { ABOUT_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: ABOUT_PAGE_QUERY,
    path: "/om-os",
  });
}

export default async function OmOsPage() {
  const schemaJson = await getPageSchemaJson(ABOUT_PAGE_QUERY);

  const crumbs = [
    { label: "Hjem", href: "/" },
    {
      label: "Om os",
      href: "/om-os",
    },
  ];

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      <HistorySection />
      <IdeaSection />
      <ValuesSection />
    </>
  );
}
