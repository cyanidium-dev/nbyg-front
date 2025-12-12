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
  items: Array<{ _key?: string; image?: SanityImage | {link: string, alt: string} }>;
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  mainSwiper: React.MutableRefObject<SwiperType | null>;
  uniqueKey?: string;
}

export default function GalleryModal({
  items,
  isOpen,
  onClose,
  activeIndex,
  setActiveIndex,
  mainSwiper,
  uniqueKey,
}: GalleryModalProps) {
  const modalRef = useRef<SwiperType | null>(null);
  const isSyncingRef = useRef(false);

  // Відкриття модалки
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

  // Слайд змінився на головному слайдері
  const handleModalSlideChange = (swiper: SwiperType) => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;

    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);

    // Синхронізація зовнішнього mainSwiper
    if (mainSwiper.current) mainSwiper.current.slideToLoop(newIndex, 300);

    isSyncingRef.current = false;
  };

  return (
    <>
      <Backdrop isVisible={isOpen} onClick={handleClose} />

      <Modal
        isModalShown={isOpen}
        setIsModalShown={(value) => !value && handleClose()}
        className="w-full max-w-[930px] max-h-dvh md:max-h-[95dvh] h-dvh lg:h-[750px] flex flex-col bg-black"
      >
        {/* MAIN modal slider */}
        <div className="relative flex items-center justify-center h-full">
          <SwiperWrapper
            loop={true}
            breakpoints={{ 0: { spaceBetween: 0, slidesPerView: 1 } }}
            swiperClassName="gallery-modal w-full h-full"
            showNavigation={true}
            buttonsPosition="onSlides"
            buttonsClassName="absolute z-30 top-[calc(50%-27px)] md:top-[calc(50%-27px+22px)] left-0 
          lg:left-[calc(50%-492px)] w-full lg:w-[984px]"
            uniqueKey={`${uniqueKey}-gallery-modal`}
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
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="relative w-full h-full max-w-full max-h-full">
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
                        className="object-contain"
                        sizes="(max-width: 260px) 240px, 1280px"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ) : null
            )}
          </SwiperWrapper>
        </div>
      </Modal>
    </>
  );
}
