"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

const HERO_GALLERY_IMAGES = [
    "/images/homePage/hero/gallery-1.webp",
    "/images/homePage/hero/gallery-2.webp",
    "/images/homePage/hero/gallery-3.webp",
    "/images/homePage/hero/gallery-4.webp",
    "/images/homePage/hero/gallery-5.webp",
];

const HeroGallerySlider = dynamic(() => import("./HeroGallerySlider"), {
    ssr: false,
    loading: () => (
        <Image
            src={HERO_GALLERY_IMAGES[0]}
            alt="Hero Gallery"
            fill
            className="object-cover"
            priority
        />
    ),
});

export default function HeroGallery() {
    return (
        <div className="absolute inset-0 -z-10 rounded-b-[18px] overflow-hidden">
            <HeroGallerySlider images={HERO_GALLERY_IMAGES} />
        </div>
    );
}
