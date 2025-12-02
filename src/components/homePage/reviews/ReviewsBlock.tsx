"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";
import { Review } from "./reviewsData";

interface ReviewsBlockProps {
    reviews: Review[];
}

export default function ReviewsBlock({ reviews }: ReviewsBlockProps) {
    return (
        <div className="relative">
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
            >
                {reviews.map(review => (
                    <SwiperSlide key={review.id}>
                        <ReviewsCard review={review} />
                    </SwiperSlide>
                ))}
            </SwiperWrapper>
        </div>
    );
}
