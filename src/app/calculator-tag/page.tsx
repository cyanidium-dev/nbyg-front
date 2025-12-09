import TagCalculator from "@/components/calculatorTagPage/TagCalculator";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

export async function generateMetadata(): Promise<Metadata> {
  return getDefaultMetadata("/calculator-tag");
}

const crumbs = [
    { label: "Hjem", href: "/" },
    {
        label: "Calculator tag",
        href: "/calculator-tag",
    },
];

export default function CalculatorTagPage() {
    return (
        <>
            <Breadcrumbs crumbs={crumbs} className="pt-[108px] lg:pt-[139px]" />
            <TagCalculator />
        </>
    );
}
