"use client";
import Link from "next/link";
import { mainNavList } from "./NavList";
import { useEffect, useRef, useState } from "react";
import { ShevronIcon } from "../../icons/shevron";
import clsx from "clsx";
import { NavDropdown } from "./NavDropdown";

export const NavMenu = () => {
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

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
                <ul className="flex items-center space-between gap-[16px] lg:gap-[32px] font-light uppercase leading-[120%] text-[16px]">
                    {mainNavList.map(item => (
                        <li key={item.href} className="relative">
                            <div className="flex items-center gap-[14px]">
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
                                            "cursor-pointer w-[20px] h-[20px] flex items-center justify-center",
                                            isDropdownOpen
                                                ? "rotate-180"
                                                : "rotate-0",
                                            "transition-all duration-200"
                                        )}
                                    >
                                        <ShevronIcon
                                            className={clsx(
                                                "w-[20px] h-[20px] fill-white"
                                            )}
                                        />
                                    </button>
                                )}
                            </div>
                            {isDropdownOpen && item.dropdown && <NavDropdown />}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};
