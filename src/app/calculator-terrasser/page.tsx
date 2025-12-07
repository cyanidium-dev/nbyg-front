import TerraceCalculator from "@/components/calculatorTerrasserPage/TerraceCalculator";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Calculator terraser",
    href: "/calculator-terrasser",
  },
];

export default function CalculatorTerrasserPage() {
  return (
    <>
      <Breadcrumbs crumbs={crumbs} className="pt-[108px] lg:pt-[139px]" />
      <TerraceCalculator />
    </>
  );
}
