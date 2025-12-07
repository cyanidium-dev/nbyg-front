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
    values: Record<string, FieldData | string | number>;
}

const fieldOrder = [
    "materialtype",
    "area",
    "type",
    "mounting",
    "size",
    "padding",
];

export default function Summary({ values }: SummaryProps) {
    const getFieldData = (key: string): FieldData | null => {
        const value = values[key];
        if (!value) return null;

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
                return fieldData;
            }
            return null;
        }

        if (key === "area") {
            return {
                value: value as number,
                label: `${value} m²`,
                category: "Angiv terrasseareal i m²",
            };
        }

        return null;
    };

    const fieldsKey = fieldOrder
        .filter(key => {
            const fieldData = getFieldData(key);
            return fieldData && fieldData.label && fieldData.category;
        })
        .join("-");

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
                    {fieldOrder.map(key => {
                        const fieldData = getFieldData(key);
                        if (
                            !fieldData ||
                            !fieldData.label ||
                            !fieldData.category
                        )
                            return null;

                        return (
                            <motion.tr
                                key={key}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={listItemVariantsLeft}
                                className="flex border-b border-white/10 last:border-b-0"
                            >
                                <td className="flex w-1/2 shrink-0 items-center border-r border-white/10 p-3 text-[12px] leading-[125%] lg:text-[18px] lg:leading-[150%] font-medium lg:w-[270px] lg:px-4">
                                    {fieldData.category || ""}
                                </td>
                                <td className="flex w-1/2 grow items-center justify-center p-3 text-center text-[12px] leading-[125%] lg:text-[18px] lg:leading-[150%] font-light">
                                    {key === "padding" ? (
                                        <div className="flex size-5 items-center justify-center rounded-full bg-gradient-brown border-none">
                                            {Number(fieldData.value) > 0 ? (
                                                <TickIcon className="block size-3 text-white" />
                                            ) : (
                                                <BlockedIcon className="block size-3 text-white" />
                                            )}
                                        </div>
                                    ) : (
                                        fieldData.label || ""
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
