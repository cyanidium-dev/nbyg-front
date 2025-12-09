"use client";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";

interface HeroGallerySliderProps {
    images: string[];
    onReady?: () => void;
}

export default function HeroGallerySlider({
    images,
    onReady,
}: HeroGallerySliderProps) {
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
    const [readyCalled, setReadyCalled] = useState(false);
    const imageRefs = useRef<Map<number, HTMLImageElement>>(new Map());

    const handleImageLoad = (index: number) => {
        setLoadedImages(prev => {
            const newSet = new Set(prev);
            newSet.add(index);
            return newSet;
        });
    };

    const checkCachedImage = (
        index: number,
        imgElement: HTMLImageElement | null
    ) => {
        if (
            imgElement &&
            imgElement.complete &&
            imgElement.naturalHeight !== 0
        ) {
            handleImageLoad(index);
        }
    };

    useEffect(() => {
        if (
            !readyCalled &&
            loadedImages.size === images.length &&
            images.length > 0
        ) {
            const timer = setTimeout(() => {
                setReadyCalled(true);
                onReady?.();
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [loadedImages, readyCalled, onReady, images.length]);

    useEffect(() => {
        if (
            !readyCalled &&
            loadedImages.size < images.length &&
            images.length > 0
        ) {
            const fallbackTimer = setTimeout(() => {
                images.forEach((_, index) => {
                    const imageElement = document.querySelector(
                        `img[alt="Hero Gallery ${index + 1}"]`
                    ) as HTMLImageElement;
                    if (
                        imageElement?.complete &&
                        imageElement.naturalHeight !== 0
                    ) {
                        setLoadedImages(prev => {
                            const newSet = new Set(prev);
                            newSet.add(index);
                            return newSet;
                        });
                    }
                });
            }, 500);
            return () => clearTimeout(fallbackTimer);
        }
    }, [readyCalled, loadedImages, images]);

    return (
        <SwiperWrapper
            loop={true}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
            }}
            swiperClassName="h-full w-full"
            showNavigation={false}
            additionalModules={[Autoplay]}
            additionalOptions={{
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <Image
                        src={image}
                        alt={`Hero Gallery ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 1920px"
                        priority
                        fetchPriority="high"
                        onLoad={() => handleImageLoad(index)}
                        onLoadingComplete={result => {
                            handleImageLoad(index);
                            const imgElement = (
                                result as unknown as {
                                    currentSrc?: string;
                                    naturalWidth?: number;
                                }
                            )?.naturalWidth
                                ? (result as unknown as HTMLImageElement)
                                : null;
                            if (imgElement) {
                                imageRefs.current.set(index, imgElement);
                                checkCachedImage(index, imgElement);
                            }
                        }}
                    />
                </SwiperSlide>
            ))}
        </SwiperWrapper>
    );
}
