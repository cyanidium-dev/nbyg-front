import { PAGE_BY_SLUG_QUERY } from "@/lib/queries";
import { fetchSanityData } from "@/utils/fetchSanityData";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service } = await params;

  const currentService = await fetchSanityData(PAGE_BY_SLUG_QUERY, {
    slug: service,
    parentSlug: "",
  });

  console.log(currentService);

  return <></>;
}
