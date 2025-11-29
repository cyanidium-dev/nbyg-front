import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import MainButton from "@/components/shared/buttons/MainButton";
import Image from "next/image";

export default function WhyUs() {
    return (
        <section className="relative py-25 lg:mt-[152px] lb:mb-0">
            <div className="hidden lg:block absolute top-[50px] left-[150px] w-[600px] h-auto aspect-655/459 z-[-1]">
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="Background"
                    width={655}
                    height={459}
                />
            </div>
            <div className="hidden lg:block absolute bottom-0 left-0 z-[-1] w-[1134px] h-[388px] left-[-51px] top-[494px] bg-black blur-[53.3px]" />
            <Container>
                <div className="relative mb-8 lg:mb-10 md:flex md:flex-row-reverse md:justify-between md:items-center ">
                    <SectionTitle className="lg:max-w-[536px] lg:text-right">
                        Hvorfor skal du vælge Nbyg?
                    </SectionTitle>
                    <div className="lg:flex lg:items-center">
                        <DecorativeEllipsis
                            delay={0.2}
                            staggerDelay={0.1}
                            variant="large"
                            className="absolute bottom-[5px] right-0 lg:relative lg:left-auto lg:bottom-auto"
                        />
                        <MainButton className="hidden md:block mr-11 lg:mr-0 lg:ml-11 w-[255px] h-[58px]">
                            Se flere detaljer
                        </MainButton>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-5 mb-10 lg:mb-0">
                    <div
                        id="card-1"
                        className="w-full lg:w-[41%] lg:max-w-[472px] bg-[linear-gradient(146.79deg,var(--color-gradient-brown-dark)_8.8%,var(--color-black)_104.55%)] rounded-[12px] p-px"
                    >
                        <div className="w-full h-full bg-black rounded-[12px] pt-[31px] flex flex-col justify-between overflow-hidden">
                            <h3 className="font-find-sans-pro text-[20px] lg:text-[24px] leading-[120%] uppercase mb-6 lg:mb-8 px-4">
                                Fremragende service
                            </h3>
                            <div>
                                <div className="relative w-full h-[134px] mb-[-7px] rounded-[8px] overflow-hidden">
                                    <Image
                                        src="/images/homePage/whyUs/card-1.webp"
                                        alt="Service"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="relative z-1 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px] py-5 lg:py-8 px-4">
                                    <p className="text-[14px] font-light leading-[120%] lg:max-w-[318px]">
                                        Kundetilfredshed er vores højeste
                                        prioritet. Vores team er altid klar til
                                        at lytte til dine behov og sørge for, at
                                        du er tilfreds med resultatet. Vi er
                                        meget fleksible og tilpasser os nemt din
                                        tidsplan og dine behov for at undgå
                                        unødvendige gener.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="card-2"
                        className="w-full lg:max-w-[275px] bg-[linear-gradient(316.28deg,var(--color-gradient-brown-dark)_6.67%,var(--color-black)_95.76%)] rounded-[12px] p-px"
                    >
                        <div className="w-full h-full relative bg-black pt-[191px] lg:pt-[186px] px-4 pb-8 lg:pb-6 rounded-[12px] overflow-hidden">
                            <div className="absolute left-8 top-[-159px] size-[318px] rounded-full overflow-hidden mb-8">
                                <Image
                                    src="/images/homePage/whyUs/card-2.webp"
                                    alt="Service"
                                    fill
                                    className="object-cover object-bottom"
                                />
                            </div>
                            <h3 className="font-find-sans-pro text-[18px] lg:text-[24px] leading-[120%] uppercase mb-[22px] lg:mb-7">
                                Kvalitet
                            </h3>
                            <p className="text-[14px] font-light leading-[120%] max-w-[236px]">
                                Vi bruger kun de bedste materialer og de nyeste
                                teknikker for at sikre, at vores arbejde er af
                                højeste kvalitet. Vores erfarne håndværkere er
                                dedikerede til at levere et resultat, der lever
                                op til dine forventninger og mere til.
                            </p>
                        </div>
                    </div>
                    <div
                        id="card-3"
                        className="w-full lg:w-[33%] lg:max-w-[374px] bg-[linear-gradient(129.15deg,var(--color-gradient-brown-dark)_21.74%,var(--color-black)_103.38%)] rounded-[12px] p-px"
                    >
                        <div className="w-full h-full bg-black rounded-[12px] overflow-hidden">
                            <div className="py-8 px-4">
                                <h3 className="font-find-sans-pro text-[18px] lg:text-[24px] leading-[120%] uppercase mb-[22px]">
                                    Hurtinhed
                                </h3>
                                <p className="text-[14px] font-light leading-[120%]">
                                    TotalHos Nbyg behøver du ikke vente i
                                    månedsvis på at få den ønskede service. Vi
                                    forstår, hvor vigtigt det er for vores
                                    kunder at få deres projekter færdige til
                                    tiden. Derfor arbejder vi effektivt og
                                    målrettet for at sikre rettidig udførelse af
                                    arbejdet uden at gå på kompromis med
                                    kvaliteten.renovering af Hus
                                </p>
                            </div>
                            <div className="relative w-full h-[154px] overflow-hidden">
                                <Image
                                    src="/images/homePage/whyUs/card-3.webp"
                                    alt="Service"
                                    fill
                                    className="object-cover scale-118 object-[center_73%] lg:scale-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MainButton className="h-[58px] w-full lg:max-w-[255px] lg:hidden">
                    Se flere detaljer
                </MainButton>
            </Container>
        </section>
    );
}
