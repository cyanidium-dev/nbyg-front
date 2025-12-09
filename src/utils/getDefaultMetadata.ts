import { Metadata } from "next";
import { getCanonicalUrl } from "./getCanonicalUrl";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function getDefaultMetadata(path: string = "/"): Metadata {
  return {
    title: "Nbyg",
    description: "Byggeri og renovering med kvalitet og tillid",
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    openGraph: {
      title: "Nbyg",
      description: "Byggeri og renovering med kvalitet og tillid",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Nbyg",
        },
      ],
      type: "website",
      locale: "da_DK",
      siteName: "Nbyg",
    },
  };
}
