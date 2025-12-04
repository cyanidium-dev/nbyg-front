import {
  SanityImage,
  SanityReference,
  SanityImageCrop,
  SanityImageHotspot,
  PortableText,
  FaqSection,
  PageSeo,
} from "./page";

export type BlogPostContentBlock = {
  _key: string;
  _type: "block";
  style?: "h2" | "h3" | "normal";
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
    link?: {
      href: string;
      blank?: boolean;
    };
  }>;
  markDefs?: Array<{
    _key: string;
    _type: "link";
    href: string;
    blank?: boolean;
  }>;
};

export type BlogPostContentImage = {
  _key: string;
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export type BlogPostContentTable = {
  _key: string;
  _type: "table";
  rows?: Array<{
    cells?: string[];
  }>;
};

export type BlogPostContent =
  | BlogPostContentBlock
  | BlogPostContentImage
  | BlogPostContentTable;

export type BlogPost = {
  heroTitle: string;
  heroDescription: string;
  heroDesktopImage: SanityImage;
  heroMobileImage: SanityImage;
  slug: string;
  content: BlogPostContent[];
  faq?: FaqSection | null;
  seo?: PageSeo | null;
};

export type BlogPostPreview = {
  heroTitle: string;
  heroDescription: string;
  heroMobileImage: SanityImage;
  slug: string;
  _createdAt?: string;
};

