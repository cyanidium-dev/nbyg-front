import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface ServiceSectionDecorationsProps {
  uniqueKey?: string;
  imageRight: boolean;
}

export default function ServiceSectionDecorations({
  uniqueKey,
  imageRight,
}: ServiceSectionDecorationsProps) {
  return (
    <div
      className={`absolute -z-10 w-full h-full pointer-events-none  ${imageRight ? "" : ""}`}
    >
      <motion.div
        key={`${uniqueKey}-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`absolute -z-20 -top-[123px] right-[calc(50%-332px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] ${imageRight ? "lg:top-[-176px] lg:right-[calc(50%-500px)]" : "lg:top-[-176px] lg:left-[calc(50%-530px)]"} 
        w-[337px] lg:w-[634px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`relative -z-20 w-[337px] lg:w-[634px] h-auto  ${imageRight ? "lg:rotate-30" : "lg:-rotate-190"}`}
        />
        <div
          className={`hidden lg:block absolute w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] 
            will-change-transform ${imageRight ? "top-[430px] right-[-179px] -z-10" : "lg:top-[340px] lg:left-[calc(50%-500px)]"}`}
        />
      </motion.div>
    </div>
  );
}
