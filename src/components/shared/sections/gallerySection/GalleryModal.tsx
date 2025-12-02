"use client";
import { useEffect, useState, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import ShevronIcon from "../../icons/ShevronIcon";
import type { Swiper as SwiperType } from "swiper";
import Backdrop from "../../backdrop/Backdrop";
import Modal from "../../modals/Modal";

interface GalleryModalProps {
  items: Array<{
    _key?: string;
    image?: SanityImage;
  }>;
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
  mainSwiperRef?: React.RefObject<SwiperType | null>;
}

export default function GalleryModal({
  items,
  isOpen,
  initialIndex,
  onClose,
  mainSwiperRef,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalMainSwiperRef = useRef<SwiperType | null>(null);
  const thumbnailSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Визначаємо початковий індекс з основного слайдера або з initialIndex
      let startIndex = initialIndex;
      if (mainSwiperRef?.current) {
        startIndex = mainSwiperRef.current.realIndex;
      }

      // Оновлюємо індекс асинхронно
      const updateTimer = setTimeout(() => {
        setCurrentIndex(startIndex);
      }, 0);

      // Оновлюємо слайдер модалки після невеликої затримки
      const slideTimer = setTimeout(() => {
        if (modalMainSwiperRef.current) {
          modalMainSwiperRef.current.slideTo(startIndex);
        }
        if (thumbnailSwiperRef.current) {
          thumbnailSwiperRef.current.slideTo(startIndex);
        }
      }, 100);

      return () => {
        clearTimeout(updateTimer);
        clearTimeout(slideTimer);
      };
    }
  }, [isOpen, initialIndex, mainSwiperRef]);

  useEffect(() => {
    // Синхронізація з основним слайдером при зміні (якщо основний слайдер змінюється ззовні)
    if (isOpen && mainSwiperRef?.current) {
      const handleMainSlideChange = () => {
        if (mainSwiperRef.current && modalMainSwiperRef.current) {
          const mainIndex = mainSwiperRef.current.realIndex;
          const modalIndex = modalMainSwiperRef.current.realIndex;
          if (modalIndex !== mainIndex) {
            modalMainSwiperRef.current.slideTo(mainIndex);
            setCurrentIndex(mainIndex);
            if (thumbnailSwiperRef.current) {
              thumbnailSwiperRef.current.slideTo(mainIndex);
            }
          }
        }
      };

      const swiper = mainSwiperRef.current;
      swiper.on("slideChange", handleMainSlideChange);

      return () => {
        swiper.off("slideChange", handleMainSlideChange);
      };
    }
  }, [isOpen, mainSwiperRef]);

  const handleClose = () => {
    onClose();
  };

  const handleMainSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    setCurrentIndex(newIndex);

    // Синхронізуємо превью
    if (thumbnailSwiperRef.current) {
      thumbnailSwiperRef.current.slideTo(newIndex);
    }

    // Синхронізуємо з основним слайдером
    if (
      mainSwiperRef?.current &&
      mainSwiperRef.current.realIndex !== newIndex
    ) {
      mainSwiperRef.current.slideTo(newIndex);
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (modalMainSwiperRef.current) {
      modalMainSwiperRef.current.slideTo(index);
    }
    // Синхронізуємо з основним слайдером
    if (mainSwiperRef?.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };

  return (
    <>
      <Backdrop isVisible={isOpen} onClick={handleClose} />
      <Modal
        isModalShown={isOpen}
        setIsModalShown={(value) => {
          if (value === false) {
            onClose();
          }
        }}
        className="w-full lg:max-w-[930px] h-full max-h-[90vh] md:max-h-[95vh] flex flex-col bg-black"
      >
        <div className="relative flex items-center justify-center lg:pt-16 lg:pb-5">
          <SwiperWrapper
            loop={true}
            breakpoints={{
              0: {
                spaceBetween: 0,
                slidesPerView: 1,
              },
            }}
            swiperClassName="gallery-modal w-full"
            showNavigation={true}
            buttonsPosition="onSlides"
            buttonsClassName="absolute z-10 top-[calc(50%-27px)] left-[calc(50%-143px)] left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] 
          lg:left-[calc(50%-492px)] w-[286px] sm:w-[481px] md:w-[571px] lg:w-[984px] pointer-events-none"
            onSwiper={(swiper) => {
              modalMainSwiperRef.current = swiper;
            }}
            additionalOptions={{
              initialSlide: currentIndex,
              onSlideChange: handleMainSlideChange,
            }}
          >
            {items.map((item, idx) => {
              if (!item.image) return null;

              return (
                <SwiperSlide key={item._key || idx}>
                  <div className="relative w-full h-[523px] flex items-center justify-center">
                    <Image
                      src={urlForSanityImage(item.image).fit("crop").url()}
                      alt={`Gallery image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 260px) 240px, 1280px"
                      priority={idx === currentIndex}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </SwiperWrapper>
        </div>

        {/* Thumbnail carousel */}
        {/* <div className="px-[10px] md:px-5 pb-3 md:pb-6 pt-2 md:pt-4 border-t border-white/20 relative">
          <SwiperWrapper
            loop={false}
            breakpoints={{
              0: {
                spaceBetween: 8,
                slidesPerView: "auto",
              },
              640: {
                spaceBetween: 12,
                slidesPerView: "auto",
              },
              1280: {
                spaceBetween: 16,
                slidesPerView: "auto",
              },
            }}
            swiperClassName="gallery-modal-thumbnails"
            showNavigation={false}
            onSwiper={(swiper) => {
              thumbnailSwiperRef.current = swiper;
            }}
            additionalOptions={{
              slidesPerView: "auto",
              freeMode: true,
              watchSlidesProgress: true,
              initialSlide: currentIndex,
            }}
          >
            {items.map((item, idx) => {
              if (!item.image) return null;

              return (
                <SwiperSlide
                  key={item._key || idx}
                  className="!w-auto cursor-pointer"
                  onClick={() => handleThumbnailClick(idx)}
                >
                  <div
                    className={`relative w-[60px] h-[60px] md:w-20 md:h-20 lg:w-24 lg:h-24 border-2 transition-colors rounded ${
                      idx === currentIndex
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={urlForSanityImage(item.image)
                        .width(200)
                        .height(200)
                        .fit("crop")
                        .url()}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 260px) 60px, 96px"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </SwiperWrapper>
        </div> */}

        {/* Page indicator */}
        <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 z-30 text-white text-xs md:text-sm lg:text-base pointer-events-none">
          {currentIndex + 1} / {items.length}
        </div>
      </Modal>
    </>
  );
}
