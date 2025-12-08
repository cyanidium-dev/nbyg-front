import type {
    FormValues,
    FormFieldValue,
    NumberFieldValue,
    OptionalFieldValue,
    CheckboxFieldValue,
    PriceCalculation,
} from "@/types/calculatorTag";

export type { FormValues };

function getNumberValue(field: FormFieldValue): number {
    if (!field || !("value" in field)) return 0;
    return (field as NumberFieldValue | OptionalFieldValue).value;
}

function getPrice(field: FormFieldValue): number {
    if (!field) return 0;
    if ("price" in field && typeof field.price === "number") {
        return field.price;
    }
    return 0;
}

function getOptionalNumberValue(field: FormFieldValue): number {
    if (!field || !("value" in field) || "summaryLabel" in field) return 0;
    return (field as OptionalFieldValue).value;
}

export function calculatePriceForTagtype(
    tagtypeLabel: string,
    basePrice: number,
    values: FormValues
): PriceCalculation {
    const area = getNumberValue(values.area);

    const formExtra = getPrice(values.tagform);

    const angleExtra = getPrice(values.hældning);

    const indtastGrader = getOptionalNumberValue(values.indtastGrader);
    const actualAngleExtra = indtastGrader > 30 ? 15 : angleExtra;

    const pricePerM2 = basePrice + formExtra + actualAngleExtra;

    const roofCost = area * pricePerM2;

    const windowValue = getNumberValue(values.antalOvenlysvinduer);
    const windowNumber = getOptionalNumberValue(values.indtastAntalVinduer);
    const totalWindows = windowNumber > 20 ? windowNumber : windowValue;
    const windowPrice = getPrice(values.antalOvenlysvinduer);
    const windowsCost = totalWindows * windowPrice;

    const kvistValue = getNumberValue(values.antalKviste);
    const kvistNumber = getOptionalNumberValue(values.indtastAntalKviste);
    const totalKvists = kvistNumber > 6 ? kvistNumber : kvistValue;
    const kvistPrice = getPrice(values.antalKviste);
    const kvistsCost = totalKvists * kvistPrice;

    const gutterMeters = getNumberValue(values.antalMeterTagrender);
    const gutterPrice = getPrice(values.antalMeterTagrender);
    const gutterCost = gutterMeters * gutterPrice;

    const windMeters = getNumberValue(values.antalMeterVindskeder);
    const windPrice = getPrice(values.antalMeterVindskeder);
    const windCost = windMeters * windPrice;

    const extrasCost = windowsCost + kvistsCost + gutterCost + windCost;

    const total = roofCost + extrasCost;

    return {
        tagtypeLabel,
        basePrice,
        area,
        formExtra,
        angleExtra: actualAngleExtra,
        pricePerM2,
        roofCost,
        extrasCost,
        total,
    };
}

export function getAllCalculations(values: FormValues): PriceCalculation[] {
    const tagtypeField = values.tagtype;

    if (!tagtypeField || !("values" in tagtypeField)) {
        return [];
    }

    const tagtypeValues = (tagtypeField as CheckboxFieldValue).values;

    if (tagtypeValues.length === 0) {
        return [];
    }

    return tagtypeValues.map(tagtype => {
        return calculatePriceForTagtype(tagtype.label, tagtype.price, values);
    });
}

export function getPriceTitle(tagtypeLabel: string): string {
    if (tagtypeLabel.toLowerCase() === "traditionel dansk rød tegl") {
        return "Forventet pris på traditionelt dansk rødt tegltag:";
    }
    return `Forventet pris på nyt ${tagtypeLabel.toLowerCase()}:`;
}
