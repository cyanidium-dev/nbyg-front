import FaqItem from "./FaqItem";
import * as motion from "motion/react-client";
import { listVariants } from "@/utils/animationVariants";
import { Dispatch, SetStateAction } from "react";

interface FaqListProps {
  faqList: Array<{
    _key?: string;
    question: string;
    answer: string;
    buttons?: string[];
  }>;
  uniqueKey?: string;
  setIsModalShown?: Dispatch<SetStateAction<boolean>>;
}

export default function FaqList({ faqList, uniqueKey, setIsModalShown }: FaqListProps) {
  if (!faqList || !faqList?.length) return null;

  return (
    <motion.ul
      key={`${uniqueKey}-faq-section-list`}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col gap-4 lg:gap-6"
    >
      {faqList.map((faqItem, idx) => (
        <FaqItem key={idx} faqItem={faqItem} setIsModalShown={setIsModalShown} />
      ))}
    </motion.ul>
  );
}
