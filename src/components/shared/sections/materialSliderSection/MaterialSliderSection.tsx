import type { MaterialSliderSection as MaterialSliderSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";

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
    <section>
      <Container className="py-25 lg:pt-[152px] lg:pb-0">
        <SectionTitle
          className={`mb-8 lg:mb-6 ${titlePosition === "left" ? "lg:text-left" : "lg:text-right"}`}
        >
          {title}
        </SectionTitle>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:flex-50 mb-12 lg:mb-9"></div>
        <div
          className={`flex justify-between items-center ${titlePosition === "left" ? "flex-row" : "flex-row-reverse"}`}
        >
          <DecorativeEllipsis uniqueKey={uniqueKey} className="" />
          <h3
            className={`max-w-[536px] font-find-sans-pro text-[20px] lg:text-[24px] leading-[120%] uppercase ${titlePosition === "left" ? "lg:text-right" : "lg:text-left"}`}
          >
            {subtitle}
          </h3>
        </div>
      </Container>
    </section>
  );
};

export default MaterialSliderSection;
