"use client";
import { useState, useRef, useEffect } from "react";
import InputArrow from "../shared/icons/InputArrow";

interface AreaInputProps {
    value: number;
    onChange: (value: number) => void;
}

export default function AreaInput({ value, onChange }: AreaInputProps) {
    const [isDragging, setIsDragging] = useState(false);
    const rangeRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const min = 5;
    const max = 200;

    const percent = ((value - min) / (max - min)) * 100;

    useEffect(() => {
        if (!rangeRef.current || !popupRef.current) return;

        const thumbSize = 16;
        const thumbPosition =
            (percent / 100) * (rangeRef.current.clientWidth - thumbSize) +
            thumbSize / 2;
        popupRef.current.style.left = `${thumbPosition}px`;
    }, [value, percent]);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let numValue = parseInt(e.target.value) || min;
        if (numValue > max) numValue = max;
        if (numValue < min) numValue = min;
        onChange(numValue);
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(parseInt(e.target.value));
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
                <div className="relative mb-6">
                    <input
                        ref={inputRef}
                        name="area"
                        type="number"
                        id="area-input"
                        min={min}
                        max={max}
                        value={value}
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
                        className={`absolute bottom-full left-0 z-10 mb-1 whitespace-nowrap rounded-lg bg-[#653409] px-3 py-1 text-sm leading-[17px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.3),0px_2px_30px_0px_rgba(0,0,0,0.08),0px_0px_15px_0px_rgba(0,0,0,0.03)] transition-opacity duration-200 ${
                            isDragging ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transform: "translateX(-50%)" }}
                    >
                        <span>{value} m²</span>
                        <div className="absolute bottom-[-5%] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 bg-[#653409]"></div>
                    </div>
                    <div id="area-range-slider" className="relative w-full h-4">
                        <div
                            id="area-range-slider-fill"
                            className="pointer-events-none z-1 absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded-full"
                            style={{
                                background: `linear-gradient(90deg, var(--color-gradient-brown) 0%, var(--color-gradient-brown) ${percent}%, transparent ${percent}%, transparent 100%)`,
                            }}
                        />
                        <div
                            id="area-range-slider-background"
                            className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 h-0 rounded-full border-2 border-dashed border-black/10 bg-grey-light"
                        />
                        <div
                            id="area-range-slider-thumb"
                            className="absolute z-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-white border-2 border-gradient-brown"
                            style={{
                                left: `calc(${percent}% - ${(percent / 100) * 16}px)`,
                            }}
                        />
                        <style
                            dangerouslySetInnerHTML={{
                                __html: `
                            #area-range {
                                width: 100%;
                                height: 4px;
                                border-radius: 4px;
                                background: none;
                                outline: none;
                                -webkit-appearance: none;
                                appearance: none;
                                cursor: pointer;
                                position: absolute;
                                top: 50%;
                                transform: translateY(-50%);
                                left: 0;
                                right: 0;
                                z-index: 5;
                                padding: 0;
                                margin: 0;
                            }
                            
                            #area-range::-webkit-slider-thumb {
                                padding: 0;
                                margin-top: -6px;
                                -webkit-appearance: none;
                                appearance: none;
                                width: 16px;
                                height: 16px;
                                background: transparent;
                                border: none;
                                cursor: pointer;
                            }
                            
                            #area-range::-moz-range-thumb {
                                width: 16px;
                                height: 16px;
                                background: transparent;
                                border: none;
                                cursor: pointer;
                                -moz-appearance: none;
                                appearance: none;
                            }
                            
                            #area-range::-webkit-slider-runnable-track {
                                width: 100%;
                                height: 4px;
                                background: none;
                                padding: 0;
                                margin: 0 !important;
                            }
                            
                            #area-range::-moz-range-track {
                                width: 100%;
                                height: 4px;
                            }
                            
                            #area-range::-moz-range-progress {
                                background: none;
                                height: 4px;
                                border: none;
                            }
                        `,
                            }}
                        />
                        <input
                            ref={rangeRef}
                            type="range"
                            name="area"
                            id="area-range"
                            min={min}
                            max={max}
                            value={value}
                            onChange={handleRangeChange}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onTouchStart={() => setIsDragging(true)}
                            onTouchEnd={() => setIsDragging(false)}
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
