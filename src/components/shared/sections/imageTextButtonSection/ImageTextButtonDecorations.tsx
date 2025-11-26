import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface ImageTextButtonDecorationsProps {
  uniqueKey?: string;
  titlePosition: string;
}

export default function ImageTextButtonDecorations({
  uniqueKey,
  titlePosition,
}: ImageTextButtonDecorationsProps) {
  return (
    <div className="absolute w-full h-full pointer-events-none overflow-hidden">
      <motion.div
        key={`${uniqueKey}-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.3, duration: 0.5 })}
        className={`absolute -top-5 lg:top-[-328px] right-[calc(50%-332px)] sm:right-[calc(50%-500px)] ${titlePosition === "left" ? "lg:right-[calc(50%-500px)]" : "lg:left-[calc(50%-500px)]"} 
        w-[337px] lg:w-[634px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className="w-[337px] lg:w-[739px] h-auto lg:rotate-45"
        />
        <div className="hidden lg:block absolute top-14 right-[-109px] w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] will-change-transform" />
      </motion.div>
    </div>
  );
}
