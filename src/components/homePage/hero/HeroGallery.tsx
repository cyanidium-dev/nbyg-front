"use client";
import dynamic from "next/dynamic";
import { HERO_GALLERY_IMAGES } from "./heroImages";

const HeroGallerySlider = dynamic(() => import("./HeroGallerySlider"), {
    ssr: false,
});

export default function HeroGallery() {
    return (
        <div className="absolute inset-0 -z-10 rounded-b-[18px] overflow-hidden">
            <div
                className="absolute inset-0 md:hidden pointer-events-none z-10"
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0) -36.89%, rgba(0, 0, 0, 0.464) 91.14%, rgba(0, 0, 0, 0) 144.39%), linear-gradient(240.18deg, rgba(0, 0, 0, 0) 19.24%, rgba(0, 0, 0, 0.8) 82.96%)`,
                }}
            />

            <div
                className="absolute inset-0 hidden md:block pointer-events-none z-10"
                style={{
                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), linear-gradient(360deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.464) 100%)`,
                }}
            />
            <HeroGallerySlider images={HERO_GALLERY_IMAGES} />
        </div>
    );
}
