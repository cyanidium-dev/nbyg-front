import Container from "@/components/shared/container/Container";
import GallerySlider from "@/components/shared/sections/gallerySection/GallerySlider";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { galleryData } from "./galleryData";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";
import Link from "next/link";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";

export default function Gallery() {
    return (
        <section className="relative py-25 lg:pt-[138px] lg:pb-[46px]">
            <div className="max-w-[416px] sm:max-w-[726px] md:max-w-[867px] lg:max-w-[1141px] xl:max-w-[1494px] mx-auto">
                <GallerySlider items={galleryData} />
            </div>
            <Container className="flex flex-col mt-10 lg:mt-15 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex justify-between gap-4 sm:gap-8 w-full sm:w-fit items-center sm:items-center mb-8 sm:mb-0">
                    <SectionTitle className="w-fit">GALLERI</SectionTitle>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
                        className="w-fit"
                    >
                        <Link
                            href="/galleri"
                            className="group flex items-center justify-center size-10 lg:size-15 bg-white rounded-full active:scale-95 transition duration-300 ease-in-out outline-none"
                            aria-label="Open gallery"
                        >
                            <ArrowIcon className="size-4 lg:size-7 text-black xl:group-hover:translate-x-0.5 xl:group-hover:-translate-y-0.5 transition duration-300 ease-in-out" />
                        </Link>
                    </motion.div>
                </div>
                <DecorativeEllipsis
                    uniqueKey="gallery"
                    className="hidden lg:flex"
                    delay={0.4}
                />
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({
                        scale: 0.85,
                        x: 30,
                        delay: 0.6,
                    })}
                    className="max-w-[397px] text-[14px] lg:text-[16px] font-light leading-[120%]"
                >
                    Nedenfor kan du se eksempler på projekter udført af Nbyg. Vi
                    skaber solide og æstetiske løsninger – fra tag og terrasse
                    til komplette renoveringer – altid med sans for detaljen.
                </motion.p>
            </Container>
        </section>
    );
}
