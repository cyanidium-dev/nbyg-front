import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL_ADDRESS = process.env.CONTACT_EMAIL_ADDRESS || "";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type } = body;

        console.log("[send-email] Request received:", { type });

        if (!CONTACT_EMAIL_ADDRESS) {
            console.error("[send-email] CONTACT_EMAIL_ADDRESS is not set");
            return NextResponse.json(
                { error: "CONTACT_EMAIL_ADDRESS is not set" },
                { status: 500 }
            );
        }

        if (type === "contact") {
            // Handle contact form email
            const { html } = body;

            console.log(
                "[send-email] Sending contact form email to:",
                CONTACT_EMAIL_ADDRESS
            );

            const data = await resend.emails.send({
                from: `N-Byg <no-repply@xn--nbygkbenhavn-zjb.dk>`,
                to: CONTACT_EMAIL_ADDRESS,
                subject: "Ny henvendelse fra kontaktformularen",
                html,
            });

            console.log("[send-email] Contact email sent successfully:", {
                id: data.data?.id,
                to: CONTACT_EMAIL_ADDRESS,
                error: data.error,
            });

            return NextResponse.json({ success: true, data });
        } else if (type === "calculator") {
            // Handle calculator emails (customer and support)
            const {
                source = "Terrasseberegner",
                email: customerEmail,
                customerHtml,
                supportHtml,
            } = body;

            console.log("[send-email] Sending calculator emails:", {
                source,
                customerEmail,
                hasCustomerHtml: !!customerHtml,
                hasSupportHtml: !!supportHtml,
            });

            // Send customer email
            console.log(
                "[send-email] Sending customer email to:",
                customerEmail
            );
            const customerData = await resend.emails.send({
                from: `N-Byg <no-repply@xn--nbygkbenhavn-zjb.dk>`,
                to: customerEmail,
                subject:
                    "Tak for din beregning – vi har modtaget dine oplysninger",
                html: customerHtml,
            });

            console.log("[send-email] Customer email sent successfully:", {
                id: customerData.data?.id,
                to: customerEmail,
                error: customerData.error,
            });

            // Send support email
            console.log(
                "[send-email] Sending support email to:",
                CONTACT_EMAIL_ADDRESS
            );
            const supportData = await resend.emails.send({
                from: `N-Byg <no-repply@xn--nbygkbenhavn-zjb.dk>`,
                to: CONTACT_EMAIL_ADDRESS,
                subject: `Ny anmodning fra ${source}`,
                html: supportHtml,
            });

            console.log("[send-email] Support email sent successfully:", {
                id: supportData.data?.id,
                to: CONTACT_EMAIL_ADDRESS,
                source,
                error: supportData.error,
            });

            return NextResponse.json({
                success: true,
                data: {
                    customer: customerData,
                    support: supportData,
                },
            });
        } else {
            console.warn("[send-email] Invalid email type received:", type);
            return NextResponse.json(
                { error: "Invalid email type" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("[send-email] Error sending email:", error);
        if (error instanceof Error) {
            console.error("[send-email] Error details:", {
                message: error.message,
                stack: error.stack,
            });
        }
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
