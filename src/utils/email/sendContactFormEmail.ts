export interface ContactFormData {
    name?: string;
    phone?: string;
    email: string;
    address?: string;
    message?: string;
    source?: string;
}

/**
 * Sends contact form data to the email API route (rendering happens server-side)
 * @param formData - The contact form data
 * @returns Promise with the API response
 */
export async function sendContactFormEmail(
    formData: ContactFormData
): Promise<Response> {
    const source = formData.source || "Kontakt os";

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
