import Hero from "@/components/blogPage/hero/Hero";
import { BLOG_POST_BY_SLUG_QUERY } from "@/lib/queries";
import { BlogPost } from "@/types/blogPost";
import { fetchSanityData } from "@/utils/fetchSanityData";

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
      <Hero article={currentArticle} />
    </>
  );
}
