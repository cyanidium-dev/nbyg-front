import Hero from "@/components/galleriPage/hero/Hero";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_GALLERIES_QUERY } from "@/lib/queries";
import GallerySection from "@/components/galleriPage/gallerySection/GallerySection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { SanityImage } from "@/types/page";

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
    image?: SanityImage | string;
  }>;
}

export default async function GalleriPage() {
  const gallerySections = await fetchSanityData<Gallery[]>(ALL_GALLERIES_QUERY);

  if (!gallerySections || !gallerySections?.length) return null;

  return (
    <>
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      {gallerySections.map((section, index) => (
        <GallerySection section={section} key={section?.title || index} />
      ))}
    </>
  );
}
