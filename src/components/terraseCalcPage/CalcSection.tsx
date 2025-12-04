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
        image: string;
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
            <fieldset className="flex flex-wrap gap-x-[14px] gap-y-6 border-none p-0 m-0 lg:gap-6">
                {fields.map(field => {
                    const fieldValue = String(field.value ?? "");
                    const isSelected = selectedValue === fieldValue;
                    return (
                        <motion.label
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInAnimation({ scale: 0.85, y: 30 })}
                            key={field.id}
                            htmlFor={field.id}
                            className={`group flex w-[157px] cursor-pointer flex-col rounded-[4.13px] transition duration-[250ms] ease-in-out hover:bg-white/10 focus:bg-white/10 xl:w-[272px] lg:rounded-lg ${
                                isSelected ? "bg-white/10" : ""
                            }`}
                        >
                            <input
                                type="radio"
                                id={field.id}
                                name={id}
                                value={fieldValue}
                                checked={isSelected}
                                onChange={() =>
                                    onChange(id, fieldValue, field.label, title)
                                }
                                className="hidden"
                            />
                            <Image
                                src={field.image}
                                alt={field.id}
                                width={157}
                                height={157}
                                className="overflow-hidden rounded-[4px] object-cover transition duration-[250ms] ease-in-out mb-1 xl:mb-2 xl:h-[272px] xl:w-[272px] lg:rounded-[12px]"
                            />
                            <div className="flex grow-1 shrink-0 items-center gap-2 rounded-[4px] p-[6px] xl:p-2 transition duration-[250ms] ease-in-out lg:px-2 lg:py-2 min-h-[43px]">
                                <div
                                    className={`flex size-4 shrink-0 items-center justify-center rounded-md border border-white transition duration-[250ms] ease-in-out ${
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
                                    className={`text-[12px] leading-[150%] lg:text-[18px] ${
                                        isSelected
                                            ? "font-medium"
                                            : "font-light "
                                    }`}
                                >
                                    {field.label}
                                </span>
                            </div>
                        </motion.label>
                    );
                })}
            </fieldset>
        </>
    );
};
