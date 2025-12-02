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
  items: Array<{ _key?: string; image?: SanityImage }>;
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  mainSwiper: React.MutableRefObject<SwiperType | null>;
}

export default function GalleryModal({
  items,
  isOpen,
  onClose,
  activeIndex,
  setActiveIndex,
  mainSwiper,
}: GalleryModalProps) {
  const modalRef = useRef<SwiperType | null>(null);
  const thumbRef = useRef<SwiperType | null>(null);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.slideToLoop(activeIndex, 0);
      if (thumbRef.current) {
        thumbRef.current.slideToLoop(activeIndex, 0);
      }
    }
  }, [isOpen, activeIndex]);

  const handleClose = () => {
    const modalIndex = modalRef.current?.realIndex ?? activeIndex;
    setActiveIndex(modalIndex);
    onClose();
  };

  // Зміна головного слайду модалки
  const handleModalSlideChange = (swiper: SwiperType) => {
    if (isSyncingRef.current) return;

    const realIndex = swiper.realIndex;
    setActiveIndex(realIndex);

    isSyncingRef.current = true;

    // синхронізація mainSwiper
    if (mainSwiper.current) {
      mainSwiper.current.slideToLoop(realIndex);
    }

    // синхронізація тумби (перший видимий слайд)
    if (thumbRef.current) {
      thumbRef.current.slideToLoop(realIndex, 300);
    }

    isSyncingRef.current = false;
  };

  // Клік на тумбу: оновлюємо тільки modalRef
  const handleThumbClick = (index: number) => {
    if (!modalRef.current) return;
    modalRef.current.slideToLoop(index);
  };

  return (
    <>
      <Backdrop isVisible={isOpen} onClick={handleClose} />

      <Modal
        isModalShown={isOpen}
        setIsModalShown={(value) => !value && handleClose()}
        className="w-full lg:max-w-[930px] max-h-dvh md:max-h-[95dvh] h-full md:h-fit flex flex-col bg-black"
      >
        {/* MAIN modal slider */}
        <div className="relative flex items-center justify-center my-auto md:pt-16 md:pb-5">
          <SwiperWrapper
            loop={true}
            breakpoints={{ 0: { spaceBetween: 0, slidesPerView: 1 } }}
            swiperClassName="gallery-modal w-full"
            showNavigation={true}
            buttonsPosition="onSlides"
            buttonsClassName="absolute pointer-events-none z-10 top-[calc(50%-27px)] md:top-[calc(50%-27px+22px)] left-0 
          lg:left-[calc(50%-492px)] w-full lg:w-[984px] px-4 lg:px-0"
            uniqueKey="gallery-modal"
            additionalOptions={{}}
            onSwiper={(swiper) => {
              modalRef.current = swiper;
              swiper.slideToLoop(activeIndex, 0);
            }}
            onSlideChange={handleModalSlideChange}
          >
            {items.map((item, idx) =>
              item.image ? (
                <SwiperSlide key={item._key || idx}>
                  <div className="relative w-full h-[202px] xs:h-[302px] sm:h-[402px] xl:h-[523px] flex items-center justify-center">
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
              ) : null
            )}
          </SwiperWrapper>
        </div>

        {/* Slider thumb */}
        <div className="absolute bottom-[63px] md:static w-full pb-3 md:pb-[43px] px-14 lg:px-[65px] overflow-hidden">
          <SwiperWrapper
            loop={true}
            breakpoints={{ 0: { spaceBetween: 16, slidesPerView: "auto" } }}
            swiperClassName="gallery-modal-thumb w-full"
            showNavigation={false}
            buttonsPosition="onSlides"
            buttonsClassName="absolute pointer-events-none z-10 top-[calc(50%-27px)] left-[calc(50%-143px)] left-[calc(50%-240.5px)] md:left-[calc(50%-285.5px)] 
          lg:left-[calc(50%-492px)]"
            uniqueKey="gallery-modal-thumb"
            additionalOptions={{}}
            onSwiper={(swiper) => {
              thumbRef.current = swiper;
              swiper.slideToLoop(activeIndex, 0);
            }}
          >
            {items.map((item, idx) =>
              item.image ? (
                <SwiperSlide key={item._key || idx}>
                  <div
                    className="relative w-full h-12 xs:h-18 lg:h-25 flex items-center justify-center rounded-[8px] cursor-pointer"
                    onClick={() => handleThumbClick(idx)}
                  >
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
              ) : null
            )}
          </SwiperWrapper>
        </div>

        <div className="absolute bottom-8 md:bottom-3 left-1/2 -translate-x-1/2 z-10 font-find-sans-pro text-[16px] font-light leading-[120%] pointer-events-none">
          {activeIndex + 1} / {items.length}
        </div>
      </Modal>
    </>
  );
}
