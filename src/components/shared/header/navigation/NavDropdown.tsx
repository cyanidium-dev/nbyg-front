"use client";
import Link from "next/link";
import clsx from "clsx";
import ShevronIcon from "../../icons/ShevronIcon";
import { serviceNavList, tagNavList } from "../navigation/NavList";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/utils/animationVariants";

interface NavDropdownProps {
    dropdownRef: React.RefObject<HTMLDivElement>;
}

export default function NavDropdown({ dropdownRef }: NavDropdownProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <motion.div
            ref={dropdownRef}
            variants={fadeInAnimation({
                x: 0,
                y: -10,
                scale: 0.9,
                delay: 0,
                duration: 0.3,
                opacity: 0,
            })}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full mt-5 left-4 w-[328px]"
        >
            <div className="absolute w-5 h-5 bg-brown rotate-45 -top-2.5 left-12 -z-10"></div>
            <ul className="flex flex-col bg-black border border-brown rounded-3 p-6 z-10 normal-case">
                {serviceNavList.map(item => (
                    <li
                        key={item.href}
                        className="w-full py-3 first:pt-0 last:pb-0 border-b border-white/10 last:border-b-0 text-3 font-light leading-4 transition duration-300 ease-in-out"
                    >
                        <div className="flex items-center gap-[8px]">
                            <Link
                                href={item.href}
                                className="text-white hover:text-shadow-white transition duration-300 ease-in-out"
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
                                        "cursor-pointer w-4 h-4 flex items-center justify-center",
                                        isDropdownOpen
                                            ? "rotate-0"
                                            : "rotate-180",
                                        "transition duration-300 ease-in-out"
                                    )}
                                >
                                    <ShevronIcon
                                        className={clsx("w-4 h-4 fill-white")}
                                    />
                                </button>
                            )}
                        </div>
                        {isDropdownOpen && item.dropdown && (
                            <motion.ul
                                variants={fadeInAnimation({
                                    x: 0,
                                    y: -5,
                                    scale: 1,
                                    delay: 0,
                                    duration: 0.3,
                                    opacity: 0,
                                })}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="mt-3 pl-4 flex flex-col gap-3"
                            >
                                {tagNavList.map(item => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-3 font-light leading-5 hover:text-shadow-white transition duration-300 ease-in-out"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
