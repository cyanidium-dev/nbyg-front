import { Metadata } from "next";
import { PageSeo } from "@/types/page";
import { getCanonicalUrl } from "./getCanonicalUrl";
import { urlForSanityImage } from "./getUrlForSanityImage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

interface GetMetadataFromSanityParams {
  seo: PageSeo | null | undefined;
  path: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Обробляє SEO дані з Sanity та повертає валідні метадані для Next.js
 * @param seo - SEO дані з Sanity
 * @param path - шлях сторінки для canonical URL
 * @param defaultTitle - заголовок за замовчуванням
 * @param defaultDescription - опис за замовчуванням
 * @returns Metadata об'єкт для Next.js
 */
export function getMetadataFromSanity({
  seo,
  path,
  defaultTitle = "Nbyg",
  defaultDescription = "Byggeri og renovering med kvalitet og tillid",
}: GetMetadataFromSanityParams): Metadata {
  const canonicalUrl = getCanonicalUrl(path);

  // Обробляємо meta title
  const metaTitle = seo?.metaTitle || defaultTitle;

  // Обробляємо meta description
  const metaDescription = seo?.metaDescription || defaultDescription;

  // Обробляємо keywords - можуть бути як масив, так і рядок через кому
  let keywords: string[] | undefined;
  if (seo?.keywords) {
    if (Array.isArray(seo.keywords)) {
      keywords = seo.keywords.length > 0 ? seo.keywords : undefined;
    } else if (typeof seo.keywords === "string") {
      // Якщо це рядок, розбиваємо через кому та очищаємо від пробілів
      const parsedKeywords = seo.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0);
      keywords = parsedKeywords.length > 0 ? parsedKeywords : undefined;
    }
  }

  // Обробляємо Open Graph зображення
  let ogImageUrl: string | undefined;
  if (seo?.opengraphImage) {
    const ogImage = urlForSanityImage(seo.opengraphImage)
      .width(1200)
      .height(630)
      .fit("fill")
      .url();
    ogImageUrl = ogImage;
  } else {
    ogImageUrl = `${SITE_URL}/opengraph-image.jpg`;
  }

  // Формуємо metadata об'єкт
  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "da-DK": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo?.opengraphImage?.alt || metaTitle,
        },
      ],
      type: "website",
      locale: "da_DK",
      siteName: "Nbyg",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
  };

  return metadata;
}

