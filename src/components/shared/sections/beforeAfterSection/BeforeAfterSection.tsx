import Container from "../../container/Container";
import { BeforeAfterSection as BeforeAfterSctionData } from "@/types/page";
import SectionTitle from "../../titles/SectionTitle";
import DecorativeEllipsis from "../../decorativeEllipsis/DecorativeEllipsis";

interface BeforeAfterSctionProps extends BeforeAfterSctionData {
  uniqueKey?: string;
}

const BeforeAfterSection = (_props: BeforeAfterSctionProps) => {
  const { items, uniqueKey } = _props;

  if (!items || !items?.length) return null;

  return (
    <section>
      <Container className="py-25 lg:pt-[138px] lg:pb-0">
        <div className="relative lg:max-w-[641px]">
          <DecorativeEllipsis
            uniqueKey={uniqueKey}
            className="absolute -top-[26px] lg:top-auto left-0 lg:left-auto lg:right-0 lg:bottom-5"
          />
          <SectionTitle>Se vores projekter før og efter</SectionTitle>
        </div>
      </Container>
    </section>
  );
};

export default BeforeAfterSection;
