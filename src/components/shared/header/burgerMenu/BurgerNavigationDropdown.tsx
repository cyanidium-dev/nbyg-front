import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ShevronIcon from "../../icons/ShevronIcon";
import { DynamicPage } from "@/types/dynamicPage";
import { useState } from "react";
import { fadeInAnimation } from "@/utils/animationVariants";
import clsx from "clsx";

interface BurgerNavigationDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    dynamicPagesList: DynamicPage[];
    parentHref: string;
    onLinkClick?: () => void;
}

export default function BurgerNavigationDropdown({
    dropdownRef,
    dynamicPagesList,
    parentHref,
    onLinkClick,
}: BurgerNavigationDropdownProps) {
    const [openDropdownSlug, setOpenDropdownSlug] = useState<string | null>(
        null
    );

    if (!dynamicPagesList || !dynamicPagesList?.length) return null;

    const isChildrenNotEmpty = (children: DynamicPage["children"]) => {
        return children && children?.length ? true : false;
    };

    return (
        <motion.div
            ref={dropdownRef}
            variants={fadeInAnimation({
                x: 0,
                y: -10,
                scale: 0.9,
                duration: 0.3,
            })}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full mb-[18px]"
        >
            <ul className="flex flex-col normal-case w-full">
                {dynamicPagesList.map((item, index) => (
                    <li
                        key={item.slug}
                        className="relative w-full text-[14px] font-light leading-[121%] tracking-tight"
                    >
                        <div className="flex items-end w-full">
                            <Link
                                href={`${parentHref}/${item.slug}`}
                                onClick={onLinkClick}
                                className={clsx(
                                    "text-white pb-3",
                                    index !== 0 && "pt-4",
                                    isChildrenNotEmpty(item.children)
                                        ? "w-1/2"
                                        : "w-full"
                                )}
                            >
                                {item.title}
                            </Link>
                            {isChildrenNotEmpty(item.children) && (
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setOpenDropdownSlug(
                                            openDropdownSlug === item.slug
                                                ? null
                                                : item.slug
                                        );
                                    }}
                                    type="button"
                                    className="w-1/2 flex items-center pt-5 pb-3 justify-end cursor-pointer"
                                >
                                    <ShevronIcon
                                        className={clsx(
                                            "size-6 fill-white transition duration-300 ease-in-out",
                                            openDropdownSlug === item.slug
                                                ? "rotate-0"
                                                : "rotate-180"
                                        )}
                                    />
                                </button>
                            )}
                        </div>

                        <AnimatePresence>
                            {openDropdownSlug === item.slug &&
                                isChildrenNotEmpty(item.children) && (
                                    <motion.ul
                                        key={`nested-${item.slug}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.3,
                                            ease: "easeInOut",
                                        }}
                                        className="flex flex-col pb-1 gap-3 overflow-hidden"
                                    >
                                        {item.children?.map(child => (
                                            <li key={child.slug}>
                                                <Link
                                                    href={`${parentHref}/${item.slug}/${child.slug}`}
                                                    onClick={onLinkClick}
                                                    className="block text-grey text-[14px] font-light leading-[143%] w-full"
                                                >
                                                    {child.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                        </AnimatePresence>
                        {openDropdownSlug !== item.slug && (
                            <div
                                className="absolute bottom-0 left-0 bg-linear-to-r from-grey-dark to-black
                                    h-px w-full"
                            />
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
