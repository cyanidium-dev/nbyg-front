import Hero from "@/components/omOsPage/hero/Hero";
import HistorySection from "@/components/omOsPage/historySection/HistorySection";
import IdeaSection from "@/components/omOsPage/ideaSection/IdeaSection";
import ValuesSection from "@/components/omOsPage/valuesSection/ValuesSection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getDefaultMetadata("/om-os");
}

export default function OmOsPage() {
  const crumbs = [
    { label: "Hjem", href: "/" },
    {
      label: "Om os",
      href: "/om-os",
    },
  ];

  return (
    <>
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      <HistorySection />
      <IdeaSection />
      <ValuesSection />
    </>
  );
}
