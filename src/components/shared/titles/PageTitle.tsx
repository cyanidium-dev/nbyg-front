import { twMerge } from "tailwind-merge";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface PageTitleProps {
  children: string;
  className?: string;
  uniqueKey?: string;
}

export default function PageTitle({
  children,
  className = "",
  uniqueKey,
}: PageTitleProps) {
  return (
    <motion.h1
      key={uniqueKey ? `${uniqueKey}-title` : undefined}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInAnimation({ scale: 0.85, y: 30, x: -70 })}
      className={twMerge(
        "font-find-sans-pro text-[24px] lg:text-[48px] font-light leading-[120%] uppercase",
        className
      )}
    >
      {children}
    </motion.h1>
  );
}
