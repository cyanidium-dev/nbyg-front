import Image from "next/image";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

export default function ReviewsDecorations() {
    return (
        <div className="absolute -z-10 inset-0 pointer-events-none">
            <motion.div
                variants={fadeInAnimation({ delay: 0.9, scale: 0.8 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="absolute right-[-154px] md:right-auto md:left-[313px] top-[13px] md:top-auto md:bottom-[-218px] rotate-[-34deg] md:rotate-[240deg]"
            >
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="ellipsis"
                    width="300"
                    height="228"
                    className="w-[300px] h-auto"
                />
            </motion.div>
            <motion.div
                variants={fadeInAnimation({ delay: 1, scale: 0.8 })}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                className="absolute bottom-[-172px] md:bottom-[-146px] right-[-92px] md:right-auto md:left-[313px] rotate-[52deg] md:rotate-[240deg]"
            >
                <Image
                    src="/images/decorations/ellipsis.svg"
                    alt="ellipsis"
                    width="300"
                    height="228"
                    className="w-[300px] h-auto"
                />
            </motion.div>
            <div className="hidden md:block absolute z-1 bottom-[-30px] left-[313px] w-[416px] h-[309px] bg-black blur-[48.1453px]" />
        </div>
    );
}
