"use client";
import TickIcon from "../shared/icons/TickIcon";
import BlockedIcon from "../shared/icons/BlockedIcon";
import {
    fadeInAnimation,
    listVariants,
    listItemVariantsLeft,
} from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface FieldData {
    value: string | number;
    label: string;
    category: string;
}

interface SummaryProps {
    values: Record<string, string | number | string[] | undefined>;
    fieldsData: Array<{
        id: string;
        type: string;
        title: string;
        options?: unknown;
    }>;
}

export default function Summary({ values, fieldsData }: SummaryProps) {
    const getFieldData = (
        key: string,
        value: string | number | string[] | undefined
    ): FieldData[] => {
        if (!value) return [];

        // Handle checkbox arrays - return multiple FieldData entries
        if (Array.isArray(value) && value.length > 0) {
            const fieldConfig = fieldsData.find(f => f.id === key);
            if (!fieldConfig) return [];

            return value.map(val => {
                const option = fieldConfig.options?.find(
                    opt => opt.id === val || opt.value === val
                );
                return {
                    value: val,
                    label: option?.label || val,
                    category: fieldConfig.title,
                };
            });
        }

        // Handle single values
        if (
            typeof value === "object" &&
            "value" in value &&
            "label" in value &&
            "category" in value
        ) {
            const fieldData = value as FieldData;
            if (
                typeof fieldData.label === "string" &&
                fieldData.label.trim() !== "" &&
                typeof fieldData.category === "string" &&
                fieldData.category.trim() !== ""
            ) {
                return [fieldData];
            }
            return [];
        }

        // Handle area (number with m²)
        if (key === "area" && typeof value === "number") {
            return [
                {
                    value: value,
                    label: `${value} m²`,
                    category: "Angiv tagets størrelse i m²",
                },
            ];
        }

        // Handle other number values
        if (typeof value === "number" && value > 0) {
            const fieldConfig = fieldsData.find(f => f.id === key);
            return [
                {
                    value: value,
                    label: String(value),
                    category: fieldConfig?.title || key,
                },
            ];
        }

        // Handle string values
        if (typeof value === "string" && value.trim() !== "") {
            const fieldConfig = fieldsData.find(f => f.id === key);
            const option = fieldConfig?.options?.find(
                opt => opt.id === value || opt.value === value
            );
            return [
                {
                    value: value,
                    label: option?.label || value,
                    category: fieldConfig?.title || key,
                },
            ];
        }

        return [];
    };

    // Collect all field data entries
    const allFieldData: Array<{ key: string; data: FieldData }> = [];
    Object.entries(values).forEach(([key, value]) => {
        const fieldDataArray = getFieldData(key, value);
        fieldDataArray.forEach(data => {
            allFieldData.push({ key, data });
        });
    });

    const fieldsKey = allFieldData
        .map(({ key, data }) => `${key}-${data.value}`)
        .join("-");

    if (allFieldData.length === 0) return null;

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.85, y: 30 })}
            className="w-full pt-6 mb-6 lg:pt-12 lg:mb-12"
        >
            <motion.h2
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.85, y: 20, delay: 0.1 })}
                className="mb-6 text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light"
            >
                Du har valgt:
            </motion.h2>
            <motion.table
                key={fieldsKey}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={listVariants({
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                })}
                className="w-full"
            >
                <tbody>
                    {allFieldData.map(({ key, data }, index) => {
                        if (!data || !data.label || !data.category) return null;

                        return (
                            <motion.tr
                                key={`${key}-${data.value}-${index}`}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={listItemVariantsLeft}
                                className="flex border-b border-white/10 last:border-b-0"
                            >
                                <td className="flex w-1/2 shrink-0 items-center border-r border-white/10 p-3 text-[12px] leading-[125%] lg:text-[18px] lg:leading-[150%] font-medium lg:w-[270px] lg:px-4">
                                    {data.category || ""}
                                </td>
                                <td className="flex w-1/2 flex-grow items-center justify-center p-3 text-center text-[12px] leading-[125%] lg:text-[18px] lg:leading-[150%] font-light">
                                    {data.label || ""}
                                </td>
                            </motion.tr>
                        );
                    })}
                </tbody>
            </motion.table>
        </motion.section>
    );
}
