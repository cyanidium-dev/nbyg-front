import Container from "@/components/shared/container/Container";
import { BlogPost } from "@/types/blogPost";

interface ContentSectionProps {
  article: BlogPost;
}

export default function ContentSection({ article }: ContentSectionProps) {
  return (
    <section className="py-25 lg:pt-20 lg:pb-0">
      <Container></Container>
    </section>
  );
}
