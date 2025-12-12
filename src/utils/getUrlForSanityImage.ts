import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanityClient";

const builder = imageUrlBuilder(client);

export function urlForSanityImage(source: Parameters<typeof builder.image>[0]) {
  // Використовуємо imageUrlBuilder, який правильно формує URL з розмірами
  return builder.image(source);
}
