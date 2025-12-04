"use client";
import TickIcon from "../shared/icons/TickIcon";
import BlockedIcon from "../shared/icons/BlockedIcon";

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

        // If it's already a FieldData object, return it
        if (
            typeof value === "object" &&
            "value" in value &&
            "label" in value &&
            "category" in value
        ) {
            return value as FieldData;
        }

        // Handle legacy string/number values (for backward compatibility)
        if (key === "area") {
            return {
                value: value as number,
                label: `${value} m²`,
                category: "Angiv terrasseareal i m²",
            };
        }

        return null;
    };

    return (
        <section className="w-full py-6">
            <div className="max-w-[360px] w-auto px-4 mx-auto sm:max-w-full sm:px-8 lg:max-w-[1040px] lg:px-10">
                <h2 className="mb-6 text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light">
                    Du har valgt:
                </h2>
                <table className="w-full">
                    <tbody>
                        {fieldOrder.map(key => {
                            const fieldData = getFieldData(key);
                            if (!fieldData) return null;

                            return (
                                <tr
                                    key={key}
                                    className="flex border-b border-white/10 last:border-b-0"
                                >
                                    <td className="flex w-1/2 shrink-0 items-center border-r border-white/10 p-3 text-[12px] leading-[125%] font-medium lg:w-[270px] lg:px-4">
                                        {fieldData.category}
                                    </td>
                                    <td className="flex w-1/2 flex-grow items-center justify-center p-3 text-center text-[12px] leading-[125%] font-light">
                                        {key === "padding" ? (
                                            <div className="flex size-5 items-center justify-center rounded-full bg-gradient-brown border-none">
                                                {Number(fieldData.value) > 0 ? (
                                                    <TickIcon className="block size-3 text-white" />
                                                ) : (
                                                    <BlockedIcon className="block size-3 text-white" />
                                                )}
                                            </div>
                                        ) : (
                                            fieldData.label
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
