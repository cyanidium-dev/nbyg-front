import type { FaqSection as FaqSectionData } from "@/types/page";
import Container from "../../container/Container";
import SectionTitle from "../../titles/SectionTitle";
import FaqList from "./FaqList";

interface FaqSectionProps extends FaqSectionData {
  uniqueKey?: string;
}

const FaqSection = (_props: FaqSectionProps) => {
  const { description, items, uniqueKey } = _props;
  return (
    <section>
      <Container className="flex flex-col gap-10 lg:gap-12 pt-25 lg:pt-[138px]">
        <div>
          <SectionTitle
            key={`${uniqueKey}-faq-section`}
            className="text-[24px] lg:text-[64px] font-light leading-[120%] lg:text-right"
          >
            FAQ
          </SectionTitle>
          {description ? (
            <p className="mt-8 lg:mt-4 lg:text-right">{description}</p>
          ) : null}
        </div>
        <FaqList faqList={items} />
      </Container>
    </section>
  );
};

export default FaqSection;
