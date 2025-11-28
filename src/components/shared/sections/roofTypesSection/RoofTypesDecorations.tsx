import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface RoofTypesDecorationsProps {
  uniqueKey?: string;
}

export default function RoofTypesDecorations({
  uniqueKey,
}: RoofTypesDecorationsProps) {
  return (
    <div className={`absolute -z-10 w-full h-full pointer-events-none`}>
      <motion.div
        key={`${uniqueKey}-decorations1`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`absolute top-[-101px] lg:top-[135px] right-[calc(50%-282px)] xs:right-[calc(50%-400px)] sm:right-[calc(50%-500px)] 
            md:right-[calc(50%-600px)] lg:right-[calc(50%+180px)] 
           w-[337px] lg:w-[460px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`w-[360px] lg:w-[739px] h-auto -rotate-10 lg:-rotate-130`}
        />
        <div
          className={`hidden lg:block absolute w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] 
               will-change-transform top-[-192px] left-[-177px]`}
        />
      </motion.div>

      <motion.div
        key={`${uniqueKey}-decorations2`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`hidden lg:block absolute bottom-[31px] right-[calc(50%-282px)]  
           w-[480px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`w-[480px] h-auto rotate-50`}
        />
        <div
          className={`hidden lg:block absolute w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] 
               will-change-transform bottom-[-192px] left-[-347px]`}
        />
      </motion.div>
    </div>
  );
}
