import Container from "@/components/shared/container/Container";
import { BlogPostPreview } from "@/types/blogPost";
import BlogCard from "./BlogCard";

interface BlogListProps {
  blogPosts: BlogPostPreview[];
}

export default function BlogList({ blogPosts }: BlogListProps) {
  if (!blogPosts || !blogPosts?.length) return null;

  return (
    <section className="py-25 lg:pt-[153px] lg:pb-0">
      <Container>
        <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-6 md:gap-[29px]">
          {blogPosts.map((post) => (
            <li
              key={post.slug}
              className="sm:w-[calc(50%-12px)] md:w-[calc(50%-14.5px)] lg:w-[calc(33.33%-19.33px)] h-auto"
            >
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
