import type { ImageTextButtonSection as ImageTextButtonSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "../../portableTextComponents/PortableTextComponents";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";

interface ImageTextButtonSectionProps extends ImageTextButtonSectionData {
  uniqueKey?: string;
}

const ImageTextButtonSection = (_props: ImageTextButtonSectionProps) => {
  const {
    title,
    titlePosition,
    description,
    image,
    buttonText,
    buttonStyle,
    buttonSlug,
    uniqueKey,
  } = _props;

  return (
    <section className="py-25 lg:pt-[152px] lg:pb-0">
      <Container>
        <SectionTitle
          className={`mb-8 lg:mb-9 ${titlePosition === "left" ? "text-left" : "text-right"}`}
        >
          {title}
        </SectionTitle>
        <div className="flex flex-col md:flex-row gap-10 md:gap-9">
          {description ? (
            <div className="flex flex-col gap-9">
              <div>
                <PortableText
                  value={
                    description as unknown as Parameters<
                      typeof PortableText
                    >[0]["value"]
                  }
                  components={portableTextComponents}
                />
              </div>
              <DecorativeEllipsis
                uniqueKey={uniqueKey}
                className="hidden md:flex"
              />
            </div>
          ) : null}
          {image ? (
            <div className="relative w-full md:w-[43.6%] h-[328px] md:h-auto rounded-[12px] overflow-hidden shrink-0">
              <Image
                src={urlForSanityImage(image).fit("crop").url()}
                fill
                alt="image"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
};

export default ImageTextButtonSection;
