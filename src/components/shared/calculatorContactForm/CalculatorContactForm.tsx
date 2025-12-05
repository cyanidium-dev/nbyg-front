import * as motion from "motion/react-client";
import MainButton from "../buttons/MainButton";
import Container from "../container/Container";
import Image from "next/image";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function CalculatorContactForm() {
    return (
        <section className="mt-6 lg:mt-12 bg-black">
            <Container className="relative">
                <motion.div
                    variants={fadeInAnimation({ delay: 0.9, scale: 0.8 })}
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    className="lg:block hidden absolute -z-10 left-[313px] bottom-[-218px] rotate-[240deg]"
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
                <div
                    className="p-px rounded-[16px] mb-6 lg:mb-12"
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, rgba(4, 4, 4, 0.4), rgba(4, 4, 4, 0.4)), linear-gradient(129.15deg, #6D3A0B 21.74%, #000000 103.38%)",
                    }}
                >
                    <div className="p-4 lg:p-8 bg-black rounded-[16px]">
                        <h2 className="text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light mb-2">
                            Tak fordi du brugte vores prisberegner.
                        </h2>
                        <p className="text-[12px] lg:text-[18px] leading-[125%] font-light mb-6 max-w-[672px]">
                            Hvis du har spørgsmål eller har brug for hjælp til
                            at vælge den rette løsning, er du velkommen til at
                            skrive din e-mail herunder.
                        </p>
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full sm:max-w-[361px] mr-auto p-4 h-[49px] rounded-full border border-grey-light-2/60 text-[14px] leading-[121.4%] font-light placeholder:text-grey-light-2/60"
                        />
                    </div>
                </div>
                <MainButton className="w-full h-[58px] sm:w-[320px] sm:ml-auto">
                    Send
                </MainButton>
            </Container>
        </section>
    );
}
