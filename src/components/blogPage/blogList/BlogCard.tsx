import { BlogPostPreview } from "@/types/blogPost";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPostPreview;
}

export default function BlogCard({ post }: BlogCardProps) {
  const { heroMobileImage, heroTitle, heroDescription, slug } = post;

  return (
    <Link
      href={`/blog/${slug}`}
      className="group relative flex flex-col rounded-[12px] overflow-hidden h-full bg-black"
    >
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
      <div className="relative w-full h-45 rounded-[8px] overflow-hidden">
        <Image
          src={urlForSanityImage(heroMobileImage).url()}
          fill
          alt={heroMobileImage?.alt || "Blog indlæg billede"}
          sizes="(max-width: 440px) 100vw, 328px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 py-6 px-4">
        <div>
          <p className="mb-6 font-find-sans-pro text-[18px] text-light leading-[120%] uppercase">
            {heroTitle}
          </p>
          <p className="mb-6 text-[14px] font-light leading-[120%] line-clamp-4">
            {heroDescription}
          </p>
        </div>
        <p className="flex gap-1.5 items-center w-fit ml-auto text-[16px] font-medium leading-[120%] text-shadow-white">
          Læs mere{" "}
          <span className="font-find-sans-pro text-[11px] text-shadow-white">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
