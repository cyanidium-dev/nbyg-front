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
    return (
        <nav className={className}>
            <ul className={twMerge("flex flex-col gap-7 w-full")}>
                {mainNavList.map(item => (
                    <li key={item.href} className="relative min-h-[39px]">
                        <div className="flex  w-full">
                            <Link
                                href={item.href}
                                className={clsx(
                                    "uppercase text-[16px] text-light",
                                    item.dropdown ? "w-1/2" : "w-full"
                                )}
                                onClick={() => setIsBurgerMenuOpened?.(false)}
                            >
                                {item.label}
                            </Link>
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
                                    className="w-1/2 flex items-center justify-end cursor-pointer"
                                >
                                    <ShevronIcon
                                        className={clsx(
                                            "size-6 transition duration-300 ease-in-out",
                                            isDropdownOpen
                                                ? "rotate-0"
                                                : "rotate-180"
                                        )}
                                    />
                                </button>
                            )}
                        </div>

                        <AnimatePresence>
                            {isDropdownOpen && item.dropdown && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                    }}
                                    className="overflow-hidden mt-[18px]"
                                >
                                    <BurgerNavigationDropdown
                                        dropdownRef={dropdownRef}
                                        dynamicPagesList={dynamicPagesList}
                                        parentHref={item.href}
                                        onLinkClick={() => {
                                            setIsBurgerMenuOpened?.(false);
                                            setIsDropdownOpen(false);
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div
                            className="absolute bottom-0 left-0 bg-linear-to-r from-gradient-brown from-23.92% via-gradient-brown-dark via-52.62% to-black to-99.51%
                                    h-[1.5px] w-full rotate-[0.36deg]"
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
