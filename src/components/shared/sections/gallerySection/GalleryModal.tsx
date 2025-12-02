"use client";
import { useEffect, useRef } from "react";
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
  mainSwiperRef?: React.RefObject<SwiperType | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function GalleryModal({
  items,
  isOpen,
  onClose,
  mainSwiperRef,
  activeIndex,
  setActiveIndex,
}: GalleryModalProps) {
  const modalMainSwiperRef = useRef<SwiperType | null>(null);
  const thumbnailSwiperRef = useRef<SwiperType | null>(null);
  const isSyncingRef = useRef(false); // Флаг для запобігання циклічним оновленням
  const isSyncingFromMainRef = useRef(false); // Флаг для синхронізації з основного слайдера

  // Синхронізація модалки з activeIndex при зміні ззовні (наприклад, коли основний слайдер змінюється)
  useEffect(() => {
    if (isOpen && modalMainSwiperRef.current && !isSyncingRef.current && !isSyncingFromMainRef.current) {
      const modalIndex = modalMainSwiperRef.current.realIndex;
      if (modalIndex !== activeIndex) {
        isSyncingFromMainRef.current = true;
        modalMainSwiperRef.current.slideTo(activeIndex, 0);
        if (thumbnailSwiperRef.current) {
          thumbnailSwiperRef.current.slideTo(activeIndex, 0);
        }
        setTimeout(() => {
          isSyncingFromMainRef.current = false;
        }, 150);
      }
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    // Синхронізація з основним слайдером при зміні (якщо основний слайдер змінюється ззовні)
    if (isOpen && mainSwiperRef?.current) {
      const handleMainSliderChange = () => {
        // Якщо ми вже синхронізуємо з модалки, пропускаємо
        if (isSyncingRef.current) return;

        if (mainSwiperRef.current && modalMainSwiperRef.current) {
          const mainIndex = mainSwiperRef.current.realIndex;
          const modalIndex = modalMainSwiperRef.current.realIndex;
          if (modalIndex !== mainIndex) {
            isSyncingFromMainRef.current = true;
            modalMainSwiperRef.current.slideTo(mainIndex, 0);
            setActiveIndex(mainIndex);
            if (thumbnailSwiperRef.current) {
              thumbnailSwiperRef.current.slideTo(mainIndex, 0);
            }
            // Скидаємо флаг після невеликої затримки, щоб дозволити подальші оновлення
            setTimeout(() => {
              isSyncingFromMainRef.current = false;
            }, 150);
          }
        }
      };

      const swiper = mainSwiperRef.current;
      swiper.on("slideChange", handleMainSliderChange);

      return () => {
        swiper.off("slideChange", handleMainSliderChange);
      };
    }
  }, [isOpen, mainSwiperRef, setActiveIndex]);

  const handleClose = () => {
    // Синхронізуємо основний слайдер з поточним індексом модалки перед закриттям
    if (mainSwiperRef?.current) {
      // Отримуємо актуальний індекс з модалки
      const modalIndex = modalMainSwiperRef.current?.realIndex ?? activeIndex;

      // Оновлюємо activeIndex в батьківському компоненті
      setActiveIndex(modalIndex);

      // Синхронізуємо основний слайдер
      if (mainSwiperRef.current.realIndex !== modalIndex) {
        isSyncingRef.current = true;
        mainSwiperRef.current.slideTo(modalIndex, 0);
        // Даємо час для оновлення слайдера перед закриттям модалки
        setTimeout(() => {
          isSyncingRef.current = false;
          onClose();
        }, 100);
        return;
      }
    }
    onClose();
  };

  const handleMainSlideChange = (swiper: SwiperType) => {
    // Якщо ми вже синхронізуємо з основного слайдера, пропускаємо
    if (isSyncingFromMainRef.current) return;

    const newIndex = swiper.realIndex;

    // Оновлюємо activeIndex
    setActiveIndex(newIndex);

    // Синхронізуємо превью
    if (thumbnailSwiperRef.current) {
      thumbnailSwiperRef.current.slideTo(newIndex, 0);
    }

    // Синхронізуємо з основним слайдером тільки якщо індекси різні
    if (mainSwiperRef?.current && !isSyncingRef.current) {
      const mainIndex = mainSwiperRef.current.realIndex;
      if (mainIndex !== newIndex) {
        isSyncingRef.current = true;
        mainSwiperRef.current.slideTo(newIndex, 0);
        // Скидаємо флаг після невеликої затримки, щоб дозволити синхронізацію назад
        setTimeout(() => {
          isSyncingRef.current = false;
        }, 100);
      }
    }
  };

  const handleThumbnailClick = (index: number) => {
    if (isSyncingFromMainRef.current) return;

    // Оновлюємо activeIndex
    setActiveIndex(index);

    // Переходимо до слайду в модалці
    if (modalMainSwiperRef.current) {
      modalMainSwiperRef.current.slideTo(index, 0);
    }

    // Синхронізуємо з основним слайдером
    if (mainSwiperRef?.current && !isSyncingRef.current) {
      const mainIndex = mainSwiperRef.current.realIndex;
      if (mainIndex !== index) {
        isSyncingRef.current = true;
        mainSwiperRef.current.slideTo(index, 0);
        // Скидаємо флаг після невеликої затримки
        setTimeout(() => {
          isSyncingRef.current = false;
        }, 100);
      }
    }
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
            onSwiper={(swiper) => {
              modalMainSwiperRef.current = swiper;
              // Встановлюємо правильний слайд одразу після ініціалізації
              requestAnimationFrame(() => {
                if (swiper.realIndex !== activeIndex) {
                  swiper.slideTo(activeIndex, 0);
                }
              });
            }}
            onSlideChange={handleMainSlideChange}
            additionalOptions={{
              initialSlide: activeIndex,
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
                      priority={idx === activeIndex}
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
            uniqueKey="gallery-modal-thumbnails"
            onSwiper={(swiper) => {
              thumbnailSwiperRef.current = swiper;
              // Встановлюємо правильний слайд одразу після ініціалізації
              requestAnimationFrame(() => {
                if (swiper.realIndex !== activeIndex) {
                  swiper.slideTo(activeIndex, 0);
                }
              });
            }}
            additionalOptions={{
              slidesPerView: "auto",
              freeMode: true,
              watchSlidesProgress: true,
              initialSlide: activeIndex,
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
                      idx === activeIndex
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
          {activeIndex + 1} / {items.length}
        </div>
      </Modal>
    </>
  );
}
