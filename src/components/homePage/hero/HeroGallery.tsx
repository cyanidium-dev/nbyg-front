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
            sizes="100vw"
            fetchPriority="high"
        />
    ),
});

export default function HeroGallery() {
    return (
        <div className="absolute inset-0 -z-10 rounded-b-[18px] overflow-hidden">
            <div className="md:hidden absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(240.18deg,rgba(0,0,0,0)_19.24%,rgba(0,0,0,0.8)_82.96%)]" />
            <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0)_-36.89%,rgba(0,0,0,0.464)_91.14%,rgba(0,0,0,0)_144.39%)]" />
            <HeroGallerySlider images={HERO_GALLERY_IMAGES} />
        </div>
    );
}
