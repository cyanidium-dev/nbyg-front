import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface MaterialsSliderDecorationsProps {
  uniqueKey?: string;
}

export default function MaterialsSliderDecorations({
  uniqueKey,
}: MaterialsSliderDecorationsProps) {
  return (
    <>
      <motion.div
        key={`${uniqueKey}-materials-slider-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
        className="absolute -top-5 lg:top-auto lg:bottom-[-285px] right-[calc(50%-332px)] sm:right-[calc(50%-500px)] md:right-[calc(50%-600px)] lg:right-[calc(50%-286px)] w-[337px] lg:w-[634px] h-auto aspect-337/421"
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className="w-[337px] lg:w-[634px] h-auto"
        />
        <div className="hidden lg:block absolute top-[106px] left-[-320px] w-[1134px] h-[504px] rounded-full bg-black supports-backdrop-filter:blur-[53px] will-change-transform" />
      </motion.div>
    </>
  );
}
