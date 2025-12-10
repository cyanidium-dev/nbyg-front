import TagCalculator from "@/components/calculatorTagPage/TagCalculator";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { ROOF_CALCULATOR_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: ROOF_CALCULATOR_PAGE_QUERY,
    path: "/tagprisberegner",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Tagprisberegner",
    href: "/tagprisberegner",
  },
];

export default async function CalculatorTagPage() {
  const schemaJson = await getPageSchemaJson(ROOF_CALCULATOR_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <Breadcrumbs crumbs={crumbs} className="pt-[108px] lg:pt-[139px]" />
      <TagCalculator />
    </>
  );
}
