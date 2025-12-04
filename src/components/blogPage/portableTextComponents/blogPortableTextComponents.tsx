import type { PortableTextComponents } from "@portabletext/react";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Link from "next/link";
import MainButton from "@/components/shared/buttons/MainButton";
import type { BlogPostContentImage } from "@/types/blogPost";
import React from "react";

export const blogPortableTextComponents: Partial<PortableTextComponents> = {
  block: {
    // Звичайний параграф <p>
    normal: ({ children }) => <p className="not-last:mb-4">{children}</p>,
    h2: ({ children, value }) => {
      const key = value?._key || `h2-${Math.random()}`;
      // Витягуємо текст з children для SectionTitle
      const getTextFromChildren = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return String(node);
        if (Array.isArray(node)) {
          return node.map(getTextFromChildren).join("");
        }
        if (React.isValidElement(node)) {
          const props = node.props as { children?: React.ReactNode };
          if (props?.children) {
            return getTextFromChildren(props.children);
          }
        }
        return "";
      };
      const titleText = getTextFromChildren(children) || "";

      return (
        <SectionTitle
          key={key}
          uniqueKey={key}
          className="not-last:mb-8 not-first:mt-20 text-[24px] lg:text-[32px] font-light leading-[120%]"
        >
          {titleText}
        </SectionTitle>
      );
    },
    h3: ({ children }) => (
      <h3 className="not-last:mb-8 not-first:mt-14 font-find-sans-pro text-[18px] lg:text-[24px] font-light leading-[120%] uppercase mb-4 lg:mb-6">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="space-y-2 not-last:mb-4"
        style={{ listStyle: "disc", paddingLeft: "1.5rem" }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="space-y-2 not-last:mb-4"
        style={{ listStyle: "decimal", paddingLeft: "1.5rem" }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => (
      <li className="not-last:mb-5 lg:not-last:mb-9">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const blank = value?.blank || false;

      return (
        <Link
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="inline-block min-w-[235px] mb-8"
        >
          <MainButton variant="outline" className="h-12 px-8">
            {children}
          </MainButton>
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value: BlogPostContentImage }) => {
      const imageUrl = urlForSanityImage(value).fit("crop").url();
      const alt = value?.alt || "blog image";

      return (
        <div className="relative w-full h-[120px] lg:h-[240px] rounded-[12px] overflow-hidden my-4 lg:my-6">
          <Image src={imageUrl} fill alt={alt} className="object-cover" />
        </div>
      );
    },
  },
};
