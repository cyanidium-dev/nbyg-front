"use client";
import Link from "next/link";
import { mainNavList } from "./NavList";
import { useEffect, useRef, useState } from "react";
import ShevronIcon from "../../icons/ShevronIcon";
import clsx from "clsx";
import NavDropdown from "./NavDropdown";
import { DynamicPage } from "@/types/dynamicPage";

interface NavigationProps {
    dynamicPagesList: DynamicPage[];
}

export default function Navigation({ dynamicPagesList }: NavigationProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isDropdownOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isClickInDropdown = dropdownRef.current?.contains(target);
            const isClickInButton = buttonRef.current?.contains(target);

            if (!isClickInDropdown && !isClickInButton) {
                setIsDropdownOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isDropdownOpen]);

    return (
        <>
            <nav className="relative hidden lg:block">
                <ul className="flex items-center space-between gap-4 lg:gap-8 font-light uppercase leading-5 text-3">
                    {mainNavList.map(item => (
                        <li key={item.href} className="relative">
                            <div className="flex items-center gap-3.5">
                                <Link
                                    href={item.href}
                                    className="hover:text-shadow-white transition duration-300 ease-in-out"
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
                                            "cursor-pointer w-5 h-5 flex items-center justify-center",
                                            isDropdownOpen
                                                ? "rotate-0"
                                                : "rotate-180",
                                            "transition duration-300 ease-in-out"
                                        )}
                                    >
                                        <ShevronIcon
                                            className={clsx(
                                                "w-5 h-5 fill-white"
                                            )}
                                        />
                                    </button>
                                )}
                            </div>
                            {isDropdownOpen && item.dropdown && (
                                <NavDropdown 
                                    dropdownRef={dropdownRef} 
                                    dynamicPagesList={dynamicPagesList} 
                                    parentHref={item.href}
                                    onLinkClick={() => setIsDropdownOpen(false)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
