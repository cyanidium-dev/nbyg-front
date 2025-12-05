import { BlogPostPreview } from "@/types/blogPost";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import BlogCard from "@/components/blogPage/blogList/BlogCard";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface RecommendedPostsDesktopProps {
  posts: BlogPostPreview[];
  uniqueKey: string;
}

export default function RecommendedPostsDesktop({
  posts,
  uniqueKey,
}: RecommendedPostsDesktopProps) {
  if (!posts || !posts?.length) return null;

  const recommendedPosts = posts.slice(0, 10);

  return (
    <section className="pt-20">
      <SectionTitle className="lg:text-[24px] font-light leading-[120%] mb-8">
        Læs også
      </SectionTitle>
      <ul className="flex flex-col gap-6">
        {recommendedPosts.map((post) => (
          <motion.li
            key={`${uniqueKey}-${post?.slug}`}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ y: 10, scale: 0.95, delay: 0.3 })}
          >
            <BlogCard post={post} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
