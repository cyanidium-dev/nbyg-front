export interface FieldData {
    value: string | number;
    label: string;
    category: string;
    labels?: string[];
    fieldId?: string;
}

export interface CalculatedPrice {
    title: string;
    total: number;
}

export interface CalculatorFormData {
    email: string;
    source?: string;
    summaryData: FieldData[];
    calculatedPrices: CalculatedPrice[];
}

/**
 * Sends calculator form data to the email API route (rendering happens server-side)
 * @param formData - The calculator form data including summary and prices
 * @returns Promise with the API response
 */
export async function sendCalculatorEmails(
    formData: CalculatorFormData
): Promise<Response> {
    const source = formData.source || "Terrasseberegner";

    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "calculator",
            source,
            email: formData.email,
            summaryData: formData.summaryData,
            calculatedPrices: formData.calculatedPrices,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            error: "Failed to send emails",
        }));
        throw new Error(error.error || "Failed to send emails");
    }

    return response;
}
