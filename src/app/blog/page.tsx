import BlogList from "@/components/blogPage/blogList/BlogList";
import Hero from "@/components/blogPage/hero/Hero";
import Loader from "@/components/shared/loader/Loader";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { BlogPostPreview } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { Suspense } from "react";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getPageMetadata } from "@/utils/getPageMetadata";
import { BLOG_PAGE_QUERY } from "@/lib/queries";
import { SchemaJson } from "@/components/shared/SchemaJson";
import { getPageSchemaJson } from "@/utils/getPageSchemaJson";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    query: BLOG_PAGE_QUERY,
    path: "/blog",
  });
}

const crumbs = [
  { label: "Hjem", href: "/" },
  {
    label: "Blog",
    href: "/blog",
  },
];

export default async function BlogPage() {
  const blogPosts =
    await fetchSanityData<BlogPostPreview[]>(ALL_BLOG_POSTS_QUERY);

  const schemaJson = await getPageSchemaJson(BLOG_PAGE_QUERY);

  return (
    <>
      <SchemaJson schemaJson={schemaJson} />
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      <Suspense fallback={<Loader />}>
        <BlogList blogPosts={blogPosts} />
      </Suspense>
    </>
  );
}
