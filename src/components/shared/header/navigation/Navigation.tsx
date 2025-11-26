"use client";
import Link from "next/link";
import { mainNavList } from "./NavList";
import { useEffect, useRef, useState } from "react";
import ShevronIcon from "../../icons/ShevronIcon";
import clsx from "clsx";
import NavDropdown from "./NavDropdown";
import { DynamicPage } from "@/types/dynamicPage";
import { AnimatePresence } from "framer-motion";

interface NavigationProps {
    dynamicPagesList: DynamicPage[];
}

export default function Navigation({ dynamicPagesList }: NavigationProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navItemRef = useRef<HTMLLIElement>(null);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!hoveredItem) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && hoveredItem) {
                if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                }
                setHoveredItem(null);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [hoveredItem]);

    const handleMouseEnter = (itemHref: string, hasDropdown: boolean) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
        if (hasDropdown) {
            // Open dropdown instantly for navigation menu items
            setHoveredItem(itemHref);
        }
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        closeTimeoutRef.current = setTimeout(() => {
            setHoveredItem(null);
        }, 300);
    };

    return (
        <>
            <nav className="relative hidden lg:block">
                <ul className="flex items-center space-between gap-4 lg:gap-8 font-light uppercase leading-5 text-3">
                    {mainNavList.map(item => {
                        const isHovered = hoveredItem === item.href;
                        return (
                            <li
                                key={item.href}
                                ref={navItemRef}
                                className="relative"
                                onMouseEnter={() =>
                                    handleMouseEnter(item.href, !!item.dropdown)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-2 text-shadow-white"
                                >
                                    {item.label}
                                    {item.dropdown && (
                                        <span
                                            className={clsx(
                                                "w-5 h-5 flex items-center justify-center transition duration-300 ease-in-out",
                                                isHovered
                                                    ? "rotate-0"
                                                    : "rotate-180"
                                            )}
                                        >
                                            <ShevronIcon
                                                className={clsx(
                                                    "w-5 h-5 fill-white"
                                                )}
                                            />
                                        </span>
                                    )}
                                </Link>
                                <AnimatePresence>
                                    {isHovered && item.dropdown && (
                                        <div
                                            onMouseEnter={() => {
                                                if (closeTimeoutRef.current) {
                                                    clearTimeout(
                                                        closeTimeoutRef.current
                                                    );
                                                    closeTimeoutRef.current =
                                                        null;
                                                }
                                            }}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <NavDropdown
                                                key="nav-dropdown"
                                                dropdownRef={dropdownRef}
                                                dynamicPagesList={
                                                    dynamicPagesList
                                                }
                                                parentHref={item.href}
                                                onLinkClick={() => {
                                                    if (
                                                        closeTimeoutRef.current
                                                    ) {
                                                        clearTimeout(
                                                            closeTimeoutRef.current
                                                        );
                                                    }
                                                    setHoveredItem(null);
                                                }}
                                            />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
