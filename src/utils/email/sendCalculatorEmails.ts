import { render } from "@react-email/render";
import { CalculatorCustomerEmail } from "@/components/shared/emailTemplates/CalculatorCustomerEmail";
import { CalculatorSupportEmail } from "@/components/shared/emailTemplates/CalculatorSupportEmail";
import { formatDate } from "@/utils/formatDate";

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
 * Renders both CalculatorCustomerEmail and CalculatorSupportEmail templates to HTML
 * and sends them to the email API route
 * @param formData - The calculator form data including summary and prices
 * @returns Promise with the API response
 */
export async function sendCalculatorEmails(
    formData: CalculatorFormData
): Promise<Response> {
    const date = formatDate(new Date());
    const source = formData.source || "Terrasseberegner";

    // Render customer email
    const customerHtml = await render(
        CalculatorCustomerEmail({
            summaryData: formData.summaryData,
            calculatedPrices: formData.calculatedPrices,
        })
    );

    // Render support email
    const supportHtml = await render(
        CalculatorSupportEmail({
            source,
            email: formData.email,
            date,
            summaryData: formData.summaryData,
            calculatedPrices: formData.calculatedPrices,
        })
    );
    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "calculator",
            source,
            email: formData.email,
            customerHtml,
            supportHtml,
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
