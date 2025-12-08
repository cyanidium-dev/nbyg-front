import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface CookieHeadingProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function CookieHeading({
    children,
    className,
    delay = 0,
}: CookieHeadingProps) {
    return (
        <motion.h2
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.95, y: 10, delay: delay })}
            className={`font-medium mb-4 text-[14px] lg:text-[16px] leading-[150%] text-light tracking-[-0.02rem] ${className}`}
        >
            {children}
        </motion.h2>
    );
    return;
}
