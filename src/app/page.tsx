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
                description="Har du nogen spørgsmål?"
                items={faq}
                uniqueKey="home-faq"
            />
        </>
    );
}
