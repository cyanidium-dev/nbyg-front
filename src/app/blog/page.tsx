import BlogList from "@/components/blogPage/blogList/BlogList";
import Hero from "@/components/blogPage/hero/Hero";
import Loader from "@/components/shared/loader/Loader";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { BlogPostPreview } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { Suspense } from "react";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";

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

  return (
    <>
      <Hero />
      <Breadcrumbs crumbs={crumbs} />
      <Suspense fallback={<Loader />}>
        <BlogList blogPosts={blogPosts} />
      </Suspense>
    </>
  );
}
