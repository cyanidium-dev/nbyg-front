import type { FaqSection as FaqSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import FaqList from "./FaqList";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import FaqSectionImages from "./FaqSectionImages";

interface FaqSectionProps extends FaqSectionData {
  uniqueKey?: string;
}

const FaqSection = (_props: FaqSectionProps) => {
  const { description, items, uniqueKey } = _props;

  return (
    <section>
      <Container className="relative flex flex-col gap-10 lg:gap-12 pt-25 lg:pt-[138px] lg:pb-[26px]">
        <FaqSectionImages uniqueKey={uniqueKey} />
        <div>
          <SectionTitle
            key={`${uniqueKey}-faq-section-title`}
            className="text-[24px] lg:text-[64px] font-light leading-[120%] lg:text-right"
          >
            FAQ
          </SectionTitle>
          {description ? (
            <motion.p
              key={`${uniqueKey}-faq-section-description`}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.85, x: 30, delay: 0.3 })}
              className="mt-8 lg:mt-4 lg:text-right"
            >
              {description}
            </motion.p>
          ) : null}
        </div>
        <FaqList faqList={items} uniqueKey={uniqueKey} />
      </Container>
    </section>
  );
};

export default FaqSection;
