import CookiepolitikSection from "@/components/cookiepolitikPage/CookiepolitikSection";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
export default function CookiepolitikPage() {
    const crumbs = [
        { label: "Hjem", href: "/" },
        {
            label: "Cookiepolitik",
            href: "/cookiepolitik",
        },
    ];

    return (
        <>
            <Breadcrumbs crumbs={crumbs} className="pt-[92px] lg:pt-[139px]" />
            <CookiepolitikSection />
        </>
    );
}
