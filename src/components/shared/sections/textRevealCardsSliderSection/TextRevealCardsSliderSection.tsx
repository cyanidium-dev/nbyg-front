import type { TextRevealCardsSliderSection as TextRevealCardsSliderSectionData } from "@/types/page";
import Container from "../../container/Container";

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
      <Container></Container>
    </section>
  );
};

export default TextRevealCardsSliderSection;
