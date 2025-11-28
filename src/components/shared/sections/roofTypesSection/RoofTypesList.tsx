import * as motion from "motion/react-client";
import { fadeInAnimation, listVariants } from "@/utils/animationVariants";
import RoofTypeCard from "./RoofTypeCard";

interface RoofType {
  _key?: string;
  title: string;
  description: string;
}

interface RoofTypesListProps {
  roofTypes: RoofType[];
  uniqueKey?: string;
}

const RoofTypesList = ({ roofTypes, uniqueKey }: RoofTypesListProps) => {
  return (
    <motion.div
      key={`${uniqueKey}-roof-types-list`}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={listVariants({ staggerChildren: 0.3, delayChildren: 0.4 })}
      className="flex flex-col gap-6 lg:gap-5"
    >
      {roofTypes.map((roofType, index) => (
        <RoofTypeCard
          key={roofType._key || `${uniqueKey}-roof-type-${index}`}
          title={roofType.title}
          description={roofType.description}
          uniqueKey={uniqueKey || "roof-types"}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default RoofTypesList;
