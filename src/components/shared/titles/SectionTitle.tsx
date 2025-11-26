import { twMerge } from "tailwind-merge";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface SectionTitleProps {
  children: string;
  className?: string;
  uniqueKey?: string;
}

export default function SectionTitle({
  children,
  className = "",
  uniqueKey,
}: SectionTitleProps) {
  return (
    <motion.h2
      key={uniqueKey ? `${uniqueKey}-section-title` : undefined}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, y: 30, x: -70 })}
      className={twMerge(
        "font-find-sans-pro text-[24px] lg:text-[48px] font-light leading-[120%] uppercase ",
        className
      )}
    >
      {children}
    </motion.h2>
  );
}
