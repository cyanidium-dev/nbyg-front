import SectionTitle from "@/components/shared/titles/SectionTitle";
import Container from "@/components/shared/container/Container";
import Image from "next/image";
import MainButton from "@/components/shared/buttons/MainButton";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import Link from "next/link";

export default function AboutUs() {
    return (
        <section className="pt-18 lg:pt-[127px] pb-25 lg:pb-0">
            <Container className="md:flex md:justify-between relative">
                <motion.div
                    variants={fadeInAnimation({ scale: 0.85, delay: 1.1 })}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    className="absolute pointer-events-none bottom-[-86px] md:right-[200px] lg:right-[321px] hidden md:block rotate-286 scale-90"
                >
                    <Image
                        src="/images/decorations/ellipsis.svg"
                        alt="ellipsis"
                        width={373}
                        height={261}
                    />
                </motion.div>
                <DecorativeEllipsis
                    uniqueKey="aboutUs-ellipsis-mobile"
                    delay={0.1}
                    className="md:hidden mb-4"
                />
                <div className="md:max-w-[350px] lg:max-w-[536px] md:flex md:flex-col md:justify-between">
                    <SectionTitle className="mb-8 lg:mb-9 lg:text-[36px] xl:text-[48px]">
                        Nbyg – Bygge- og Tømrerfirma i København
                    </SectionTitle>
                    <motion.p
                        variants={fadeInAnimation({ x: -30, delay: 0.4 })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="max-w-[426px] text-[14px] lg:text-[16px] leading-[143%] lg:leading-[125%] font-light mb-6 lg:mb-10"
                    >
                        Uanset om du drømmer om en ny terrasse, et nyt tag eller
                        en tagrenovering, eller planlægger en større ombygning,
                        står Nbyg København klar til at gøre dine idéer til
                        virkelighed.
                    </motion.p>
                    <DecorativeEllipsis
                        uniqueKey="aboutUs-ellipsis-desktop"
                        delay={0.9}
                        className="hidden md:flex mb-10"
                    />
                    <motion.div
                        variants={fadeInAnimation({ y: 30, delay: 1 })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="hidden md:block"
                    >
                        <Link href="/om-os">
                            <MainButton className="h-[58px] max-w-[426px]">
                                Se flere detaljer
                            </MainButton>
                        </Link>
                    </motion.div>
                </div>
                <div className="md:max-w-[350px] mb-10 md:mb-0 lg:mt-[11px] lg:max-w-[515px] w-full">
                    <motion.p
                        variants={fadeInAnimation({ x: -30, delay: 0.6 })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="max-w-[458px] text-[14px] lg:text-[16px] leading-[143%] lg:leading-[125%] font-light mb-10 lg:mb-13"
                    >
                        For os handler byggeri ikke kun om træ og søm – det
                        handler om tillid, kvalitet og resultater, der holder.{" "}
                        <br /> Kontakt dit lokale byggefirma i København – Nbyg
                        for et uforpligtende tilbud.
                    </motion.p>
                    <motion.div
                        variants={fadeInAnimation({
                            scale: 0.85,
                            y: 30,
                            delay: 0.8,
                        })}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="w-full h-[300px] rounded-[8px] overflow-hidden"
                    >
                        <Image
                            src="/images/homePage/aboutUs/aboutUsImage.webp"
                            alt="Nbyg København – byggefirma"
                            fill
                            className="object-cover scale-125 object-[10%_35%] translate-x-[-10%] lg:scale-100 lg:object-[center_32%] lg:translate-x-0"
                        />
                    </motion.div>
                </div>
                <motion.div
                    variants={fadeInAnimation({ y: 30, delay: 1 })}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="md:hidden"
                >
                    <Link href="/om-os">
                        <MainButton className="h-[58px] max-w-[426px]">
                            Se flere detaljer
                        </MainButton>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
