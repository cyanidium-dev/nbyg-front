"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import TextRevealCard from "./TextRevealCard";

interface TextRevealCardsSliderProps {
  slides: Array<{
    _key?: string;
    title: string;
    description: string;
    image: SanityImage;
  }>;
}

export default function TextRevealCardsSlider({
  slides,
}: TextRevealCardsSliderProps) {
  if (!slides || !slides?.length) return null;

  return (
    <SwiperWrapper
      loop
      breakpoints={{
        0: {
          spaceBetween: 16,
          slidesPerView: "auto",
        },
        1024: {
          spaceBetween: 36,
          slidesPerView: "auto",
        },
      }}
      swiperClassName="text-reveal-cards-slider"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <TextRevealCard slide={slide} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
