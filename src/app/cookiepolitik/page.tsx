import CookiepolitikSection from "@/components/cookiepolitikPage/CookiepolitikSection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { COOKIE_POLICY_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: COOKIE_POLICY_PAGE_QUERY,
    path: "/cookiepolitik",
  });
}

export default async function CookiepolitikPage() {
    const schemaJson = await getPageSchemaJson(COOKIE_POLICY_PAGE_QUERY);

    const crumbs = [
        { label: "Hjem", href: "/" },
        {
            label: "Cookiepolitik",
            href: "/cookiepolitik",
        },
    ];

    return (
        <>
            <SchemaJson schemaJson={schemaJson} />
            <Breadcrumbs crumbs={crumbs} className="pt-[92px] lg:pt-[139px]" />
            <CookiepolitikSection />
        </>
    );
}
