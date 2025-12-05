import Container from "@/components/shared/container/Container";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import RecommendedPostsSlider from "./RecommendedPostsSlider";
import { BlogPostPreview } from "@/types/blogPost";

interface RecommendedPostsMobileProps {
  posts: BlogPostPreview[];
  uniqueKey: string;
}

export default function RecommendedPostsMobile({
  posts,
  uniqueKey,
}: RecommendedPostsMobileProps) {
  if (!posts || !posts?.length) return null;

  return (
    <section className="py-25">
      <Container>
        <SectionTitle className="mb-8">Læs også</SectionTitle>
        <RecommendedPostsSlider posts={posts} uniqueKey={uniqueKey} />
      </Container>
    </section>
  );
}
