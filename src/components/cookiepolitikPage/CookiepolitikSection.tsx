import Container from "@/components/shared/container/Container";
import * as motion from "motion/react-client";
import Image from "next/image";
import { fadeInAnimation } from "@/utils/animationVariants";
import CookieHeading from "./CookieHeading";
import CookieParagraph from "./CookieParagraph";
import CookieAddress from "./CookieAddress";

export default function CookiepolitikSection() {
    return (
        <section className="[counter-reset:section-counter] py-25 lg:pt-[127px] lg:pb-0">
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

                <motion.h1
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({ scale: 0.95, y: 10 })}
                    className="font-medium mb-8"
                >
                    Cookiepolitik
                </motion.h1>
                <CookieHeading
                    delay={0.05}
                    className=" [counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2"
                >
                    Hvad er cookies
                </CookieHeading>
                <CookieParagraph delay={0.1} className="mb-8">
                    Cookies er små tekstfiler, som gemmes på din enhed, når du
                    besøger vores hjemmeside. De bruges til at få siden til at
                    fungere korrekt, forbedre din brugeroplevelse og analysere,
                    hvordan besøgende interagerer med vores websted.
                </CookieParagraph>
                <CookieHeading
                    delay={0.15}
                    className="[counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2"
                >
                    Hvordan vi bruger cookies
                </CookieHeading>
                <CookieParagraph delay={0.2} className="mb-4">
                    Vi bruger både vores egne cookies og tredjepartscookies til
                    følgende formål:
                </CookieParagraph>
                <CookieParagraph delay={0.25} className="mb-4">
                    Nødvendige cookies – er afgørende for, at hjemmesiden
                    fungerer korrekt. Uden disse cookies kan siden ikke fungere
                    som tiltænkt.
                </CookieParagraph>
                <CookieParagraph delay={0.3} className="mb-4">
                    Funktionelle cookies – bruges til at huske dine præferencer,
                    som f.eks. sprogvalg og brugerindstillinger.
                </CookieParagraph>
                <CookieParagraph delay={0.35} className="mb-4">
                    Analyse-cookies – hjælper os med at forstå, hvordan
                    besøgende bruger hjemmesiden, så vi kan forbedre indhold og
                    funktionalitet.
                </CookieParagraph>
                <CookieParagraph delay={0.4} className="mb-8">
                    Marketing-cookies – bruges til at vise dig relevante
                    annoncer og måle effektiviteten af vores
                    markedsføringskampagner.
                </CookieParagraph>
                <CookieHeading
                    delay={0.45}
                    className="[counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2"
                >
                    Cookies fra tredjeparter
                </CookieHeading>
                <CookieParagraph delay={0.5} className="mb-4">
                    Vi benytter følgende tredjeparts tjenester, som kan placere
                    egne cookies i din browser:
                </CookieParagraph>
                <CookieParagraph delay={0.55} className="mb-4">
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
                </CookieParagraph>
                <CookieParagraph delay={0.6} className="mb-4">
                    Meta (Facebook) Pixel – bruges til at måle effektiviteten af
                    vores annoncer og vise målrettede kampagner på Facebook og
                    Instagram. <br />
                    Læs mere i{" "}
                    <a
                        href="https://www.facebook.com/privacy/policy"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="cursor-pointer underline"
                    >
                        Metas (Facebooks) privatlivspolitik.
                    </a>
                </CookieParagraph>
                <CookieParagraph delay={0.65} className="mb-8">
                    Microsoft Clarity – anvendes til at analysere, hvordan
                    brugere interagerer med vores hjemmeside (klik, rulning,
                    musebevægelser). Optagelserne er anonyme og indeholder ikke
                    personoplysninger. <br />
                    Læs mere i{" "}
                    <a
                        href="https://www.microsoft.com/da-dk/privacy/privacystatement"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="cursor-pointer underline"
                    >
                        Microsofts privatlivspolitik.
                    </a>
                </CookieParagraph>
                <CookieHeading
                    delay={0.7}
                    className="[counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2"
                >
                    Samtykke til brug af cookies
                </CookieHeading>
                <CookieParagraph delay={0.75} className="mb-4">
                    Når du besøger vores hjemmeside for første gang, vises et
                    cookie-banner, hvor du kan vælge, hvilke typer cookies du
                    vil tillade.
                </CookieParagraph>
                <CookieParagraph delay={0.8} className="mb-8">
                    Vi aktiverer kun analyse- og marketingcookies, når du giver
                    dit udtrykkelige samtykke. Du kan ændre eller trække dit
                    samtykke tilbage til enhver tid via linket
                    &quot;Cookieindstillinger&quot; nederst på siden.
                </CookieParagraph>
                <CookieHeading
                    delay={0.85}
                    className="[counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2"
                >
                    Opbevaring og sletning af cookies
                </CookieHeading>
                <CookieParagraph delay={0.9} className="mb-8">
                    Cookies gemmes på din enhed i en begrænset periode afhængigt
                    af deres formål. Du kan til enhver tid slette cookies via
                    din browsers indstillinger.
                </CookieParagraph>
                <CookieHeading
                    delay={0.95}
                    className="[counter-increment:section-counter] before:[content:counter(section-counter)_'.'] before:mr-2"
                >
                    Kontaktoplysninger
                </CookieHeading>
                <CookieParagraph delay={1.0} className="mb-4">
                    Hvis du har spørgsmål vedrørende denne cookiepolitik eller
                    behandlingen af personoplysninger, kan du kontakte os:
                </CookieParagraph>
                <CookieAddress
                    delay={1.05}
                    staggerDelay={0.05}
                    className="mb-8"
                />
            </Container>
        </section>
    );
}
