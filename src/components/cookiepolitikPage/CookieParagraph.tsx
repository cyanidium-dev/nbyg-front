import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface CookieParagraphProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}
export default function CookieParagraph({
    children,
    className,
    delay = 0,
}: CookieParagraphProps) {
    return (
        <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.95, y: 30, delay: delay })}
            className={`font-light leading-[150%] tracking-[-0.02rem] text-[14px] lg:text-[16px] ${className}`}
        >
            {children}
        </motion.p>
    );
}
