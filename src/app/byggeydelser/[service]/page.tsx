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
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getDynamicPageMetadata } from "@/utils/getDynamicPageMetadata";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getDynamicPageSchemaJson } from "@/utils/getDynamicPageSchemaJson";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { service } = await params;

  return getDynamicPageMetadata({
    query: PAGE_BY_SLUG_QUERY,
    queryParams: {
      slug: service,
      parentSlug: "",
    },
    path: `/byggeydelser/${service}`,
  });
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;

  const currentService = await fetchSanityData<SanityPage>(PAGE_BY_SLUG_QUERY, {
    slug: service,
    parentSlug: "",
  });

  if (!currentService) {
    return null;
  }

  const { title, slug } = currentService;

  const schemaJson = await getDynamicPageSchemaJson(PAGE_BY_SLUG_QUERY, {
    slug: service,
    parentSlug: "",
  });

  const crumbs = [
    { label: "Hjem", href: "/" },
    {
      label: "Byggeydelser",
      href: "/byggeydelser",
    },
    {
      label: title,
      href: `/byggeydelser/${slug}`,
    },
  ];

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <Suspense fallback={<Loader />}>
        {currentService.sections?.map((section, index) => {
          const { _type } = section;

          const SectionComponent = sectionComponentMap[_type];
          if (!SectionComponent) return null;

          const key =
            (section as { _key?: string })._key ??
            `${service}-${section._type}-${index}`;

          const element =
            _type === "faqSection" ? (
              <Container key={key}>
                <SectionComponent {...section} uniqueKey={key} />
              </Container>
            ) : (
              <SectionComponent key={key} {...section} uniqueKey={key} />
            );

          // Якщо це heroSection — додаємо Breadcrumbs після нього
          if (_type === "heroSection") {
            return (
              <div key={key}>
                {element}
                <Breadcrumbs crumbs={crumbs} />
              </div>
            );
          }

          return element;
        })}
      </Suspense>
    </>
  );
}
