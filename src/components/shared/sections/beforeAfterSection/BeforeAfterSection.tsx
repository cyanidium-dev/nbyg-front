import Container from "../../container/Container";
import { BeforeAfterSection as BeforeAfterSctionData } from "@/types/page";
import SectionTitle from "../../titles/SectionTitle";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";
import BeforeAfterSlider from "./BeforeAfterSlider";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import BeforeAFterSectionDecorations from "./BeforeAfterDecorations";

interface BeforeAfterSctionProps extends BeforeAfterSctionData {
  uniqueKey?: string;
}

const BeforeAfterSection = (_props: BeforeAfterSctionProps) => {
  const { items, uniqueKey } = _props;

  if (!items || !items?.length) return null;

  return (
    <section>
      <Container className="relative py-25 lg:pt-[138px] lg:pb-0">
        <BeforeAFterSectionDecorations uniqueKey={uniqueKey} />
        <div className="relative lg:max-w-[641px] mb-8 lg:mb-[50px]">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="absolute -top-[26px] lg:top-auto left-0 lg:left-auto lg:right-0 lg:bottom-5"
          />
          <SectionTitle>Se vores projekter før og efter</SectionTitle>
        </div>
        <motion.div
          key={`${uniqueKey}-before-after-slider`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
          className="w-screen sm:w-full"
        >
          <BeforeAfterSlider
            slides={items}
            key={`${uniqueKey}-before-after-slider-swiper`}
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default BeforeAfterSection;
