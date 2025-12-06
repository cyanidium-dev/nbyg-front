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
import ShevronIcon from "../../icons/ShevronIcon";
import IconButton from "../../buttons/IconButton";

interface GalleryModalProps {
  items: Array<{ _key?: string; image?: SanityImage | string }>;
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

  // Відкриття модалки
  useEffect(() => {
    if (isOpen && modalRef.current && thumbRef.current) {
      modalRef.current.slideToLoop(activeIndex, 0);
      thumbRef.current.slideToLoop(activeIndex, 0);
    }
  }, [isOpen, activeIndex]);

  const handleClose = () => {
    const modalIndex = modalRef.current?.realIndex ?? activeIndex;
    setActiveIndex(modalIndex);
    onClose();
  };

  // Слайд змінився на головному слайдері
  const handleModalSlideChange = (swiper: SwiperType) => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;

    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);

    // Синхронізація зовнішнього mainSwiper
    if (mainSwiper.current) mainSwiper.current.slideToLoop(newIndex, 300);

    // Прокрутка тумби
    if (thumbRef.current) thumbRef.current.slideToLoop(newIndex, 300);

    isSyncingRef.current = false;
  };

  // Кнопки навігації тумби
  const handleThumbNav = (direction: "next" | "prev") => {
    if (!modalRef.current) return;
    const newIndex =
      direction === "next"
        ? (activeIndex + 1) % items.length
        : (activeIndex - 1 + items.length) % items.length;

    // Прокручуємо головний слайдер з анімацією
    modalRef.current.slideToLoop(newIndex, 500);
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
                      src={typeof item.image === "string" ? item.image : urlForSanityImage(item.image).fit("crop").url()}
                      alt={typeof item.image === "string" ? `Galleri billede ${idx + 1}` : item.image?.alt || `Galleri billede ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 260px) 240px, 1280px"
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
            showNavigation={false} // кнопки власні
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
                  <div className="relative w-full h-12 xs:h-18 lg:h-25 flex items-center justify-center rounded-[8px]">
                    <Image
                      src={typeof item.image === "string" ? item.image : urlForSanityImage(item.image).fit("crop").url()}
                      alt={typeof item.image === "string" ? `Galleri billede ${idx + 1}` : item.image?.alt || `Galleri billede ${idx + 1}`}
                      fill
                      className="object-cover rounded-[8px]"
                      sizes="120px"
                    />
                  </div>
                </SwiperSlide>
              ) : null
            )}
          </SwiperWrapper>

          {/* Кнопки навігації тумби */}
          <IconButton
            className="absolute left-4 lg:left-[25px] bottom-6 sm:bottom-8 md:bottom-16 lg:bottom-20 z-20 size-6"
            handleClick={() => handleThumbNav("prev")}
          >
            <ShevronIcon className="-rotate-90" />
          </IconButton>
          <IconButton
            className="absolute right-4 lg:right-[25px] bottom-6 sm:bottom-8 md:bottom-16 lg:bottom-20 z-20 size-6"
            handleClick={() => handleThumbNav("next")}
          >
            <ShevronIcon className="rotate-90" />
          </IconButton>
        </div>

        <div className="absolute bottom-8 md:bottom-3 left-1/2 -translate-x-1/2 z-10 font-find-sans-pro text-[16px] font-light leading-[120%] pointer-events-none">
          {activeIndex + 1} / {items.length}
        </div>
      </Modal>
    </>
  );
}
