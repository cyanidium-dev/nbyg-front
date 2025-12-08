import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import CheckboxCard from "./CheckboxCard";
import type { CheckboxOption } from "@/types/calculatorTag";

interface CheckboxInputProps {
  id: string;
  title: string;
  description?: string;
  options: CheckboxOption[];
  selectedValues?: Array<{ label: string; price: number }>;
  onChange: (
    id: string,
    updatedSelectedValues: Array<{ label: string; price: number }>
  ) => void;
}

export default function CheckboxInput({
  id,
  title,
  description,
  options,
  selectedValues,
  onChange,
}: CheckboxInputProps) {
  const selectedOptionIds = new Set(
    selectedValues
      ?.map(v => {
        const option = options.find(opt => opt.label === v.label);
        return option?.id;
      })
      .filter(Boolean) ?? []
  );

  return (
    <>
      {title && (
        <motion.h2
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30 })}
          className={`flex items-start text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light ${description ? "mb-2" : "mb-6"} before:content-[counter(calc-section)_'.'] before:mr-2 before:shrink-0`}
        >
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, y: 30 })}
          className="mb-6 text-[18px] leading-[125%]"
        >
          {description}
        </motion.p>
      )}
      <fieldset
        className="grid grid-cols-[repeat(2,minmax(157px,1fr))]
        md:grid-cols-[repeat(4,minmax(157px,1fr))] gap-x-[14px] gap-y-6 lg:gap-6 border-none p-0 m-0 justify-items-center"
      >
        {options.map((option, index) => {
          const isSelected = selectedOptionIds.has(option.id);

          const handleChange = () => {
            const currentSelectedValues = selectedValues ?? [];

            if (isSelected) {
              const updatedSelectedValues = currentSelectedValues.filter(
                v => v.label !== option.label
              );
              onChange(id, updatedSelectedValues);
            } else {
              const updatedSelectedValues = [
                ...currentSelectedValues,
                {
                  label: option.label,
                  price: option.price ?? 0,
                },
              ];
              onChange(id, updatedSelectedValues);
            }
          };

          return (
            <motion.div
              key={option.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({
                scale: 0.9,
                y: 20,
                delay: index * 0.1,
                duration: 0.5,
              })}
              className="w-full min-w-[157px] max-w-[272px]"
            >
              <CheckboxCard
                id={option.id}
                name={id}
                label={option.label}
                price={option.price ?? 0}
                image={option.image}
                isSelected={isSelected}
                onChange={handleChange}
              />
            </motion.div>
          );
        })}
      </fieldset>
    </>
  );
}
