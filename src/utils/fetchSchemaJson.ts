/**
 * Завантажує та парсить JSON файл з URL
 * @param url - URL JSON файлу
 * @returns Парсений JSON об'єкт або null якщо не вдалося завантажити
 */
export async function fetchSchemaJson(
  url: string | null | undefined
): Promise<Record<string, unknown> | Array<Record<string, unknown>> | null> {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Failed to fetch schema JSON:", error);
    return null;
  }
}

