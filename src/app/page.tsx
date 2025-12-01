import Hero from "@/components/homePage/hero/Hero";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import { faq } from "@/components/homePage/faq/Faq";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";

export default function Home() {
    return (
        <>
            <Hero />         
            <AboutUs />
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
