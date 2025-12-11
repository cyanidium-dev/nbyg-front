import Hero from "@/components/galleriPage/hero/Hero";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_GALLERIES_QUERY } from "@/lib/queries";
import GallerySection from "@/components/galleriPage/gallerySection/GallerySection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { SanityImage } from "@/types/page";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { GALLERY_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: GALLERY_PAGE_QUERY,
    path: "/galleri",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Galleri",
    href: "/galleri",
  },
];

export interface Gallery {
  title: string;
  description: string;
  items: Array<{
    _key?: string;
    image?: SanityImage | { link: string; alt: string };
  }>;
}

export default async function GalleriPage() {
  const gallerySections = await fetchSanityData<Gallery[]>(ALL_GALLERIES_QUERY);
  const schemaJson = await getPageSchemaJson(GALLERY_PAGE_QUERY);

  if (!gallerySections || !gallerySections?.length) return null;

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      {gallerySections.map((section, index) => (
        <GallerySection section={section} key={section?.title || index} />
      ))}
    </>
  );
}
