import { render } from "@react-email/render";
import { ContactFormEmail } from "@/templates/ContactFormEmail";
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
 * Renders the ContactFormEmail template to HTML and sends it to the email API route
 * @param formData - The contact form data
 * @returns Promise with the API response
 */
export async function sendContactFormEmail(
    formData: ContactFormData
): Promise<Response> {
    const date = formatDate(new Date());
    const source = formData.source || "Kontakt os";

    console.log("[send-contact-form-email] Starting email rendering:", {
        email: formData.email,
        name: formData.name,
        phone: formData.phone,
        source,
        date,
        hasAddress: !!formData.address,
        hasMessage: !!formData.message,
    });

    console.log("[send-contact-form-email] Rendering contact form email...");
    const html = await render(
        ContactFormEmail({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            message: formData.message,
            date,
        })
    );
    console.log("[send-contact-form-email] Contact form email rendered:", {
        htmlLength: html.length,
    });

    console.log("[send-contact-form-email] Sending email to API...");
    const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: "contact",
            source,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            address: formData.address,
            message: formData.message,
            html,
        }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({
            error: "Failed to send email",
        }));
        console.error("[send-contact-form-email] API error:", {
            status: response.status,
            statusText: response.statusText,
            error,
        });
        throw new Error(error.error || "Failed to send email");
    }

    const responseData = await response.json().catch(() => ({}));
    console.log("[send-contact-form-email] Email sent successfully:", {
        status: response.status,
        responseData,
    });

    return response;
}
