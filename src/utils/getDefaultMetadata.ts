import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function getDefaultMetadata(): Metadata {
  return {
    title: "Nbyg",
    description: "Byggeri og renovering med kvalitet og tillid",
    openGraph: {
      title: "Nbyg",
      description: "Byggeri og renovering med kvalitet og tillid",
      images: [
        {
          url: `${SITE_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Glimmer",
        },
      ],
      type: "website",
      locale: "da_DK",
      siteName: "Nbyg",
    },
  };
}
