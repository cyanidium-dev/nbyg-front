import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import CheckboxCard from "./CheckboxCard";

interface CheckboxInputProps {
    id: string;
    title: string;
    description?: string;
    options: {
        id: string;
        label: string;
        value: string;
        image: {
            link: string;
            priority?: boolean;
        };
    }[];
    selectedValues?: string[];
    onChange: (
        id: string,
        value: string,
        label: string,
        category: string,
        updatedSelectedValues: string[]
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
                    const optionValue = String(option.value ?? "");
                    const isSelected =
                        selectedValues?.includes(optionValue) ?? false;

                    const handleChange = (
                        cardId: string,
                        cardValue: string,
                        cardLabel: string,
                        cardTitle: string
                    ) => {
                        const currentValues = selectedValues ?? [];
                        const updatedValues = isSelected
                            ? currentValues.filter(v => v !== optionValue)
                            : [...currentValues, optionValue];

                        onChange(
                            id,
                            cardValue,
                            cardLabel,
                            cardTitle,
                            updatedValues
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
                                title={title}
                                label={option.label}
                                value={optionValue}
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
