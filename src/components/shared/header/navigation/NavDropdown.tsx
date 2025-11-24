"use client";
import Link from "next/link";
import clsx from "clsx";
import ShevronIcon from "../../icons/ShevronIcon";
import { useState, useRef } from "react";
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
    const [hoveredItemSlug, setHoveredItemSlug] = useState<string | null>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    if (!dynamicPagesList || !dynamicPagesList?.length) return null;

    const isChildrenNotEmpty = (children: DynamicPage["children"]) => {
        return children && children?.length ? true : false;
    };

    const handleItemMouseEnter = (itemSlug: string, hasChildren: boolean) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (hasChildren) {
            // Add delay for dropdown items to prevent accidental opens
            hoverTimeoutRef.current = setTimeout(() => {
                setHoveredItemSlug(itemSlug);
            }, 200);
        }
    };

    const handleItemContainerMouseEnter = (itemSlug: string) => {
        // Cancel any pending close when entering the container (link or submenu)
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        // If submenu is already open, keep it open (don't cancel hover timeout)
        if (hoveredItemSlug === itemSlug) {
            return;
        }
        // Don't cancel hover timeout here - let it complete to open the submenu
    };

    const handleItemContainerMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        // Add delay before closing to allow moving between link and submenu
        closeTimeoutRef.current = setTimeout(() => {
            setHoveredItemSlug(null);
        }, 150);
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
            className="absolute top-full mt-5 left-4 w-[328px]"
        >
            <div className="absolute w-5 h-5 bg-brown rotate-45 -top-2.5 left-12 -z-10"></div>
            <ul className="flex flex-col bg-black border border-brown rounded-xl p-6 z-10 normal-case">
                {dynamicPagesList.map((item, index) => {
                    const hasChildren = isChildrenNotEmpty(item.children);
                    const isHovered = hoveredItemSlug === item.slug;

                    return (
                        <li
                            key={item.slug}
                            className="w-full border-b border-white/10 last:border-b-0 text-6 font-light leading-4"
                        >
                            <div
                                onMouseEnter={() => {
                                    handleItemMouseEnter(
                                        item.slug,
                                        hasChildren
                                    );
                                    handleItemContainerMouseEnter(item.slug);
                                }}
                                onMouseLeave={handleItemContainerMouseLeave}
                            >
                                <div className="flex items-center w-full">
                                    <Link
                                        href={`${parentHref}/${item.slug}`}
                                        onClick={() => {
                                            if (closeTimeoutRef.current) {
                                                clearTimeout(
                                                    closeTimeoutRef.current
                                                );
                                            }
                                            setHoveredItemSlug(null);
                                            onLinkClick?.();
                                        }}
                                        className={clsx(
                                            "flex items-center gap-2 text-white text-shadow-white pb-3",
                                            index !== 0 && "pt-3",
                                            hasChildren ? "w-1/2" : "w-full"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                    {hasChildren && (
                                        <button
                                            type="button"
                                            className="w-1/2 flex items-center justify-end cursor-pointer transition duration-300 ease-in-out pb-3"
                                        >
                                            <ShevronIcon
                                                className={clsx(
                                                    "w-4 h-4 fill-white svg-shadow-white transition duration-300 ease-in-out",
                                                    isHovered
                                                        ? "rotate-0"
                                                        : "rotate-180"
                                                )}
                                            />
                                        </button>
                                    )}
                                </div>
                                <AnimatePresence>
                                    {isHovered && hasChildren && (
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
                                                            if (
                                                                closeTimeoutRef.current
                                                            ) {
                                                                clearTimeout(
                                                                    closeTimeoutRef.current
                                                                );
                                                            }
                                                            setHoveredItemSlug(
                                                                null
                                                            );
                                                            onLinkClick?.();
                                                        }}
                                                        className="text-6 text-grey font-light leading-5 text-shadow-white w-full"
                                                    >
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                                </AnimatePresence>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </motion.div>
    );
}
