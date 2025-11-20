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

    const isMainNavListNotEmpty =
        mainNavList && mainNavList.length && mainNavList.length > 0;

    return (
        <nav className={className}>
            <ul className={twMerge("flex flex-col gap-7 w-full")}>
                {isMainNavListNotEmpty &&
                    mainNavList.map(item => (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className="text-shadow-white"
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
                            <AnimatePresence>
                                {isDropdownOpen && item.dropdown && (
                                    <BurgerNavigationDropdown
                                        dropdownRef={dropdownRef}
                                        dynamicPagesList={dynamicPagesList}
                                        parentHref={item.href}
                                        onLinkClick={() =>
                                            setIsDropdownOpen(false)
                                        }
                                    />
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
            </ul>
        </nav>
    );
}
