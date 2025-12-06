import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function HistorySectionDecorations() {
  return (
    <div className={`absolute -z-10 w-full h-full pointer-events-none`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`absolute -z-20 -top-[128px] right-[calc(50%-332px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] lg:top-[-376px] lg:right-[calc(50%-495px)] 
        w-[337px] lg:w-[634px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`relative -z-20 w-[337px] lg:w-[634px] h-auto lg:-rotate-130`}
        />
        <div
          className={`hidden lg:block absolute w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] 
            will-change-transform top-[110px] right-[-229px]`}
        />
      </motion.div>
    </div>
  );
}
