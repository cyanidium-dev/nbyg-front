import Image from "next/image";
import HeroGalleryClient from "./HeroGalleryClient";

const HERO_GALLERY_IMAGES = [
    "/images/homePage/hero/gallery-1.webp",
    "/images/homePage/hero/gallery-2.webp",
    "/images/homePage/hero/gallery-3.webp",
    "/images/homePage/hero/gallery-4.webp",
    "/images/homePage/hero/gallery-5.webp",
];

export default function HeroGallery() {
    return (
        <div className="absolute inset-0 -z-10 rounded-b-[18px] overflow-hidden">
            <div className="hidden md:block bg-[linear-gradient(360deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.464)_100%)]" />
            <div className="hidden md:block bg-[linear-gradient(0deg,rgba(0,0,0,0),rgba(0,0,0,0.3))]" />
            <div className="md:hidden absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(240.18deg,rgba(0,0,0,0)_19.24%,rgba(0,0,0,0.8)_82.96%)]" />
            <div className="md:absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(0deg,rgba(0,0,0,0)_-36.89%,rgba(0,0,0,0.464)_91.14%,rgba(0,0,0,0)_144.39%)]" />
            <HeroGalleryClient images={HERO_GALLERY_IMAGES} />
            <Image
                src="/images/homePage/hero/gallery-loader.webp"
                alt="Hero Gallery Loader"
                fill
                className="object-cover hero-gallery-static-image transition-opacity duration-700 ease-in-out z-1"
                priority
                sizes="(max-width: 768px) 100vw, 1920px"
                fetchPriority="high"
            />
        </div>
    );
}
