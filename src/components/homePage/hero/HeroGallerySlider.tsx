"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface HeroGallerySliderProps {
    images: string[];
}

export default function HeroGallerySlider({ images }: HeroGallerySliderProps) {
    return (
        <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            speed={1000}
            slidesPerView={1}
            className="h-full w-full"
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={image}
                        alt={`Hero Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
