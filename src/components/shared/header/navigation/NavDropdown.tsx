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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!dynamicPagesList || !dynamicPagesList.length) return null;

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
                {dynamicPagesList.map(item => (
                    <li
                        key={item.slug}
                        className="w-full py-3 first:pt-0 last:pb-0 border-b border-white/10 last:border-b-0 text-6 font-light leading-4 transition duration-300 ease-in-out"
                    >
                        <div className="flex items-center gap-[8px]">
                            <Link
                                href={`${parentHref}/${item.slug}`}
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    onLinkClick?.();
                                }}
                                className="text-white hover:text-shadow-white transition duration-300 ease-in-out"
                            >
                                {item.title}
                            </Link>
                            {item.children && item.children.length > 0 && (
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                    type="button"
                                    className={clsx(
                                        "cursor-pointer w-4 h-4 flex items-center justify-center hover:svg-shadow-white transition duration-300 ease-in-out",
                                        isDropdownOpen
                                            ? "rotate-0"
                                            : "rotate-180"
                                    )}
                                >
                                    <ShevronIcon
                                        className={clsx("w-4 h-4 fill-white")}
                                    />
                                </button>
                            )}
                        </div>
                        <AnimatePresence>
                            {isDropdownOpen &&
                                item.children &&
                                item.children.length > 0 && (
                                    <motion.ul
                                        key={`nested-${item.slug}`}
                                        variants={fadeInAnimation({
                                            x: 0,
                                            y: -10,
                                            scale: 1,
                                            duration: 0.4,
                                            exitslide: true,
                                        })}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="mt-3 pl-4 flex flex-col gap-3"
                                    >
                                        {item.children &&
                                            item.children.map(child => (
                                                <li key={child.slug}>
                                                    <Link
                                                        href={`${parentHref}/${item.slug}/${child.slug}`}
                                                        onClick={() => {
                                                            setIsDropdownOpen(
                                                                false
                                                            );
                                                            onLinkClick?.();
                                                        }}
                                                        className="text-6 font-light leading-5 hover:text-shadow-white transition duration-300 ease-in-out"
                                                    >
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            ))}
                                    </motion.ul>
                                )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
