import { Body } from "@react-email/body";
import {
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

type ContactFormSupportEmailProps = {
    name?: string;
    phone?: string;
    email: string;
    address?: string;
    message?: string;
    date?: string;
};

export function ContactFormSupportEmail({
    name,
    phone,
    email,
    address,
    message,
    date,
}: ContactFormSupportEmailProps) {
    return (
        <Html lang="da">
            <Head />
            <Preview>Ny henvendelse fra kontaktformularen</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Text style={h1}>Ny henvendelse fra kontaktformularen</Text>
                    <Text style={p}>
                        Du har modtaget en ny besked fra formularen
                        &quot;Kontakt os&quot;.
                    </Text>

                    <Section style={listContainer}>
                        {name && (
                            <Text style={listItem}>
                                <strong>Navn: </strong>
                                {name}
                            </Text>
                        )}
                        {phone && (
                            <Text style={listItem}>
                                <strong>Telefon: </strong>
                                {phone}
                            </Text>
                        )}
                        {email && (
                            <Text style={listItem}>
                                <strong>Email: </strong>
                                {email}
                            </Text>
                        )}
                        {address && (
                            <Text style={listItem}>
                                <strong>Adresse: </strong>
                                {address}
                            </Text>
                        )}
                        {message && (
                            <>
                                <Text style={listItem}>
                                    <strong>Besked: </strong>
                                </Text>
                                <Text style={listItem}>{message}</Text>
                            </>
                        )}
                    </Section>

                    {date && (
                        <Text style={dateText}>
                            <strong>Sendt den: </strong>
                            {date}
                        </Text>
                    )}

                    <Text style={{ ...p, marginBottom: 0 }}>
                        Denne e-mail er genereret automatisk. Ignorér den, hvis
                        den er modtaget ved en fejl.
                    </Text>
                    <Text style={p}>© Nbyg</Text>
                </Container>
            </Body>
        </Html>
    );
}

// === Styles ===

const main = {
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    lineHeight: "1.167",
    color: "#ffffff",
    backgroundColor: "#000000",
    padding: "48px 16px",
};

const container = {
    maxWidth: "600px",
    margin: "0 auto",
};

const h1 = {
    fontSize: "20px",
    lineHeight: "150%",
    margin: "0 0 40px 0",
    color: "#ffffff",
};

const p = {
    margin: "0 0 24px 0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "1.167",
};

const listContainer = {
    listStyle: "none",
    padding: "0",
    margin: "0 0 24px 0",
};

const listItem = {
    marginBottom: "16px",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "1.167",
};

const dateText = {
    margin: "0 0 40px 0",
    color: "#ffffff",
    fontSize: "12px",
    lineHeight: "1.167",
};
