import Hero from "@/components/articlePage/hero/Hero";
import { BLOG_POST_BY_SLUG_QUERY } from "@/lib/queries";
import { BlogPost } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import ContentSection from "@/components/articlePage/contentSection/ContentSection";
import Container from "@/components/shared/container/Container";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";

interface ArticlePageProps {
  params: Promise<{ article: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article } = await params;

  const currentArticle = await fetchSanityData<BlogPost>(
    BLOG_POST_BY_SLUG_QUERY,
    {
      slug: article,
    }
  );

  if (!currentArticle) {
    return null;
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero article={currentArticle} />
        <Container className="lg:flex gap-8">
          <div>
            {currentArticle.content && (
              <ContentSection article={currentArticle} />
            )}
            {currentArticle.faq && (
              <FaqSection
                {...currentArticle.faq}
                uniqueKey={`blog-${currentArticle.slug}-faq`}
              />
            )}
          </div>
          <div className="hidden lg:block w-80 shrink-0"></div>
        </Container>
      </Suspense>
    </>
  );
}
