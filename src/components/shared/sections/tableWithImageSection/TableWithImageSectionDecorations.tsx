import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface TableWithImageSectionDecorationsProps {
  uniqueKey?: string;
  tablePosition: string;
}

export default function TableWithImageSectionDecorations({
  uniqueKey,
  tablePosition,
}: TableWithImageSectionDecorationsProps) {
  return (
    <div
      className={`hidden xl:block absolute w-full h-full pointer-events-none  ${tablePosition === "right" ? "" : ""}`}
    >
      <motion.div
        key={`${uniqueKey}-decorations`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, delay: 1.2 })}
        className={`absolute -z-10 ${tablePosition === "right" ? "xl:bottom-[-118px] xl:right-[calc(50%-50px)]" : "xl:bottom-[-271px] xl:right-[calc(50%-630px)]"} 
        w-[337px] xl:w-[645px] h-auto aspect-337/421`}
      >
        <Image
          src="/images/decorations/ellipsis.svg"
          width="337"
          height="421"
          alt="ellipsis"
          className={`w-[337px] xl:w-[645px] h-auto ${tablePosition === "right" ? "lg:-rotate-63" : "xl:-rotate-93"}`}
        />
      </motion.div>
    </div>
  );
}
