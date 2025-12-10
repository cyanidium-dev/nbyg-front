import { Metadata } from "next";
import { getMetadataFromSanity } from "./getMetadataFromSanity";
import { getDefaultMetadata } from "./getDefaultMetadata";
import { fetchSanityData } from "./fetchSanityData";
import { PageSeo } from "@/types/page";

interface DynamicPageMetadataOptions {
  query: string;
  queryParams: Record<string, unknown>;
  path: string;
  defaultTitle?: string;
  defaultDescription?: string;
}

/**
 * Універсальна функція для отримання метаданих динамічних сторінок з Sanity
 * @param options - Опції для отримання метаданих
 * @returns Metadata об'єкт для Next.js
 */
export async function getDynamicPageMetadata({
  query,
  queryParams,
  path,
  defaultTitle,
  defaultDescription,
}: DynamicPageMetadataOptions): Promise<Metadata> {
  try {
    const pageData = await fetchSanityData<{
      seo: PageSeo | null;
    }>(query, queryParams);

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

