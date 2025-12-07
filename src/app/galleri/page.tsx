import Hero from "@/components/galleriPage/hero/Hero";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_GALLERIES_QUERY } from "@/lib/queries";
import { GallerySection as GallerySectionType } from "@/types/page";
import GallerySection from "@/components/galleriPage/gallerySection/GallerySection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Galleri",
    href: "/galleri",
  },
];

export interface Gallery {
  title: string;
  slug: string;
  gallery: GallerySectionType;
}

export default async function GalleriPage() {
  const gallerySections = await fetchSanityData<Gallery[]>(ALL_GALLERIES_QUERY);

  if (!gallerySections || !gallerySections?.length) return null;

  return (
    <>
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      {gallerySections.map((section) => (
        <GallerySection section={section} key={section?.slug} />
      ))}
    </>
  );
}
