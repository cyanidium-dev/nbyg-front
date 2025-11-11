"use client";
import Link from "next/link";
import clsx from "clsx";
import { ShevronIcon } from "../../icons/shevron";
import { serviceNavList, tagNavList } from "./NavList";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInAnimation } from "@/utils/animationVariants";

export const NavDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    return (
        <motion.div
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
            className="absolute top-full mt-[20px] left-[16px] w-[328px]"
        >
            <div className="absolute w-[20px] h-[20px] bg-brown rotate-45 top-[-10px] left-[35px] -z-10"></div>
            <ul className="flex flex-col bg-black border border-brown rounded-[12px] p-[24px] z-10 normal-case">
                {serviceNavList.map(item => (
                    <li
                        key={item.href}
                        className="w-full py-[12px] first:pt-0 last:pb-0 border-b border-white/10 last:border-b-0 text-[16px] font-light leading-[16px] transition duration-300 ease-in-out"
                    >
                        <div className="flex items-center gap-[8px]">
                            <Link
                                href={item.href}
                                className="text-white nav-menu-link"
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
                                        "cursor-pointer w-[16px] h-[16px] flex items-center justify-center",
                                        isDropdownOpen
                                            ? "rotate-180"
                                            : "rotate-0",
                                        "transition-all duration-200"
                                    )}
                                >
                                    <ShevronIcon
                                        className={clsx(
                                            "w-[16px] h-[16px] fill-white"
                                        )}
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
                                className="mt-[12px] pl-[16px] flex flex-col gap-[12px]"
                            >
                                {tagNavList.map(item => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-[16px] font-light leading-[20px] nav-menu-link"
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
};
