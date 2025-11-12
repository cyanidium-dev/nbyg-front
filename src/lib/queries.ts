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
