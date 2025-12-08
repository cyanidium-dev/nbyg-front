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
    console.log(`\n=== Calculating price for: ${tagtypeLabel} ===`);
    
    const area = getNumberValue(values.area);
    const formPrice = getPrice(values.tagform);
    const anglePrice = getPrice(values.hældning);
    
    console.log("Base values:");
    console.log(`  - Tagtype price: ${tagtypePrice}`);
    console.log(`  - Area (m²): ${area}`);
    console.log(`  - Form price: ${formPrice}`);
    console.log(`  - Angle price: ${anglePrice}`);

    const indtastGrader = getOptionalNumberValue(values.indtastGrader);
    const actualAnglePrice = indtastGrader > 30 ? 15 : anglePrice;
    
    if (indtastGrader > 30) {
        console.log(`  - Custom angle (${indtastGrader}°): Using price 15 instead of ${anglePrice}`);
    }
    console.log(`  - Final angle price: ${actualAnglePrice}`);

    const roofCost = (tagtypePrice + formPrice + actualAnglePrice) * area;
    console.log(`\nRoof cost calculation:`);
    console.log(`  (${tagtypePrice} + ${formPrice} + ${actualAnglePrice}) × ${area} = ${roofCost}`);

    const windowValue = getNumberValue(values.antalOvenlysvinduer);
    const windowNumber = getOptionalNumberValue(values.indtastAntalVinduer);
    const antalOvenlysvinduer = windowNumber > 20 ? windowNumber : windowValue;
    const antalOvenlysvinduerPrice = getPrice(values.antalOvenlysvinduer);
    const antalOvenlysvinduerCost = antalOvenlysvinduerPrice * antalOvenlysvinduer;
    console.log(`\nAntal ovenlysvinduer:`);
    console.log(`  ${antalOvenlysvinduerPrice} × ${antalOvenlysvinduer} = ${antalOvenlysvinduerCost}`);

    const kvistValue = getNumberValue(values.antalKviste);
    const kvistNumber = getOptionalNumberValue(values.indtastAntalKviste);
    const antalKviste = kvistNumber > 6 ? kvistNumber : kvistValue;
    const antalKvistePrice = getPrice(values.antalKviste);
    const antalKvisteCost = antalKvistePrice * antalKviste;
    console.log(`\nAntal kviste:`);
    console.log(`  ${antalKvistePrice} × ${antalKviste} = ${antalKvisteCost}`);

    const antalMeterVindskeder = getNumberValue(values.antalMeterVindskeder);
    const antalMeterVindskederPrice = getPrice(values.antalMeterVindskeder);
    const antalMeterVindskederCost = antalMeterVindskederPrice * antalMeterVindskeder;
    console.log(`\nAntal meter vindskeder:`);
    console.log(`  ${antalMeterVindskederPrice} × ${antalMeterVindskeder} = ${antalMeterVindskederCost}`);

    const antalMeterTagrender = getNumberValue(values.antalMeterTagrender);
    const antalMeterTagrenderPrice = getPrice(values.antalMeterTagrender);
    const antalMeterTagrenderCost = antalMeterTagrenderPrice * antalMeterTagrender;
    console.log(`\nAntal meter tagrender:`);
    console.log(`  ${antalMeterTagrenderPrice} × ${antalMeterTagrender} = ${antalMeterTagrenderCost}`);

    const extrasCost =
        antalOvenlysvinduerCost +
        antalKvisteCost +
        antalMeterVindskederCost +
        antalMeterTagrenderCost;
    console.log(`\nExtras cost:`);
    console.log(`  ${antalOvenlysvinduerCost} + ${antalKvisteCost} + ${antalMeterVindskederCost} + ${antalMeterTagrenderCost} = ${extrasCost}`);

    const total = roofCost + extrasCost;
    console.log(`\nTotal:`);
    console.log(`  ${roofCost} + ${extrasCost} = ${total}`);
    console.log(`=== End calculation for: ${tagtypeLabel} ===\n`);

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
