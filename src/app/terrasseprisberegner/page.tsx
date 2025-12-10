import TerraceCalculator from "@/components/calculatorTerrasserPage/TerraceCalculator";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { TERRACE_CALCULATOR_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: TERRACE_CALCULATOR_PAGE_QUERY,
    path: "/terrasseprisberegner",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Terrasseprisberegner",
    href: "/terrasseprisberegner",
  },
];

export default async function CalculatorTerrasserPage() {
  const schemaJson = await getPageSchemaJson(TERRACE_CALCULATOR_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <Breadcrumbs crumbs={crumbs} className="pt-[108px] lg:pt-[139px]" />
      <TerraceCalculator />
    </>
  );
}
