"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import BlogCard from "@/components/blogPage/blogList/BlogCard";
import { BlogPostPreview } from "@/types/blogPost";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface RecommendedPostsSliderProps {
  posts: BlogPostPreview[];
  uniqueKey: string;
}

export default function RecommendedPostsSlider({
  posts,
  uniqueKey,
}: RecommendedPostsSliderProps) {
  return (
    <motion.div
      key={`${uniqueKey}-before-after-slider`}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInAnimation({ y: 30, scale: 0.95, delay: 0.6 })}
    >
      <SwiperWrapper
        loop
        breakpoints={{
          0: {
            spaceBetween: 16,
            slidesPerView: "auto",
          },
          640: {
            spaceBetween: 16,
            slidesPerView: 2,
          },
        }}
        buttonsPosition="center"
        swiperClassName="recommended-posts-slider"
      >
        {posts.map((post, idx) => (
          <SwiperSlide key={idx}>
            <BlogCard post={post} />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </motion.div>
  );
}
