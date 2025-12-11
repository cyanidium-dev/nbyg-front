import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import MainButton from "@/components/shared/buttons/MainButton";
import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import Link from "next/link";

export default function WhyUs() {
    return (
        <section className="relative py-25 lg:pt-[152px] lg:pb-px overflow-hidden">
            <div className="hidden lg:block absolute bottom-0 left-[-51px] z-[-1] w-[1134px] h-[388px] top-[494px] bg-black blur-[53.3px]" />
            <Container className="relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({
                        scale: 0.85,
                        delay: 1.2,
                    })}
                    className="hidden lg:block absolute top-[-50px] left-[160px] w-[580px] h-auto aspect-655/459 -z-10"
                >
                    <Image
                        src="/images/decorations/ellipsis.svg"
                        alt="Background"
                        width={600}
                        height={459}
                    />
                </motion.div>
                <div className="relative mb-8 lg:mb-10 md:flex md:flex-row-reverse md:justify-between md:items-center ">
                    <SectionTitle className="lg:max-w-[536px] lg:text-right">
                        Hvorfor skal du vælge Nbyg?
                    </SectionTitle>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({
                            x: -40,
                            delay: 0.1,
                        })}
                        className="lg:flex lg:items-center"
                    >
                        <DecorativeEllipsis
                            uniqueKey="why-us-ellipsis"
                            delay={0.1}
                            staggerDelay={0.1}
                            className="absolute bottom-[5px] right-0 sm:relative lg:left-auto lg:bottom-auto"
                        />
                        <Link href="/om-os" className="hidden lg:block">
                            <MainButton className=" mr-11 lg:mr-0 lg:ml-11 w-[255px] h-[58px]">
                                Se flere detaljer
                            </MainButton>
                        </Link>
                    </motion.div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-5 mb-10 lg:mb-0">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({
                            x: -40,
                            delay: 0.3,
                        })}
                        id="card-1"
                        className="w-full lg:w-[41%] lg:max-w-[472px] bg-[linear-gradient(146.79deg,var(--color-gradient-brown-dark)_8.8%,var(--color-black)_104.55%)] rounded-[12px] p-[1.5px]"
                    >
                        <div className="w-full h-full bg-black rounded-[12px] pt-[31px] flex flex-col justify-between overflow-hidden">
                            <motion.h3
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInAnimation({
                                    y: 30,
                                    delay: 0.4,
                                })}
                                className="font-find-sans-pro text-[20px] lg:text-[24px] leading-[120%] uppercase mb-6 lg:mb-8 px-4"
                            >
                                Fremragende service
                            </motion.h3>
                            <div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 30,
                                        delay: 0.5,
                                    })}
                                    className="relative w-full h-[134px] mb-[-7px] rounded-[8px] overflow-hidden"
                                >
                                    <Image
                                        src="/images/homePage/whyUs/card-1.webp"
                                        alt="Professionelle renoveringer og tage"
                                        fill
                                        className="object-cover sm:object-[center_35%] lg:object-center"
                                    />
                                </motion.div>
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 30,
                                        delay: 0.6,
                                    })}
                                    className="relative z-1 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px] py-5 lg:py-8 px-4"
                                >
                                    <p className="text-[14px] font-light leading-[120%] lg:max-w-[318px]">
                                        Kundetilfredshed er vores højeste
                                        prioritet. Vores team er altid klar til
                                        at lytte til dine behov og sørge for, at
                                        du er tilfreds med resultatet. Vi er
                                        meget fleksible og tilpasser os nemt din
                                        tidsplan og dine behov for at undgå
                                        unødvendige gener.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({
                            y: 40,
                            delay: 0.7,
                        })}
                        id="card-2"
                        className="w-full lg:max-w-[275px] bg-[linear-gradient(316.28deg,var(--color-gradient-brown-dark)_6.67%,var(--color-black)_95.76%)] rounded-[12px] p-[1.5px]"
                    >
                        <div className="w-full h-full relative bg-black pt-[191px] lg:pt-[186px] pl-4 pr-19 lg:pr-4 pb-8 lg:pb-6 rounded-[12px] overflow-hidden flex flex-col">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInAnimation({
                                    y: -30,
                                    scale: 0.9,
                                    delay: 0.8,
                                })}
                                className="absolute right-[-22px] md:right-[-75px] top-[-159px] size-[318px] rounded-full overflow-hidden mb-8"
                            >
                                <Image
                                    src="/images/homePage/whyUs/card-2.webp"
                                    alt="Terrasse, tage og totalrenovering"
                                    fill
                                    className="object-cover object-bottom"
                                />
                            </motion.div>
                            <div className="flex-1"></div>
                            <div className="mt-auto">
                                <motion.h3
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 30,
                                        delay: 0.9,
                                    })}
                                    className="font-find-sans-pro text-[18px] lg:text-[24px] leading-[120%] uppercase mb-[22px] lg:mb-7"
                                >
                                    Kvalitet
                                </motion.h3>
                                <motion.p
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 30,
                                        delay: 1,
                                    })}
                                    className="text-[14px] font-light leading-[120%] lg:max-w-[236px] "
                                >
                                    Vi bruger kun de bedste materialer og de nyeste
                                    teknikker for at sikre, at vores arbejde er af
                                    højeste kvalitet. Vores erfarne håndværkere er
                                    dedikerede til at levere et resultat, der lever
                                    op til dine forventninger og mere til.
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({
                            x: 40,
                            delay: 1.1,
                        })}
                        id="card-3"
                        className="w-full lg:w-[33%] lg:max-w-[374px] bg-[linear-gradient(129.15deg,var(--color-gradient-brown-dark)_21.74%,var(--color-black)_103.38%)] rounded-[12px] p-[1.5px]"
                    >
                        <div className="w-full h-full bg-black rounded-[12px] overflow-hidden flex flex-col">
                            <div className="py-8 px-4 flex-1">
                                <motion.h3
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 30,
                                        delay: 1.2,
                                    })}
                                    className="font-find-sans-pro text-[18px] lg:text-[24px] leading-[120%] uppercase mb-[22px]"
                                >
                                    Hurtinhed
                                </motion.h3>
                                <motion.p
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 30,
                                        delay: 1.3,
                                    })}
                                    className="text-[14px] font-light leading-[120%]"
                                >
                                    TotalHos Nbyg behøver du ikke vente i
                                    månedsvis på at få den ønskede service. Vi
                                    forstår, hvor vigtigt det er for vores
                                    kunder at få deres projekter færdige til
                                    tiden. Derfor arbejder vi effektivt og
                                    målrettet for at sikre rettidig udførelse af
                                    arbejdet uden at gå på kompromis med
                                    kvaliteten renovering af Hus
                                </motion.p>
                            </div>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInAnimation({
                                    scale: 0.9,
                                    y: 30,
                                    delay: 1.4,
                                })}
                                className="relative w-full h-[154px] overflow-hidden mt-auto"
                            >
                                <Image
                                    src="/images/homePage/whyUs/card-3.webp"
                                    alt="Moderne byggeri og design"
                                    fill
                                    className="object-cover scale-118 object-[center_73%] xs:object-center xl:object-[center_73%] xl:scale-100"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({
                        y: 40,
                        delay: 1.5,
                    })}
                    className="lg:hidden"
                >
                    <Link href="/om-os">
                        <MainButton className="h-[58px] w-full sm:max-w-[255px]">
                            Se flere detaljer
                        </MainButton>
                    </Link>
                </motion.div>
            </Container>
        </section>
    );
}
