import Container from "@/components/shared/container/Container";
import MainButton from "@/components/shared/buttons/MainButton";
import ShevronIcon from "@/components/shared/icons/ShevronIcon";
import HeroGallery from "./HeroGallery";
import * as motion from "motion/react-client";
import { fadeInAnimation, headerVariants } from "@/utils/animationVariants";
import PageTitle from "@/components/shared/titles/PageTitle";
import Link from "next/link";

export default function Hero() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.01 }}
            variants={headerVariants}
            className="relative pt-[208px] lg:pt-[199px] pb-7 lg:pb-[128px]"
        >
            <HeroGallery />
            <Container>
                <PageTitle className="lg:text-[64px] mb-8 lg:mb-9">
                    Din pålidelige partner Nbyg i København
                </PageTitle>
                <div className="flex flex-col gap-6 mb-8">
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({
                            scale: 0.85,
                            x: 70,
                            delay: 0.3,
                        })}
                        className="text-[14px] font-light leading-[120%]"
                    >
                        I snart et årti har Nbyg skabt smukke og holdbare
                        løsninger til hjem.
                    </motion.p>
                    <div className="flex gap-2">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInAnimation({
                                scale: 0.85,
                                x: 70,
                                delay: 0.4,
                            })}
                            className="size-3 rounded-full bg-white"
                        />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInAnimation({
                                scale: 0.85,
                                x: 70,
                                delay: 0.5,
                            })}
                            className="size-3 rounded-full bg-white"
                        />
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInAnimation({
                                scale: 0.85,
                                x: 70,
                                y: 30,
                                delay: 0.6,
                            })}
                            className="size-3 rounded-full bg-white"
                        />
                    </div>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({
                            scale: 0.85,
                            x: 70,
                            y: 30,
                            delay: 0.7,
                        })}
                        className="text-[14px] font-light leading-[120%]"
                    >
                        Som et erfarent tømrerfirma i København kombinerer vi
                        solidt håndværk med moderne design, ærlig kommunikation
                        og fair priser.
                    </motion.p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-[30px] sm:w-fit">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInAnimation({
                            scale: 0.85,
                            y: 50,
                            delay: 0.8,
                        })}
                    >
                        <MainButton className="h-12 sm:w-[275px]">
                            Tryk her for at drofte projektet
                        </MainButton>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInAnimation({
                            scale: 0.85,
                            y: 50,
                            delay: 0.9,
                        })}
                    >
                        <Link href="/calculator-tag">
                            <MainButton
                                variant="gradient"
                                className="h-12 sm:w-[275px] "
                            >
                                Gratis tagberegner
                                <ShevronIcon className="size-5 rotate-90" />
                            </MainButton>
                        </Link>
                    </motion.div>
                </div>
            </Container>
        </motion.section>
    );
}
