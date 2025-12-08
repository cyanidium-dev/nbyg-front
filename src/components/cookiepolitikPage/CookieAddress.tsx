import { ADDRESS, CONTACT_PHONE, CVR, EMAIL } from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface CookieAddressProps {
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

export default function CookieAddress({
    className,
    delay = 0,
    staggerDelay = 0,
}: CookieAddressProps) {
    return (
        <address className={`not-italic tracking-normal text-[14px] lg:text-[16px] leading-[150%] ${className}`}>
            <motion.p
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.95, y: 10, delay: delay })}
            >
                Nbyg Bornholm ApS
            </motion.p>
            <motion.p
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                    scale: 0.95,
                    y: 10,
                    delay: delay + staggerDelay,
                })}
            >
                Adresse: {ADDRESS}, Danmark
            </motion.p>
            <motion.a
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                    scale: 0.95,
                    y: 10,
                    delay: delay + 2 * staggerDelay,
                })}
                href={`tel:${CONTACT_PHONE}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="cursor-pointer block"
            >
                Telefon:{" "}
                {CONTACT_PHONE.replace(
                    contactsPhoneRegex,
                    "+45 $1 $2 $3 $4"
                )}{" "}
            </motion.a>
            <motion.a
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                    scale: 0.95,
                    y: 10,
                    delay: delay + 3 * staggerDelay,
                })}
                href={`mailto:${EMAIL}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="cursor-pointer block"
            >
                E-mail: {EMAIL}
            </motion.a>
            <motion.p
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                    scale: 0.95,
                    y: 10,
                    delay: delay + 4 * staggerDelay,
                })}
            >
                CVR: {CVR}
            </motion.p>
        </address>
    );
}
