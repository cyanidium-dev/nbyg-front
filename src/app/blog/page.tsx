import BlogList from "@/components/blogPage/blogList/BlogList";
import Hero from "@/components/blogPage/hero/Hero";
import { ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { BlogPostPreview } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";

export default async function BlogPage() {
  const blogPosts =
    await fetchSanityData<BlogPostPreview[]>(ALL_BLOG_POSTS_QUERY);

  console.log(blogPosts);

  return (
    <>
      <Hero />
      <BlogList blogPosts={blogPosts} />
    </>
  );
}
