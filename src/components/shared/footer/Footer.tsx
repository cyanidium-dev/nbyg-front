import Container from "../container/Container";
import SocialsGroup from "./SocialsGroup";
import {
    ADDRESS,
    ADDRESS_URL,
    CONTACT_PHONE,
    CVR,
    EMAIL,
} from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import Rights from "./Rights";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function Footer() {
    return (
        <footer className="py-15 lg:pt-[138px] lg:pb-[70px]">
            <Container className="flex flex-col items-center">
                <div className="flex flex-col md:flex-row justify-between w-full lg:mb-12.5">
                    <div className="flex flex-col items-center md:items-start mb-4.5 md:mb-0">
                        <motion.h2
                            variants={fadeInAnimation({ delay: 0.2, y: 20 })}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true, amount: 0.1 }}
                            className="text-[14px] leading-[108.28%] uppercase font-light font-find-sans-pro mb-11 text-center"
                        >
                            Nbyg Bornholm A<span className="lowercase">p</span>S
                        </motion.h2>
                        <SocialsGroup />
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-13.5 md:mb-0">
                        <div className="flex flex-col items-center md:items-start mb-4.5 md:mb-0 md:mr-10 lg:mr-[143px]">
                            <motion.a
                                variants={fadeInAnimation({
                                    delay: 0.6,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                href={`tel:${CONTACT_PHONE}`}
                                className="text-[14px] leading-[129%] uppercase font-medium tracking-[0.0016em] mb-3 text-center text-shadow-white"
                            >
                                {CONTACT_PHONE.replace(
                                    contactsPhoneRegex,
                                    "+45 $1 $2 $3 $4"
                                )}
                            </motion.a>
                            <motion.a
                                variants={fadeInAnimation({
                                    delay: 0.7,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                href={`mailto:${EMAIL}`}
                                className="text-[12px] leading-[150%] uppercase font-medium tracking-[0.0016em] text-center text-shadow-white"
                            >
                                {EMAIL}
                            </motion.a>
                        </div>
                        <div className="flex flex-col items-center md:items-start">
                            <motion.div
                                variants={fadeInAnimation({
                                    delay: 0.8,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                className="text-[12px] leading-[125%] uppercase font-medium mb-4 text-center"
                            >
                                CRV: {CVR}
                            </motion.div>
                            <motion.div
                                variants={fadeInAnimation({
                                    delay: 0.9,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                className="text-[12px] leading-[125%] uppercase font-medium text-center md:text-left"
                            >
                                Adresse:
                                <a
                                    href={ADDRESS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    className="block text-shadow-white"
                                >
                                    {ADDRESS}
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <Rights />
            </Container>
        </footer>
    );
}
