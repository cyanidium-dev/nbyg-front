import { fetchSanityData } from "./fetchSanityData";
import { fetchSchemaJson } from "./fetchSchemaJson";

/**
 * Універсальна функція для отримання schema JSON сторінки з Sanity
 * @param query - GROQ запит до Sanity, який повертає seo.schemaJsonUrl
 * @returns JSON об'єкт зі структурованими даними або null
 */
export async function getPageSchemaJson(
  query: string
): Promise<Record<string, unknown> | Array<Record<string, unknown>> | null> {
  try {
    const pageData = await fetchSanityData<{
      seo: {
        schemaJsonUrl?: string;
      } | null;
    }>(query);

    if (pageData?.seo?.schemaJsonUrl) {
      return await fetchSchemaJson(pageData.seo.schemaJsonUrl);
    }
  } catch (error) {
    console.error("Failed to fetch schema JSON:", error);
  }

  return null;
}

