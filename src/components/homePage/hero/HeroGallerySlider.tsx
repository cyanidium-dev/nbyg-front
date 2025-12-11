"use client";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { HeroGalleryImage } from "./heroImages";

interface HeroGallerySliderProps {
    images: HeroGalleryImage[];
}

export default function HeroGallerySlider({ images }: HeroGallerySliderProps) {
    return (
        <SwiperWrapper
            loop={true}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
            }}
            swiperClassName="h-full w-full"
            showNavigation={false}
            additionalModules={[Autoplay]}
            additionalOptions={{
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                        fetchPriority="high"
                        placeholder="blur"
                        blurDataURL={image.blurDataURL}
                    />
                </SwiperSlide>
            ))}
        </SwiperWrapper>
    );
}
