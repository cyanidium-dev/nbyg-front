/** @type {import('next-sitemap').IConfig} */

import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "fz2ftte6",
  dataset: "production",
  apiVersion: "2025-12-09",
  useCdn: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const fetchSanityDataServer = async (query, params = {}) => {
  try {
    return await client.fetch(query, params);
  } catch (error) {
    console.warn("Sanity fetch failed:", error);
    return null;
  }
};

// Запит для отримання динамічних сторінок
export const GET_DYNAMIC_PAGES_SLUGS = `{
  "pages": *[_type == "page" && !defined(parent._ref)]{
    "slug": slug.current,
    "children": *[
      _type == "page" &&
      parent._ref == ^._id
    ]{
      "slug": slug.current
    }
  },
  "blogPosts": *[_type == "blogPost"]{
    "slug": slug.current
  }
}`;

async function getDynamicPages() {
  const res = await fetchSanityDataServer(GET_DYNAMIC_PAGES_SLUGS);

  const pages = res?.pages || [];
  const pagesPaths = pages.map((page) => `/byggeydelser/${page.slug}`);

  // Додаємо підпослуги (children)
  const subservicesPaths = pages.flatMap((page) =>
    (page.children || []).map(
      (child) => `/byggeydelser/${page.slug}/${child.slug}`
    )
  );

  const blogPosts = res?.blogPosts || [];
  const blogPostsPaths = blogPosts.map((post) => `/blog/${post.slug}`);

  return [...pagesPaths, ...subservicesPaths, ...blogPostsPaths];
}

const sitemapConfig = {
  siteUrl: SITE_URL,
  changefreq: "monthly",
  sitemapSize: 5000,
  priority: 0.7,
  generateIndexSitemap: false,
  exclude: ["/api/*"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/_next/static"],
        disallow: ["/api/", "/_next/image"],
      },
    ],
  },
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
  additionalPaths: async (config) => {
    // Статичні сторінки сайту
    const staticPages = [
      {
        loc: "/",
        changefreq: "weekly",
        priority: 1.0,
      },
      {
        loc: "/blog",
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: "/byggeydelser",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        loc: "/galleri",
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: "/om-os",
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        loc: "/kontakt-os",
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        loc: "/calculator-tag",
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        loc: "/calculator-terrasser",
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        loc: "/cookiepolitik",
        changefreq: "yearly",
        priority: 0.3,
      },
    ];

    const staticPaths = await Promise.all(
      staticPages.map(async (page) => {
        const transformed = await config.transform(config, page.loc);
        return {
          ...transformed,
          changefreq: page.changefreq,
          priority: page.priority,
        };
      })
    );

    const dynamicPages = await getDynamicPages();
    const dynamicPaths = await Promise.all(
      dynamicPages.map((page) => config.transform(config, page))
    );

    return [...staticPaths, ...dynamicPaths];
  },
};

// Експортуємо конфігурацію
export default sitemapConfig;
