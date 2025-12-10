import ContactsBlock from "@/components/kontactOsPage/ContactsBlock";
import ContactFormBlock from "@/components/kontactOsPage/ContactFormBlock";
import Hero from "@/components/kontactOsPage/Hero";
import Container from "@/components/shared/container/Container";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import Image from "next/image";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { CONTACTS_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: CONTACTS_PAGE_QUERY,
    path: "/kontakt-os",
  });
}

export default async function KontaktOsPage() {
    const schemaJson = await getPageSchemaJson(CONTACTS_PAGE_QUERY);

    const crumbs = [
        { label: "Hjem", href: "/" },
        {
            label: "Kontakt os",
            href: "/kontakt-os",
        },
    ];

    return (
        <>
            <SchemaJson schemaJson={schemaJson} />
            <Hero />
            <Breadcrumbs crumbs={crumbs} />
            <Container className="relative">
                <motion.div
                    variants={fadeInAnimation({ delay: 0.9, scale: 0.8 })}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    className="lg:block hidden absolute -z-10 left-[313px] bottom-[-218px] rotate-240"
                >
                    <Image
                        src="/images/decorations/ellipsis.svg"
                        alt="ellipsis"
                        width="300"
                        height="228"
                        className="w-[300px] h-auto"
                    />
                </motion.div>
                <div className="bottom-[-59px] left-[220px] absolute -z-10 w-[416px] h-[309px] bg-black blur-[48.1453px]" />
                <div className="flex flex-col md:flex-row-reverse md:items-stretch gap-25 md:gap-6 py-25 md:pt-[127px] md:pb-[5px]">
                    <ContactFormBlock />
                    <ContactsBlock />
                </div>
            </Container>
        </>
    );
}
