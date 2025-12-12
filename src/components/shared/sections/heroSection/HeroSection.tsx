import * as motion from "motion/react-client";
import { fadeInAnimation, headerVariants } from "@/utils/animationVariants";
import type { HeroSection as HeroSectionData } from "@/types/page";
import Container from "../../container/Container";
import PageTitle from "../../titles/PageTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import MainButton from "../../buttons/MainButton";
import ShevronIcon from "../../icons/ShevronIcon";
import Link from "next/link";
import FormButton from "../../buttons/FormButton";

interface HeroSectionProps extends HeroSectionData {
  uniqueKey?: string;
}

const HeroSection = (_props: HeroSectionProps) => {
  const {
    title,
    description,
    mobileImage,
    desktopImage,
    showDiscussButton,
    showCalculatorTerraceButton,
    showCalculatorRoofButton,
    uniqueKey,
  } = _props;

  return (
    <>
      <motion.section
        key={uniqueKey}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.01 }}
        variants={headerVariants}
        className="relative rounded-b-[18px] overflow-hidden"
      >
        <div
          className="absolute -z-10 inset-0 pointer-events-none"
          style={{
            background: `
        linear-gradient(0deg, rgba(0, 0, 0, 0) -36.89%, rgba(0, 0, 0, 0.464) 91.14%, rgba(0, 0, 0, 0) 144.39%),
        linear-gradient(240.18deg, rgba(0, 0, 0, 0) 19.24%, rgba(0, 0, 0, 0.8) 82.96%)
      `,
          }}
        />
        <Image
          src={urlForSanityImage(mobileImage).url()}
          alt={mobileImage?.alt || "Hero billede"}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="md:hidden -z-20 object-cover object-top"
        />
        <Image
          src={urlForSanityImage(desktopImage).url()}
          alt={desktopImage?.alt || "Hero billede"}
          fill
          sizes="100vw"
          priority
          fetchPriority="high"
          className="hidden md:block -z-20 object-cover object-top"
        />
        <Container className="pt-[146px] lg:pt-[179px] pb-7 lg:pb-20">
          <PageTitle
            className="max-w-[430px] lg:max-w-[978px] mb-6 lg:mb-9"
            uniqueKey={uniqueKey}
          >
            {title}
          </PageTitle>
          <motion.p
            key={`${uniqueKey}-description`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({
              scale: 0.85,
              x: 70,
              y: 30,
              delay: 0.4,
            })}
            className="max-w-[480px] lg:max-w-[685px] mb-6 lg:mb-9 whitespace-pre-line"
          >
            {description}
          </motion.p>
          <motion.div
            key={`${uniqueKey}-buttons`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.85, y: 50, delay: 0.8 })}
            className="flex flex-col sm:flex-row gap-3 sm:gap-[30px] sm:w-fit"
          >
            {showDiscussButton && (
              <FormButton className="h-12 sm:w-[275px]">
                Tryk her for at drofte projektet
              </FormButton>
            )}
            {showCalculatorTerraceButton && (
              <Link href="/terrasseprisberegner">
                <MainButton variant="gradient" className="h-12 sm:w-[275px]">
                  Beregn din terrasse{" "}
                  <ShevronIcon className="size-5 rotate-90" />
                </MainButton>
              </Link>
            )}
            {showCalculatorRoofButton && (
              <Link href="/tagprisberegner">
                <MainButton variant="gradient" className="h-12 sm:w-[275px]">
                  Gratis tagberegner{" "}
                  <ShevronIcon className="size-5 rotate-90" />
                </MainButton>
              </Link>
            )}
          </motion.div>
        </Container>
      </motion.section>
    </>
  );
};

export default HeroSection;
