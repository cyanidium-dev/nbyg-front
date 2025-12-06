import Container from "@/components/shared/container/Container";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import ValuesList from "./ValuesList";

export default function ValuesSection() {
  return (
    <section>
      <Container className="py-25 lg:pt-[138px] lg:pb-0">
        <div className="flex justify-between items-center mb-6 lg:mb-9">
          <SectionTitle>Vores værdier</SectionTitle>
          <DecorativeEllipsis
            uniqueKey="om-os-values-section"
            className="hidden md:flex"
          />
        </div>
        <ValuesList />
      </Container>
    </section>
  );
}
