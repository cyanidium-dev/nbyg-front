"use client";
import Container from "../container/Container";
import Link from "next/link";
import Image from "next/image";
import { NavMenu } from "./Navigation/Navigation";
import { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu/BurgerMenu";
import clsx from "clsx";
import { CONTACT_PHONE } from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";

export const Header = () => {
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
    const [isScrolledDown, setIsScrolledDown] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    setIsScrolledDown(currentScrollY > 10);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className="fixed top-[20px] left-0 right-0 z-50">
            <Container className="w-full">
                <div
                    className={clsx(
                        "flex items-center justify-between p-[8px] rounded-full",
                        isScrolledDown && "backdrop-blur-[38px]"
                    )}
                    style={
                        isScrolledDown
                            ? {
                                  boxShadow: "0px 4px 12px 0px #FFFFFF1F inset",
                              }
                            : undefined
                    }
                >
                    <Link href="/">
                        <Image
                            src="/images/logo.jpg"
                            alt="Logo"
                            width={72}
                            height={72}
                            sizes="(max-width: 786px) 48px, 72px"
                            className="w-[48px] h-[48px] md:w-[72px] md:h-[72px] rounded-full"
                        />
                    </Link>
                    <div className="flex items-center xl:gap-[84px] space-between gap-[16px]">
                        <NavMenu />
                        <div className="flex items-center gap-[12px]">
                            <button className="cursor-pointer hidden md:flex items-center justify-center text-[14px] leading-[20px] border border-white rounded-full w-[217px] h-[48px]">
                                Kontakt os
                            </button>
                            <a
                                href={`tel:${CONTACT_PHONE}`}
                                className="flex md:hidden items-center justify-center text-[12px] leading-[20px] border border-white rounded-full w-[140px] h-[32px]"
                            >
                                {CONTACT_PHONE.replace(
                                    contactsPhoneRegex,
                                    "+45 $1"
                                )}
                            </a>
                            <BurgerMenu
                                isOpenBurgerMenu={isOpenBurgerMenu}
                                setIsOpenBurgerMenu={setIsOpenBurgerMenu}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
};
