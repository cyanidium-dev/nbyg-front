"use client";
import Link from "next/link";
import { mainNavList } from "../navigation/NavList";
import { useEffect, useRef, useState } from "react";
import ShevronIcon from "../../icons/ShevronIcon";
import clsx from "clsx";
import NavDropdown from "../navigation/NavDropdown";

export default function NavMenu() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
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
            <style>{`
                .nav-menu-link:hover {
                    text-shadow: 0px 2px 15px #ffffff, 0px -2px 15px #ffffff;
                }
            `}</style>
            <nav className="relative hidden lg:block">
                <ul className="flex items-center space-between gap-4 lg:gap-8 font-light uppercase leading-5 text-3">
                    {mainNavList.map(item => (
                        <li key={item.href} className="relative">
                            <div className="flex items-center gap-3.5">
                                <Link
                                    href={item.href}
                                    className="nav-menu-link transition-all duration-200"
                                >
                                    {item.label}
                                </Link>
                                {item.dropdown && (
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                        type="button"
                                        className={clsx(
                                            "cursor-pointer w-5 h-5 flex items-center justify-center",
                                            isDropdownOpen
                                                ? "rotate-0"
                                                : "rotate-180",
                                            "transition duration-200"
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
                                    dropdownRef={
                                        dropdownRef as React.RefObject<HTMLDivElement>
                                    }
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
