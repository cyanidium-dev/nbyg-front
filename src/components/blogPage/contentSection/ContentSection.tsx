import Container from "@/components/shared/container/Container";
import { BlogPost } from "@/types/blogPost";
import { PortableText } from "@portabletext/react";
import { blogPortableTextComponents } from "../portableTextComponents/blogPortableTextComponents";

interface ContentSectionProps {
  article: BlogPost;
}

export default function ContentSection({ article }: ContentSectionProps) {
  return (
    <section className="py-25 lg:pt-20 lg:pb-0">
      <div className="prose prose-lg max-w-none">
        <PortableText
          value={
            article.content as unknown as Parameters<
              typeof PortableText
            >[0]["value"]
          }
          components={blogPortableTextComponents}
        />
      </div>
    </section>
  );
}
