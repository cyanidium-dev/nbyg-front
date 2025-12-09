import Image from "next/image";
import LetterIcon from "../shared/icons/LetterIcon";
import MapPointIcon from "../shared/icons/MapPointIcon";
import PhoneCallingIcon from "../shared/icons/PhoneCallingIcon";
import ChatLikeIcon from "../shared/icons/ChatLikeIcon";
import { fadeInAnimation } from "@/utils/animationVariants";
import {
    ADDRESS,
    ADDRESS_URL,
    CONTACT_PHONE,
    EMAIL,
} from "@/constants/constants";
import * as motion from "motion/react-client";
import { contactsPhoneRegex } from "@/regex/regex";
import SocialsGroup from "../shared/footer/SocialsGroup";
import { headerVariants } from "@/utils/animationVariants";

export default function ContactsBlock() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.01 }}
            variants={headerVariants}
            className="w-full md:mt-[352px] lg:mt-0"
        >
            <motion.div
                variants={fadeInAnimation({ delay: 0.2, y: 20 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="relative md:absolute lg:relative md:top-[127px] lg:top-0 md:left-4 lg:left-0 md:right-4 lg:right-0 w-full max-w-[736px] h-[240px] md:h-[332px] rounded-[16px] overflow-hidden mb-6"
            >
                <Image
                    src="/images/kontaktOsPage/contactsImage.webp"
                    alt="kontakt os contacts image"
                    fill
                    sizes="100vw"
                    className="object-cover object-top"
                />
            </motion.div>
            <div
                className="p-px rounded-[16px]"
                style={{
                    backgroundImage: `linear-gradient(0deg, rgba(4, 4, 4, 0.4), rgba(4, 4, 4, 0.4)), 
                        linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)`,
                }}
            >
                <div className="p-8 pr-4 md:pr-8 bg-black rounded-[16px] h-full w-full">
                    <h2 className="sr-only">kontakter</h2>
                    <address className="not-italic decoration-none">
                        <ul className="flex flex-col gap-y-14 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:grid-flow-col lg:gap-x-6">
                            <motion.li
                                variants={fadeInAnimation({
                                    delay: 0.4,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                className="flex md:flex-col items-center md:items-start gap-4"
                            >
                                <div className="size-[54px] lg:size-10 rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                    <LetterIcon className="size-8 lg:size-6 text-black" />
                                </div>
                                <div>
                                    <p className="text-[18px] leading-[125%] lg:text-[20px] font-light font-find-sans-pro uppercase mb-2 lg:mb-4">
                                        E-mail os:
                                    </p>
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="text-[14px] leading-[142%] lg:text-[16px] lg:leading-[125%] font-medium text-shadow-white break-all md:break-normal lg:break-all"
                                        aria-label="email"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                    >
                                        {EMAIL}
                                    </a>
                                </div>
                            </motion.li>
                            <motion.li
                                variants={fadeInAnimation({
                                    delay: 0.5,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                className="flex md:flex-col items-center md:items-start gap-4"
                            >
                                <div className="size-[54px] lg:size-10 rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                    <MapPointIcon className="size-8 lg:size-6 text-black" />
                                </div>
                                <div>
                                    <p className="text-[18px] leading-[125%] lg:text-[20px] font-light font-find-sans-pro uppercase mb-2 lg:mb-4">
                                        Adresse:
                                    </p>
                                    <a
                                        href={ADDRESS_URL}
                                        className="text-[14px] leading-[142%] lg:text-[16px] lg:leading-[125%] font-medium text-shadow-white"
                                        aria-label="address"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                    >
                                        {ADDRESS}
                                    </a>
                                </div>
                            </motion.li>
                            <motion.li
                                variants={fadeInAnimation({
                                    delay: 0.6,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                className="flex md:flex-col items-center md:items-start gap-4"
                            >
                                <div className="size-[54px] lg:size-10 rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                    <PhoneCallingIcon className="size-8 lg:size-6 text-black" />
                                </div>
                                <div>
                                    <p className="text-[18px] leading-[125%] lg:text-[20px] font-light font-find-sans-pro uppercase mb-2 lg:mb-4">
                                        Ring til os:
                                    </p>
                                    <a
                                        aria-label="phone"
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        href={`tel:${CONTACT_PHONE}`}
                                        className="text-[14px] leading-[142%] lg:text-[16px] lg:leading-[125%] font-medium text-shadow-white"
                                    >
                                        {CONTACT_PHONE.replace(
                                            contactsPhoneRegex,
                                            "+45 $1 $2 $3 $4"
                                        )}
                                    </a>
                                </div>
                            </motion.li>
                            <motion.li
                                variants={fadeInAnimation({
                                    delay: 0.8,
                                    y: 20,
                                })}
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                className="flex md:flex-col items-center md:items-start gap-4"
                            >
                                <div className="size-[54px] lg:size-10 rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                    <ChatLikeIcon className="size-8 lg:size-6 text-black" />
                                </div>
                                <div>
                                    <p className="text-[18px] leading-[125%] lg:text-[20px] font-light font-find-sans-pro uppercase mb-2 lg:mb-4">
                                        Følg os:
                                    </p>
                                    <SocialsGroup buttonClassName="size-6" />
                                </div>
                            </motion.li>
                        </ul>
                    </address>
                </div>
            </div>
        </motion.section>
    );
}
