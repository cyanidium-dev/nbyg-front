import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { ContactFormCustomerEmail } from "@/components/shared/emailTemplates/ContactFormCustomerEmail";
import { ContactFormSupportEmail } from "@/components/shared/emailTemplates/ContactFormSupportEmail";
import { CalculatorCustomerEmail } from "@/components/shared/emailTemplates/CalculatorCustomerEmail";
import { CalculatorSupportEmail } from "@/components/shared/emailTemplates/CalculatorSupportEmail";
import { formatDate } from "@/utils/formatDate";

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
            const { name, phone, email, address, message } = body;
            const date = formatDate(new Date());

            const customerHtml = await render(
                ContactFormCustomerEmail({
                    name,
                    phone,
                    email,
                    address,
                    message,
                    date,
                })
            );

            const supportHtml = await render(
                ContactFormSupportEmail({
                    name,
                    phone,
                    email,
                    address,
                    message,
                    date,
                })
            );

            const customerData = await resend.emails.send({
                from: `N-Byg <${SENDER_EMAIL_ADDRESS}>`,
                to: email,
                subject: "Tak for din henvendelse",
                html: customerHtml,
            });

            const supportData = await resend.emails.send({
                from: `N-Byg <${SENDER_EMAIL_ADDRESS}>`,
                to: CONTACT_EMAIL_ADDRESS,
                subject: "Ny henvendelse fra kontaktformularen",
                html: supportHtml,
            });

            return NextResponse.json({
                success: true,
                data: {
                    customer: customerData,
                    support: supportData,
                },
            });
        } else if (type === "calculator") {
            const {
                source = "Terrasseberegner",
                email: customerEmail,
                summaryData = [],
                calculatedPrices = [],
            } = body;
            const date = formatDate(new Date());

            const customerHtml = await render(
                CalculatorCustomerEmail({
                    summaryData,
                    calculatedPrices,
                })
            );

            const supportHtml = await render(
                CalculatorSupportEmail({
                    source,
                    email: customerEmail,
                    date,
                    summaryData,
                    calculatedPrices,
                })
            );

            const customerData = await resend.emails.send({
                from: `N-Byg <${SENDER_EMAIL_ADDRESS}>`,
                to: customerEmail,
                subject:
                    "Tak for din beregning – vi har modtaget dine oplysninger",
                html: customerHtml,
            });

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
