"use client";
import { useRef } from "react";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import NumberInput from "./NumberInput";
import ShevronIcon from "../shared/icons/ShevronIcon";
import type {
    DropdownOption,
    NumberFieldValue,
    OptionalFieldValue,
    FormValues,
} from "@/types/calculatorTag";

interface DropdownInputProps {
    id: string;
    title: string;
    description?: string;
    options: DropdownOption[];
    selectedValue?: NumberFieldValue;
    values?: FormValues;
    onChange: (id: string, value: NumberFieldValue) => void;
    onNumberChange?: (numberFieldId: string, value: OptionalFieldValue) => void;
}

export default function DropdownInput({
    id,
    title,
    description,
    options,
    selectedValue,
    values,
    onChange,
    onNumberChange,
}: DropdownInputProps) {
    const numberInputRef = useRef<HTMLInputElement>(null);

    const selectOption = options.find(
        opt => "type" in opt && opt.type === "select"
    ) as
        | {
              type: "select";
              min: number;
              max: number;
              step: number;
          }
        | undefined;

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

    if (!selectOption) return null;

    const { min, max, step } = selectOption;
    const dropdownValues: number[] = [];
    for (let i = min; i <= max; i += step) {
        dropdownValues.push(i);
    }

    const currentValue = selectedValue?.value ?? 0;
    const isMoreSelected = numberOption && currentValue > max;
    const numberValue = numberOption
        ? (values?.[numberOption.id] as OptionalFieldValue | undefined)?.value
        : undefined;

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "more") {
            onChange(id, {
                summaryLabel: "",
                value: max + 1,
            });
        } else {
            onChange(id, {
                summaryLabel: "",
                value: Number(value),
            });
        }
    };

    const currentDropdownValue = isMoreSelected
        ? "more"
        : String(currentValue || min);

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
            <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.85, y: 30 })}
                className="relative mb-6"
            >
                <select
                    id={id}
                    name={id}
                    value={currentDropdownValue}
                    onChange={handleDropdownChange}
                    className="w-full h-12 rounded-full border border-gradient-brown px-8 pr-12 py-1.5 text-[18px] leading-[125%] bg-transparent text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gradient-brown"
                >
                    {dropdownValues.map(value => (
                        <option
                            key={value}
                            value={value}
                            className="bg-black text-white"
                        >
                            {value}
                        </option>
                    ))}
                    {numberOption && (
                        <option value="more" className="bg-black text-white">
                            Mere
                        </option>
                    )}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ShevronIcon className="size-5 text-white rotate-180" />
                </div>
            </motion.div>
            {isMoreSelected && numberOption && onNumberChange && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeInAnimation({ scale: 0.85, y: 20 })}
                >
                    <NumberInput
                        ref={numberInputRef}
                        id={numberOption.id}
                        label={numberOption.label}
                        value={
                            numberValue ??
                            (numberOption.min !== undefined
                                ? numberOption.min
                                : max + 1)
                        }
                        onChange={value => {
                            if (onNumberChange) {
                                onNumberChange(numberOption.id, {
                                    label: numberOption.label,
                                    value: value,
                                });
                            }
                            onChange(id, {
                                summaryLabel: "",
                                value: value,
                            });
                        }}
                        min={numberOption.min ?? max + 1}
                        max={numberOption.max ?? 1000}
                    />
                </motion.div>
            )}
        </>
    );
}
