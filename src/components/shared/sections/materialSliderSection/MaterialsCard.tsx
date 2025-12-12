import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import { SanityImage } from "@/types/page";

interface MaterialCardProps {
  slide: {
    _key?: string;
    image: SanityImage;
    title: string;
    description: string;
  };
}

export default function MaterialsCard({ slide }: MaterialCardProps) {
  const { title, image, description } = slide;

  return (
    <div className="flex flex-col md:flex-row-reverse md:gap-8 h-full p-[1.5px] rounded-[12px] overflow-hidden">
      <div
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        style={{
          background:
            "linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)",
          padding: "1.5px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        className="relative w-full md:w-[320px] h-60 md:h-auto md:min-h-full rounded-[8px] 
      overflow-hidden shrink-0"
      >
        <Image
          src={urlForSanityImage(image).url()}
          alt={image?.alt || title}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-4 py-8">
        <h4 className="mb-5 font-find-sans-pro text-[18px] lg:text-[24px] font-light leading-[120%] uppercase">
          {title}
        </h4>
        <p className="text-[14px] font-light leading-[120%] whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}
