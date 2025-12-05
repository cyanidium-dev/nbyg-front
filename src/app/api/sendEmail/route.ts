import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs/promises";
import path from "path";
import { formatDate } from "@/utils/formatDate";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            source = "Kontakt os",
            name,
            phone,
            email,
            address,
            message,
        } = body;

        const templatePath = path.join(
            process.cwd(),
            "src",
            "templates",
            "email-template.hbs"
        );
        const templateContent = await fs.readFile(templatePath, "utf-8");

        const template = handlebars.compile(templateContent);

        const html = template({
            source: source,
            name: name,
            phone: phone,
            email: email,
            address: address,
            message: message,
            date: formatDate(new Date()),
        });

        // Add sending email logic here
        console.log(html);
        setTimeout(async () => {
            await Promise.resolve();
        }, 1000);

        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
}
