"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import BeforeAfterCard from "./BeforeAfterCard";
import { SanityImage } from "@/types/page";

interface BeforeAfterSliderProps {
  slides: Array<{
    _key?: string;
    beforeImage: SanityImage;
    afterImage: SanityImage;
  }>;
}

export default function BeforeAfterSlider({ slides }: BeforeAfterSliderProps) {
  return (
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
        1024: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      }}
      buttonsPosition="center"
      swiperClassName="before-after-slider"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <BeforeAfterCard slide={slide} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
