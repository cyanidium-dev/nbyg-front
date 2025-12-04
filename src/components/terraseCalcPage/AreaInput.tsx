"use client";
import { useState, useRef, useEffect, startTransition } from "react";
import InputArrow from "../shared/icons/InputArrow";

interface AreaInputProps {
    value: number;
    onChange: (value: number) => void;
}

export default function AreaInput({ value, onChange }: AreaInputProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const rangeRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const prevValueRef = useRef(value);

    const min = 5;
    const max = 200;

    // Sync localValue with value prop when not dragging
    // This is necessary to keep the range input in sync with external value changes
    // while allowing local state during dragging for better performance
    useEffect(() => {
        if (!isDragging && prevValueRef.current !== value) {
            prevValueRef.current = value;
            // Use startTransition to prevent cascading renders
            startTransition(() => {
                setLocalValue(value);
            });
        }
    }, [value, isDragging]);

    // Use localValue when dragging, value when not dragging
    const displayValue = isDragging ? localValue : value;
    const percent = ((displayValue - min) / (max - min)) * 100;
    // Calculate offset based on percentage: 8px at 0%, -8px at 100%
    const thumbOffset = 8 * (1 - percent / 50);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = parseInt(e.target.value) || min;
        if (numValue > max) numValue = max;
        if (numValue < min) numValue = min;
        onChange(numValue);
    };

    const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        setLocalValue(newValue);
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value);
        setLocalValue(newValue);
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

    return (
        <section className="w-full border-y border-white/10 py-6 lg:py-12">
            <h2 className="mb-6 text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light before:content-[counter(calc-section)_'.'] before:mr-2">
                Angiv terrasseareal i m²
            </h2>
            <div className="flex flex-col">
                <div className="relative mb-6 xl:max-w-[118px]">
                    <input
                        ref={inputRef}
                        name="area"
                        type="number"
                        id="area-input"
                        min={min}
                        max={max}
                        value={displayValue}
                        onChange={handleNumberChange}
                        className="w-full h-12 rounded-full border border-gradient-brown px-8 pr-12 py-1.5 text-[18px] leading-[125%] bg-transparent text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                        <button
                            type="button"
                            onClick={handleIncrement}
                            disabled={value >= max}
                            className="flex items-center justify-center size-4 text-white disabled:opacity-30 disabled:cursor-not-allowed button-shadow-white"
                            aria-label="Increment value"
                        >
                            <InputArrow direction="up" className="size-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleDecrement}
                            disabled={value <= min}
                            className="flex items-center justify-center size-4 text-white disabled:opacity-30 disabled:cursor-not-allowed button-shadow-white"
                            aria-label="Decrement value"
                        >
                            <InputArrow direction="down" className="size-4" />
                        </button>
                    </div>
                </div>
                <p className="mb-5 text-[18px] leading-[150%] font-light">
                    Indtast terrassearealet eller brug skyderen nedenfor.
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
                            className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0 rounded-full border-2 border-dashed border-black/10 bg-grey-light"
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
                            className="w-full h-1 absolute top-1/2 -translate-y-1/2 rounded bg-transparent outline-none cursor-pointer z-[5] p-0 m-0 [appearance:none] [-webkit-appearance:none]"
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
            </div>
        </section>
    );
}
