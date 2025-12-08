import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import CheckboxCard from "./CheckboxCard";
import ImageCard from "./ImageCard";
import NumberInput from "./NumberInput";
import { useRef } from "react";
import type {
  RadioOption,
  SingleSelectFieldValue,
  OptionalFieldValue,
  FormValues,
} from "@/types/calculatorTag";

interface RadioInputProps {
  id: string;
  title: string;
  description?: string;
  options: RadioOption[];
  selectedValue?: SingleSelectFieldValue;
  values?: FormValues;
  onChange: (id: string, value: SingleSelectFieldValue) => void;
  onNumberChange?: (
    numberFieldId: string,
    value: OptionalFieldValue | undefined
  ) => void;
}

export const RadioInput = ({
  id,
  title,
  description,
  options,
  selectedValue,
  values,
  onChange,
  onNumberChange,
}: RadioInputProps) => {
  const numberInputRef = useRef<HTMLInputElement>(null);

  const numberOption = options.find(
    opt => "type" in opt && opt.type === "number"
  ) as
    | {
        id: string;
        label: string;
        type: "number";
        variant?: "hidden";
        min?: number;
        max?: number;
      }
    | undefined;

  const selectedOptionValue = selectedValue?.label;
  const numberValue = numberOption
    ? (values?.[numberOption.id] as OptionalFieldValue | undefined)?.value
    : undefined;
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
          if ("type" in option && option.type === "image") {
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
                className="w-full min-w-[157px] max-w-[272px] md:col-start-4"
              >
                <ImageCard
                  id={option.id}
                  label={option.label}
                  image={option.image}
                />
              </motion.div>
            );
          }

          if ("type" in option && option.type === "number") {
            if (option.min === undefined || option.max === undefined) {
              return null;
            }

            const shouldShow =
              option.variant !== "hidden" ||
              (option.variant === "hidden" &&
                selectedOptionValue === "31-50 grader");

            return (
              <AnimatePresence key={option.id}>
                {shouldShow && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="w-full col-span-full overflow-hidden"
                  >
                    <NumberInput
                      ref={numberInputRef}
                      id={option.id}
                      label={option.label}
                      value={numberValue ?? 0}
                      onChange={value => {
                        if (onNumberChange) {
                          onNumberChange(option.id, {
                            label: option.label,
                            value: value,
                          });
                        }
                      }}
                      min={option.min}
                      max={option.max}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          }

          if (!("image" in option) || !option.image) return null;

          const optionPrice = "price" in option ? (option.price ?? 0) : 0;
          const isSelected = selectedOptionValue === option.label;

          const handleRadioChange = () => {
            onChange(id, {
              summaryLabel: "",
              label: option.label,
              price: optionPrice,
            });

            if (option.id === "0-30 grader" && numberOption && onNumberChange) {
              onNumberChange(numberOption.id, undefined);
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
                price={optionPrice}
                image={option.image}
                isSelected={isSelected}
                type="radio"
                onChange={handleRadioChange}
              />
            </motion.div>
          );
        })}
      </fieldset>
    </>
  );
};
