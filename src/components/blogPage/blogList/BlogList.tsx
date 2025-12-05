"use client";
import { useRef } from "react";
import Container from "@/components/shared/container/Container";
import { BlogPostPreview } from "@/types/blogPost";
import BlogCard from "./BlogCard";
import Pagination from "@/components/shared/pagination/Pagination";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import { useBlogArticlesPerPage } from "@/hooks/useBlogArticlesPerPage";
import Image from "next/image";

interface BlogListProps {
  blogPosts: BlogPostPreview[];
}

export default function BlogList({ blogPosts }: BlogListProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const itemsPerPage = useBlogArticlesPerPage();

  if (!blogPosts || !blogPosts?.length) return null;

  return (
    <section
      ref={sectionRef}
      className="py-25 lg:pt-[153px] lg:pb-0 scroll-mt-14"
    >
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.85, delay: 0.3 })}
          className="hidden lg:block absolute -z-20 lg:bottom-[-196px] lg:left-[294px]
            lg:w-[280px] h-auto aspect-337/421"
        >
          <Image
            src="/images/decorations/ellipsis.svg"
            width="337"
            height="421"
            alt="ellipsis"
            className="lg:w-[280px] h-auto lg:rotate-[-121.83deg]"
          />
          <div className="hidden lg:block absolute -top-20 left-0 w-[416px] h-[309px] bg-black supports-backdrop-filter:blur-[48px] will-change-transform" />
        </motion.div>
        <Pagination
          items={blogPosts}
          useItemsPerPage={() => itemsPerPage}
          scrollTargetRef={sectionRef}
          renderItems={(currentItems) => (
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-6 md:gap-[29px]">
              {currentItems.map((post) => (
                <motion.li
                  initial="hidden"
                  whileInView="visible"
                  exit="exit"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeInAnimation({ y: 20 })}
                  key={`${post?.slug}`}
                  className="sm:w-[calc(50%-12px)] md:w-[calc(50%-14.5px)] lg:w-[calc(33.33%-19.33px)] h-auto"
                >
                  <BlogCard post={post} />
                </motion.li>
              ))}
            </ul>
          )}
        />
      </Container>
    </section>
  );
}
