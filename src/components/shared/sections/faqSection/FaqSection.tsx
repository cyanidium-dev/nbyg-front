import type { FaqSection as FaqSectionData } from "@/types/page";
import Container from "../../container/Container";

interface FaqSectionProps extends FaqSectionData {
  uniqueKey?: string;
}

const FaqSection = (_props: FaqSectionData) => {
  return (
    <section>
      <Container></Container>
    </section>
  );
};

export default FaqSection;
