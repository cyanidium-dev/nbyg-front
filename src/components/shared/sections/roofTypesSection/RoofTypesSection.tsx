import type { RoofTypesSection as RoofTypesSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../portableTextComponents/PortableTextComponents";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import RoofTypesList from "./RoofTypesList";
import RoofTypesDecorations from "./RoofTypesDecorations";

interface RoofTypesSectionProps extends RoofTypesSectionData {
  uniqueKey?: string;
}

const RoofTypesSection = (_props: RoofTypesSectionProps) => {
  const {
    title,
    description,
    description2,
    description3,
    subtitle,
    image,
    roofTypes,
    uniqueKey,
  } = _props;

  return (
    <section>
      <Container className="relative py-25 lg:pt-[105px] lg:pb-0">
        <RoofTypesDecorations uniqueKey={uniqueKey} />

        <div className="relative">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="lg:hidden absolute -top-[26px] left-0"
          />
          <SectionTitle className="mb-8 lg:whitespace-pre-line">
            {title}
          </SectionTitle>
        </div>

        <div className="lg:flex flex-row justify-between gap-32 mb-12 lg:mb-[54px]">
          <motion.div
            key={`${uniqueKey}-roof-types-description1`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.3, y: 30 })}
            className="lg:w-1/2"
          >
            <PortableText
              value={
                description as unknown as Parameters<
                  typeof PortableText
                >[0]["value"]
              }
              components={portableTextComponents}
            />
          </motion.div>

          <motion.div
            key={`${uniqueKey}-roof-types-description2`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.4, y: 30 })}
            className="hidden lg:block w-1/2"
          >
            <PortableText
              value={
                description2 as unknown as Parameters<
                  typeof PortableText
                >[0]["value"]
              }
              components={portableTextComponents}
            />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-25 mb-6 lg:mb-9">
          <motion.div
            key={`${uniqueKey}-roof-types-subtitle`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.6, y: 30 })}
            className="lg:w-1/2 shrink-0"
          >
            <h3 className="font-find-sans-pro text-[20px] lg:text-[24px] leading-[120%] uppercase lg:whitespace-pre-line">
              {subtitle}
            </h3>
          </motion.div>
          <motion.div
            key={`${uniqueKey}-roof-types-description3`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, delay: 0.5, y: 30 })}
          >
            <PortableText
              value={
                description3 as unknown as Parameters<
                  typeof PortableText
                >[0]["value"]
              }
              components={portableTextComponents}
            />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-5">
          {image ? (
            <motion.div
              key={`${uniqueKey}-roof-types-image`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.4, x: 30 })}
              className="relative w-full lg:w-1/2 h-60 lg:h-auto rounded-[8px] overflow-hidden shrink-0"
            >
              <Image
                src={urlForSanityImage(image).url()}
                fill
                alt={image?.alt || "Tagtyper"}
                className="object-cover"
              />
            </motion.div>
          ) : null}
          <RoofTypesList roofTypes={roofTypes} uniqueKey={uniqueKey} />
        </div>
      </Container>
    </section>
  );
};

export default RoofTypesSection;
