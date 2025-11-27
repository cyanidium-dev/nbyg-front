import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface FaqSectionImagesProps {
  uniqueKey?: string;
}

export default function FaqSectionImages({ uniqueKey }: FaqSectionImagesProps) {
  return (
    <>
      <motion.div
        key={`${uniqueKey}-faq-section-image1`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
        className="absolute -top-2 lg:top-auto lg:bottom-[-216px] right-[calc(50%-352px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] lg:right-auto lg:left-[294px] w-[337px] 
            lg:w-[337px] h-auto aspect-337/421"
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className="lg:rotate-[-131.83deg]"
        />
        <div className="hidden lg:block absolute -top-20 left-4 w-[416px] h-[309px] bg-black supports-backdrop-filter:blur-[48px] will-change-transform" />
      </motion.div>
      <motion.div
        key={`${uniqueKey}-faq-section-image2`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
        className="hidden lg:block absolute top-[113px] left-[324px]
              w-[556px] h-auto aspect-337/421"
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className="w-[556px] h-auto"
        />
        <div className="absolute -top-20 right-[-430px] w-[684px] h-[611px] bg-black supports-backdrop-filter:blur-[95px] will-change-transform" />
      </motion.div>
    </>
  );
}
