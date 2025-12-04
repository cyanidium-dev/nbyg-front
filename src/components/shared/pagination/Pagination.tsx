"use client";
import { useState, useEffect, ReactNode, RefObject } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ShevronIcon from "../icons/ShevronIcon";

interface PaginationProps<T> {
  items: T[];
  renderItems: (items: T[]) => ReactNode;
  useItemsPerPage: () => number;
  scrollTargetRef: RefObject<HTMLElement | null>;
  className?: string;
}

export default function Pagination<T>({
  items,
  renderItems,
  useItemsPerPage,
  scrollTargetRef,
  className = "",
}: PaginationProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(page);
  const itemsPerPage = useItemsPerPage();
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1", 10));
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    requestAnimationFrame(() => {
      scrollTargetRef.current?.scrollIntoView({
        block: "start",
      });
    });

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const getPageButtons = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3);
      if (currentPage === 3) pages.push(4);
      pages.push("...", totalPages - 1, totalPages);
    } else if (currentPage === 4) {
      pages.push(1, "...", 3, 4, 5, "...", totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 3) {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages - 1,
        totalPages
      );
    } else if (currentPage === totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages - 1,
        totalPages
      );
    }

    return pages;
  };

  const pageButtons = getPageButtons();

  return (
    <>
      <div key={currentPage} className={`${className}`}>
        {renderItems(currentItems)}
      </div>
      <div
        className={`${totalPages > 1 ? "flex" : "hidden"} justify-center items-center gap-[15px] mt-8 lg:mt-20 mx-auto`}
      >
        <button
          aria-label="left"
          className={`group enabled:cursor-pointer flex justify-center items-center size-[54px] border-[1.5px] border-white rounded-full 
            transition duration-300 ease-in-out shrink-0
          enabled:xl:hover:opacity-85 enabled:active:scale-95 enabled:focus-visible:opacity-85
          disabled:bg-transparent bg-white`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ShevronIcon className="text-black group-disabled:text-white -rotate-90 transition duration-300 ease-in-out" />
        </button>

        <div className="flex items-center gap-3">
          {pageButtons.map((item, index) =>
            item === "..." ? (
              <span
                key={`dots-${index}`}
                className="text-[14px] font-normal leading-[133%]"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => handlePageChange(Number(item))}
                className={`cursor-pointer text-[14px] font-normal leading-[133%] transition duration-300 ease-in-out
                  ${
                    currentPage === item
                      ? "bg-white text-black rounded-full size-8 flex items-center justify-center"
                      : "xl:hover:opacity-85"
                  }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <button
          aria-label="right"
          className={`group enabled:cursor-pointer flex justify-center items-center size-[54px] rounded-full border-[1.5px] border-white transition duration-300 ease-in-out
          enabled:xl:hover:opacity-85 enabled:active:scale-95 enabled:focus-visible:opacity-85 shrink-0
          disabled:bg-transparent bg-white`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ShevronIcon className="text-black group-disabled:text-white rotate-90 transition duration-300 ease-in-out" />
        </button>
      </div>
    </>
  );
}
