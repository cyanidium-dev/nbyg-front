import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const host = headersList.get("host");
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
  
  // Використовуємо SITE_URL з env, якщо він є, інакше формуємо з host
  let baseUrl = SITE_URL;
  
  if (!baseUrl && host) {
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    baseUrl = `${protocol}://${host}`;
  }
  
  // Якщо все ще немає baseUrl, використовуємо дефолтний
  if (!baseUrl) {
    baseUrl = "https://www.nbygkøbenhavn.dk";
  }
  
  // Нормалізуємо - прибираємо trailing slash
  baseUrl = baseUrl.replace(/\/+$/, "");

  const robotsTxt = `User-agent: *
Allow: /
Allow: /_next/static
Disallow: /api/
Disallow: /_next/image

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

