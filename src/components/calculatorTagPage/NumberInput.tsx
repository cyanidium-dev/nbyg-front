import { forwardRef, useState, useEffect, useRef } from "react";
import InputArrow from "../shared/icons/InputArrow";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import { twMerge } from "tailwind-merge";

interface NumberInputProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  displayValue?: number;
  title?: string;
  label?: string;
  description?: string;
  hint?: string;
  showSectionNumber?: boolean;
  className?: string;
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
      label,
      description,
      hint,
      showSectionNumber = true,
      className,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [localDisplayValue, setLocalDisplayValue] = useState<number | null>(
      null
    );
    const [isFocused, setIsFocused] = useState(false);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    const propValue = displayValue !== undefined ? displayValue : value;

    const currentValue =
      localDisplayValue !== null ? localDisplayValue : propValue;
    const displayInputValue =
      localDisplayValue !== null
        ? String(localDisplayValue)
        : isFocused
          ? inputValue
          : String(propValue);

    const validateValue = (val: number): number => {
      if (max !== undefined && val > max) return max;
      if (min !== undefined && val < min) return min;
      return val;
    };

    const debouncedOnChange = (newValue: number) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        onChange(validateValue(newValue));
        setLocalDisplayValue(null);
        debounceTimerRef.current = null;
      }, 400);
    };

    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      const numValue = parseInt(newValue);
      if (!isNaN(numValue) && newValue !== "") {
        debouncedOnChange(numValue);
      }
    };

    const handleBlur = () => {
      setIsFocused(false);
      setLocalDisplayValue(null);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      let numValue = parseInt(inputValue);
      if (isNaN(numValue) || inputValue === "") {
        numValue = min ?? 0;
      }
      numValue = validateValue(numValue);
      setInputValue(String(numValue));
      onChange(numValue);
    };

    const updateValue = (newValue: number) => {
      const validatedValue = validateValue(newValue);
      setLocalDisplayValue(validatedValue);
      setInputValue(String(validatedValue));
      debouncedOnChange(validatedValue);
    };

    const handleIncrement = () => {
      if (max === undefined || currentValue < max) {
        updateValue(currentValue + 1);
      }
    };

    const handleDecrement = () => {
      if (min === undefined || currentValue > min) {
        updateValue(currentValue - 1);
      }
    };

    return (
      <>
        {title && (
          <motion.h2
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30 })}
            className={`flex items-start text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light ${description ? "mb-2" : "mb-6"} ${showSectionNumber ? "before:content-[counter(calc-section)_'.'] before:mr-2 before:shrink-0" : ""}`}
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
          variants={fadeInAnimation({ y: 30 })}
        >
          {label && (
            <label
              htmlFor={id}
              className="block mb-6 text-[18px] leading-[125%] font-light"
            >
              {label}
            </label>
          )}
          <div className={twMerge("relative md:max-w-[240px]", className)}>
            <input
              ref={ref}
              name={id}
              type="text"
              inputMode="numeric"
              id={id}
              value={displayInputValue}
              onChange={handleInputChange}
              onFocus={() => {
                setIsFocused(true);
                if (inputValue === "" || localDisplayValue === null) {
                  setInputValue(String(propValue));
                }
              }}
              onBlur={handleBlur}
              className="w-full h-12 rounded-full border border-gradient-brown px-8 pr-12 py-1.5 text-[18px] leading-[125%] bg-transparent text-white outline-none focus:outline-none"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
              <button
                type="button"
                onClick={handleIncrement}
                disabled={max !== undefined && currentValue >= max}
                className="flex items-center justify-center size-4 text-white disabled:opacity-30 disabled:cursor-not-allowed button-shadow-white cursor-pointer"
                aria-label="Increment value"
              >
                <InputArrow direction="up" className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleDecrement}
                disabled={min !== undefined && currentValue <= min}
                className="flex items-center justify-center size-4 text-white disabled:opacity-30 disabled:cursor-not-allowed button-shadow-white cursor-pointer"
                aria-label="Decrement value"
              >
                <InputArrow direction="down" className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
        {hint && (
          <motion.p
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30 })}
            className="text-[12px] leading-[125%] font-light mt-6"
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
