import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface CalculatedPriceProps {
    total: number;
}

export default function CalculatedPrice({ total }: CalculatedPriceProps) {
    if (total <= 0) return null;

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30 })}
            className="rounded-lg bg-white/10 p-4 lg:flex lg:items-center lg:justify-between"
        >
            <motion.h2
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.85, x: -30 })}
                className="text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light pb-4 border-b border-white/10 lg:border-b-0 lg:pb-0 lg:p-0"
            >
                Forventet pris for din terrasse:
            </motion.h2>
            <motion.p
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.85, x: 30 })}
                className="pt-4 text-right text-[12px] lg:text-[18px] lg:leading-[150%] font-medium leading-[125%] lg:pt-0 lg:p-0"
            >
                ca. {total.toLocaleString()} kr.
            </motion.p>
        </motion.section>
    );
}
