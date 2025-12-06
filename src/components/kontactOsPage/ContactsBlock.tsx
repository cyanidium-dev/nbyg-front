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
import Container from "../shared/container/Container";
import { headerVariants } from "@/utils/animationVariants";

export default function ContactsBlock() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.01 }}
            variants={headerVariants}
            className="relative py-25"
        >
            <Container>
                <div className="relative w-full h-[240px] rounded-[16px] overflow-hidden mb-6">
                    <Image
                        src="/images/kontaktOsPage/contactsImage.webp"
                        alt="kontakt os contacts image"
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div
                    className="p-px rounded-[16px]"
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgba(4, 4, 4, 0.4), rgba(4, 4, 4, 0.4)), 
                        linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)`,
                    }}
                >
                    <div className="p-8 pr-5 bg-black rounded-[16px]">
                        <h2 className="sr-only">kontakter</h2>
                        <address className="not-italic decoration-none">
                            <ul className="flex flex-col gap-y-14">
                                <motion.li
                                    variants={fadeInAnimation({
                                        delay: 0.7,
                                        y: 20,
                                    })}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="size-[54px] rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                        <LetterIcon className="size-8 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-[18px] leading-[125%] font-light font-find-sans-pro uppercase mb-2">
                                            E-mail os:
                                        </p>
                                        <a
                                            href={`mailto:${EMAIL}`}
                                            className="text-[14px] leading-[142%] font-medium text-shadow-white"
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
                                        delay: 0.7,
                                        y: 20,
                                    })}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="size-[54px] rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                        <MapPointIcon className="size-8 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-[18px] leading-[125%] font-light font-find-sans-pro uppercase mb-2">
                                            Adresse:
                                        </p>
                                        <a
                                            href={ADDRESS_URL}
                                            className="text-[14px] leading-[142%] font-medium text-shadow-white"
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
                                        delay: 0.7,
                                        y: 20,
                                    })}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="size-[54px] rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                        <PhoneCallingIcon className="size-8 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-[18px] leading-[125%] font-light font-find-sans-pro uppercase mb-2">
                                            Ring til os:
                                        </p>
                                        <a
                                            aria-label="phone"
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            href={`tel:${CONTACT_PHONE}`}
                                            className="text-[14px] leading-[142%] font-medium text-shadow-white"
                                        >
                                            {CONTACT_PHONE.replace(
                                                contactsPhoneRegex,
                                                "+45 $1"
                                            )}
                                        </a>
                                    </div>
                                </motion.li>
                                <motion.li
                                    variants={fadeInAnimation({
                                        delay: 0.7,
                                        y: 20,
                                    })}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="size-[54px] rounded-[8px] bg-white flex items-center justify-center shrink-0">
                                        <ChatLikeIcon className="size-8 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-[18px] leading-[125%] font-light font-find-sans-pro uppercase mb-2">
                                            Følg os:
                                        </p>
                                        <SocialsGroup />
                                    </div>
                                </motion.li>
                            </ul>
                        </address>
                    </div>
                </div>
            </Container>
        </motion.section>
    );
}
