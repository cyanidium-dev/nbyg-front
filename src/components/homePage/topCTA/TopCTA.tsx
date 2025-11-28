import SectionTitle from "@/components/shared/titles/SectionTitle";
import Container from "@/components/shared/container/Container";
import Image from "next/image";

export default function TopCTA() {
    return (
        <div>
            <Container>
                <SectionTitle className="mb-8">
                    Nbyg – Bygge- og Tømrerfirma i København
                </SectionTitle>
                <p className="text-[14px] leading-[143%] font-light mb-6">
                    Uanset om du drømmer om en ny terrasse, et nyt tag eller en
                    tagrenovering, eller planlægger en større ombygning, står
                    Nbyg København klar til at gøre dine idéer til virkelighed.
                </p>
                <p className="text-[14px] leading-[143%] font-light ">
                    For os handler byggeri ikke kun om træ og søm – det handler
                    om tillid, kvalitet og resultater, der holder.Kontakt dit
                    lokale byggefirma i København – Nbyg for et uforpligtende
                    tilbud.
                </p>
                <div>
                    <Image
                        src="/images/decorations/top-cta-image.png"
                        alt="Top CTA Image"
                        fill
                        className="object-cover"
                    />
                </div>
            </Container>
        </div>
    );
}
