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
    tagtypePrice: number,
    values: FormValues
): PriceCalculation {
    const area = getNumberValue(values.area);
    const formPrice = getPrice(values.tagform);
    const anglePrice = getPrice(values.hældning);

    const indtastGrader = getOptionalNumberValue(values.indtastGrader);
    const actualAnglePrice = indtastGrader > 30 ? 15 : anglePrice;

    const roofCost = (tagtypePrice + formPrice + actualAnglePrice) * area;

    const windowValue = getNumberValue(values.antalOvenlysvinduer);
    const windowNumber = getOptionalNumberValue(values.indtastAntalVinduer);
    const antalOvenlysvinduer = windowNumber > 20 ? windowNumber : windowValue;
    const antalOvenlysvinduerPrice = getPrice(values.antalOvenlysvinduer);
    const antalOvenlysvinduerCost =
        antalOvenlysvinduerPrice * antalOvenlysvinduer;

    const kvistValue = getNumberValue(values.antalKviste);
    const kvistNumber = getOptionalNumberValue(values.indtastAntalKviste);
    const antalKviste = kvistNumber > 6 ? kvistNumber : kvistValue;
    const antalKvistePrice = getPrice(values.antalKviste);
    const antalKvisteCost = antalKvistePrice * antalKviste;

    const antalMeterVindskeder = getNumberValue(values.antalMeterVindskeder);
    const antalMeterVindskederPrice = getPrice(values.antalMeterVindskeder);
    const antalMeterVindskederCost =
        antalMeterVindskederPrice * antalMeterVindskeder;

    const antalMeterTagrender = getNumberValue(values.antalMeterTagrender);
    const antalMeterTagrenderPrice = getPrice(values.antalMeterTagrender);
    const antalMeterTagrenderCost =
        antalMeterTagrenderPrice * antalMeterTagrender;

    const extrasCost =
        antalOvenlysvinduerCost +
        antalKvisteCost +
        antalMeterVindskederCost +
        antalMeterTagrenderCost;

    const total = roofCost + extrasCost;

    return {
        tagtypeLabel,
        basePrice: tagtypePrice,
        area,
        formExtra: formPrice,
        angleExtra: actualAnglePrice,
        pricePerM2: tagtypePrice + formPrice + actualAnglePrice,
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
