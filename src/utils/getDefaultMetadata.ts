import { Metadata } from "next";
import { getCanonicalUrl } from "./getCanonicalUrl";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function getDefaultMetadata(path: string = "/"): Metadata {
  return {
    title: "Nbyg – Tagfirma i København | Tagrenovering & Træterrasser",
    description:
      "Professionelt tagfirma i København med speciale i tagrenovering, nyt tag og opbygning af træterrasser. Få et gratis og uforpligtende tilbud fra Nbyg i dag.",
    alternates: {
      canonical: getCanonicalUrl(path),
    },
    openGraph: {
      title: "Nbyg – Tagfirma i København | Tagrenovering & Træterrasser",
      description:
        "Professionelt tagfirma i København med speciale i tagrenovering, nyt tag og opbygning af træterrasser. Få et gratis og uforpligtende tilbud fra Nbyg i dag.",
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
