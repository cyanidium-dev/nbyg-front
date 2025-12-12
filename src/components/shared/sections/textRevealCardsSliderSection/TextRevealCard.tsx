"use client";

import { useState } from "react";
import { SanityImage } from "@/types/page";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import ArrowIcon from "../../icons/ArrowIcon";
import Link from "next/link";

interface TextRevealCardProps {
  slide: {
    _key?: string;
    title: string;
    description: string;
    image: SanityImage | { link: string; alt: string };
    link?: string;
  };
}

export default function TextRevealCard({ slide }: TextRevealCardProps) {
  const { title, description, image, link } = slide;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="relative flex flex-col justify-end h-[399px] rounded-[8px]">
      <Image
        src={
          typeof image === "object" && "link" in image
            ? image.link
            : urlForSanityImage(image).url()
        }
        alt={
          typeof image === "object" && "link" in image
            ? image.alt || title
            : image?.alt || title
        }
        fill
        className="-z-10 object-cover rounded-[8px]"
      />
      {link ? (
        <Link
          href={link}
          aria-label="link button"
          className="absolute -top-3 -right-3 z-10 group flex justify-center items-center cursor-pointer size-15 rounded-full bg-white
        active:scale-95 transition duration-300 ease-in-out outline-none"
        >
          <ArrowIcon className="text-black xl:group-hover:translate-x-0.5 xl:group-hover:-translate-y-0.5 transition duration-300 ease-in-out" />
        </Link>
      ) : null}
      <div
        className={`relative flex flex-col justify-center min-h-30 px-4 rounded-[8px] bg-white/6 shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.12)] backdrop-blur-[38px] ${
            !isExpanded ? "max-h-30" : "max-h-full"
          } transition-[max-height, padding] duration-500 ease-in-out ${
          isExpanded ? "py-6" : "py-9"
        }`}
      >
        <div className="inset-0 overflow-hidden">
          <h3 className="flex items-center min-h-12 font-find-sans-pro text-[20px] font-light leading-[120%] uppercase">
            {title}
          </h3>
          <p
            className={`whitespace-pre-line text-[14px] lg:text-[16px] font-light leading-[143%] lg:leading-[125%]
            ${isExpanded ? "mt-6" : "mt-9"} transition-[margin] duration-500 ease-in-out
            `}
          >
            {description}
          </p>
        </div>
        <button
          type="button"
          aria-label="show full text button"
          onClick={toggleExpand}
          className={`absolute -top-4 left-4 size-[34px] flex justify-center items-center cursor-pointer rounded-full bg-black 
            transition duration-500 ease-in-out active:scale-95 xl:hover:brightness-125 focus-visible:brightness-125
            will-change-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
        >
          <ArrowIcon className="text-white -rotate-45 size-4 mr-[1px]" />
        </button>
      </div>
    </div>
  );
}
