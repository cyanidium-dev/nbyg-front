"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { NavItem } from "../navigation/NavList";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { DynamicPage } from "@/types/dynamicPage";
import ShevronIcon from "../../icons/ShevronIcon";
import { AnimatePresence, motion } from "framer-motion";
import BurgerNavigationDropdown from "./BurgerNavigationDropdown";
import clsx from "clsx";
import { fadeInAnimation } from "@/utils/animationVariants";

interface NavigationProps {
    className?: string;
    setIsBurgerMenuOpened?: Dispatch<SetStateAction<boolean>>;
    mainNavList: NavItem[];
    dynamicPagesList: DynamicPage[];
}

export default function Navigation({
    className,
    setIsBurgerMenuOpened,
    mainNavList,
    dynamicPagesList,
}: NavigationProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const isMainNavListNotEmpty =
        mainNavList && mainNavList.length && mainNavList.length > 0;

    return (
        <nav className={className}>
            <ul className={twMerge("flex flex-col gap-9 w-full")}>
                {isMainNavListNotEmpty &&
                    mainNavList.map(item => (
                        <li key={item.href} className="relative min-h-[39px]">
                            <Link
                                href={item.href}
                                className="uppercase text-light flex items-center gap-3.5"
                                onClick={() => setIsBurgerMenuOpened?.(false)}
                            >
                                {item.label}
                                {item.dropdown && (
                                    <button
                                        ref={buttonRef}
                                        onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDropdownOpen(
                                                isDropdownOpen ? false : true
                                            );
                                        }}
                                        type="button"
                                        className={clsx(
                                            "cursor-pointer w-5 h-5 flex items-center justify-center transition duration-300 ease-in-out",
                                            isDropdownOpen
                                                ? "rotate-0"
                                                : "rotate-180"
                                        )}
                                    >
                                        <ShevronIcon />
                                    </button>
                                )}
                            </Link>

                            <AnimatePresence>
                                {isDropdownOpen && item.dropdown && (
                                    <BurgerNavigationDropdown
                                        dropdownRef={dropdownRef}
                                        dynamicPagesList={dynamicPagesList}
                                        parentHref={item.href}
                                        onLinkClick={() => {
                                            setIsBurgerMenuOpened?.(false);
                                            setIsDropdownOpen(false);
                                        }}
                                    />
                                )}
                            </AnimatePresence>

                            <div
                                className="absolute bottom-0.5 left-0 bg-linear-to-r from-gradient-brown from-23.92% via-gradient-brown-dark via-52.62% to-black to-99.51%
                                    h-[1.5px] w-full rotate-[0.36deg]"
                            />
                        </li>
                    ))}
            </ul>
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={fadeInAnimation({
                            x: -30,
                            scale: 0.9,
                            duration: 0.3,
                        })}
                        className="absolute w-[469px] h-[512px] left-[-574px] top-[144px] bg-purple blur-[164px]"
                    />
                )}
            </AnimatePresence>
        </nav>
    );
}
