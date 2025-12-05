import { Suspense, type ComponentType } from "react";
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
import RoofTypesSection from "@/components/shared/sections/roofTypesSection/RoofTypesSection";
import LargeTableSection from "@/components/shared/sections/largeTableSection/LargeTableSection";
import Container from "@/components/shared/container/Container";
import { PAGE_BY_SLUG_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";
import type { PageSection, SanityPage } from "@/types/page";
import Loader from "@/components/shared/loader/Loader";

interface SubservicePageProps {
  params: Promise<{ service: string; subservice: string }>;
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
  textReavealCardsSliderSection:
    TextRevealCardsSliderSection as ComponentType<PageSection>,
  roofTypesSection: RoofTypesSection as ComponentType<PageSection>,
  largeTableSection: LargeTableSection as ComponentType<PageSection>,
};

export default async function SubservicePage({ params }: SubservicePageProps) {
  const { service, subservice } = await params;

  const currentSubservice = await fetchSanityData<SanityPage>(
    PAGE_BY_SLUG_QUERY,
    {
      slug: subservice,
      parentSlug: service,
    }
  );

  if (!currentSubservice) {
    return null;
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        {currentSubservice.sections?.map((section, index) => {
          // Filter gallerySection - only show if showOnServicesPage is true
          if (
            section._type === "gallerySection" &&
            !(section as { showOnServicesPage?: boolean }).showOnServicesPage
          ) {
            return null;
          }

          const SectionComponent = sectionComponentMap[section._type];

          if (!SectionComponent) {
            return null;
          }

          const sectionKey =
            (section as { _key?: string })._key ?? `${section._type}-${index}`;
          const key = `${service}-${subservice}-${sectionKey}`;

          // Обгортаємо FaqSection в Container на сторінках subservice
          if (section._type === "faqSection") {
            return (
              <Container key={key}>
                <SectionComponent {...section} uniqueKey={key} />
              </Container>
            );
          }

          return <SectionComponent key={key} {...section} uniqueKey={key} />;
        })}
      </Suspense>
    </>
  );
}
