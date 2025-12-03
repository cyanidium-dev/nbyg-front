import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface GalleryDecorationsProps {
  uniqueKey?: string;
}

export default function GalleryDecorations({
  uniqueKey,
}: GalleryDecorationsProps) {
  return (
    <div className="absolute w-full h-full pointer-events-none">
      <motion.div
        key={`${uniqueKey}-decorations1`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
        className="absolute top-[76px] lg:top-[-33px] right-[calc(50%-224px)] lg:right-[calc(50%-286px)] w-[337px] lg:w-[634px] h-auto aspect-337/421"
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className="w-[317px] lg:w-[584px] h-auto rotate-40 lg:rotate-25"
        />
      </motion.div>
      <motion.div
        key={`${uniqueKey}-decorations2`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
        className="lg:hidden absolute top-[196px] right-[calc(50%-134px)] lg:right-[calc(50%-286px)] w-[337px] lg:w-[634px] h-auto aspect-337/421"
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className="w-[317px] lg:w-[634px] h-auto rotate-35"
        />
      </motion.div>
    </div>
  );
}
