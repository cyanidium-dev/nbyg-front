import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function ValuesSectionDecorations() {
  return (
    <div className={`absolute -z-10 w-full h-full pointer-events-none`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`absolute -z-20 -top-[128px] right-[calc(50%-332px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] lg:top-auto lg:right-auto lg:-bottom-[61px] lg:left-[264px]
            lg:w-[280px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`relative -z-20 w-[337px] lg:w-[280px] h-auto lg:rotate-[-111.83deg]`}
        />
        <div className="hidden lg:block absolute -top-20 left-0 w-[416px] h-[309px] bg-black supports-backdrop-filter:blur-[48px] will-change-transform" />
      </motion.div>
    </div>
  );
}
