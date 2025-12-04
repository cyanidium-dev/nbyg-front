import type { PortableTextComponents } from "@portabletext/react";
import SectionTitle from "@/components/shared/titles/SectionTitle";
import Image from "next/image";
import { urlForSanityImage } from "@/utils/getUrlForSanityImage";
import Link from "next/link";
import MainButton from "@/components/shared/buttons/MainButton";
import type {
  BlogPostContentImage,
  BlogPostContentTable,
} from "@/types/blogPost";
import React from "react";

export const blogPortableTextComponents: Partial<PortableTextComponents> = {
  block: {
    // Звичайний параграф <p>
    normal: ({ children }) => (
      <p className="not-last:mb-4 leading-[150%]">{children}</p>
    ),
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
      <h3 className="not-last:mb-8 not-first:mt-14 font-find-sans-pro text-[18px] lg:text-[24px] font-light leading-[120%] uppercase">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="not-last:mb-4 not-first:mt-4 text-[14px] lg:text-[16px] font-semibold leading-[150%]">
        {children}
      </h4>
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
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
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
    table: ({ value }: { value: BlogPostContentTable }) => {
      const rows = value?.rows || [];
      if (rows.length === 0) return null;

      // Перший рядок - заголовки
      const headerRow = rows[0];
      const dataRows = rows.slice(1);
      const headerCells = headerRow?.cells || [];
      const columnCount = headerCells.length;

      return (
        <div className="w-full my-8 overflow-x-auto">
          <table
            className="w-full border-collapse"
            style={{ borderSpacing: 0 }}
          >
            <thead>
              <tr>
                {headerCells.map((cell, index) => {
                  const isLastColumn = index === headerCells.length - 1;
                  return (
                    <th
                      key={index}
                      className="text-[12px] lg:text-[16px] font-medium text-center align-middle p-5"
                      style={{
                        width: `${100 / columnCount}%`,
                        borderRight: isLastColumn
                          ? "none"
                          : "0.5px solid rgba(255, 255, 255, 0.1)",
                        borderBottom: "0.5px solid rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {cell || ""}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rowIndex) => {
                const isLastRow = rowIndex === dataRows.length - 1;
                return (
                  <tr key={rowIndex}>
                    {(row?.cells || []).map((cell, cellIndex) => {
                      const isLastColumn = cellIndex === columnCount - 1;
                      return (
                        <td
                          key={cellIndex}
                          className="text-[12px] lg:text-[16px] font-light text-center align-middle p-5"
                          style={{
                            borderRight: isLastColumn
                              ? "none"
                              : "0.5px solid rgba(255, 255, 255, 0.1)",
                            borderBottom: isLastRow
                              ? "none"
                              : "0.5px solid rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          {cell || ""}
                        </td>
                      );
                    })}
                    {/* Заповнюємо порожні комірки, якщо їх не вистачає */}
                    {Array.from({
                      length: columnCount - (row?.cells?.length || 0),
                    }).map((_, index) => {
                      const actualIndex = (row?.cells?.length || 0) + index;
                      const isLastColumn = actualIndex === columnCount - 1;
                      return (
                        <td
                          key={`empty-${index}`}
                          className="text-[12px] lg:text-[16px] font-light text-center align-middle py-2 px-3"
                          style={{
                            borderRight: isLastColumn
                              ? "none"
                              : "0.5px solid rgba(255, 255, 255, 0.1)",
                            borderBottom: isLastRow
                              ? "none"
                              : "0.5px solid rgba(255, 255, 255, 0.1)",
                          }}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    },
  },
};
