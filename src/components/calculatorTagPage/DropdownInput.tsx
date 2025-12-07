"use client";
import { useRef } from "react";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import NumberInput from "./NumberInput";
import ShevronIcon from "../shared/icons/ShevronIcon";

interface DropdownInputProps {
    id: string;
    title: string;
    description?: string;
    dropdownOptions: {
        min: number;
        max: number;
        step: number;
    };
    moreOption?: {
        id: string;
        label: string;
        min: number;
        max?: number;
    };
    selectedValue?: number | string;
    onChange: (value: number | string) => void;
    onNumberChange?: (value: number) => void;
}

export default function DropdownInput({
    id,
    title,
    description,
    dropdownOptions,
    moreOption,
    selectedValue,
    onChange,
    onNumberChange,
}: DropdownInputProps) {
    const numberInputRef = useRef<HTMLInputElement>(null);

    const { min, max, step } = dropdownOptions;
    const dropdownValues: number[] = [];
    for (let i = min; i <= max; i += step) {
        dropdownValues.push(i);
    }

    // Determine if "more" is selected
    const isMoreSelected =
        selectedValue === "more" ||
        (moreOption &&
            typeof selectedValue === "number" &&
            selectedValue > max) ||
        (moreOption &&
            typeof selectedValue === "string" &&
            selectedValue === moreOption.id);

    const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "more") {
            onChange("more");
        } else {
            onChange(Number(value));
        }
    };

    // Determine current dropdown value
    const currentValue = isMoreSelected
        ? "more"
        : typeof selectedValue === "number"
          ? String(selectedValue)
          : "";

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
                    value={currentValue}
                    onChange={handleDropdownChange}
                    className="w-full h-12 rounded-full border border-gradient-brown px-8 pr-12 py-1.5 text-[18px] leading-[125%] bg-transparent text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gradient-brown"
                >
                    <option value="" disabled>
                        Vælg...
                    </option>
                    {dropdownValues.map(value => (
                        <option
                            key={value}
                            value={value}
                            className="bg-black text-white"
                        >
                            {value}
                        </option>
                    ))}
                    {moreOption && (
                        <option value="more" className="bg-black text-white">
                            {moreOption.label}
                        </option>
                    )}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <ShevronIcon className="size-5 text-white rotate-180" />
                </div>
            </motion.div>
            {isMoreSelected && moreOption && onNumberChange && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={fadeInAnimation({ scale: 0.85, y: 20 })}
                >
                    <NumberInput
                        ref={numberInputRef}
                        id={moreOption.id}
                        value={
                            typeof selectedValue === "number" &&
                            selectedValue > max
                                ? selectedValue
                                : moreOption.min
                        }
                        onChange={onNumberChange}
                        min={moreOption.min}
                        max={moreOption.max || 1000}
                    />
                </motion.div>
            )}
        </>
    );
}
