import type { CtaSection as CtaSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import MainButton from "../../buttons/MainButton";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import ExpandableDescription from "./ExpandableDescription";
import Link from "next/link";

interface CtaSectionProps extends CtaSectionData {
  uniqueKey?: string;
}

const CtaSection = (_props: CtaSectionProps) => {
  const { title, description, image, buttonType, uniqueKey, showMoreOnMobile } =
    _props;

  return (
    <section>
      <Container className="relative py-25 lg:pt-[127px] lg:pb-0">
        <motion.div
          key={`${uniqueKey}-cta-section-image1`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
          className="lg:hidden absolute -top-5 right-[calc(50%-332px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] w-[337px] h-[421px]"
        >
          <Image
            src="/images/decorations/ellipsis.svg"
            width="337"
            height="421"
            alt="ellipsis"
          />
        </motion.div>
        <div className="relative w-full">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="absolute -top-[26px] left-0 lg:left-auto lg:top-auto lg:right-0 lg:bottom-5"
          />
          <SectionTitle
            key={`${uniqueKey}-${title}`}
            className="w-fit mb-8 lg:mb-9"
          >
            {title}
          </SectionTitle>
        </div>

        <div className="flex flex-col md:flex-row-reverse md:justify-between gap-10 xl:gap-[109px]">
          <motion.div
            key={`${uniqueKey}-cta-description-${title}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: 30 })}
            className="md:flex flex-col gap-12 md:w-[calc(50%-20px)] xl:w-[calc(50%-54.5px)]"
          >
            <ExpandableDescription
              description={description}
              showMoreOnMobile={showMoreOnMobile}
            />

            {buttonType === "calculatorTerrace" ? (
              <Link href="/terrasseprisberegner" className="hidden md:block">
                <MainButton className="h-[58px]">Begær terrassepris</MainButton>
              </Link>
            ) : buttonType === "calculatorRoof" ? (
              <Link href="/tagprisberegner" className="hidden md:block">
                <MainButton className="h-[58px]">
                  Beregn prisen på taget
                </MainButton>
              </Link>
            ) : (
              <Link href="/kontakt-os" className="hidden md:block">
                {" "}
                <MainButton className="h-[58px]">Kontakt os</MainButton>
              </Link>
            )}
          </motion.div>
          <motion.div
            key={`${uniqueKey}-cta-image-${title}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: -30, delay: 0.3 })}
            className="relative h-50 md:h-auto md:w-[calc(50%-20px)] xl:w-[calc(50%-54.5px)] rounded-[8px] overflow-hidden"
          >
            <Image
              src={
                typeof image === "string"
                  ? image
                  : urlForSanityImage(image).url()
              }
              alt={
                typeof image === "string"
                  ? "CTA billede"
                  : image?.alt || "CTA billede"
              }
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            key={`${uniqueKey}-cta-mobile-button-${title}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, x: 30, delay: 0.3 })}
            className="md:hidden"
          >
            {buttonType === "calculatorTerrace" ? (
              <Link href="/terrasseprisberegner">
                <MainButton className="h-[58px]">Begær terrassepris</MainButton>
              </Link>
            ) : buttonType === "calculatorRoof" ? (
              <Link href="/tagprisberegner">
                <MainButton className="h-[58px]">
                  Beregn prisen på taget
                </MainButton>
              </Link>
            ) : (
              <Link href="/kontakt-os">
                <MainButton className="h-[58px]">Kontakt os</MainButton>
              </Link>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CtaSection;
