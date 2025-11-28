import { listItemVariantsLeft } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface RoofTypeCardProps {
  title: string;
  description: string;
  uniqueKey: string;
  index: number;
}

const RoofTypeCard = ({
  title,
  description,
  uniqueKey,
  index,
}: RoofTypeCardProps) => {
  return (
    <motion.div
      key={`${uniqueKey}-roof-type-${index}`}
      viewport={{ once: true, amount: 0.2 }}
      variants={listItemVariantsLeft}
      className="relative px-4 py-8 rounded-[12px] bg-black"
      style={{
        isolation: "isolate",
      }}
    >
      <div
        key={`${uniqueKey}-roof-type-gradient-${index}`}
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        style={{
          background:
            "linear-gradient(316.28deg, var(--color-gradient-brown-dark) 6.67%, var(--color-black) 95.76%)",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <h4 className="font-find-sans-pro text-[20px] lg:text-[24px] leading-[120%] uppercase mb-4 lg:mb-5">
        {title}
      </h4>
      <p className="text-[14px] font-light leading-[120%] whitespace-pre-line">
        {description}
      </p>
    </motion.div>
  );
};

export default RoofTypeCard;
