"use client";
import * as motion from "motion/react-client";
import { headerVariants } from "@/utils/animationVariants";
import SectionTitle from "../shared/titles/SectionTitle";
import ContactForm from "../shared/form/ContactForm";
import { fadeInAnimation } from "@/utils/animationVariants";
import { useState } from "react";
import Backdrop from "../shared/backdrop/Backdrop";
import Notification from "../shared/notification/Notification";

export default function ContactFormBlock() {
    const [isNotificationShown, setIsNotificationShown] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <>
            <motion.section
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.01 }}
                variants={headerVariants}
                className="relative md:max-w-[420px] p-px rounded-[16px] h-full md:mt-[352px] lg:mt-0"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(4, 4, 4, 0.4), rgba(4, 4, 4, 0.4)), 
                        linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)`,
                }}
            >
                <div className="px-6 py-8 bg-black rounded-[16px] w-full h-full">
                    <SectionTitle className="mb-6 tracking-[-0.02rem]">
                        Kontakt os
                    </SectionTitle>
                    <motion.p
                        variants={fadeInAnimation({ delay: 0.4, y: 20 })}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        className="text-[14px] leading-[121.4%] md:text-[16px] md:leading-[125%] font-light mb-6 tracking-[-0.02rem] lg:tracking-0"
                    >
                        Har du spørgsmål eller ønsker du et tilbud? Udfyld
                        formularen nedenfor – vi vender hurtigt tilbage med
                        rådgivning eller et uforpligtende tilbud.
                    </motion.p>
                    <motion.div
                        variants={fadeInAnimation({ delay: 0.5, y: 100 })}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <ContactForm
                            setIsError={setIsError}
                            setIsNotificationShown={setIsNotificationShown}
                        />
                    </motion.div>
                </div>
            </motion.section>
            <Notification
                title={isError ? "Noget gik galt" : "Tak for din henvendelse!"}
                description={
                    isError
                        ? "Der opstod en fejl, og din besked blev ikke sendt. Kontroller venligst, at alle felter er udfyldt korrekt, og prøv igen."
                        : "Vi har modtaget din besked og kontakter dig snarest muligt. Tak fordi du valgte Nbyg."
                }
                buttonText="Luk"
                isNotificationShown={isNotificationShown}
                setIsNotificationShown={setIsNotificationShown}
            />
            <Backdrop
                isVisible={isNotificationShown}
                onClick={() => {
                    setIsNotificationShown(false);
                }}
            />
        </>
    );
}
