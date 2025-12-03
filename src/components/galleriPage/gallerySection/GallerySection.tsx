import { Gallery } from "@/app/galleri/page";
import Container from "@/components/shared/container/Container";
import GallerySlider from "@/components/shared/sections/gallerySection/GallerySlider";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import GalleryDecorations from "./GalleryDecorations";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface GallerySectionProps {
  section: Gallery;
}

export default function GallerySection({ section }: GallerySectionProps) {
  const { title, slug, gallery } = section;

  const { description, items } = gallery;

  if (!items || !items?.length) return null;

  return (
    <section className="relative py-25 lg:pt-[152px] lg:pb-[104px]">
      <GalleryDecorations uniqueKey={slug} />
      <Container className="flex flex-col md:flex-row md:justify-between gap-10 mb-10 lg:mb-14">
        <SectionTitle key={`gallery-${slug}`}>{title}</SectionTitle>
        {description ? (
          <motion.p
            key={`${slug}-description`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: 30, delay: 0.3 })}
            className="max-w-[423px]"
          >
            {description}
          </motion.p>
        ) : null}
      </Container>
      <div className="max-w-[416px] sm:max-w-[726px] md:max-w-[867px] lg:max-w-[1141px] xl:max-w-[1494px] mx-auto">
        <GallerySlider items={items} />
      </div>
    </section>
  );
}
