import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "fz2ftte6",
  dataset: "production",
  apiVersion: "2023-05-31",
  useCdn: true,
});

type PageChild = {
  slug: string;
  _updatedAt: string;
};

type Page = {
  slug: string;
  _updatedAt: string;
  children: PageChild[];
};

type BlogPost = {
  slug: string;
  _updatedAt: string;
};

type SanitySitemapData = {
  pages: Page[];
  blogPosts: BlogPost[];
};

const GET_DYNAMIC_PAGES_SLUGS = `{
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

async function fetchSanityDataServer<T>(
  query: string,
  params = {}
): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params);
  } catch (error) {
    console.warn("Sanity fetch failed:", error);
    return null;
  }
}

type SitemapUrl = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

async function getDynamicPages(): Promise<SitemapUrl[]> {
  const res = await fetchSanityDataServer<SanitySitemapData>(
    GET_DYNAMIC_PAGES_SLUGS
  );

  const pages = res?.pages || [];
  const pagesPaths: SitemapUrl[] = pages.map((page: Page) => ({
    loc: `/byggeydelser/${page.slug}`,
    lastmod: page._updatedAt || new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Додаємо підпослуги (children)
  const subservicesPaths: SitemapUrl[] = pages.flatMap((page: Page) =>
    (page.children || []).map((child: PageChild) => ({
      loc: `/byggeydelser/${page.slug}/${child.slug}`,
      lastmod: child._updatedAt || new Date().toISOString(),
      changefreq: "monthly",
      priority: 0.7,
    }))
  );

  const blogPosts = res?.blogPosts || [];
  const blogPostsPaths: SitemapUrl[] = blogPosts.map((post: BlogPost) => ({
    loc: `/blog/${post.slug}`,
    lastmod: post._updatedAt || new Date().toISOString(),
    changefreq: "monthly",
    priority: 0.7,
  }));

  return [...pagesPaths, ...subservicesPaths, ...blogPostsPaths];
}

function formatDate(date: string): string {
  return new Date(date).toISOString();
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateSitemapXml(urls: SitemapUrl[]): string {
  // Нормалізуємо SITE_URL - прибираємо trailing slash
  const baseUrl = SITE_URL.replace(/\/+$/, "");

  const urlEntries = urls
    .map((url) => {
      // Нормалізуємо loc - додаємо leading slash якщо його немає
      const normalizedLoc = url.loc.startsWith("/") ? url.loc : `/${url.loc}`;
      const fullUrl = `${baseUrl}${normalizedLoc}`;

      return `  <url>
    <loc>${escapeXml(fullUrl)}</loc>
    <lastmod>${formatDate(url.lastmod)}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function GET() {
  try {
    // Статичні сторінки
    const staticPages: SitemapUrl[] = [
      {
        loc: "/",
        lastmod: new Date().toISOString(),
        changefreq: "weekly",
        priority: 1.0,
      },
      {
        loc: "/blog",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: "/byggeydelser",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        loc: "/galleri",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: "/om-os",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        loc: "/kontakt-os",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        loc: "/tagprisberegner",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        loc: "/terrasseprisberegner",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        loc: "/cookiepolitik",
        lastmod: new Date().toISOString(),
        changefreq: "monthly",
        priority: 0.5,
      },
    ];

    // Динамічні сторінки
    const dynamicPages = await getDynamicPages();

    // Об'єднуємо всі URL
    const allUrls = [...staticPages, ...dynamicPages];

    // Генеруємо XML
    const xml = generateSitemapXml(allUrls);

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
