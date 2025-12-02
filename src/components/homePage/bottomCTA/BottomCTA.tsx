import MainButton from "@/components/shared/buttons/MainButton";
import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function BottomCTA() {
    return (
        <section className="py-[192px] md:py-13 lg:mt-[92px] relative md:rounded-[18px] overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.85, delay: 0.7 })}
                className="absolute inset-0 -z-10 w-full h-full"
            >
                <Image
                    src="/images/homePage/bottomCTA/bgImage.webp"
                    alt="Bottom CTA Background"
                    fill
                    className="object-cover scale-220 translate-y-[-25px] translate-x-[-10px] md:scale-100 md:translate-y-0 md:translate-x-0 md:object-[center_38%]"
                />
                <div className="absolute z-1 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0)_-35.16%,rgba(0,0,0,0.464)_13.61%,rgba(0,0,0,0)_100%)]" />
            </motion.div>
            <Container className="sm:mr-auto">
                <SectionTitle className="mb-8 max-w-[495px] lg:text-[64px]">
                    Nbyg København
                </SectionTitle>
                <motion.p
                    key={`bottom-cta-description`}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({
                        x: -40,
                        delay: 0.3,
                    })}
                    className="text-[14px] sm:text-[16px] leading-[120%] sm:leading-[125%] font-light mb-10 md:mb-12 max-w-[371px]"
                >
                    Drømmer du om en ny terrasse, et smukt tag eller en
                    gennemgribende renovering? Kontakt Nbyg København i dag og
                    lad os sammen skabe et hjem, der passer perfekt til dig.
                </motion.p>
                <motion.div
                    key={`bottom-cta-button`}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({
                        y: 30,
                        delay: 0.5,
                    })}
                >
                    <Link href="/kontakt-os">
                        <MainButton className="w-full h-12 max-w-[371px] sm:max-w-[275px]">
                            Kontakt os
                        </MainButton>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
