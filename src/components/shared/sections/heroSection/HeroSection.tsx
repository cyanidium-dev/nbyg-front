import type { HeroSection as HeroSectionData } from "@/types/page";
import Container from "../../container/Container";
import PageTitle from "../../titles/PageTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

const HeroSection = (_props: HeroSectionData) => {
  const { title, description, mobileImage, desktopImage } = _props;

  console.log(mobileImage);

  return (
    <section className="relative">
      <Image
        src={urlForSanityImage(mobileImage).fit("crop").url()}
        alt="hero"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <Container className="pt-[146px] lg:pt-[179px] pb-7 lg:pb-20">
        <PageTitle className="mb-6 lg:mb-9">{title}</PageTitle>
        <p className="mb-6 lg:mb-9">{description}</p>
      </Container>
    </section>
  );
};

export default HeroSection;
