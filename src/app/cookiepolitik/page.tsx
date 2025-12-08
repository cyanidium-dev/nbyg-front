import { ADDRESS, CONTACT_PHONE, CVR, EMAIL } from "@/constants/constants";
import Container from "@/components/shared/container/Container";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { contactsPhoneRegex } from "@/regex/regex";
import * as motion from "motion/react-client";
import Image from "next/image";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function CookiepolitikPage() {
    const crumbs = [
        { label: "Hjem", href: "/" },
        {
            label: "Cookiepolitik",
            href: "/cookiepolitik",
        },
    ];

    return (
        <>
            <Breadcrumbs crumbs={crumbs} className="pt-[92px] lg:pt-[139px]" />
            <section className="font-montserrat [counter-reset:section-counter] py-25 lg:pt-[127px] lg:pb-0 text-[14px] lg:text-[16px] leading-[150%] text-light tracking-[-0.02rem]">
                <Container className="relative">
                    <motion.div
                        variants={fadeInAnimation({
                            delay: 0.9,
                            scale: 0.8,
                        })}
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

                    <h1 className="font-medium mb-8">Cookiepolitik</h1>
                    <h2 className="font-medium mb-4 [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2">
                        Hvad er cookies
                    </h2>
                    <p className="mb-8">
                        Cookies er små tekstfiler, som gemmes på din enhed, når
                        du besøger vores hjemmeside. De bruges til at få siden
                        til at fungere korrekt, forbedre din brugeroplevelse og
                        analysere, hvordan besøgende interagerer med vores
                        websted.
                    </p>
                    <h2 className="font-medium mb-4 [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2">
                        Hvordan vi bruger cookies
                    </h2>
                    <p className="mb-4">
                        Vi bruger både vores egne cookies og tredjepartscookies
                        til følgende formål:
                    </p>
                    <p className="mb-4">
                        Nødvendige cookies – er afgørende for, at hjemmesiden
                        fungerer korrekt. Uden disse cookies kan siden ikke
                        fungere som tiltænkt.
                    </p>
                    <p className="mb-4">
                        Funktionelle cookies – bruges til at huske dine
                        præferencer, som f.eks. sprogvalg og
                        brugerindstillinger.
                    </p>
                    <p className="mb-4">
                        Analyse-cookies – hjælper os med at forstå, hvordan
                        besøgende bruger hjemmesiden, så vi kan forbedre indhold
                        og funktionalitet.{" "}
                    </p>
                    <p className="mb-8">
                        Marketing-cookies – bruges til at vise dig relevante
                        annoncer og måle effektiviteten af vores
                        markedsføringskampagner.
                    </p>
                    <h2 className="font-medium mb-4 [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2">
                        Cookies fra tredjeparter
                    </h2>
                    <p className="mb-4">
                        Vi benytter følgende tredjeparts tjenester, som kan
                        placere egne cookies i din browser:
                    </p>
                    <p className="mb-4">
                        Google Analytics / Google Ads Pixel – anvendes til
                        webanalyse og personaliseret annoncering. <br />
                        Læs mere i{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="cursor-pointer underline"
                        >
                            Googles privatlivspolitik.
                        </a>
                    </p>
                    <p className="mb-4">
                        Meta (Facebook) Pixel – bruges til at måle
                        effektiviteten af vores annoncer og vise målrettede
                        kampagner på Facebook og Instagram. <br />
                        Læs mere i{" "}
                        <a
                            href="https://www.facebook.com/privacy/policy"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="cursor-pointer underline"
                        >
                            Metas (Facebooks) privatlivspolitik.
                        </a>
                    </p>
                    <p className="mb-8">
                        Microsoft Clarity – anvendes til at analysere, hvordan
                        brugere interagerer med vores hjemmeside (klik, rulning,
                        musebevægelser). Optagelserne er anonyme og indeholder
                        ikke personoplysninger. <br />
                        Læs mere i{" "}
                        <a
                            href="https://www.microsoft.com/da-dk/privacy/privacystatement"
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="cursor-pointer underline"
                        >
                            Microsofts privatlivspolitik.
                        </a>
                    </p>
                    <h2 className="font-medium mb-4 [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2">
                        Samtykke til brug af cookies
                    </h2>
                    <p className="mb-4">
                        Når du besøger vores hjemmeside for første gang, vises
                        et cookie-banner, hvor du kan vælge, hvilke typer
                        cookies du vil tillade.
                    </p>
                    <p className="mb-8">
                        Vi aktiverer kun analyse- og marketingcookies, når du
                        giver dit udtrykkelige samtykke. Du kan ændre eller
                        trække dit samtykke tilbage til enhver tid via linket
                        &quot;Cookieindstillinger&quot; nederst på siden.
                    </p>
                    <h2 className="font-medium mb-4 [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2">
                        Opbevaring og sletning af cookies
                    </h2>
                    <p className="mb-8">
                        Cookies gemmes på din enhed i en begrænset periode
                        afhængigt af deres formål. Du kan til enhver tid slette
                        cookies via din browsers indstillinger.
                    </p>
                    <h2 className="font-medium mb-4 [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2">
                        Kontaktoplysninger
                    </h2>
                    <p className="mb-4">
                        Hvis du har spørgsmål vedrørende denne cookiepolitik
                        eller behandlingen af personoplysninger, kan du kontakte
                        os:
                    </p>
                    <address className="not-italic tracking-normal">
                        <p>Nbyg Bornholm ApS</p>
                        <p>Adresse: {ADDRESS}, Danmark</p>
                        <p>
                            Telefon:{" "}
                            {CONTACT_PHONE.replace(
                                contactsPhoneRegex,
                                "+45 $1 $2 $3 $4"
                            )}{" "}
                        </p>
                        <p>E-mail: {EMAIL}</p>
                        <p>CVR: {CVR}</p>
                    </address>
                </Container>
            </section>
        </>
    );
}
