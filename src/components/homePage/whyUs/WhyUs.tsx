import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";
import MainButton from "@/components/shared/buttons/MainButton";
import Image from "next/image";

export default function WhyUs() {
    return (
        <section className="py-25">
            <Container>
                <div className="relative mb-8">
                    <SectionTitle>Hvorfor skal du vælge Nbyg?</SectionTitle>
                    <DecorativeEllipsis className="absolute bottom-0 right-0" />
                </div>
                <div className="flex flex-col gap-6 mb-10">
                    <div
                        id="card-1"
                        className="bg-[linear-gradient(146.79deg,var(--color-gradient-brown-dark)_8.8%,var(--color-black)_104.55%)] rounded-[12px] p-px"
                    >
                        <div className="bg-black rounded-[12px] pt-[31px]">
                            <h3 className="font-find-sans-pro text-[20px] leading-[120%] uppercase mb-6 px-4">
                                Fremragende service
                            </h3>
                            <div className="relative w-full h-[134px] mb-[-7px] rounded-[8px] overflow-hidden">
                                <Image
                                    src="/images/homePage/whyUs/card-1.webp"
                                    alt="Service"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative z-1 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px] py-5 px-4">
                                <p className="text-[14px] font-light leading-[120%]">
                                    Kundetilfredshed er vores højeste prioritet.
                                    Vores team er altid klar til at lytte til
                                    dine behov og sørge for, at du er tilfreds
                                    med resultatet. Vi er meget fleksible og
                                    tilpasser os nemt din tidsplan og dine behov
                                    for at undgå unødvendige gener.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        id="card-2"
                        className="bg-[linear-gradient(316.28deg,var(--color-gradient-brown-dark)_6.67%,var(--color-black)_95.76%)] rounded-[12px] p-px"
                    >
                        <div className="relative bg-black pt-[191px] px-6 pb-8 rounded-[12px] overflow-hidden">
                            <div className="absolute left-8 top-[-169px] size-[318px] rounded-full overflow-hidden mb-8">
                                <Image
                                    src="/images/homePage/whyUs/card-2.webp"
                                    alt="Service"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-find-sans-pro text-[18px] leading-[120%] uppercase mb-[22px]">
                                Kvalitet
                            </h3>
                            <p className="text-[14px] font-light leading-[120%]">
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
                        className="bg-[linear-gradient(129.15deg,var(--color-gradient-brown-dark)_21.74%,var(--color-black)_103.38%)] rounded-[12px] p-px"
                    >
                        <div className="bg-black rounded-[12px] overflow-hidden">
                            <div className="py-8 px-4">
                                <h3 className="font-find-sans-pro text-[18px] leading-[120%] uppercase mb-[22px]">
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
                            <div className="relative w-full h-[154px]">
                                <Image
                                    src="/images/homePage/whyUs/card-3.webp"
                                    alt="Service"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <MainButton className="h-[58px] w-full lg:max-w-[255px]">
                    Se flere detaljer
                </MainButton>
            </Container>
        </section>
    );
}
