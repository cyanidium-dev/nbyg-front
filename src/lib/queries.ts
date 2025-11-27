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
      desktopImage,
      mobileImage,
      showDiscussButton,
      showCalculatorTerraceButton,
      showCalculatorRoofButton
    },
    _type == "ctaSection" => {
      "type": _type,
      title,
      description,
      showMoreOnMobile,
      image,
      buttonType
    },
    _type == "gallerySection" => {
      "type": _type,
      items[]{
        desktopImage,
        mobileImage
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
        beforeImage,
        afterImage
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
        image,
        title,
        description
      }
    },
    _type == "imageTextButtonSection" => {
      "type": _type,
      title,
      titlePosition,
      imagePosition,
      image,
      description,
      buttonStyle,
      buttonText,
      "buttonSlug": buttonPage->slug.current
    },
    _type == "tableWithImageSection" => {
      "type": _type,
      title,
      tablePosition,
      image,
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
        title,
        description,
        image
      }
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    opengraphImage,
    schemaJson
  }
}`;
