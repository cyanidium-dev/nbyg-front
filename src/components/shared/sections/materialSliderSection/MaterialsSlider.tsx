"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import MaterialsCard from "./MaterialsCard";

interface MaterialsSliderProps {
  slides: Array<{
    _key?: string;
    image: SanityImage;
    title: string;
    description: string;
  }>;
}

export default function MaterialsSlider({ slides }: MaterialsSliderProps) {
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
      swiperClassName="materials-slider"
      buttonsClassName="pr-8 lg:pr-30 sm:mr-[calc(100%-640px)] md:mr-[calc(100%-768px)] 
          lg:mr-[calc(100%-1024px)] xl:mr-[calc(100%-1280px)]"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <MaterialsCard slide={slide} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
