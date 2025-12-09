import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Редирект з /sitemap.xml на /api/sitemap
export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const baseUrl = `${protocol}://${host}`;

  return NextResponse.redirect(new URL("/api/sitemap", baseUrl), {
    status: 301, // Permanent redirect
  });
}
