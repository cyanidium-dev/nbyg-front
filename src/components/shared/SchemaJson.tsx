import Script from "next/script";

interface SchemaJsonProps {
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>> | null;
}

/**
 * Компонент для додавання schema.org JSON-LD структурованих даних
 * @param schemaJson - JSON об'єкт зі структурованими даними (має бути завантажений на сервері)
 */
export function SchemaJson({ schemaJson }: SchemaJsonProps) {
  if (!schemaJson) {
    return null;
  }

  // Перевіряємо чи це валідний JSON
  let jsonString: string;
  try {
    jsonString = JSON.stringify(schemaJson);
  } catch {
    return null;
  }

  return (
    <Script
      id="schema-json"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

