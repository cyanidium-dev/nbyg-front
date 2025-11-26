import type { MaterialSliderSection as MaterialSliderSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import { PortableText } from "@portabletext/react";
import MaterialsSlider from "./MaterialsSlider";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import MaterialsSliderDecorations from "./MaterialsSliderDecorations";
import { portableTextComponents } from "../../portableTextComponents/PortableTextComponents";

interface MaterialSliderSectionProps extends MaterialSliderSectionData {
  uniqueKey?: string;
}

const MaterialSliderSection = (_props: MaterialSliderSectionProps) => {
  const {
    title,
    titlePosition,
    subtitle,
    description1,
    description2,
    slides,
    uniqueKey,
  } = _props;

  return (
    <section className="overflow-hidden">
      <Container className="relative py-25 lg:pt-[152px] lg:pb-0 overflow-visible">
        <MaterialsSliderDecorations uniqueKey={uniqueKey} />
        <div className="relative">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="lg:hidden absolute -top-[26px] left-0"
          />
          <SectionTitle
            className={`mb-8 lg:mb-6 ${titlePosition === "left" ? "lg:text-left" : "lg:text-right"}`}
          >
            {title}
          </SectionTitle>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:flex-50 mb-12 lg:mb-9">
          <motion.div
            key={`${uniqueKey}-materials-slider-description1-${title}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: -30, delay: 0.3 })}
            className="lg:w-[calc(50%-100px)] shrink-0"
          >
            <PortableText
              value={
                description1 as unknown as Parameters<
                  typeof PortableText
                >[0]["value"]
              }
              components={portableTextComponents}
            />
          </motion.div>
          <motion.div
            key={`${uniqueKey}-materials-slider-description2-${title}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: 30, delay: 0.3 })}
            className="lg:w-[calc(50%-100px)] shrink-0"
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
        <div
          className={`flex justify-between items-center ${titlePosition === "left" ? "flex-row" : "flex-row-reverse"}`}
        >
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            delay={0.6}
            className="hidden lg:flex"
          />
          <motion.h3
            key={`${uniqueKey}-materials-slider-subtitle-${title}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.7, delay: 0.6 })}
            className={`max-w-[536px] mb-10 lg:mb-9 font-find-sans-pro text-[20px] lg:text-[24px] leading-[120%] uppercase ${titlePosition === "left" ? "lg:text-right" : "lg:text-left"}`}
          >
            {subtitle}
          </motion.h3>
        </div>
        <motion.div
          key={`${uniqueKey}-materials-slider-subtitle-${title}`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
          className="w-screen max-w-[1410px]"
        >
          <MaterialsSlider
            slides={slides}
            key={`${uniqueKey}-materials-slider-swiper-${title}`}
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default MaterialSliderSection;
