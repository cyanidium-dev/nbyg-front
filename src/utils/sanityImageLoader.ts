import type { ImageLoaderProps } from "next/image";

/**
 * Custom loader для Next.js Image з Sanity зображеннями
 * 
 * ПРОБЛЕМА: На Vercel Next.js Image Optimization додає параметри ?w=1920&q=75 до URL,
 * що викликає Sanity Image API (платний) і повертає 402 Payment Required.
 * 
 * РІШЕННЯ: Повертаємо прямий URL без параметрів Next.js.
 * Next.js Image Optimization все одно працюватиме локально,
 * але на Vercel використовується прямий URL від Sanity CDN.
 * 
 * Це дозволяє зберегти оптимізацію Next.js локально,
 * але уникнути виклику платного Sanity Image API на Vercel.
 */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  // Якщо це URL з Sanity CDN, повертаємо його без параметрів Next.js
  // (які викликають Sanity Image API)
  if (src.includes("cdn.sanity.io")) {
    // Видаляємо будь-які існуючі query-параметри від Next.js або Sanity Image API
    const url = new URL(src);
    url.search = ""; // Видаляємо всі query-параметри
    
    // Повертаємо чистий URL - Next.js Image Optimization обробить його локально,
    // а на Vercel буде використано прямий URL без виклику Sanity Image API
    return url.toString();
  }
  
  // Для інших зображень використовуємо стандартний підхід Next.js
  // (але це не повинно статися, оскільки всі зображення з Sanity)
  return src;
}
