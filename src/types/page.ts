export type SanityReference = {
  _type: "reference";
  _ref: string;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
};

export type SanityImage = {
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children?: Array<{
    _key: string;
    _type: "span";
    marks: string[];
    text: string;
  }>;
  markDefs?: Array<Record<string, unknown>>;
  style?: string;
};

export type PortableText = Array<PortableTextBlock | Record<string, unknown>>;

// ---- Секції ----

export type HeroSection = {
  _type: "heroSection";
  type: "heroSection";
  title: string;
  description: string;
  desktopImage: SanityImage;
  mobileImage: SanityImage;
  showDiscussButton?: boolean;
  showCalculatorTerraceButton?: boolean;
  showCalculatorRoofButton: boolean;
};

export type CtaSection = {
  _type: "ctaSection";
  type: "ctaSection";
  title: string;
  description: string;
  showMoreOnMobile: boolean;
  image: SanityImage | string;
  buttonType: "calculatorTerrace" | "calculatorRoof" | "contact" | string;
};

export type TableSection = {
  _type: "tableSection";
  type: "tableSection";
  title: string;
  description?: string;
  desktopAlignment: "left" | "right";
  showDecorativeCircles: boolean;
  columns: Array<{
    _key?: string;
    title: string;
    values: string[];
  }>;
};

export type MaterialSliderSection = {
  _type: "materialSliderSection";
  type: "materialSliderSection";
  title: string;
  titlePosition: string;
  subtitle: string;
  description1: PortableText;
  description2: PortableText;
  slides: Array<{
    _key?: string;
    image: SanityImage;
    title: string;
    description: string;
  }>;
};

export type GallerySection = {
  _type: "gallerySection";
  type: "gallerySection";
  description?: string;
  items?: Array<{
    _key?: string;
    image?: SanityImage | { link: string; alt: string };
  }>;
};

export type BeforeAfterSection = {
  _type: "beforeAfterSection";
  type: "beforeAfterSection";
  items: Array<{
    _key?: string;
    beforeImage: SanityImage | { link: string; alt: string };
    afterImage: SanityImage | { link: string; alt: string };
  }>;
};

export type ImageTextButtonSection = {
  _type: "imageTextButtonSection";
  type: "imageTextButtonSection";
  title: string;
  titlePosition: string;
  image?: SanityImage;
  imagePosition: string;
  description?: PortableText;
  buttonStyle?: string;
  buttonText?: string;
  buttonSlug?: string;
};

export type FaqSection = {
  _type: "faqSection";
  type: "faqSection";
  description?: string;
  items: Array<{
    _key?: string;
    question: string;
    answer: string;
    buttons?: string[];
  }>;
};

export type TableWithImageSection = {
  _type: "tableWithImageSection";
  type: "tableWithImageSection";
  title: string;
  tablePosition: "left" | "right";
  image: SanityImage;
  columns: Array<{
    _key?: string;
    title: string;
    values: string[];
  }>;
};

export type TextRevealCardsSliderSection = {
  _type: "textReavealCardsSliderSection";
  type: "textReavealCardsSliderSection";
  title: string;
  description?: string;
  description2?: string;
  cards: Array<{
    _key?: string;
    title: string;
    description: string;
    image: SanityImage | { link: string; alt: string };
    link?: string;
  }>;
};

export type RoofTypesSection = {
  _type: "roofTypesSection";
  type: "roofTypesSection";
  title: string;
  description: PortableText;
  description2: PortableText;
  description3: PortableText;
  subtitle: string;
  image: SanityImage;
  roofTypes: Array<{
    _key?: string;
    title: string;
    description: string;
  }>;
};

export type LargeTableSection = {
  _type: "largeTableSection";
  type: "largeTableSection";
  title: string;
  description: string;
  description2: string;
  image: SanityImage;
  columns: Array<{
    _key?: string;
    title: string;
    values: string[];
  }>;
  buttonText: string;
  buttonLink: string;
};

export type PageSection =
  | HeroSection
  | CtaSection
  | TableSection
  | MaterialSliderSection
  | GallerySection
  | BeforeAfterSection
  | ImageTextButtonSection
  | FaqSection
  | TableWithImageSection
  | TextRevealCardsSliderSection
  | RoofTypesSection
  | LargeTableSection
  | (Record<string, unknown> & { _type: string; type?: string }); // fallback

// ---- Основний тип сторінки ----

export type PageChild = {
  title: string;
  slug: string;
  menuOrder: number;
};

export type PageParent = {
  title: string;
  slug: string;
};

export type PageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[] | string;
  opengraphImage?: SanityImage;
  schemaJsonUrl?: string;
};

export type SanityPage = {
  title: string;
  slug: string;
  menuOrder: number;
  parent: PageParent | null;
  children: PageChild[];
  sections: PageSection[];
  seo: PageSeo | null;
};
