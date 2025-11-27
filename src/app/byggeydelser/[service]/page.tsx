import type { ComponentType } from "react";
import HeroSection from "@/components/shared/sections/heroSection/HeroSection";
import CtaSection from "@/components/shared/sections/ctaSection/CtaSection";
import TableSection from "@/components/shared/sections/tableSection/TableSection";
import MaterialSliderSection from "@/components/shared/sections/materialSliderSection/MaterialSliderSection";
import GallerySection from "@/components/shared/sections/gallerySection/GallerySection";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection";
import ImageTextButtonSection from "@/components/shared/sections/imageTextButtonSection/ImageTextButtonSection";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import TableWithImageSection from "@/components/shared/sections/tableWithImageSection/TableWithImageSection";
import TextRevealCardsSliderSection from "@/components/shared/sections/textRevealCardsSliderSection/TextRevealCardsSliderSection";
import { PAGE_BY_SLUG_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import type { PageSection, SanityPage } from "@/types/page";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

const sectionComponentMap: Partial<
  Record<PageSection["_type"], ComponentType<PageSection>>
> = {
  heroSection: HeroSection as ComponentType<PageSection>,
  ctaSection: CtaSection as ComponentType<PageSection>,
  tableSection: TableSection as ComponentType<PageSection>,
  materialSliderSection: MaterialSliderSection as ComponentType<PageSection>,
  gallerySection: GallerySection as ComponentType<PageSection>,
  beforeAfterSection: BeforeAfterSection as ComponentType<PageSection>,
  imageTextButtonSection: ImageTextButtonSection as ComponentType<PageSection>,
  faqSection: FaqSection as ComponentType<PageSection>,
  tableWithImageSection: TableWithImageSection as ComponentType<PageSection>,
  textReavealCardsSliderSection: TextRevealCardsSliderSection as ComponentType<PageSection>,
};

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;

  const currentService = await fetchSanityData<SanityPage>(PAGE_BY_SLUG_QUERY, {
    slug: service,
    parentSlug: "",
  });

  if (!currentService) {
    return null;
  }

  return (
    <>
      {currentService.sections?.map((section, index) => {
        const SectionComponent = sectionComponentMap[section._type];

        if (!SectionComponent) {
          return null;
        }

        const key =
          (section as { _key?: string })._key ??
          `${service}-${section._type}-${index}`;

        return <SectionComponent key={key} {...section} uniqueKey={key} />;
      })}
    </>
  );
}
