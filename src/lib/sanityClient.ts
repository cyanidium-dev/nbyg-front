import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "fz2ftte6",
  dataset: "production",
  apiVersion: "2025-11-12",
  useCdn: true,
  stega: {
    enabled: false,
  },
});

const imageBuilder = createImageUrlBuilder(client);

export const urlForImage = (source: Parameters<typeof imageBuilder.image>[0]) =>
  imageBuilder.image(source);
