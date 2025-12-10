import type { FormValues } from "@/types/calculatorTag";
import {
    getAllCalculations,
    getPriceTitle,
} from "@/components/calculatorTagPage/calculatePrice";
import type { FieldData, CalculatedPrice } from "./sendCalculatorEmails";

/**
 * Extracts summary data from tag calculator form values
 */
export function extractTagCalculatorSummaryData(
    values: FormValues,
    fieldsData: Array<{
        id: string;
        type: string;
        title: string;
        options?: unknown;
    }>
): FieldData[] {
    const data: FieldData[] = [];
    const optionalFieldsMap: Record<string, string[]> = {
        hældning: ["indtastGrader"],
        antalOvenlysvinduer: ["indtastAntalVinduer"],
        antalKviste: ["indtastAntalKviste"],
    };

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
                    fieldId,
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
                fieldId,
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
                        fieldId: optionalFieldId,
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
                fieldId,
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
                        fieldId: optionalFieldId,
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
                    fieldId,
                });
            }
        }
    });

    return data;
}

/**
 * Extracts calculated prices from tag calculator form values
 */
export function extractTagCalculatorPrices(
    values: FormValues
): CalculatedPrice[] {
    const calculations = getAllCalculations(values);
    return calculations.map(calc => ({
        title: getPriceTitle(calc.tagtypeLabel),
        total: calc.total,
    }));
}

/**
 * Extracts summary data from terrace calculator form values
 */
export function extractTerraceCalculatorSummaryData(
    values: Record<
        string,
        | { value: string | number; label: string; category: string }
        | string
        | number
    >
): FieldData[] {
    const fieldOrder = [
        "materialtype",
        "area",
        "type",
        "mounting",
        "size",
        "padding",
    ];

    const data: FieldData[] = [];

    fieldOrder.forEach(key => {
        const value = values[key];
        if (!value) return;

        if (
            typeof value === "object" &&
            "value" in value &&
            "label" in value &&
            "category" in value
        ) {
            const fieldData = value as {
                value: string | number;
                label: string;
                category: string;
            };
            if (
                typeof fieldData.label === "string" &&
                fieldData.label.trim() !== "" &&
                typeof fieldData.category === "string" &&
                fieldData.category.trim() !== ""
            ) {
                data.push({
                    value: fieldData.value,
                    label: fieldData.label,
                    category: fieldData.category,
                    fieldId: key,
                });
            }
            return;
        }

        if (key === "area") {
            data.push({
                value: value as number,
                label: `${value} m²`,
                category: "Angiv terrasseareal i m²",
                fieldId: key,
            });
        }
    });

    return data;
}

/**
 * Extracts calculated price from terrace calculator form values
 */
export function extractTerraceCalculatorPrice(
    values: Record<
        string,
        | { value: string | number; label: string; category: string }
        | string
        | number
    >
): CalculatedPrice[] {
    const prices = Object.entries(values)
        .filter(
            ([key, value]) =>
                key !== "area" &&
                key !== "materialtype" &&
                (typeof value === "object"
                    ? !isNaN(Number(value.value))
                    : typeof value === "string" && !isNaN(Number(value)))
        )
        .map(([, value]) =>
            typeof value === "object" ? Number(value.value) : Number(value)
        );

    const areaValue =
        typeof values.area === "object"
            ? (values.area as { value: number }).value
            : (values.area as number);

    const total =
        Number(areaValue) * prices.reduce((acc, price) => acc + price, 0);

    if (total <= 0) return [];

    return [
        {
            title: "Total pris",
            total,
        },
    ];
}
