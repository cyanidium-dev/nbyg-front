import SectionTitle from "@/components/shared/titles/SectionTitle";
import Container from "@/components/shared/container/Container";
import Image from "next/image";
import MainButton from "@/components/shared/buttons/MainButton";
import DecorativeEllipsis from "@/components/shared/decorativeEllipsis/DecorativeEllipsis";

export default function AboutUs() {
    return (
        <div className="pt-18 pb-25">
            <Container>
                <DecorativeEllipsis
                    uniqueKey="aboutUs-ellipsis"
                    delay={0.1}
                    className="md:hidden mb-4"
                />
                <SectionTitle className="mb-8">
                    Nbyg – Bygge- og Tømrerfirma i København
                </SectionTitle>
                <p className="text-[14px] leading-[143%] font-light mb-6 tracking-[-0.02rem]">
                    Uanset om du drømmer om en ny terrasse, et nyt tag eller en
                    tagrenovering, eller planlægger en større ombygning, står
                    Nbyg København klar til at gøre dine idéer til virkelighed.
                </p>
                <p className="text-[14px] leading-[143%] font-light mb-10 tracking-[-0.02rem]">
                    For os handler byggeri ikke kun om træ og søm – det handler
                    om tillid, kvalitet og resultater, der holder. <br/> Kontakt dit
                    lokale byggefirma i København – Nbyg for et uforpligtende
                    tilbud.
                </p>
                <div className="relative size-full h-[300px] rounded-[8px] overflow-hidden mb-10">
                    <Image
                        src="/images/homePage/aboutUs/aboutUsImage.webp"
                        alt="Top CTA Image"
                        fill
                        className="object-cover"
                    />
                </div>
                <MainButton className="h-[58px] max-w-[426px]">
                    Se flere detaljer
                </MainButton>
            </Container>
        </div>
    );
}
