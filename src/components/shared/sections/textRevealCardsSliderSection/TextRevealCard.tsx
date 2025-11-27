"use client";

import { useState } from "react";
import { SanityImage } from "@/types/page";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import ArrowIcon from "../../icons/ArrowIcon";

interface TextRevealCardProps {
  slide: {
    _key?: string;
    title: string;
    description: string;
    image: SanityImage;
  };
}

export default function TextRevealCard({ slide }: TextRevealCardProps) {
  const { title, description, image } = slide;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative flex flex-col justify-end h-[399px] rounded-[8px]">
      <Image
        src={urlForSanityImage(image).fit("crop").url()}
        alt={title}
        fill
        className="-z-10 object-cover rounded-[8px]"
      />
      <button
        type="button"
        aria-label="show full text button"
        onClick={toggleExpand}
        className="absolute -top-3 -right-3 z-10 group flex justify-center items-center cursor-pointer size-15 rounded-full bg-white
        active:scale-95 transition duration-300 ease-in-out outline-none"
      >
        <ArrowIcon className="text-black xl:group-hover:translate-x-0.5 xl:group-hover:-translate-y-0.5 transition duration-300 ease-in-out" />
      </button>
      <div
        className={`relative flex flex-col justify-center min-h-30 px-4 py-9 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px] ${
          !isExpanded ? "max-h-30" : "max-h-full"
        } transition-[max-height] duration-500 ease-in-out `}
      >
        <div className="inset-0 overflow-hidden">
          <h3 className="font-find-sans-pro text-[20px] font-light leading-[120%] uppercase">
            {title}
          </h3>
          <p
            className={`mt-9 whitespace-pre-line text-[14px] lg:text-[16px] font-light leading-[143%] lg:leading-[125%]
             `}
          >
            {description}
          </p>
        </div>

        <div className="absolute z-10 -top-2 left-4 size-4 rounded-full bg-white" />
      </div>
    </div>
  );
}
