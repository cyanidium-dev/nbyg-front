import Hero from "@/components/articlePage/hero/Hero";
import { BLOG_POST_BY_SLUG_QUERY, ALL_BLOG_POSTS_QUERY } from "@/lib/queries";
import { BlogPost, BlogPostPreview } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";
import FaqSection from "@/components/shared/sections/faqSection/FaqSection";
import ContentSection from "@/components/articlePage/contentSection/ContentSection";
import Container from "@/components/shared/container/Container";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import RecommendedPostsMobile from "@/components/articlePage/recommendedPosts/RecommendedPostsMobile";
import RecommendedPostsDesktop from "@/components/articlePage/recommendedPosts/RecommendedPostsDesktop";
import Breadcrumbs from "@/components/shared/breadcrumbs/Breadcrumbs";
import { Metadata } from "next";
import { getCanonicalUrl } from "@/utils/getCanonicalUrl";

interface ArticlePageProps {
  params: Promise<{ article: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { article } = await params;
  const canonicalUrl = getCanonicalUrl(`/blog/${article}`);

  return {
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article } = await params;

  const currentArticle = await fetchSanityData<BlogPost>(
    BLOG_POST_BY_SLUG_QUERY,
    {
      slug: article,
    }
  );

  const blogPosts =
    await fetchSanityData<BlogPostPreview[]>(ALL_BLOG_POSTS_QUERY);

  if (!currentArticle) {
    return null;
  }

  const { heroTitle, slug } = currentArticle;

  const crumbs = [
    { label: "Hjem", href: "/" },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: heroTitle,
      href: `/blog/${slug}`,
    },
  ];

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero article={currentArticle} />
        <Breadcrumbs crumbs={crumbs} />
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
          <div className="hidden lg:block w-80 shrink-0">
            <RecommendedPostsDesktop
              posts={blogPosts}
              uniqueKey={`blog-${currentArticle.slug}-recommended-posts-mobile`}
            />
          </div>
        </Container>
        <div className="lg:hidden">
          <RecommendedPostsMobile
            posts={blogPosts}
            uniqueKey={`blog-${currentArticle.slug}-recommended-posts-mobile`}
          />
        </div>
      </Suspense>
    </>
  );
}
