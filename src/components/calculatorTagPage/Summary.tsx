"use client";
import { useMemo } from "react";
import {
    fadeInAnimation,
    listVariants,
    listItemVariantsLeft,
} from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import type { FieldData, FormFieldValue } from "@/types/calculatorTag";

interface SummaryProps {
    values: Record<string, FormFieldValue>;
    fieldsData: Array<{
        id: string;
        type: string;
        title: string;
        options?: unknown;
    }>;
}

const optionalFieldsMap: Record<string, string[]> = {
    hældning: ["indtastGrader"],
    antalOvenlysvinduer: ["indtastAntalVinduer"],
    antalKviste: ["indtastAntalKviste"],
};

export default function Summary({ values, fieldsData }: SummaryProps) {
    const allFieldData: FieldData[] = useMemo(() => {
        const data: FieldData[] = [];

        fieldsData.forEach(fieldConfig => {
            const fieldId = fieldConfig.id;
            const fieldValue = values[fieldId];

            if (!fieldValue) return;

            if ("values" in fieldValue && Array.isArray(fieldValue.values)) {
                if (fieldValue.values.length > 0) {
                    data.push({
                        value: fieldValue.values.map(v => v.price).join(","),
                        label: fieldValue.values[0].label,
                        category: fieldValue.summaryLabel,
                        labels: fieldValue.values.map(v => v.label),
                    });
                }
                return;
            }

            if (
                "label" in fieldValue &&
                "summaryLabel" in fieldValue &&
                "price" in fieldValue
            ) {
                data.push({
                    value: fieldValue.price,
                    label: fieldValue.label,
                    category: fieldValue.summaryLabel,
                });

                const optionalFieldIds = optionalFieldsMap[fieldId] || [];
                optionalFieldIds.forEach(optionalFieldId => {
                    const optionalValue = values[optionalFieldId];
                    if (
                        optionalValue &&
                        "value" in optionalValue &&
                        optionalValue.value > 0
                    ) {
                        const category =
                            "summaryLabel" in optionalValue &&
                            typeof optionalValue.summaryLabel === "string"
                                ? optionalValue.summaryLabel
                                : "label" in optionalValue &&
                                    typeof optionalValue.label === "string"
                                  ? optionalValue.label
                                  : "";
                        data.push({
                            value: optionalValue.value,
                            label: String(optionalValue.value),
                            category: category,
                        });
                    }
                });
                return;
            }

            if ("summaryLabel" in fieldValue && "value" in fieldValue) {
                let label: string;

                if (
                    fieldConfig.type === "dropdown" &&
                    Array.isArray(fieldConfig.options)
                ) {
                    const dropdownOptions = fieldConfig.options[0] as
                        | {
                              type?: string;
                              min?: number;
                              max?: number;
                              step?: number;
                          }
                        | undefined;

                    if (dropdownOptions && dropdownOptions.max !== undefined) {
                        if (fieldValue.value > dropdownOptions.max) {
                            label = "Mere";
                        } else {
                            label = String(fieldValue.value);
                        }
                    } else {
                        label = String(fieldValue.value);
                    }
                } else {
                    label =
                        fieldConfig.type === "area"
                            ? `${fieldValue.value} m²`
                            : String(fieldValue.value);
                }

                data.push({
                    value: fieldValue.value,
                    label: label,
                    category: fieldValue.summaryLabel,
                });

                const optionalFieldIds = optionalFieldsMap[fieldId] || [];
                optionalFieldIds.forEach(optionalFieldId => {
                    const optionalValue = values[optionalFieldId];
                    if (
                        optionalValue &&
                        "value" in optionalValue &&
                        optionalValue.value > 0
                    ) {
                        const category =
                            "summaryLabel" in optionalValue &&
                            typeof optionalValue.summaryLabel === "string"
                                ? optionalValue.summaryLabel
                                : "label" in optionalValue &&
                                    typeof optionalValue.label === "string"
                                  ? optionalValue.label
                                  : "";
                        data.push({
                            value: optionalValue.value,
                            label: String(optionalValue.value),
                            category: category,
                        });
                    }
                });
                return;
            }

            if ("value" in fieldValue) {
                const isOptionalField = Object.values(optionalFieldsMap)
                    .flat()
                    .includes(fieldId);
                if (!isOptionalField) {
                    const category =
                        "summaryLabel" in fieldValue &&
                        typeof fieldValue.summaryLabel === "string"
                            ? fieldValue.summaryLabel
                            : "label" in fieldValue &&
                                typeof fieldValue.label === "string"
                              ? fieldValue.label
                              : "";
                    data.push({
                        value: fieldValue.value,
                        label: String(fieldValue.value),
                        category: category,
                    });
                }
            }
        });

        return data;
    }, [values, fieldsData]);

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
                    {allFieldData.map((data, index) => {
                        if (!data || !data.label || !data.category) return null;

                        return (
                            <motion.tr
                                key={`${data.category}-${String(data.value)}-${index}`}
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
                                    {data.labels ? (
                                        <div className="flex flex-col gap-1">
                                            {data.labels.map(
                                                (label, labelIndex) => (
                                                    <span key={labelIndex}>
                                                        {label}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        data.label || ""
                                    )}
                                </td>
                            </motion.tr>
                        );
                    })}
                </tbody>
            </motion.table>
        </motion.section>
    );
}
