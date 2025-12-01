import type { TextRevealCardsSliderSection as TextRevealCardsSliderSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import TextRevealCardsSlider from "./TextRevealCardsSlider";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import TextRevealCardsSectionDecorations from "./TextRevealCardSectionDecorations";
import Link from "next/link";
import MainButton from "../../buttons/MainButton";

interface TextRevealCardsSliderSectionProps
  extends TextRevealCardsSliderSectionData {
  uniqueKey?: string;
  linkButtonText?: string;
  linkButtonLink?: string;
}

const TextRevealCardsSliderSection = (
  _props: TextRevealCardsSliderSectionProps
) => {
  const { title, description, description2, cards, uniqueKey, linkButtonText, linkButtonLink } = _props;

  return (
    <section className="py-25 lg:pt-[152px] lg:pb-0">
      <Container className="relative">
        <TextRevealCardsSectionDecorations uniqueKey={uniqueKey} />
        <div
          className={`relative flex flex-col gap-10 xl:flex-row xl:justify-between xl:items-end mb-7 xl:mb-[41px]`}
        >
          <SectionTitle className="lg:whitespace-pre-line">
            {title}
          </SectionTitle>
          {description ? (
            <motion.p
              key={`${uniqueKey}-description`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInAnimation({ x: 30, scale: 0.95, delay: 0.3 })}
              className="whitespace-pre-line"
            >
              {description}
            </motion.p>
          ) : null}
        </div>
        <motion.div
          key={`${uniqueKey}-text-reveal-card-slider-${title}`}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
          className="w-screen max-w-[1455px]"
        >
          <TextRevealCardsSlider
            uniqueKey={uniqueKey}
            slides={cards}
            component={
              <>
                {description2 ? (
                  <motion.p
                    key={`${uniqueKey}-description`}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInAnimation({ x: 30, scale: 0.95, delay: 0.3 })}
                    className="lg:max-w-[537px] whitespace-pre-line"
                  >
                    {description2}
                  </motion.p>
                ) : null}
                {linkButtonText && linkButtonLink ? (
                  <Link href={linkButtonLink}>
                    <MainButton className="h-[58px] sm:w-[323px]">
                      {linkButtonText}
                    </MainButton>
                  </Link>
                ) : null}
              </>
            }
          />
        </motion.div>
      </Container>
    </section>
  );
};

export default TextRevealCardsSliderSection;
