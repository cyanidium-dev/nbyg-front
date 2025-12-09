import { CalculatorCustomerEmail } from "@/templates/CalculatorCustomerEmail";
import { ContactFormEmail } from "@/templates/ContactFormEmail";
import { render } from "@react-email/render";

export default async function PreviewEmailPage({
    searchParams,
}: {
    searchParams: Promise<{ template?: string }>;
}) {
    const params = await searchParams;
    const template = params.template || "calculator-customer";

    let html = "";

    if (template === "calculator-customer") {
        html = await render(
            <CalculatorCustomerEmail
                summaryData={[
                    {
                        category: "Tagets størrelse",
                        label: "50 m²",
                        value: 50,
                    },
                    {
                        category: "Tagtype",
                        label: "Tagpap",
                        value: "tagpap",
                    },
                    {
                        category: "Hældning",
                        label: "15 grader",
                        value: 15,
                    },
                ]}
                calculatedPrices={[
                    { title: "Total pris", total: 125000 },
                    { title: "Ekstraudstyr", total: 15000 },
                ]}
            />
        );
    } else if (template === "contact-form") {
        html = await render(
            <ContactFormEmail
                name="John Doe"
                phone="+45 12 34 56 78"
                email="john@example.com"
                address="Copenhagen"
                message="Hello, I would like to know more about your services."
                date="15. december 2024"
            />
        );
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px" }}>
                <h1 style={{ marginBottom: "10px" }}>Email Preview</h1>
                <div style={{ marginBottom: "10px" }}>
                    <a
                        href="/preview-email?template=calculator-customer"
                        style={{
                            marginRight: "10px",
                            padding: "8px 16px",
                            backgroundColor: "#0070f3",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "4px",
                        }}
                    >
                        Calculator Customer
                    </a>
                    <a
                        href="/preview-email?template=contact-form"
                        style={{
                            padding: "8px 16px",
                            backgroundColor: "#0070f3",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "4px",
                        }}
                    >
                        Contact Form
                    </a>
                </div>
            </div>
            <div
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                }}
            >
                <iframe
                    srcDoc={html}
                    style={{
                        width: "100%",
                        height: "800px",
                        border: "none",
                    }}
                    title="Email Preview"
                />
            </div>
        </div>
    );
}
