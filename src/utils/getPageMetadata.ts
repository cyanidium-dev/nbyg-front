import { Metadata } from "next";
import { getDefaultMetadata } from "./getDefaultMetadata";
import { getMetadataFromSanity } from "./getMetadataFromSanity";
import { fetchSanityData } from "./fetchSanityData";
import { PageSeo } from "@/types/page";

interface PageMetadataOptions {
  query: string;
  path: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Універсальна функція для отримання метаданих сторінки з Sanity
 * @param options - Опції для отримання метаданих
 * @returns Metadata об'єкт для Next.js
 */
export async function getPageMetadata({
  query,
  path,
  defaultTitle,
  defaultDescription,
}: PageMetadataOptions): Promise<Metadata> {
  try {
    const pageData = await fetchSanityData<{
      seo: PageSeo | null;
    }>(query);

    if (pageData?.seo) {
      return getMetadataFromSanity({
        seo: pageData.seo,
        path,
        defaultTitle,
        defaultDescription,
      });
    }
  } catch (error) {
    console.error(`Failed to fetch metadata for ${path}:`, error);
  }

  return getDefaultMetadata(path);
}

