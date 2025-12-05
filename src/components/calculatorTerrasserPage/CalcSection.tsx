import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import TickIcon from "../shared/icons/TickIcon";
import Image from "next/image";

interface CalcSectionProps {
    id: string;
    title: string;
    description?: string;
    fields: {
        id: string;
        label: string;
        value: string;
        image: {
            link: string;
            priority: boolean;
        };
    }[];
    selectedValue?: string;
    onChange: (
        id: string,
        value: string,
        label: string,
        category: string
    ) => void;
}

export const CalcSection = ({
    id,
    title,
    description,
    fields,
    selectedValue,
    onChange,
}: CalcSectionProps) => {
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
                {fields.map((field, index) => {
                    const fieldValue = String(field.value ?? "");
                    const isSelected = selectedValue === fieldValue;
                    return (
                        <motion.div
                            key={field.id}
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
                            <label
                                htmlFor={field.id}
                                className={`
                                group flex flex-col h-full cursor-pointer rounded-lg 
                                transition duration-250 ease-in-out
                                hover:bg-white/10
                                ${isSelected ? "bg-white/10" : ""}                                
                            `}
                            >
                                <input
                                    type="radio"
                                    id={field.id}
                                    name={id}
                                    value={fieldValue}
                                    checked={isSelected}
                                    onChange={() =>
                                        onChange(
                                            id,
                                            fieldValue,
                                            field.label,
                                            title
                                        )
                                    }
                                    className="hidden"
                                />
                                <div className="relative mb-1 xl:mb-2 aspect-square w-full overflow-hidden rounded-[4px] lg:rounded-[12px]">
                                    <Image
                                        src={field.image.link}
                                        alt={field.id}
                                        fill
                                        className="object-cover"
                                        priority={field.image.priority}
                                    />
                                </div>
                                <div className="flex grow-1 items-center gap-2 p-[6px] xl:p-2 lg:px-2 lg:py-2 min-h-[43px]">
                                    <div
                                        className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-white transition duration-[250ms] ease-in-out ${
                                            isSelected
                                                ? "border-none bg-gradient-brown"
                                                : "bg-transparent"
                                        }`}
                                    >
                                        <TickIcon
                                            className={`h-3 w-3 text-white ${
                                                isSelected ? "block" : "hidden"
                                            }`}
                                        />
                                    </div>
                                    <span
                                        className={`text-[12px] leading-[150%] xs:text-[18px] md:text-[12px] lg:text-[18px] ${
                                            isSelected
                                                ? "font-medium"
                                                : "font-light "
                                        }`}
                                    >
                                        {field.label}
                                    </span>
                                </div>
                            </label>
                        </motion.div>
                    );
                })}
            </fieldset>
        </>
    );
};
