import type { TextRevealCardsSliderSection as TextRevealCardsSliderSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import TextRevealCardsSlider from "./TextRevealCardsSlider";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface TextRevealCardsSliderSectionProps
  extends TextRevealCardsSliderSectionData {
  uniqueKey?: string;
}

const TextRevealCardsSliderSection = (
  _props: TextRevealCardsSliderSectionProps
) => {
  const { title, description, description2, cards, uniqueKey } = _props;

  return (
    <section className="py-25 lg:pt-[152px] lg:pb-0">
      <Container>
        <div
          className={`relative flex flex-col gap-10 md:flex-row md:justify-between md:items-end mb-7 lg:mb-[41px]`}
        >
          <SectionTitle className="lg:whitespace-pre-line">
            {title}
          </SectionTitle>
          {description ? (
            <p className="whitespace-pre-line">{description}</p>
          ) : null}
        </div>
        <motion.div
          key={`${uniqueKey}-materials-slider-subtitle-${title}`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
          className="w-screen"
        >
          <TextRevealCardsSlider slides={cards} />
        </motion.div>
      </Container>
    </section>
  );
};

export default TextRevealCardsSliderSection;
