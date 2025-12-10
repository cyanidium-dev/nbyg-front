import { fetchSanityData } from "./fetchSanityData";
import { fetchSchemaJson } from "./fetchSchemaJson";

/**
 * Універсальна функція для отримання schema JSON динамічних сторінок з Sanity
 * @param query - GROQ запит до Sanity, який повертає seo.schemaJsonUrl
 * @param queryParams - Параметри для запиту
 * @returns JSON об'єкт зі структурованими даними або null
 */
export async function getDynamicPageSchemaJson(
  query: string,
  queryParams: Record<string, unknown>
): Promise<Record<string, unknown> | Array<Record<string, unknown>> | null> {
  try {
    const pageData = await fetchSanityData<{
      seo: {
        schemaJsonUrl?: string;
      } | null;
    }>(query, queryParams);

    if (pageData?.seo?.schemaJsonUrl) {
      return await fetchSchemaJson(pageData.seo.schemaJsonUrl);
    }
  } catch (error) {
    console.error("Failed to fetch schema JSON:", error);
  }

  return null;
}

