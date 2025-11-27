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
      </div>
      <div className="relative w-full h-[140px] lg:h-[148px]">
        <Image
          src={urlForSanityImage(afterImage).fit("crop").url()}
          fill
          alt="image"
          className="object-cover"
        />
      </div>
    </div>
  );
}
