import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL_ADDRESS = process.env.CONTACT_EMAIL_ADDRESS || "";
const SENDER_EMAIL_ADDRESS = process.env.SENDER_EMAIL_ADDRESS || "";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { type } = body;

        if (!CONTACT_EMAIL_ADDRESS) {
            return NextResponse.json(
                { error: "CONTACT_EMAIL_ADDRESS is not set" },
                { status: 500 }
            );
        }

        if (!SENDER_EMAIL_ADDRESS) {
            return NextResponse.json(
                { error: "SENDER_EMAIL_ADDRESS is not set" },
                { status: 500 }
            );
        }

        if (type === "contact") {
            // Handle contact form email
            const { html } = body;

            const data = await resend.emails.send({
                from: `N-Byg <${SENDER_EMAIL_ADDRESS}>`,
                to: CONTACT_EMAIL_ADDRESS,
                subject: "Ny henvendelse fra kontaktformularen",
                html,
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

            // Send customer email
            const customerData = await resend.emails.send({
                from: `N-Byg <${SENDER_EMAIL_ADDRESS}>`,
                to: customerEmail,
                subject:
                    "Tak for din beregning – vi har modtaget dine oplysninger",
                html: customerHtml,
            });

            // Send support email
            const supportData = await resend.emails.send({
                from: `N-Byg <${SENDER_EMAIL_ADDRESS}>`,
                to: CONTACT_EMAIL_ADDRESS,
                subject: `Ny anmodning fra ${source}`,
                html: supportHtml,
            });

            return NextResponse.json({
                success: true,
                data: {
                    customer: customerData,
                    support: supportData,
                },
            });
        } else {
            return NextResponse.json(
                { error: "Invalid email type" },
                { status: 400 }
            );
        }
    } catch {
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
