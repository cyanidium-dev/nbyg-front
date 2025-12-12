import type { ImageTextButtonSection as ImageTextButtonSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../portableTextComponents/PortableTextComponents";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import MainButton from "../../buttons/MainButton";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import ImageTextButtonDecorations from "./ImageTextButtonDecorations";

interface ImageTextButtonSectionProps extends ImageTextButtonSectionData {
  uniqueKey?: string;
}

const ImageTextButtonSection = (_props: ImageTextButtonSectionProps) => {
  const {
    title,
    titlePosition,
    description,
    image,
    imagePosition,
    buttonText,
    buttonStyle,
    buttonSlug,
    uniqueKey,
  } = _props;

  return (
    <section
      className={`${imagePosition === "right" ? "lg:overflow-hidden" : ""}`}
    >
      <Container className="relative py-25 lg:pt-[152px] lg:pb-0">
        <ImageTextButtonDecorations
          uniqueKey={uniqueKey}
          imagePosition={imagePosition}
        />
        <div className="relative">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="md:hidden absolute -top-[26px] left-0"
          />
          <SectionTitle
            className={`mb-8 lg:mb-9 md:whitespace-pre-line ${titlePosition === "left" ? "md:text-left" : "md:text-right"}`}
          >
            {title}
          </SectionTitle>
        </div>
        <div
          className={`flex flex-col gap-10 md:gap-9 md:min-h-[320px] ${imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"}`}
        >
          {description || buttonText ? (
            <div className="flex flex-col gap-9 md:my-auto">
              {description ? (
                <motion.div
                  key={`${uniqueKey}-portable-text`}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeInAnimation({ scale: 0.85, delay: 0.4, y: 30 })}
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
              ) : null}
              <DecorativeEllipsis
                uniqueKey={uniqueKey}
                className="hidden md:flex"
              />
              {buttonText && buttonSlug ? (
                <motion.div
                  key={`${uniqueKey}-button-desktop`}
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeInAnimation({ scale: 0.85, delay: 0.4, y: 30 })}
                  className="hidden md:block md:max-w-[275px]"
                >
                  {" "}
                  <Link href={buttonSlug}>
                    <MainButton
                      variant={
                        buttonStyle === "transparentBorder"
                          ? "outline"
                          : buttonStyle === "white"
                            ? "fill"
                            : "gradient"
                      }
                      className="h-[58px]"
                    >
                      {buttonText}
                    </MainButton>
                  </Link>
                </motion.div>
              ) : null}
            </div>
          ) : null}
          {image ? (
            <motion.div
              key={`${uniqueKey}-portable-text`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.5, x: 30 })}
              className="relative w-full md:w-[43.6%] h-[300px] md:h-auto rounded-[12px] overflow-hidden shrink-0"
            >
              <Image
                src={urlForSanityImage(image).url()}
                fill
                alt={image?.alt || "Billede"}
                className="object-cover"
              />
            </motion.div>
          ) : null}
          {buttonText && buttonSlug ? (
            <motion.div
              key={`${uniqueKey}-button-mobile`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, delay: 0.4, y: 30 })}
              className="md:hidden md:max-w-[275px]"
            >
              <Link href={buttonSlug}>
                <MainButton
                  variant={
                    buttonStyle === "transparentBorder"
                      ? "outline"
                      : buttonStyle === "white"
                        ? "fill"
                        : "gradient"
                  }
                  className="h-[58px]"
                >
                  {buttonText}
                </MainButton>
              </Link>
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default ImageTextButtonSection;
