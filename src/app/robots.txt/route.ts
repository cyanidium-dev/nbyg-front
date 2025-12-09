import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host") || headersList.get("x-forwarded-host");
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

  // Використовуємо SITE_URL з env, якщо він є
  let baseUrl = SITE_URL;

  // Якщо SITE_URL не встановлено, формуємо з host
  if (!baseUrl) {
    if (host) {
      const protocol =
        headersList.get("x-forwarded-proto") ||
        (process.env.NODE_ENV === "production" ? "https" : "http");
      baseUrl = `${protocol}://${host}`;
    } else {
      // Fallback на дефолтний домен
      baseUrl = "https://www.nbygkøbenhavn.dk";
    }
  }

  // Нормалізуємо - прибираємо trailing slash
  baseUrl = baseUrl.replace(/\/+$/, "");

  const robotsTxt = `
User-agent: *
Allow: /
Allow: /_next/static
Disallow: /api/
Disallow: /_next/image

Host: ${baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
Sitemap: ${baseUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}
