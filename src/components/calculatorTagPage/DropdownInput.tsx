"use client";
import { useRef } from "react";
import Select, { StylesConfig } from "react-select";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import NumberInput from "./NumberInput";
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
  price?: number;
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
  price,
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

  // Prepare options for react-select
  const selectOptions = [
    ...dropdownValues.map(value => ({
      value: String(value),
      label: String(value),
    })),
    ...(numberOption
      ? [
          {
            value: "more",
            label: "Mere",
          },
        ]
      : []),
  ];

  const selectedOption = isMoreSelected
    ? selectOptions.find(opt => opt.value === "more")
    : selectOptions.find(opt => opt.value === String(currentValue || min));

  const handleChange = (selected: unknown) => {
    const option = selected as { value: string; label: string } | null;
    if (!option) return;

    if (option.value === "more") {
      onChange(id, {
        summaryLabel: "",
        value: max + 1,
        price: price,
      });
    } else {
      onChange(id, {
        summaryLabel: "",
        value: Number(option.value),
        price: price,
      });
    }
  };

  // Custom styles for react-select to match app theme
  const customStyles: StylesConfig = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "48px",
      height: "48px",
      backgroundColor: "transparent",
      border: `1px solid var(--color-gradient-brown)`,
      borderRadius: "9999px",
      boxShadow: state.isFocused
        ? "0 0 0 1px var(--color-gradient-brown)"
        : "none",
      "&:hover": {
        border: `1px solid var(--color-gradient-brown)`,
      },
      cursor: "pointer",
      padding: "0",
    }),
    valueContainer: provided => ({
      ...provided,
      padding: "0",
      paddingLeft: "32px",
      paddingRight: "48px",
    }),
    indicatorsContainer: provided => ({
      ...provided,
      padding: "0",
    }),
    menu: provided => ({
      ...provided,
      backgroundColor: "#000000",
      border: `1px solid var(--color-gradient-brown)`,
      borderRadius: "8px",
      marginTop: "8px",
      zIndex: 100,
      maxHeight: "240px",
      overflow: "hidden",
    }),
    menuList: provided => ({
      ...provided,
      maxHeight: "240px",
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "rgba(255, 255, 255, 0.1)"
        : state.isFocused
          ? "rgba(255, 255, 255, 0.1)"
          : "transparent",
      color: "#ffffff",
      padding: "12px 32px",
      cursor: "pointer",
      fontSize: "18px",
      lineHeight: "125%",
      fontWeight: state.isSelected ? 500 : 300,
      "&:active": {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
      },
    }),
    singleValue: provided => ({
      ...provided,
      color: "#ffffff",
      fontSize: "18px",
      lineHeight: "125%",
      fontWeight: 300,
    }),
    placeholder: provided => ({
      ...provided,
      color: "#ffffff",
      fontSize: "18px",
      lineHeight: "125%",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#ffffff",
      padding: "0",
      transform: state.selectProps.menuIsOpen
        ? "rotate(180deg)"
        : "rotate(0deg)",
      transition: "transform 200ms",
      "&:hover": {
        color: "#ffffff",
      },
    }),
    input: provided => ({
      ...provided,
      color: "#ffffff",
      margin: 0,
      padding: 0,
    }),
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, y: 30 })}
        className="relative"
      >
        <Select
          id={id}
          name={id}
          instanceId={id}
          options={selectOptions}
          value={selectedOption}
          onChange={handleChange}
          styles={customStyles}
          isSearchable={false}
          menuPortalTarget={
            typeof document !== "undefined" ? document.body : undefined
          }
          menuPosition="absolute"
          className="react-select-container md:max-w-[240px]"
          classNamePrefix="react-select"
        />
      </motion.div>
      <AnimatePresence>
        {isMoreSelected && numberOption && onNumberChange && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="mt-6 overflow-hidden"
          >
            <NumberInput
              ref={numberInputRef}
              id={numberOption.id}
              label={numberOption.label}
              value={numberValue ?? 0}
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
                  price: price,
                });
              }}
              min={numberOption.min ?? max + 1}
              max={numberOption.max ?? 1000}
              className="md:max-w-[240px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
