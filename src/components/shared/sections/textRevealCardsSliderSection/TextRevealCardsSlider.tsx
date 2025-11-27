"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import TextRevealCard from "./TextRevealCard";
import { ReactNode } from "react";

interface TextRevealCardsSliderProps {
  slides: Array<{
    _key?: string;
    title: string;
    description: string;
    image: SanityImage;
  }>;
  uniqueKey?: string;
  component?: ReactNode;
}

export default function TextRevealCardsSlider({
  slides,
  uniqueKey,
  component,
}: TextRevealCardsSliderProps) {
  if (!slides || !slides?.length) return null;

  return (
    <SwiperWrapper
      loop
      breakpoints={{
        0: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      }}
      uniqueKey={uniqueKey}
      component={component}
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
