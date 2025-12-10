import { render } from "@react-email/render";
import { ContactFormCustomerEmail } from "@/components/shared/emailTemplates/ContactFormCustomerEmail";
import { ContactFormSupportEmail } from "@/components/shared/emailTemplates/ContactFormSupportEmail";
import { formatDate } from "@/utils/formatDate";

export interface ContactFormData {
    name?: string;
    phone?: string;
    email: string;
    address?: string;
    message?: string;
    source?: string;
}

/**
 * Renders both ContactFormCustomerEmail and ContactFormSupportEmail templates to HTML
 * and sends them to the email API route
 * @param formData - The contact form data
 * @returns Promise with the API response
 */
export async function sendContactFormEmail(
    formData: ContactFormData
): Promise<Response> {
    const date = formatDate(new Date());
    const source = formData.source || "Kontakt os";

    // Render customer email
    const customerHtml = await render(
        ContactFormCustomerEmail({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            message: formData.message,
            date,
        })
    );

    // Render support email
    const supportHtml = await render(
        ContactFormSupportEmail({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            message: formData.message,
            date,
        })
    );

    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "contact",
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
