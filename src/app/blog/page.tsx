import BlogList from "@/components/blogPage/blogList/BlogList";
import Hero from "@/components/blogPage/hero/Hero";
import Loader from "@/components/shared/loader/Loader";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { BlogPostPreview } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { Suspense } from "react";

export default async function BlogPage() {
  const blogPosts =
    await fetchSanityData<BlogPostPreview[]>(ALL_BLOG_POSTS_QUERY);

  return (
    <>
      <Hero />
      <Suspense fallback={<Loader />}>
        <BlogList blogPosts={blogPosts} />
      </Suspense>
    </>
  );
}
