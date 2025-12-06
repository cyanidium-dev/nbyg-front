import { valuesData } from "./valuesData";
import ValuesCard from "./ValuesCard";
import * as motion from "motion/react-client";
import { listVariants } from "@/utils/animationVariants";

export default function ValuesList() {
  return (
    <motion.ul
      key={`om-os-values-list`}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col md:flex-row md:flex-wrap gap-6"
    >
      {valuesData.map((value, idx) => (
        <ValuesCard key={idx} value={value} />
      ))}
    </motion.ul>
  );
}
