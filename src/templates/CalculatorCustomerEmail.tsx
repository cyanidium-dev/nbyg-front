import {
    Body,
    Column,
    Container,
    Head,
    Html,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import { CONTACT_PHONE, EMAIL } from "@/constants/constants";

type FieldData = {
    value: string | number;
    label: string;
    category: string;
    labels?: string[];
    fieldId?: string; // Optional field identifier (e.g., "padding")
};

type CalculatedPrice = {
    title: string;
    total: number;
};

type CalculatorCustomerEmailProps = {
    summaryData: FieldData[];
    calculatedPrices: CalculatedPrice[];
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export function CalculatorCustomerEmail({
    summaryData = [],
    calculatedPrices = [],
}: CalculatorCustomerEmailProps) {
    return (
        <Html lang="da">
            <Head />
            <Preview>
                Tak for din beregning – vi har modtaget dine oplysninger
            </Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={h1}>
                        Tak for din beregning – vi har modtaget dine oplysninger
                    </Text>

                    <Text style={p}>
                        <strong>Hej!</strong>
                    </Text>
                    <Text style={{ ...p, marginBottom: "32px" }}>
                        Tak fordi du brugte vores online beregner til tage. Vi
                        har modtaget dine oplysninger og gennemgår nu din
                        beregning.
                    </Text>
                    <Text style={{ ...p, marginBottom: "32px" }}>
                        Her er en kort oversigt over det, du har angivet:
                    </Text>

                    {summaryData.length > 0 && (
                        <Section style={summarySection}>
                            <Text style={h2}>Du har valgt:</Text>
                            <Section style={tableContainer}>
                                {summaryData.map((data, index) => {
                                    if (!data || !data.label || !data.category)
                                        return null;

                                    return (
                                        <Row
                                            key={`${data.category}-${String(data.value)}-${index}`}
                                        >
                                            <Column style={tableCellCategory}>
                                                <Text
                                                    style={
                                                        tableCellCategoryText
                                                    }
                                                >
                                                    {data.category || ""}
                                                </Text>
                                            </Column>
                                            <Column style={tableCellValue}>
                                                {data.fieldId === "padding" ? (
                                                    <div style={iconContainer}>
                                                        <Text style={iconText}>
                                                            {Number(
                                                                data.value
                                                            ) > 0
                                                                ? "✓"
                                                                : "✗"}
                                                        </Text>
                                                    </div>
                                                ) : data.labels ? (
                                                    <>
                                                        {data.labels.map(
                                                            (
                                                                label,
                                                                labelIndex
                                                            ) => (
                                                                <Text
                                                                    key={
                                                                        labelIndex
                                                                    }
                                                                    style={
                                                                        labelText
                                                                    }
                                                                >
                                                                    {label}
                                                                </Text>
                                                            )
                                                        )}
                                                    </>
                                                ) : (
                                                    <Text
                                                        style={
                                                            tableCellValueText
                                                        }
                                                    >
                                                        {data.label || ""}
                                                    </Text>
                                                )}
                                            </Column>
                                        </Row>
                                    );
                                })}
                            </Section>
                        </Section>
                    )}

                    {calculatedPrices.length > 0 && (
                        <Section style={pricesSection}>
                            {calculatedPrices
                                .filter(price => price.total > 0)
                                .map((price, index) => (
                                    <Section key={index} style={priceItem}>
                                        <Text style={priceTitle}>
                                            {price.title}
                                        </Text>
                                        <Text style={priceAmount}>
                                            {price.total.toLocaleString(
                                                "da-DK"
                                            )}{" "}
                                            kr.
                                        </Text>
                                    </Section>
                                ))}
                        </Section>
                    )}

                    <Text style={p}>
                        Vi kontakter dig snarest muligt for at bekræfte
                        detaljerne, svare på spørgsmål og give en mere præcis
                        pris baseret på dit projekt.
                    </Text>
                    <Text style={p}>
                        Hvis du har yderligere spørgsmål, er du altid velkommen
                        til at skrive eller ringe til os.
                    </Text>
                    <Text style={p}>Med venlig hilsen</Text>
                    <Text style={p}>
                        <strong>Nbyg Teamet</strong>
                    </Text>
                    <Text style={p}>
                        Har du spørgsmål? Ring til os eller send os en e-mail
                    </Text>

                    <Section style={addressSection}>
                        <Text style={addressText}>
                            <a href={`tel:${CONTACT_PHONE}`}>
                                <strong>{CONTACT_PHONE}</strong>
                            </a>
                        </Text>
                        <Text style={addressText}>
                            <a href={`mailto:${EMAIL}`}>
                                <strong>{EMAIL}</strong>
                            </a>
                        </Text>
                        {SITE_URL && (
                            <Text style={footerText}>
                                <a href={SITE_URL}>{SITE_URL}</a>
                            </Text>
                        )}
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// === Styles ===

const main = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "12px",
    fontWeight: "300",
    lineHeight: "1.5",
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: "48px",
};

const container = {
    maxWidth: "504px",
    margin: "0 auto",
};

const h1 = {
    fontFamily: "Find Sans Pro",
    fontSize: "30px",
    lineHeight: "1.2",
    margin: "0 0 50px 0",
};

const h2 = {
    fontSize: "18px",
    margin: "0 0 24px 0",
};

const p = {
    margin: "0 0 24px 0",
    fontSize: "12px",
};

const summarySection = {
    margin: "0 0 48px 0",
};

const tableContainer = {
    width: "100%",
    margin: "0 0 24px 0",
};

const tableCellCategory = {
    width: "50%",
    padding: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    borderRight: "1px solid rgba(255, 255, 255, 0.1)",
    verticalAlign: "middle",
};

const tableCellCategoryText = {
    margin: "0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "125%",
    fontWeight: "500",
};

const tableCellValue = {
    width: "50%",
    padding: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    textAlign: "center" as const,
    verticalAlign: "middle",
};

const tableCellValueText = {
    margin: "0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "125%",
    fontWeight: "300",
    textAlign: "center" as const,
};

const labelText = {
    margin: "0 0 4px 0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "125%",
};

const iconContainer = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#8B4513",
    margin: "0 auto",
    textAlign: "center" as const,
    lineHeight: "20px",
};

const iconText = {
    margin: "0",
    color: "#ffffff",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "bold",
    textAlign: "center" as const,
};

const pricesSection = {
    margin: "0 0 32px 0",
};

const priceItem = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    padding: "16px",
    margin: "0 0 16px 0",
};

const priceTitle = {
    margin: "0",
    color: "#ffffff",
    fontSize: "20px",
    lineHeight: "125%",
    fontWeight: "300",
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const priceAmount = {
    margin: "0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "125%",
    fontWeight: "500",
    textAlign: "right" as const,
    paddingTop: "16px",
};

const addressSection = {
    margin: "48px auto 0 auto",
    textAlign: "center" as const,
};

const addressText = {
    margin: "0 0 8px 0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "1.25",
};

const footerText = {
    color: "#B86D29",
    fontSize: "12px",
    lineHeight: "1.25",
    textDecoration: "underline",
    textDecorationColor: "#B86D29",
    textDecorationThickness: "1px",
    textUnderlineOffset: "2px",
};
