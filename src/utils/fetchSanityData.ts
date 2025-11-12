import { client } from "@/lib/sanityClient";

export const fetchSanityData = async (
  query: string,
  params: Record<string, unknown> = {}
) => {
  try {
    if (typeof window === "undefined") {
      return await client.fetch(query, params);
    }

    const response = await client.fetch(query, params);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Failed to fetch Sanity data");
  }
};
