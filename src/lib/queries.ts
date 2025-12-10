export const ALL_DYNAMIC_PAGES_QUERY = `*[_type == "page" && !defined(parent._ref)]{
  title,
  "slug": slug.current,
  menuOrder,
  "children": *[
    _type == "page" &&
    parent._ref == ^._id
  ] | order(menuOrder asc, title asc){
    title,
    "slug": slug.current,
    menuOrder
  }
} | order(menuOrder asc, title asc)`;

export const PAGE_BY_SLUG_QUERY = `*[
  _type == "page" &&
  slug.current == $slug &&
  coalesce(parent->slug.current, "") == coalesce($parentSlug, "")
][0]{
  title,
  "slug": slug.current,
  menuOrder,
  parent->{
    title,
    "slug": slug.current
  },
  "children": *[_type == "page" && parent._ref == ^._id]
    | order(menuOrder asc, title asc){
      title,
      "slug": slug.current,
      menuOrder
    },
  sections[]{
    _type,
    _type == "heroSection" => {
      "type": _type,
      title,
      description,
      "desktopImage": desktopImage{
        ...,
        "alt": alt
      },
      "mobileImage": mobileImage{
        ...,
        "alt": alt
      },
      showDiscussButton,
      showCalculatorTerraceButton,
      showCalculatorRoofButton
    },
    _type == "ctaSection" => {
      "type": _type,
      title,
      description,
      showMoreOnMobile,
      "image": image{
        ...,
        "alt": alt
      },
      buttonType
    },
    _type == "gallerySection" => {
      "type": _type,
      description,
      items[]{
        "image": image{
          _type,
          asset,
          crop,
          hotspot,
          "alt": alt
        }
      }
    },
    _type == "faqSection" => {
      "type": _type,
      description,
      items[]{
        question,
        answer,
        buttons
      }
    },
    _type == "tableSection" => {
      "type": _type,
      title,
      description,
      desktopAlignment,
      showDecorativeCircles,
      columns[]{
        title,
        values
      }
    },
    _type == "beforeAfterSection" => {
      "type": _type,
      items[]{
        "beforeImage": beforeImage{
          ...,
          "alt": alt
        },
        "afterImage": afterImage{
          ...,
          "alt": alt
        }
      }
    },
    _type == "materialSliderSection" => {
      "type": _type,
      title,
      titlePosition,
      subtitle,
      description1,
      description2,
      slides[]{
        "image": image{
          ...,
          "alt": alt
        },
        title,
        description
      }
    },
    _type == "imageTextButtonSection" => {
      "type": _type,
      title,
      titlePosition,
      imagePosition,
      "image": image{
        ...,
        "alt": alt
      },
      description,
      buttonStyle,
      buttonText,
      "buttonSlug": select(
        defined(buttonPage->parent->slug.current) => "/byggeydelser/" + buttonPage->parent->slug.current + "/" + buttonPage->slug.current,
        "/byggeydelser/" + buttonPage->slug.current
      )
    },
    _type == "tableWithImageSection" => {
      "type": _type,
      title,
      tablePosition,
      "image": image{
        ...,
        "alt": alt
      },
      columns[]{
        title,
        values
      }
    },
    _type == "textReavealCardsSliderSection" => {
      "type": _type,
      title,
      description,
      description2,
      cards[]{
        _key,
        title,
        description,
        "image": image{
          ...,
          "alt": alt
        }
      }
    },
    _type == "roofTypesSection" => {
      "type": _type,
      title,
      description,
      description2,
      description3,
      subtitle,
      "image": image{
        ...,
        "alt": alt
      },
      roofTypes[]{
        _key,
        title,
        description
      }
    },
    _type == "largeTableSection" => {
      "type": _type,
      title,
      description,
      description2,
      "image": image{
        ...,
        "alt": alt
      },
      columns[]{
        title,
        values
      },
      buttonText,
      buttonLink
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const GALLERY_PAGE_QUERY = `*[_type == "galleryPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const ALL_GALLERIES_QUERY = `
*[_type == "galleryPage"][0]{
  galleries[]{
    title,
    description,
    items[]{ 
      _key,
      "image": image{
        _type,
        asset,
        crop,
        hotspot,
        "alt": alt
      }
    }
  }
}.galleries
`;

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const SERVICES_PAGE_QUERY = `*[_type == "servicesPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const CONTACTS_PAGE_QUERY = `*[_type == "contactsPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const COOKIE_POLICY_PAGE_QUERY = `*[_type == "cookiePolicyPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const BLOG_PAGE_QUERY = `*[_type == "blogPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const TERRACE_CALCULATOR_PAGE_QUERY = `*[_type == "terraceCalculatorPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const ROOF_CALCULATOR_PAGE_QUERY = `*[_type == "roofCalculatorPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(_createdAt desc){
  heroTitle,
  heroDescription,
  "heroMobileImage": heroMobileImage{
    ...,
    "alt": alt
  },
  "slug": slug.current,
  _createdAt
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[
  _type == "blogPost" &&
  slug.current == $slug
][0]{
  heroTitle,
  heroDescription,
  "heroDesktopImage": heroDesktopImage{
    ...,
    "alt": alt
  },
  "heroMobileImage": heroMobileImage{
    ...,
    "alt": alt
  },
  "slug": slug.current,
  content[]{
    ...,
    _type == "block" => {
      ...,
      children[]{
        ...,
        marks[]
      }
    },
    _type == "image" => {
      _key,
      _type,
      asset,
      crop,
      hotspot,
      alt
    },
    _type == "table" => {
      _key,
      _type,
      rows[]{
        cells[]
      }
    },
    markDefs[]{
      ...,
      _type == "link" => {
        _key,
        _type,
        href,
        blank
      }
    }
  },
  faq{
    _type,
    "type": _type,
    description,
    items[]{
      _key,
      question,
      answer,
      buttons
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;