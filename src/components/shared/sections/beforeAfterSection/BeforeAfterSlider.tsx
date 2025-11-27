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
        1024: {
          spaceBetween: 20.5,
          slidesPerView: "auto",
        },
      }}
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
