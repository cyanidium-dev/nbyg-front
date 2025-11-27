import { SanityImage } from "@/types/page";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";

interface BeforeAfterCardProps {
  slide: {
    _key?: string;
    beforeImage: SanityImage;
    afterImage: SanityImage;
  };
}

export default function BeforeAfterCard({ slide }: BeforeAfterCardProps) {
  const { beforeImage, afterImage } = slide;

  return (
    <div className="rounded-[8px] overflow-hidden">
      <div className="relative w-full h-[140px] lg:h-[148px] mb-5 lg:mb-1">
        <Image
          src={urlForSanityImage(beforeImage).fit("crop").url()}
          fill
          alt="image"
          className="object-cover"
        />
        <div
          className="absolute left-2 bottom-3 px-3.5 py-3 font-find-sans-pro text-[16px] font-light leading-[120%] uppercase rounded-[8px]
        bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]"
        >
          før
        </div>
      </div>
      <div className="relative w-full h-[140px] lg:h-[148px]">
        <Image
          src={urlForSanityImage(afterImage).fit("crop").url()}
          fill
          alt="image"
          className="object-cover"
        />
        <div
          className="absolute left-2 bottom-3 px-3.5 py-3 font-find-sans-pro text-[16px] font-light leading-[120%] uppercase rounded-[8px]
        bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px]"
        >
          efter
        </div>
      </div>
    </div>
  );
}
