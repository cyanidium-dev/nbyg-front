import FaqItem from "./FaqItem";
import * as motion from "motion/react-client";
import { listVariants } from "@/utils/animationVariants";

interface FaqListProps {
  faqList: Array<{
    _key?: string;
    question: string;
    answer: string;
    buttons?: Array<Record<string, unknown>>;
  }>;
}

export default function FaqList({ faqList }: FaqListProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col gap-4 lg:gap-6"
    >
      {faqList.map((faqItem, idx) => (
        <FaqItem key={idx} faqItem={faqItem} idx={idx} />
      ))}
    </motion.ul>
  );
}
