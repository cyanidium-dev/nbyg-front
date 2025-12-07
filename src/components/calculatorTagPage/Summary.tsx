"use client";
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
    labels?: string[]; // For checkbox fields with multiple labels
}

type FormFieldValue =
    | {
          summaryLabel: string;
          values: Array<{ label: string; value: number }>;
      }
    | {
          summaryLabel: string;
          label: string;
          value: number;
      }
    | {
          summaryLabel: string;
          value: number;
      }
    | {
          label: string;
          value: number;
      }
    | undefined;

interface SummaryProps {
    values: Record<string, FormFieldValue>;
    fieldsData: Array<{
        id: string;
        type: string;
        title: string;
        options?: unknown;
    }>;
}

export default function Summary({ values, fieldsData }: SummaryProps) {
    // Collect all field data entries in page order
    const allFieldData: FieldData[] = [];

    // Map of parent field ID to optional field IDs
    const optionalFieldsMap: Record<string, string[]> = {
        hældning: ["indtastGrader"],
        antalOvenlysvinduer: ["indtastAntalVinduer"],
        antalKviste: ["indtastAntalKviste"],
    };

    fieldsData.forEach(fieldConfig => {
        const fieldId = fieldConfig.id;
        const fieldValue = values[fieldId];

        // Skip if no value
        if (!fieldValue) return;

        // Handle checkbox fields (tagtype) - single row with all labels in column
        if ("values" in fieldValue && Array.isArray(fieldValue.values)) {
            if (fieldValue.values.length > 0) {
                allFieldData.push({
                    value: fieldValue.values.map(v => v.value).join(","),
                    label: fieldValue.values[0].label, // First label as fallback
                    category: fieldValue.summaryLabel,
                    labels: fieldValue.values.map(v => v.label), // All labels for vertical display
                });
            }
            return;
        }

        // Handle single select fields (radio) - has label and value
        if ("label" in fieldValue && "summaryLabel" in fieldValue) {
            allFieldData.push({
                value: fieldValue.value,
                label: fieldValue.label,
                category: fieldValue.summaryLabel,
            });

            // Add optional fields right after parent field
            const optionalFieldIds = optionalFieldsMap[fieldId] || [];
            optionalFieldIds.forEach(optionalFieldId => {
                const optionalValue = values[optionalFieldId];
                if (
                    optionalValue &&
                    "label" in optionalValue &&
                    "value" in optionalValue &&
                    !("summaryLabel" in optionalValue) &&
                    optionalValue.value > 0
                ) {
                    allFieldData.push({
                        value: optionalValue.value,
                        label: String(optionalValue.value),
                        category: optionalValue.label,
                    });
                }
            });
            return;
        }

        // Handle number fields (area, number inputs) - has summaryLabel and value
        if ("summaryLabel" in fieldValue && "value" in fieldValue) {
            let label: string;

            // Check if this is a dropdown field with value over max
            if (
                fieldConfig.type === "dropdown" &&
                Array.isArray(fieldConfig.options)
            ) {
                const dropdownOptions = fieldConfig.options[0] as
                    | {
                          min?: number;
                          max?: number;
                          step?: number;
                      }
                    | undefined;

                if (dropdownOptions && dropdownOptions.max !== undefined) {
                    // If value exceeds max, show "Mere" instead of the number
                    if (fieldValue.value > dropdownOptions.max) {
                        label = "Mere";
                    } else {
                        label = String(fieldValue.value);
                    }
                } else {
                    label = String(fieldValue.value);
                }
            } else {
                // For area fields, show with m²
                label =
                    fieldConfig.type === "area"
                        ? `${fieldValue.value} m²`
                        : String(fieldValue.value);
            }

            allFieldData.push({
                value: fieldValue.value,
                label: label,
                category: fieldValue.summaryLabel,
            });

            // Add optional fields right after parent field (for dropdowns)
            const optionalFieldIds = optionalFieldsMap[fieldId] || [];
            optionalFieldIds.forEach(optionalFieldId => {
                const optionalValue = values[optionalFieldId];
                if (
                    optionalValue &&
                    "label" in optionalValue &&
                    "value" in optionalValue &&
                    !("summaryLabel" in optionalValue) &&
                    optionalValue.value > 0
                ) {
                    allFieldData.push({
                        value: optionalValue.value,
                        label: String(optionalValue.value),
                        category: optionalValue.label,
                    });
                }
            });
            return;
        }

        // Handle optional fields (indtastGrader, etc.) - has label and value, no summaryLabel
        // These should only be added if they're not already handled by their parent
        if ("label" in fieldValue && "value" in fieldValue) {
            // Skip if this is an optional field that should be handled by its parent
            const isOptionalField = Object.values(optionalFieldsMap)
                .flat()
                .includes(fieldId);
            if (!isOptionalField) {
                allFieldData.push({
                    value: fieldValue.value,
                    label: String(fieldValue.value),
                    category: fieldValue.label,
                });
            }
        }
    });

    const fieldsKey = allFieldData
        .map(data => `${data.category}-${data.value}`)
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
                    {allFieldData.map((data, index) => {
                        if (!data || !data.label || !data.category) return null;

                        return (
                            <motion.tr
                                key={`${data.category}-${data.value}-${index}`}
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
