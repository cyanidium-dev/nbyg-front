"use client";
import { useRef, useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import Backdrop from "../../backdrop/Backdrop";
import Modal from "../../modals/Modal";

interface GalleryModalProps {
  items: Array<{
    _key?: string;
    image?: SanityImage;
  }>;
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;

  mainSwiper: React.MutableRefObject<SwiperType | null>;
  modalSwiper: React.MutableRefObject<SwiperType | null>;
}

export default function GalleryModal({
  items,
  isOpen,
  onClose,
  activeIndex,
  setActiveIndex,
  mainSwiper,
  modalSwiper,
}: GalleryModalProps) {
  const modalRef = useRef<SwiperType | null>(null);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.slideToLoop(activeIndex, 0);
    }
  }, [isOpen, activeIndex]);

  const handleClose = () => {
    const modalIndex = modalRef.current?.realIndex ?? activeIndex;
    setActiveIndex(modalIndex);
    onClose();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    if (isSyncingRef.current) return;
    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);

    if (mainSwiper.current) {
      isSyncingRef.current = true;
      mainSwiper.current.slideToLoop(realIndex);
      isSyncingRef.current = false;
    }
  };

  return (
    <>
      <Backdrop isVisible={isOpen} onClick={handleClose} />

      <Modal
        isModalShown={isOpen}
        setIsModalShown={(value) => !value && handleClose()}
        className="w-full lg:max-w-[930px] max-h-dvh flex flex-col bg-black"
      >
        <div className="relative flex items-center justify-center lg:pt-16 lg:pb-5">
          <SwiperWrapper
            loop={true}
            breakpoints={{
              0: { spaceBetween: 0, slidesPerView: 1 },
            }}
            swiperClassName="gallery-modal w-full"
            showNavigation={true}
            buttonsPosition="onSlides"
            buttonsClassName="absolute pointer-events-none z-10 top-[calc(50%-27px)] left-[calc(50%-143px)] left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] 
          lg:left-[calc(50%-492px)] w-[286px] sm:w-[481px] md:w-[571px] lg:w-[984px]"
            uniqueKey="gallery-modal"
            additionalOptions={{}}
            onSwiper={(swiper) => {
              modalRef.current = swiper;
              swiper.slideToLoop(activeIndex, 0);
            }}
            onSlideChange={handleSlideChange}
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
                      priority={idx === activeIndex}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </SwiperWrapper>
        </div>

        {/* Slider thumb */}
        <div className="pb-[43px] px-[65px]">
          <SwiperWrapper
            loop={true}
            breakpoints={{
              0: { spaceBetween: 16, slidesPerView: "auto" },
            }}
            swiperClassName="gallery-modal-thumb w-full"
            showNavigation={false}
            buttonsPosition="onSlides"
            buttonsClassName="absolute pointer-events-none z-10 top-[calc(50%-27px)] left-[calc(50%-143px)] left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] 
          lg:left-[calc(50%-492px)] w-[286px] sm:w-[481px] md:w-[571px] lg:w-[984px]"
            uniqueKey="gallery-modal"
            additionalOptions={{}}
            onSwiper={(swiper) => {
              modalRef.current = swiper;
              swiper.slideToLoop(activeIndex, 0);
            }}
            onSlideChange={handleSlideChange}
          >
            {items.map((item, idx) => {
              if (!item.image) return null;

              return (
                <SwiperSlide key={item._key || idx}>
                  <div className="relative w-full h-25 flex items-center justify-center rounded-[8px]">
                    <Image
                      src={urlForSanityImage(item.image).fit("crop").url()}
                      alt={`Gallery image ${idx + 1}`}
                      fill
                      className="object-cover rounded-[8px]"
                      sizes="120px"
                      priority={idx === activeIndex}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </SwiperWrapper>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 font-find-sans-pro text-[16px] font-light leading-[120%] pointer-events-none">
          {activeIndex + 1} / {items.length}
        </div>
      </Modal>
    </>
  );
}
