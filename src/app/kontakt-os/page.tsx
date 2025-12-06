import ContactsBlock from "@/components/kontactOsPage/ContactsBlock";
import ContactFormBlock from "@/components/kontactOsPage/ContactFormBlock";
import Hero from "@/components/kontactOsPage/Hero";
import Container from "@/components/shared/container/Container";

export default function KontaktOsPage() {
    return (
        <>
            <Hero />
            <Container>
                <div className="flex flex-col md:flex-row-reverse md:items-stretch gap-25 md:gap-6 py-25">
                    <ContactFormBlock />
                    <ContactsBlock />
                </div>
            </Container>
        </>
    );
}
