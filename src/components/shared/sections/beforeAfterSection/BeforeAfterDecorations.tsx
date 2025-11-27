import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface BeforeAFterSectionDecorationsProps {
  uniqueKey?: string;
}

export default function BeforeAFterSectionDecorations({
  uniqueKey,
}: BeforeAFterSectionDecorationsProps) {
  return (
    <div className={`absolute -z-10 w-full h-full pointer-events-none`}>
      <motion.div
        key={`${uniqueKey}-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`absolute top-[-111px] lg:top-[-61px] right-[calc(50%-317px)] xs:right-[calc(50%-400px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] lg:right-[calc(50%-530px)] 
        w-[337px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`w-[360px] h-auto -rotate-10 lg:rotate-55`}
        />
      </motion.div>
    </div>
  );
}
