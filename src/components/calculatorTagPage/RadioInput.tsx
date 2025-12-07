import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import CheckboxCard from "./CheckboxCard";
import ImageCard from "./ImageCard";
import NumberInput from "./NumberInput";
import { useRef } from "react";

interface RadioInputProps {
    id: string;
    title: string;
    description?: string;
    options: {
        id: string;
        label: string;
        value?: string | number;
        type?: "image" | "number";
        variant?: "hidden";
        image?: {
            link: string;
            priority?: boolean;
        };
        min?: number;
        max?: number;
    }[];
    selectedOptionValue?: string;
    numberValue?: number;
    onChange: (
        id: string,
        optionId: string,
        optionLabel: string,
        optionValue: number
    ) => void;
    onNumberChange?: (numberFieldId: string, value: number) => void;
}

export const RadioInput = ({
    id,
    title,
    description,
    options,
    selectedOptionValue,
    numberValue,
    onChange,
    onNumberChange,
}: RadioInputProps) => {
    const numberInputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            {title && (
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    exit="exit"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={fadeInAnimation({ scale: 0.85, y: 30 })}
                    className={`text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light ${description ? "mb-2" : "mb-6"} before:content-[counter(calc-section)_'.'] before:mr-2`}
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
                    // Handle image type options
                    if (option.type === "image" && option.image) {
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
                                <ImageCard
                                    id={option.id}
                                    label={option.label}
                                    image={option.image}
                                />
                            </motion.div>
                        );
                    }

                    // Handle number type options
                    if (
                        option.type === "number" &&
                        option.min !== undefined &&
                        option.max !== undefined &&
                        onNumberChange
                    ) {
                        // Show if variant is not "hidden", or if variant is "hidden" and "31-50 grader" is selected
                        const shouldShow =
                            option.variant !== "hidden" ||
                            (option.variant === "hidden" &&
                                selectedOptionValue === "31-50 grader");
                        if (!shouldShow) return null;

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
                                className="w-full col-span-full"
                            >
                                <NumberInput
                                    ref={numberInputRef}
                                    id={option.id}
                                    label={option.label}
                                    value={numberValue ?? option.min}
                                    onChange={value => {
                                        if (onNumberChange) {
                                            onNumberChange(option.id, value);
                                        }
                                    }}
                                    min={option.min}
                                    max={option.max}
                                />
                            </motion.div>
                        );
                    }

                    // Handle regular radio options
                    const optionValue = option.value ?? option.id;
                    const isSelected = selectedOptionValue === option.label;

                    if (!option.image) return null;

                    const handleRadioChange = () => {
                        onChange(
                            id,
                            option.id,
                            option.label,
                            typeof optionValue === "number" ? optionValue : 100
                        );
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
                                value={option.id}
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
