import { twMerge } from "tailwind-merge";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface DotsDecoProps {
    className?: string;
    delay: number;
}

export default function DotsDeco({ className, delay }: DotsDecoProps) {
    return (
        <div className={twMerge("flex gap-3", className)}>
            <motion.div
                variants={fadeInAnimation({ delay: delay, scale: 0.9 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="size-4 bg-brown rounded-full"
            />
            <motion.div
                variants={fadeInAnimation({ delay: delay + 0.1, scale: 0.9 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="size-4 bg-linear-[167.47deg] from-beige from-9.09% to-brown to-105.68% rounded-full"
            />
            <motion.div
                variants={fadeInAnimation({ delay: delay + 0.2, scale: 0.9 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="size-4 bg-white rounded-full"
            />
        </div>
    );
}
