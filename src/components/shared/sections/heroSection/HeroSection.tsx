import type { HeroSection as HeroSectionData } from "@/types/page";
import Container from "../../container/Container";
import PageTitle from "../../titles/PageTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import MainButton from "../../buttons/MainButton";
import ShevronIcon from "../../icons/ShevronIcon";

const HeroSection = (_props: HeroSectionData) => {
  const { title, description, mobileImage, desktopImage } = _props;

  console.log(mobileImage);

  return (
    <section className="relative">
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
        src={urlForSanityImage(mobileImage).fit("crop").url()}
        alt="hero"
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <Container className="pt-[146px] lg:pt-[179px] pb-7 lg:pb-20">
        <PageTitle className="max-w-[428px] lg:max-w-[978px] mb-6 lg:mb-9">
          {title}
        </PageTitle>
        <p className="max-w-[428px] lg:max-w-[685px] mb-6 lg:mb-9">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-[30px]">
          <MainButton className="h-12 sm:max-w-[275px]">
            Tryk her for at drofte projektet
          </MainButton>
          <MainButton variant="gradient" className="h-12 sm:max-w-[275px]">
            Beregn din terrasse <ShevronIcon className="size-5 rotate-90" />
          </MainButton>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
