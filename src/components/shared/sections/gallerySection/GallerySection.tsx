"use client";
import type { GallerySection as GallerySectionData } from "@/types/page";
import GallerySlider from "./GallerySlider";
import Container from "../../container/Container";
import Link from "next/link";
import ArrowIcon from "../../icons/ArrowIcon";
import SectionTitle from "../../titles/SectionTitle";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface GallerySectionProps extends GallerySectionData {
  uniqueKey?: string;
}

const GallerySection = (props: GallerySectionProps) => {
  const { items, uniqueKey } = props;

  if (!items || !items.length) return null;

  return (
    <>
      <section className="py-25 lg:pt-[138px] lg:pb-0">
        <GallerySlider items={items} uniqueKey={uniqueKey} />

        <Container className="flex justify-between items-center mt-10 lg:mt-15">
          <div className="flex gap-4 lg:gap-8 items-center w-fit">
            <SectionTitle className="w-fit">GALLERI</SectionTitle>
            <motion.div
              key={`${uniqueKey}-button`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
              className="w-fit"
            >
              <Link
                href="/galleri"
                className="group flex items-center justify-center size-10 lg:size-15 bg-white rounded-full active:scale-95 transition duration-300 ease-in-out outline-none"
                aria-label="Open gallery"
              >
                <ArrowIcon className="size-4 lg:size-7 text-black xl:group-hover:translate-x-0.5 xl:group-hover:-translate-y-0.5 transition duration-300 ease-in-out" />
              </Link>
            </motion.div>
          </div>
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="hidden sm:flex"
            delay={0.6}
          />
        </Container>
      </section>
    </>
  );
};

export default GallerySection;
