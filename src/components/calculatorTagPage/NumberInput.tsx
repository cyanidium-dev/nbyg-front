import { forwardRef } from "react";
import InputArrow from "../shared/icons/InputArrow";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface NumberInputProps {
    id: string;
    value: number;
    onChange: (value: number) => void;
    min: number;
    max: number;
    displayValue?: number;
    title?: string;
    description?: string;
    hint?: string;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
    (
        {
            id,
            value,
            onChange,
            min,
            max,
            displayValue,
            title,
            description,
            hint,
        },
        ref
    ) => {
        const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let numValue = parseInt(e.target.value) || min;
            if (numValue > max) numValue = max;
            if (numValue < min) numValue = min;
            onChange(numValue);
        };

        const handleIncrement = () => {
            if (value < max) {
                onChange(value + 1);
            }
        };

        const handleDecrement = () => {
            if (value > min) {
                onChange(value - 1);
            }
        };

        const currentDisplayValue =
            displayValue !== undefined ? displayValue : value;

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
                    className="relative mb-6 xl:max-w-[118px]"
                >
                    <input
                        ref={ref}
                        name={id}
                        type="number"
                        id={id}
                        min={min}
                        max={max}
                        value={currentDisplayValue}
                        onChange={handleNumberChange}
                        className="w-full h-12 rounded-full border border-gradient-brown px-8 pr-12 py-1.5 text-[18px] leading-[125%] bg-transparent text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        <button
                            type="button"
                            onClick={handleIncrement}
                            disabled={value >= max}
                            className="flex items-center justify-center size-4 text-white disabled:opacity-30 disabled:cursor-not-allowed button-shadow-white cursor-pointer"
                            aria-label="Increment value"
                        >
                            <InputArrow direction="up" className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={value <= min}
                            className="flex items-center justify-center size-4 text-white disabled:opacity-30 disabled:cursor-not-allowed button-shadow-white cursor-pointer"
                            aria-label="Decrement value"
                        >
                            <InputArrow direction="down" className="size-4" />
                        </button>
                    </div>
                </motion.div>
                {hint && (
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        variants={fadeInAnimation({ scale: 0.85, y: 30 })}
                        className="mb-6 text-[18px] leading-[150%] font-light"
                    >
                        {hint}
                    </motion.p>
                )}
            </>
        );
    }
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
