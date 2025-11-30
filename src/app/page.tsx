import Hero from "@/components/homePage/hero/Hero";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faq } from "@/components/homePage/faq/Faq";

export default function Home() {
    return (
        <>
            <Hero />
            <FaqSection
                _type="faqSection"
                type="faqSection"
                items={faq}
                uniqueKey="home-faq"
            />
        </>
    );
}
