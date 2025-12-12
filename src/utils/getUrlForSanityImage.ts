import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanityClient";

const builder = imageUrlBuilder(client);

/**
 * Отримує URL зображення з Sanity через imageUrlBuilder
 * 
 * ПРОБЛЕМА: 
 * - Sanity CDN вимагає розміри в назві файлу (URL без розмірів повертає 400)
 * - imageUrlBuilder завжди додає розміри до URL (наприклад, -1600x1200.webp)
 * - На Vercel Next.js Image Optimization робить серверний запит з параметрами ?w=1920&q=75
 * - Це викликає Sanity Image API (платний) → 402 Payment Required
 * - Локально працює, бо Next.js Image Optimization працює по-іншому
 * 
 * РІШЕННЯ:
 * Використовуємо imageUrlBuilder (який додає розміри) + custom loader у next.config.ts,
 * який повертає URL без параметрів Next.js. Це дозволяє зображенням працювати
 * без виклику Sanity Image API, хоча і без оптимізації Next.js на Vercel.
 */
export function urlForSanityImage(source: Parameters<typeof builder.image>[0]) {
  // Використовуємо imageUrlBuilder, який правильно формує URL з розмірами
  // Custom loader у next.config.ts обробляє цей URL, видаляючи параметри Next.js
  return builder.image(source);
}
