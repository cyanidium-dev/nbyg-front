"use client";
import Link from "next/link";
import clsx from "clsx";
import ShevronIcon from "../../icons/ShevronIcon";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInAnimation } from "@/utils/animationVariants";
import { DynamicPage } from "@/types/dynamicPage";

interface NavDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement | null>;
    dynamicPagesList: DynamicPage[];
    parentHref: string;
    onLinkClick?: () => void;
}

export default function NavDropdown({
    dropdownRef,
    dynamicPagesList,
    parentHref,
    onLinkClick,
}: NavDropdownProps) {
    const [openedItemSlug, setOpenedItemSlug] = useState<string | null>(null);

    if (!dynamicPagesList || !dynamicPagesList?.length) return null;

    const isChildrenNotEmpty = (children: DynamicPage["children"]) => {
        return children && children?.length > 0;
    };

    const handleButtonClick = (itemSlug: string) => {
        setOpenedItemSlug(openedItemSlug === itemSlug ? null : itemSlug);
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
            className="absolute top-full mt-5 left-4 p-px w-[328px] rounded-xl bg-[linear-gradient(146.79deg,var(--color-gradient-brown-dark)_8.8%,var(--color-black)_104.55%)]"
        >
            <div className="absolute w-5 h-5 bg-brown rotate-45 -top-2.5 left-12 -z-10"></div>
            <ul className="flex flex-col bg-black rounded-xl p-6 z-10 normal-case">
                {dynamicPagesList.map((item, index) => {
                    const hasChildren = isChildrenNotEmpty(item.children);
                    const isOpened = openedItemSlug === item.slug;

                    return (
                        <li
                            key={item.slug}
                            className="w-full text-6 font-light leading-4 relative"
                        >
                            <div>
                                <div className="flex items-center w-full">
                                    <Link
                                        href={`${parentHref}/${item.slug}`}
                                        onClick={() => {
                                            setOpenedItemSlug(null);
                                            onLinkClick?.();
                                        }}
                                        className={clsx(
                                            "flex items-center gap-2 text-white text-shadow-white",
                                            index !== 0 && "pt-3",
                                            index !==
                                                dynamicPagesList.length - 1 &&
                                                "pb-3",
                                            hasChildren ? "w-1/2" : "w-full"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                    {hasChildren && (
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleButtonClick(item.slug);
                                            }}
                                            className="w-1/2 flex items-center justify-end cursor-pointer svg-shadow-white"
                                        >
                                            <ShevronIcon
                                                className={clsx(
                                                    "w-4 h-4 fill-white transition duration-300 ease-in-out",
                                                    isOpened
                                                        ? "rotate-0"
                                                        : "rotate-180"
                                                )}
                                            />
                                        </button>
                                    )}
                                </div>
                                <AnimatePresence>
                                    {isOpened && hasChildren && (
                                        <motion.ul
                                            key={`nested-${item.slug}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                            className="mb-3 flex flex-col gap-3 overflow-hidden"
                                        >
                                            {item.children?.map(child => (
                                                <li key={child.slug}>
                                                    <Link
                                                        href={`${parentHref}/${item.slug}/${child.slug}`}
                                                        onClick={() => {
                                                            setOpenedItemSlug(
                                                                null
                                                            );
                                                            onLinkClick?.();
                                                        }}
                                                        className="block text-6 text-grey font-light leading-5 text-shadow-white w-full"
                                                    >
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                            {index !== dynamicPagesList.length - 1 && (
                                <div
                                    className="absolute bottom-0 left-0 bg-linear-to-r from-grey-dark to-black
                                    h-px w-full"
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </motion.div>
    );
}
