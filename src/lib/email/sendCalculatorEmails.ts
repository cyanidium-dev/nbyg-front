import { render } from "@react-email/render";
import { CalculatorCustomerEmail } from "@/templates/CalculatorCustomerEmail";
import { CalculatorSupportEmail } from "@/templates/CalculatorSupportEmail";
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

    console.log("[send-calculator-emails] Starting email rendering:", {
        email: formData.email,
        source,
        date,
        summaryDataCount: formData.summaryData.length,
        calculatedPricesCount: formData.calculatedPrices.length,
    });

    // Render customer email
    console.log("[send-calculator-emails] Rendering customer email...");
    const customerHtml = await render(
        CalculatorCustomerEmail({
            summaryData: formData.summaryData,
            calculatedPrices: formData.calculatedPrices,
        })
    );
    console.log("[send-calculator-emails] Customer email rendered:", {
        htmlLength: customerHtml.length,
    });

    // Render support email
    console.log("[send-calculator-emails] Rendering support email...");
    const supportHtml = await render(
        CalculatorSupportEmail({
            source,
            email: formData.email,
            date,
            summaryData: formData.summaryData,
            calculatedPrices: formData.calculatedPrices,
        })
    );
    console.log("[send-calculator-emails] Support email rendered:", {
        htmlLength: supportHtml.length,
    });

    console.log("[send-calculator-emails] Sending emails to API...");
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
        console.error("[send-calculator-emails] API error:", {
            status: response.status,
            statusText: response.statusText,
            error,
        });
        throw new Error(error.error || "Failed to send emails");
    }

    const responseData = await response.json().catch(() => ({}));
    console.log("[send-calculator-emails] Emails sent successfully:", {
        status: response.status,
        responseData,
    });

    return response;
}
