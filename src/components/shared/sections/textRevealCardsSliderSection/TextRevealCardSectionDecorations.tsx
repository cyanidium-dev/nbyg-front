import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface TextRevealCardsSectionDecorationsProps {
  uniqueKey?: string;
}

export default function TextRevealCardsSectionDecorations({
  uniqueKey,
}: TextRevealCardsSectionDecorationsProps) {
  return (
    <div className={`absolute w-full h-full pointer-events-none`}>
      <motion.div
        key={`${uniqueKey}-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`absolute top-[-101px] right-[calc(50%-282px)] xs:right-[calc(50%-400px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] lg:top-[-328px] lg:right-[calc(50%-500px)]"} 
        w-[337px] lg:w-[634px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`w-[360px] lg:w-[739px] h-auto -rotate-10`}
        />
        {/* <div
          className={`hidden lg:block absolute  w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] 
            will-change-transform top-14 right-[-109px]`}
        /> */}
      </motion.div>
    </div>
  );
}
