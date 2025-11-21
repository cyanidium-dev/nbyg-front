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

    useEffect(() => {
        if (!hoveredItem) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && hoveredItem) {
                setHoveredItem(null);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [hoveredItem]);

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
                                onMouseEnter={() => {
                                    if (item.dropdown) {
                                        setHoveredItem(item.href);
                                    }
                                }}
                                onMouseLeave={() => {
                                    setHoveredItem(null);
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-[8px] text-shadow-white"
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
                                                    "w-5 h-5 fill-white svg-shadow-white"
                                                )}
                                            />
                                        </span>
                                    )}
                                </Link>
                                <AnimatePresence>
                                    {isHovered && item.dropdown && (
                                        <NavDropdown
                                            key="nav-dropdown"
                                            dropdownRef={dropdownRef}
                                            dynamicPagesList={
                                                dynamicPagesList
                                            }
                                            parentHref={item.href}
                                            onLinkClick={() =>
                                                setHoveredItem(null)
                                            }
                                        />
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
