import { Body } from "@react-email/body";
import {
    Column,
    Container,
    Head,
    Html,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";

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

type CalculatorSupportEmailProps = {
    source?: string;
    email: string;
    date: string;
    summaryData: FieldData[];
    calculatedPrices: CalculatedPrice[];
};

export function CalculatorSupportEmail({
    source = "Terrasseberegner",
    email,
    date,
    summaryData = [],
    calculatedPrices = [],
}: CalculatorSupportEmailProps) {
    return (
        <Html lang="da">
            <Head />
            <Preview>Ny anmodning fra terrasseberegneren</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={h1}>Ny anmodning fra terrasseberegneren</Text>

                    <Text style={p}>
                        Du har modtaget en ny besked fra formularen &quot;
                        {source}&quot;.
                    </Text>
                    <Text style={p}>
                        <strong>E-mail:</strong> {email}
                    </Text>
                    <Text style={p}>
                        <strong>Sendt den:</strong> {date}
                    </Text>
                    <Text style={pMedium}>
                        <strong>
                            Her er et resumé af, hvad klienten leverede:
                        </strong>
                    </Text>

                    {summaryData.length > 0 && (
                        <Section style={summarySection}>
                            <Text style={h2}>
                                <strong>Du har valgt:</strong>
                            </Text>
                            <Section style={tableContainer}>
                                {summaryData
                                    .filter(
                                        data =>
                                            data && data.label && data.category
                                    )
                                    .map((data, index, filteredArray) => {
                                        const isLastRow =
                                            index === filteredArray.length - 1;

                                        return (
                                            <Row
                                                key={`${data.category}-${String(data.value)}-${index}`}
                                            >
                                                <Column
                                                    style={
                                                        isLastRow
                                                            ? {
                                                                  ...tableCellCategory,
                                                                  borderBottom:
                                                                      "none",
                                                              }
                                                            : tableCellCategory
                                                    }
                                                >
                                                    <Text
                                                        style={
                                                            tableCellCategoryText
                                                        }
                                                    >
                                                        <strong>
                                                            {data.category ||
                                                                ""}
                                                        </strong>
                                                    </Text>
                                                </Column>
                                                <Column
                                                    style={
                                                        isLastRow
                                                            ? {
                                                                  ...tableCellValue,
                                                                  borderBottom:
                                                                      "none",
                                                              }
                                                            : tableCellValue
                                                    }
                                                >
                                                    {data.fieldId ===
                                                    "padding" ? (
                                                        <div
                                                            style={
                                                                iconContainer
                                                            }
                                                        >
                                                            <Text
                                                                style={iconText}
                                                            >
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

                    <Text style={{ ...pLight, marginBottom: 0 }}>
                        Denne e-mail er genereret automatisk. Ignorér den, hvis
                        den er modtaget ved en fejl.
                    </Text>
                    <Text style={pLight}>© Nbyg</Text>
                </Container>
            </Body>
        </Html>
    );
}

// === Styles ===

const main = {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "12px",
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: "48px 16px",
};

const container = {
    maxWidth: "504px",
    margin: "0 auto",
};

const h1 = {
    fontSize: "30px",
    lineHeight: "1.2",
    fontWeight: "300",
    margin: "0 0 50px 0",
    color: "#ffffff",
};

const h2 = {
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "1.5",
    margin: "0 0 24px 0",
    color: "#ffffff",
};

const p = {
    margin: "0 0 24px 0",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "1.5",
    color: "#ffffff",
};

const pMedium = {
    margin: "0 0 24px 0",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "1.5",
    color: "#ffffff",
};

const pLight = {
    margin: "0 0 24px 0",
    fontSize: "12px",
    fontWeight: "300",
    lineHeight: "1.5",
    color: "#ffffff",
};

// Table and summary styles from CalculatorCustomerEmail
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
    borderBottom: "1px solid #1a1a1a",
    borderRight: "1px solid #1a1a1a",
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
    borderBottom: "1px solid #1a1a1a",
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
    fontWeight: "300",
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

// Price section styles from CalculatorCustomerEmail (mobile layout)
const pricesSection = {
    margin: "0 0 32px 0",
};

const priceItem = {
    backgroundColor: "#1a1a1a",
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
    borderBottom: "1px solid #1a1a1a",
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
