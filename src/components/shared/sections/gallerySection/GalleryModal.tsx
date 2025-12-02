"use client";
import { useEffect, useState, useRef } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import CloseIcon from "../../icons/CloseIcon";
import ShevronIcon from "../../icons/ShevronIcon";
import type { Swiper as SwiperType } from "swiper";

interface GalleryModalProps {
  items: Array<{
    _key?: string;
    image?: SanityImage;
  }>;
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

export default function GalleryModal({
  items,
  isOpen,
  initialIndex,
  onClose,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const thumbnailSwiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-doc-scroll");
      setCurrentIndex(initialIndex);
    } else {
      document.body.classList.remove("no-doc-scroll");
    }

    return () => {
      document.body.classList.remove("no-doc-scroll");
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !items || !items.length) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 lg:top-8 lg:right-8 z-30 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white hover:opacity-70 transition-opacity"
        aria-label="Close gallery"
      >
        <CloseIcon className="w-6 h-6 lg:w-8 lg:h-8" />
      </button>

      {/* Main image slider */}
      <div className="flex-1 relative flex items-center justify-center px-4 lg:px-20 py-20 lg:py-32">
        <SwiperWrapper
          loop={false}
          breakpoints={{
            0: {
              spaceBetween: 0,
              slidesPerView: 1,
            },
          }}
          swiperClassName="gallery-modal-main"
          showNavigation={true}
          buttonsPosition="onSlides"
          buttonsClassName="absolute inset-0 pointer-events-none"
          additionalOptions={{
            initialSlide: initialIndex,
            onSwiper: (swiper) => {
              mainSwiperRef.current = swiper;
            },
            onSlideChange: (swiper) => {
              setCurrentIndex(swiper.realIndex);
              // Sync thumbnail slider
              if (thumbnailSwiperRef.current) {
                thumbnailSwiperRef.current.slideTo(swiper.realIndex);
              }
            },
          }}
        >
          {items.map((item, idx) => {
            if (!item.image) return null;

            return (
              <SwiperSlide key={item._key || idx}>
                <div className="relative w-full h-full max-w-[1400px] mx-auto">
                  <Image
                    src={urlForSanityImage(item.image).fit("crop").url()}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 1400px"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>

        {/* Navigation buttons overlay */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 lg:px-8">
          <button
            className="custom-prev pointer-events-auto w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous image"
          >
            <ShevronIcon className="-rotate-90 text-black mr-1" />
          </button>
          <button
            className="custom-next pointer-events-auto w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center hover:opacity-70 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next image"
          >
            <ShevronIcon className="rotate-90 text-black ml-1" />
          </button>
        </div>
      </div>

      {/* Thumbnail carousel */}
      <div className="px-4 lg:px-20 pb-8 lg:pb-12">
        <SwiperWrapper
          loop={false}
          breakpoints={{
            0: {
              spaceBetween: 12,
              slidesPerView: "auto",
            },
            1024: {
              spaceBetween: 16,
              slidesPerView: "auto",
            },
          }}
          swiperClassName="gallery-modal-thumbnails"
          showNavigation={false}
          additionalOptions={{
            slidesPerView: "auto",
            freeMode: true,
            watchSlidesProgress: true,
            onSwiper: (swiper) => {
              thumbnailSwiperRef.current = swiper;
            },
            initialSlide: initialIndex,
          }}
        >
          {items.map((item, idx) => {
            if (!item.image) return null;

            return (
              <SwiperSlide
                key={item._key || idx}
                className="!w-auto cursor-pointer"
                onClick={() => {
                  if (mainSwiperRef.current) {
                    mainSwiperRef.current.slideTo(idx);
                  }
                }}
              >
                <div
                  className={`relative w-20 h-20 lg:w-24 lg:h-24 border-2 transition-colors ${
                    idx === currentIndex
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={urlForSanityImage(item.image).width(200).height(200).fit("crop").url()}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </SwiperWrapper>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 text-white text-sm lg:text-base">
        {currentIndex + 1} / {items.length}
      </div>
    </div>
  );
}

