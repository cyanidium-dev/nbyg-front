import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface LargeTableSectionDecorationsProps {
  uniqueKey?: string;
}

export default function LargeTableSectionDecorations({
  uniqueKey,
}: LargeTableSectionDecorationsProps) {
  return (
    <div className={`absolute -z-10 w-full h-full pointer-events-none`}>
      <motion.div
        key={`${uniqueKey}-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 0, duration: 0.5 })}
        className={`hidden lg:block absolute top-[155px] right-[calc(50%-196px)] w-[350px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`w-[350px] h-auto rotate-90`}
        />
      </motion.div>
    </div>
  );
}
