"use client";
import { useRef } from "react";
import { SwiperSlide } from "swiper/react";
import SwiperWrapper from "../../swiper/SwiperWrapper";
import { SanityImage } from "@/types/page";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import Backdrop from "../../backdrop/Backdrop";
import Modal from "../../modals/Modal";
import { Controller } from "swiper/modules";

interface GalleryModalProps {
  items: Array<{
    _key?: string;
    image?: SanityImage;
  }>;
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  // Нові props для синхронізації контроллером
  mainSwiper: SwiperType | null;
  modalSwiper: SwiperType | null;
  setModalSwiper: (s: SwiperType | null) => void;
}

export default function GalleryModal({
  items,
  isOpen,
  onClose,
  activeIndex,
  setActiveIndex,
  mainSwiper,
  modalSwiper,
  setModalSwiper,
}: GalleryModalProps) {
  const modalMainSwiperRef = useRef<SwiperType | null>(null);

  const handleClose = () => {
    // якщо modal інстанс є — беремо його індекс, інакше використовуємо activeIndex
    const modalIndex = modalMainSwiperRef.current?.realIndex ?? activeIndex;
    setActiveIndex(modalIndex);

    // закриваємо модалку
    onClose();
  };

  const handleMainSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
    // controller синхронізує інші слайдери — додаткового slideTo не потрібно
  };

  return (
    <>
      <Backdrop isVisible={isOpen} onClick={handleClose} />
      <Modal
        isModalShown={isOpen}
        setIsModalShown={(value) => {
          if (value === false) {
            handleClose();
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
            buttonsClassName="absolute inset-0 pointer-events-none z-20"
            uniqueKey="gallery-modal"
            additionalModules={[Controller]}
            additionalOptions={{
              initialSlide: activeIndex,
              // Контролер вказує на інстанс mainSwiper
              controller: { control: mainSwiper || undefined },
            }}
            onSwiper={(swiper) => {
              // зберігаємо інстанс modal слайдера
              modalMainSwiperRef.current = swiper;
              setModalSwiper(swiper);

              swiper.slideToLoop(activeIndex, 0);
            }}
            onSlideChange={handleMainSlideChange}
          >
            {items.map((item, idx) => {
              if (!item.image) return null;

              return (
                <SwiperSlide key={item._key}>
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

        {/* Page indicator */}
        <div className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 z-30 text-white text-xs md:text-sm lg:text-base pointer-events-none">
          {activeIndex + 1} / {items.length}
        </div>
      </Modal>
    </>
  );
}
