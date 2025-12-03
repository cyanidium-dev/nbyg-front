import Hero from "@/components/galleriPage/hero/Hero";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { ALL_GALLERIES_QUERY } from "@/lib/queries";
import { GallerySection as GallerySectionType } from "@/types/page";
import GallerySection from "@/components/galleriPage/gallerySection/GallerySection";

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
      {gallerySections.map((section) => (
        <GallerySection section={section} key={section?.slug} />
      ))}
    </>
  );
}
