"use client";
import { useState, useRef, useEffect, startTransition } from "react";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import NumberInput from "./NumberInput";

interface AreaInputProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export default function AreaInput({
  value,
  min,
  max,
  onChange,
}: AreaInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const rangeRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (!isDragging && prevValueRef.current !== value) {
      prevValueRef.current = value;
      startTransition(() => {
        setLocalValue(value);
      });
    }
  }, [value, isDragging]);

  const displayValue = isDragging ? localValue : value;
  const percent = ((displayValue - min) / (max - min)) * 100;
  const thumbOffset = 8 * (1 - percent / 50);

  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setLocalValue(newValue);
  };

  return (
    <>
      <motion.h2
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, y: 20, delay: 0.1 })}
        className="mb-6 flex items-start text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light before:content-[counter(calc-section)_'.'] before:mr-2 before:shrink-0"
      >
        Angiv tagets størrelse i m²
      </motion.h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, y: 20, delay: 0.2 })}
        className="flex flex-col"
      >
        <NumberInput
          ref={inputRef}
          id="area-input"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          displayValue={displayValue}
          className="md:max-w-[129px]"
        />
        <p className="my-6 text-[18px] leading-[150%] font-light">
          Angiv tagets areal i m² – eller brug skyderen nedenfor.
        </p>
        <div className="relative" id="area-range-container">
          <div
            ref={popupRef}
            className={`absolute bottom-full z-10 mb-2 whitespace-nowrap rounded-lg bg-gradient-brown px-3 py-1 text-[14px] leading-[150%] font-light shadow-[0px_0px_1px_0px_rgba(0,0,0,0.3),0px_2px_30px_0px_rgba(0,0,0,0.08),0px_0px_15px_0px_rgba(0,0,0,0.03)] transition-opacity duration-200 will-change-transform ${
              isDragging ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `calc(${percent}% + ${thumbOffset}px)`,
              transform: "translateX(-50%)",
            }}
          >
            <span>{displayValue} m²</span>
            <div className="absolute bottom-[-15%] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-gradient-brown"></div>
          </div>
          <div
            id="area-range-slider"
            className="relative w-full h-4"
            style={
              {
                "--percent": `${percent}%`,
              } as React.CSSProperties
            }
          >
            <div
              id="area-range-slider-fill"
              className="pointer-events-none z-1 absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded-full"
            />
            <div
              id="area-range-slider-background"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0 rounded-full border-2 border-dashed border-black/10 bg-grey"
            />
            <input
              ref={rangeRef}
              type="range"
              name="area"
              id="area-range"
              min={min}
              max={max}
              value={localValue}
              onInput={handleRangeInput}
              onChange={handleRangeChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={e => {
                setIsDragging(false);
                onChange(parseInt(e.currentTarget.value));
              }}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={e => {
                setIsDragging(false);
                onChange(parseInt(e.currentTarget.value));
              }}
              className="w-full h-1 absolute top-1/2 -translate-y-1/2 rounded bg-transparent outline-none cursor-pointer z-5 p-0 m-0 appearance-none [-webkit-appearance:none]"
            />
          </div>

          <ul className="mt-0 flex justify-between list-none">
            <li>
              <button
                type="button"
                onClick={() => onChange(min)}
                className="text-[18px] leading-[125%] font-light text-left cursor-pointer text-shadow-white"
                aria-label={`Set value to ${min} m²`}
              >
                {min} m²
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onChange(max)}
                className="text-[18px] leading-[125%] font-light text-right cursor-pointer text-shadow-white"
                aria-label={`Set value to ${max} m²`}
              >
                {max} m²
              </button>
            </li>
          </ul>
        </div>
      </motion.div>
    </>
  );
}
