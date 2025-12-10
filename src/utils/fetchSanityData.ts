import axios from "axios";
import { client } from "@/lib/sanityClient";

export const fetchSanityData = async <T = unknown>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> => {
  try {
    if (typeof window === "undefined") {
      return await client.fetch<T>(query, params);
    }

    const response = await axios.post(
      "/api/sanity",
      {
        query,
        params,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data as T;
  } catch (error) {
    // Log the actual error for debugging
    if (error instanceof Error) {
      console.error("Sanity fetch error:", error.message);
      throw new Error(`Failed to fetch Sanity data: ${error.message}`);
    }
    throw new Error("Failed to fetch Sanity data");
  }
};
