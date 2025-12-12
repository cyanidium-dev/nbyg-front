import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanityClient";

const builder = imageUrlBuilder(client);
const projectId = client.config().projectId;
const dataset = client.config().dataset;

/**
 * Отримує ПРЯМИЙ базовий asset URL з Sanity БЕЗ розмірів у назві файлу
 * 
 * ПРОБЛЕМА: 
 * - На Vercel Next.js Image Optimization робить серверний запит до Sanity CDN
 * - imageUrlBuilder завжди додає розміри до URL (наприклад, -1600x1200.webp)
 * - URL з розмірами розпізнається Sanity як Image API виклик → 402 Payment Required
 * - Локально працює, бо Next.js Image Optimization працює по-іншому (локально або прямий браузерний запит)
 * 
 * РІШЕННЯ:
 * Формуємо базовий asset URL напряму з _ref без використання imageUrlBuilder,
 * щоб уникнути розмірів у назві файлу. Next.js Image Optimization самостійно обробить зображення.
 * 
 * Формат assetRef: image-{hash}-{width}x{height}-{ext}
 * Формат базового URL: https://cdn.sanity.io/images/{projectId}/{dataset}/{hash}.{ext}
 */
export function urlForSanityImage(source: Parameters<typeof builder.image>[0]) {
  // Перевіряємо, чи source - це об'єкт з полем asset
  if (!source || typeof source === 'string' || !('asset' in source)) {
    return builder.image(source);
  }

  const asset = source.asset;
  if (!asset) {
    return builder.image(source);
  }

  // Перевіряємо, чи asset має _ref або _id
  const assetRef = 
    (typeof asset === 'object' && '_ref' in asset ? asset._ref : null) ||
    (typeof asset === 'object' && '_id' in asset ? (asset as { _id?: string })._id : null);
    
  if (!assetRef || typeof assetRef !== 'string') {
    return builder.image(source);
  }

  // Формат assetRef: image-{hash}-{width}x{height}-{ext}
  // Приклад: image-3edf66e45afa7922ca083244e28d0636cc6e6ae5-1600x1200-webp
  // Видаляємо префікс "image-" та розміри
  const assetId = assetRef.replace(/^image-/, "");
  
  // Видаляємо розміри: -{width}x{height}-{ext} → залишаємо hash та ext
  const match = assetId.match(/^(.+?)(-\d+x\d+)-(\w+)$/);
  if (match) {
    const hash = match[1]; // hash частина
    const extension = match[3]; // розширення (webp, jpg тощо)
    
    // Формуємо базовий URL БЕЗ розмірів
    const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${hash}.${extension}`;
    
    // Повертаємо об'єкт з методом url() для сумісності
    return {
      url: () => baseUrl,
      toString: () => baseUrl,
      width: () => ({ url: () => baseUrl, toString: () => baseUrl } as unknown as ReturnType<typeof builder.image>),
      height: () => ({ url: () => baseUrl, toString: () => baseUrl } as unknown as ReturnType<typeof builder.image>),
      quality: () => ({ url: () => baseUrl, toString: () => baseUrl } as unknown as ReturnType<typeof builder.image>),
      fit: () => ({ url: () => baseUrl, toString: () => baseUrl } as unknown as ReturnType<typeof builder.image>),
    } as unknown as ReturnType<typeof builder.image>;
  }

  // Fallback - якщо формат не відповідає, використовуємо builder
  return builder.image(source);
}
