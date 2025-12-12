import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanityClient";

const builder = imageUrlBuilder(client);

/**
 * Отримує URL зображення з Sanity з автоматичним додаванням crop та hotspot
 * imageUrlBuilder автоматично витягує crop та hotspot з об'єкта зображення
 * та додає їх до URL через параметри rect та focalPoint
 * 
 * Важливо: Не використовуємо .fit() щоб уникнути помилки Payment required,
 * але crop все одно зберігається через параметри URL
 */
export function urlForSanityImage(source: Parameters<typeof builder.image>[0]) {
  // imageUrlBuilder автоматично додає crop та hotspot до URL
  // без виклику Image API оптимізації (яка вимагає оплати)
  return builder.image(source);
}
