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
    _updatedAt,
    "children": *[
      _type == "page" &&
      parent._ref == ^._id
    ]{
      "slug": slug.current,
      _updatedAt
    }
  },
  "blogPosts": *[_type == "blogPost"]{
    "slug": slug.current,
    _updatedAt
  }
}`;

async function getDynamicPages() {
  const res = await fetchSanityDataServer(GET_DYNAMIC_PAGES_SLUGS);

  const pages = res?.pages || [];
  const pagesPaths = pages.map((page) => ({
    loc: `/byggeydelser/${page.slug}`,
    lastmod: page._updatedAt || new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Додаємо підпослуги (children)
  const subservicesPaths = pages.flatMap((page) =>
    (page.children || []).map((child) => ({
      loc: `/byggeydelser/${page.slug}/${child.slug}`,
      lastmod: child._updatedAt || new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    }))
  );

  const blogPosts = res?.blogPosts || [];
  const blogPostsPaths = blogPosts.map((post) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post._updatedAt || new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.7,
  }));

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
  transform: async (config, path, options = {}) => {
    const base = config.siteUrl;
    // Якщо path вже абсолютний URL, використовуємо його, інакше додаємо base
    const absoluteUrl = path.startsWith("http") ? path : `${base}${path}`;
    
    return {
      loc: absoluteUrl,
      lastmod: options.lastmod || new Date().toISOString(),
      changefreq: options.changefreq || config.changefreq,
      priority: options.priority || config.priority,
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
        changefreq: "monthly",
        priority: 0.5,
      },
    ];

    const staticPaths = await Promise.all(
      staticPages.map(async (page) => {
        return await config.transform(config, page.loc, {
          changefreq: page.changefreq,
          priority: page.priority,
        });
      })
    );

    const dynamicPages = await getDynamicPages();
    const dynamicPaths = await Promise.all(
      dynamicPages.map((page) =>
        config.transform(config, page.loc, {
          lastmod: page.lastmod,
          changefreq: page.changefreq,
          priority: page.priority,
        })
      )
    );

    return [...staticPaths, ...dynamicPaths];
  },
};

// Експортуємо конфігурацію
export default sitemapConfig;
