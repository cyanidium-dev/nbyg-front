import InstagramIcon from "../icons/InstagramIcon";
import {
    INSTAGRAM_URL,
    FACEBOOK_URL,
    YOUTUBE_URL,
} from "@/constants/constants";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import { twMerge } from "tailwind-merge";
import FacebookIcon from "../icons/FacebookIcon";
import YouTubeIcon from "../icons/YouTubeIcon";

interface SocialsGroupProps {
    className?: string;
    buttonClassName?: string;
}

export default function SocialsGroup({
    className,
    buttonClassName,
}: SocialsGroupProps) {
    return (
        <ul className={twMerge("flex items-center gap-5", className)}>
            <motion.li
                variants={fadeInAnimation({ delay: 0.3 })}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={twMerge(
                    "size-8 flex items-center justify-center",
                    buttonClassName
                )}
            >
                <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="facebook"
                    className="w-full h-full flex items-center justify-center xl:hover:opacity-80 transition-opacity duration-300"
                >
                    <FacebookIcon className="text-white " />
                </a>
            </motion.li>
            <motion.li
                variants={fadeInAnimation({ delay: 0.4 })}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={twMerge(
                    "size-8 flex items-center justify-center",
                    buttonClassName
                )}
            >
                <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="youtube"
                    className="w-full h-full flex items-center justify-center xl:hover:opacity-80 transition-opacity duration-300"
                >
                    <YouTubeIcon className="text-white" />
                </a>
            </motion.li>
            <motion.li
                variants={fadeInAnimation({ delay: 0.5 })}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={twMerge(
                    "size-8 flex items-center justify-center",
                    buttonClassName
                )}
            >
                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="instagram"
                    className={twMerge(
                        "w-full h-full flex items-center justify-center xl:hover:opacity-80 transition-opacity duration-300 outline-none focus-visible:outline-none",
                        buttonClassName
                    )}
                >
                    <InstagramIcon className="text-white" />
                </a>
            </motion.li>
        </ul>
    );
}
