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
}

export default function SocialsGroup({ className }: SocialsGroupProps) {
    return (
        <motion.ul
            variants={fadeInAnimation({ delay: 0.4 })}
            initial="hidden"
            className={twMerge("flex items-center gap-5", className)}
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
        >
            <li className="w-8 h-8 flex items-center justify-center xl:hover:opacity-80 transition-opacity duration-300">
                <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="facebook"
                >
                    <FacebookIcon className="text-white svg-shadow-white" />
                </a>
            </li>
            <li className="w-8 h-8 flex items-center justify-center xl:hover:opacity-80 transition-opacity duration-300">
                <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="youtube"
                >
                    <YouTubeIcon className="text-white svg-shadow-white" />
                </a>
            </li>
            <li className="w-8 h-8 flex items-center justify-center xl:hover:opacity-80 transition-opacity duration-300">
                <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    aria-label="instagram"
                >
                    <InstagramIcon className="text-white svg-shadow-white" />
                </a>
            </li>
        </motion.ul>
    );
}
