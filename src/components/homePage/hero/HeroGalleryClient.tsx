"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const HeroGallerySlider = dynamic(() => import("./HeroGallerySlider"), {
    ssr: false,
});

interface HeroGalleryClientProps {
    images: string[];
}

export default function HeroGalleryClient({ images }: HeroGalleryClientProps) {
    const [sliderReady, setSliderReady] = useState(false);

    useEffect(() => {
        if (sliderReady) {
            const staticImage = document.querySelector(
                ".hero-gallery-static-image"
            );
            if (staticImage) {
                (staticImage as HTMLElement).style.opacity = "0";
                (staticImage as HTMLElement).style.pointerEvents = "none";
            }
        }
    }, [sliderReady]);

    return (
        <div
            className={`absolute inset-0 w-full h-full z-0 transition-opacity duration-500 ease-in-out ${
                sliderReady ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <HeroGallerySlider
                images={images}
                onReady={() => setSliderReady(true)}
            />
        </div>
    );
}
