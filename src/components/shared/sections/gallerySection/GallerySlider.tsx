"use client";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import { useState, useRef } from "react";
import GalleryModal from "./GalleryModal";
import type { Swiper as SwiperType } from "swiper";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

interface GallerySliderProps {
  items: Array<{
    _key?: string;
    image?: SanityImage | {link: string, alt: string};
  }>;
  uniqueKey?: string;
}

export default function GallerySlider({
  items,
  uniqueKey,
}: GallerySliderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const mainSwiper = useRef<SwiperType | null>(null);

  if (!items || !items.length) return null;

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Перевіряємо, чи клік був на кнопку навігації або на контейнер кнопок
    const target = e.target as HTMLElement;
    const clickedButton = target.closest("button");

    // Перевіряємо, чи клік був на контейнер кнопок (який має absolute позиціонування)
    const clickedButtonsContainer = target.closest(
      '[class*="absolute"][class*="z-10"]'
    );

    if (clickedButton || clickedButtonsContainer) {
      // Не відкриваємо модалку, якщо клік був на кнопку навігації або на її контейнер
      e.stopPropagation();
      return;
    }

    const realIndex = mainSwiper.current?.realIndex ?? activeIndex;
    setActiveIndex(realIndex);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMainSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);
    // Синхронізація з модалкою відбувається через activeIndex та useEffect в GalleryModal
  };

  return (
    <>
      <motion.div
        key={`${uniqueKey}-gallery-slider`}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInAnimation({ scale: 0.85, x: -70, y: 70, delay: 0.2 })}
        className="relative"
      >
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
          additionalOptions={{}}
          swiperClassName="gallery-slider"
          showNavigation={true}
          buttonsPosition="onSlides"
          buttonsClassName="absolute z-10 top-[calc(50%-27px)] left-[calc(50%-143px)] sm:left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] 
          lg:left-[calc(50%-390.5px)] w-[286px] sm:w-[481px] md:w-[571px] lg:w-[781px] pointer-events-none"
          showCoverflowEffect={true}
          onSwiper={(swiper) => (mainSwiper.current = swiper)}
          onSlideChange={handleMainSlideChange}
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
                    src={
                      typeof item.image === "object" && "link" in item.image
                        ? item.image.link
                        : urlForSanityImage(item.image).url()
                    }
                    alt={
                      typeof item.image === "object" && "link" in item.image
                        ? item.image.alt || `Galleri billede ${idx + 1}`
                        : item.image?.alt || `Galleri billede ${idx + 1}`
                    }
                    fill
                    className="object-cover rounded-[14px]"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>
      </motion.div>

      <GalleryModal
        items={items}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        mainSwiper={mainSwiper}
      />
    </>
  );
}
