import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "fz2ftte6",
  dataset: "production",
  apiVersion: "2025-11-12",
  useCdn: true,
  stega: {
    enabled: false,
  },
});
