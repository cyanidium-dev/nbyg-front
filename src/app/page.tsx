import Hero from "@/components/homePage/hero/Hero";
import BeforeAfterSection from "@/components/shared/sections/beforeAfterSection/BeforeAfterSection";
import { BEFORE_AFTER_IMAGES } from "@/components/homePage/beforeAfter/beforeAfter";
import AboutUs from "@/components/homePage/aboutUs/AboutUs";

export default function Home() {
    return (
        <>
            <Hero />          
            <AboutUs />
            <BeforeAfterSection
                _type="beforeAfterSection"
                type="beforeAfterSection"
                items={BEFORE_AFTER_IMAGES}
                uniqueKey="home-before-after"
            />
        </>
    );
}
