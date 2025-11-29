import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface DecorativeEllipsisProps {
    uniqueKey?: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    variant?: "normal" | "large";
}

export default function DecorativeEllipsis({
    uniqueKey,
    className = "",
    delay = 0.4,
    staggerDelay = 0.2,
    variant = "normal",
}: DecorativeEllipsisProps) {
    return (
        <div
            className={twMerge(
                "flex gap-2 lg:gap-3",
                variant === "large" && "gap-3",
                className
            )}
        >
            <motion.span
                key={`${uniqueKey}-1`}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.85, delay: delay })}
                className={twMerge(
                    "size-3 lg:size-4 rounded-full bg-brown",
                    variant === "large" && "size-4"
                )}
            />
            <motion.span
                key={`${uniqueKey}-2`}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                    scale: 0.85,
                    delay: delay + staggerDelay,
                })}
                className={twMerge(
                    "size-3 lg:size-4 rounded-full bg-[linear-gradient(167.47deg,var(--color-beige)_9.09%,var(--color-brown)_105.68%)]",
                    variant === "large" && "size-4"
                )}
            />
            <motion.span
                key={`${uniqueKey}-3`}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({
                    scale: 0.85,
                    delay: delay + staggerDelay * 2,
                })}
                className={twMerge(
                    "size-3 lg:size-4 rounded-full bg-white",
                    variant === "large" && "size-4"
                )}
            />
        </div>
    );
}
