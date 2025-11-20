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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!dynamicPagesList || !dynamicPagesList?.length) return null;

    const isChildrenNotEmpty = (children: DynamicPage["children"]) => {
        return children && children?.length && children?.length > 0
            ? true
            : false;
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
        >
            <ul className="flex flex-col bg-black border border-brown rounded-xl p-6 z-10 normal-case">
                {dynamicPagesList.map(item => (
                    <li
                        key={item.slug}
                        className="w-full py-3 first:pt-0 last:pb-0 border-b border-white/10 last:border-b-0 text-6 font-light leading-4"
                    >
                        <div className="flex items-center gap-[8px]">
                            <Link
                                href={`${parentHref}/${item.slug}`}
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    onLinkClick?.();
                                }}
                                className="text-white text-shadow-white w-full"
                            >
                                {item.title}
                            </Link>
                            {isChildrenNotEmpty(item.children) && (
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setIsDropdownOpen(!isDropdownOpen);
                                    }}
                                    type="button"
                                    className={clsx(
                                        "cursor-pointer w-4 h-4 flex items-center justify-center transition duration-300 ease-in-out",
                                        isDropdownOpen
                                            ? "rotate-0"
                                            : "rotate-180"
                                    )}
                                >
                                    <ShevronIcon
                                        className={clsx(
                                            "w-4 h-4 fill-white svg-shadow-white"
                                        )}
                                    />
                                </button>
                            )}
                        </div>
                        <AnimatePresence>
                            {isDropdownOpen &&
                                isChildrenNotEmpty(item.children) && (
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
                                        {item.children?.map(child => (
                                            <li key={child.slug}>
                                                <Link
                                                    href={`${parentHref}/${item.slug}/${child.slug}`}
                                                    onClick={() => {
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                        onLinkClick?.();
                                                    }}
                                                    className="text-6 font-light leading-5 text-shadow-white w-full"
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
