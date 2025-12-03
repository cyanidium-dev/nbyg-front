"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";
import { Review } from "./reviewsData";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";

interface ReviewsBlockProps {
    reviews: Review[];
}

export default function ReviewsBlock({ reviews }: ReviewsBlockProps) {
    return (
        <motion.div
            variants={fadeInAnimation({ delay: 0.6, y: 30 })}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
        >
            <SwiperWrapper
                swiperClassName="reviews-block"
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                loop={true}
                buttonsPosition="onSlides"
                buttonsClassName="sm:absolute sm:top-[28%] sm:left-[-30px] sm:right-[-30px] z-20"
            >
                {reviews.map(review => (
                    <SwiperSlide key={review.id}>
                        <ReviewsCard review={review} />
                    </SwiperSlide>
                ))}
            </SwiperWrapper>
        </motion.div>
    );
}
