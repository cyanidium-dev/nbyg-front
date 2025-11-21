import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { twMerge } from "tailwind-merge";

interface DecorativeEllipsisProps {
  uniqueKey?: string;
  className?: string;
}

export default function DecorativeEllipsis({
  uniqueKey,
  className = "",
}: DecorativeEllipsisProps) {
  return (
    <div className={twMerge("flex gap-2 lg:gap-3", className)}>
      <motion.span
        key={`${uniqueKey}-1`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.4 })}
        className="size-3 lg:size-4 rounded-full bg-brown"
      />
      <motion.span
        key={`${uniqueKey}-2`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.6 })}
        className="size-3 lg:size-4 rounded-full bg-[linear-gradient(167.47deg,var(--color-beige)_9.09%,var(--color-brown)_105.68%)]"
      />
      <motion.span
        key={`${uniqueKey}-3`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.8 })}
        className="size-3 lg:size-4 rounded-full bg-white"
      />
    </div>
  );
}
