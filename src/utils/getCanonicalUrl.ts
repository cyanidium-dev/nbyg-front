/**
 * Генерує canonical URL для сторінки
 * @param path - шлях сторінки (наприклад, "/blog/article-slug" або "/byggeydelser/service")
 * @returns Абсолютний canonical URL без параметрів запиту
 */
export function getCanonicalUrl(path: string): string {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
  
  // Нормалізуємо SITE_URL - прибираємо trailing slash
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  
  // Нормалізуємо path - додаємо leading slash якщо його немає
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  // Видаляємо query параметри якщо є
  const pathWithoutQuery = normalizedPath.split("?")[0];
  
  // Об'єднуємо base URL з path
  return `${baseUrl}${pathWithoutQuery}`;
}

