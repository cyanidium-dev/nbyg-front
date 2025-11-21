"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import { listItemVariantsLeft } from "@/utils/animationVariants";
import ShevronIcon from "../../icons/ShevronIcon";

interface FaqItemProps {
  faqItem: {
    _key?: string;
    question: string;
    answer: string;
    buttons?: Array<Record<string, unknown>>;
  };
  idx: number;
}

export default function FaqItem({ faqItem, idx }: FaqItemProps) {
  const [isShownMore, setIsShownMore] = useState(false);
  const toggleShowMore = () => setIsShownMore(!isShownMore);

  const { question, answer } = faqItem;

  return (
    <motion.li
      viewport={{ once: true, amount: 0.2 }}
      variants={listItemVariantsLeft}
      onClick={toggleShowMore}
      className={`relative group cursor-pointer px-4 py-6 lg:py-[26px] rounded-[8px] backdrop-blur-[38px] button-shadow-white transition-[background-color,filter] duration-700 ease-in-out`}
    >
      <div
        className="absolute z-10 inset-0 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] pointer-events-none 
      xl:group-hover:brightness-125 transition duration-300 ease-in-out"
      />
      <div className={`flex items-center gap-6 justify-between`}>
        <h3 className={`text-[16px] lg:text-[18px] font-normal leading-[120%]`}>
          {question}
        </h3>
        <ShevronIcon className={`size-6 shrink-0 rotate-180`} />
      </div>
      <div
        className={`overflow-hidden transition-[max-height] duration-700 will-change-transform ${
          isShownMore ? "max-h-[1000px] ease-in" : "max-h-0 ease-out"
        }`}
      >
        <p
          className={`pt-8 pr-10 lg:pt-[38px] text-[14px] font-light leading-[143%] whitespace-pre-line`}
        >
          {answer}
        </p>
      </div>
    </motion.li>
  );
}
