"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import { useState, useRef } from "react";
import GalleryModal from "./GalleryModal";
import type { Swiper as SwiperType } from "swiper";

interface GallerySliderProps {
  items: Array<{
    _key?: string;
    image?: SanityImage;
  }>;
}

export default function GallerySlider({ items }: GallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  if (!items || !items?.length) return null;

  const handleImageClick = () => {
    // Оновлюємо activeIndex з поточного активного слайда перед відкриттям модалки
    if (swiperRef.current) {
      const realIndex = swiperRef.current.realIndex;
      setActiveIndex(realIndex);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative">
        <SwiperWrapper
          loop={true}
          centeredSlides={true}
          breakpoints={{
            360: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.94, stretch: 180 },
            },
            640: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.9, stretch: 328 },
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.9, stretch: 399 },
            },
            1024: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.91, stretch: 580 },
            },
            1280: {
              slidesPerView: "auto",
              spaceBetween: 24,
              coverflowEffect: { scale: 0.91, stretch: 508 },
            },
          }}
          additionalOptions={{
            initialSlide: activeIndex,
          }}
          swiperClassName="gallery-slider"
          showNavigation={true}
          buttonsPosition="onSlides"
          buttonsClassName="absolute z-10 top-[calc(50%-27px)] left-[calc(50%-143px)] left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] 
          lg:left-[calc(50%-390.5px)] w-[286px] sm:w-[481px] md:w-[571px] lg:w-[781px] pointer-events-none"
          showCoverflowEffect={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {items.map((item, idx) => {
            if (!item.image) return null;

            return (
              <SwiperSlide key={item._key || idx}>
                <div
                  className="relative w-full h-full rounded-[14px] cursor-pointer"
                  onClick={handleImageClick}
                >
                  <Image
                    src={urlForSanityImage(item.image).fit("crop").url()}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    className="object-cover rounded-[14px]"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>
      </div>
      <GalleryModal
        items={items}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mainSwiperRef={swiperRef}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
}
