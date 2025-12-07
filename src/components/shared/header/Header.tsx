"use client";
import Container from "../container/Container";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./navigation/Navigation";
import clsx from "clsx";
import { CONTACT_PHONE } from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import { useScroll } from "framer-motion";
import MainButton from "../buttons/MainButton";
import { DynamicPage } from "@/types/dynamicPage";
import { BurgerMenuButton } from "./burgerMenu/BurgerMenuButton";
import { useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import BurgerMenu from "./burgerMenu/BurgerMenu";

interface HeaderProps {
    dynamicPagesList: DynamicPage[];
}

export default function Header({ dynamicPagesList }: HeaderProps) {
    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const toggleBurgerMenuOpen = () => {
        setIsBurgerMenuOpened(!isBurgerMenuOpened);
    };

    useMotionValueEvent(scrollY, "change", latest => {
        setIsScrolled(latest > 20);
    });

    return (
        <>
            <header className="fixed top-5 left-0 right-0 z-50 py-2">
                <div
                    className={clsx(
                        "absolute inset-y-0 left-1/2 -translate-x-1/2 -z-10 rounded-full transition duration-300 ease-in-out",
                        "w-[calc(100%-0.5rem)] sm:max-w-[calc(640px-0.5rem)] md:max-w-[calc(768px-0.5rem)] lg:max-w-[calc(1024px-4rem)] xl:max-w-[calc(1280px-4rem)]",
                        (isScrolled || isBurgerMenuOpened) &&
                            "bg-white/6 shadow-[0px_4px_12px_0px_#FFFFFF1F_inset] backdrop-blur-[38px]"
                    )}
                />
                <Container className="relative flex items-center justify-between">
                    <Link href="/" className="outline-none button-shadow-white">
                        <Image
                            src="/images/header/logo.jpg"
                            alt="Logo"
                            width={48}
                            height={48}
                            sizes="(max-width: 786px) 32px, 48px"
                            className="w-12 h-12 lg:w-18 lg:h-18 rounded-full"
                        />
                    </Link>
                    <div className="flex items-center xl:gap-21 space-between gap-3 lg:gap-[16px]">
                        <Navigation dynamicPagesList={dynamicPagesList} />
                        <Link href="/kontakt-os" className="hidden lg:block">
                            <MainButton
                                className="hidden lg:flex w-[217px] h-12"
                                variant="outline"
                            >
                                Kontakt os
                            </MainButton>
                        </Link>
                        <a
                            href={`tel:${CONTACT_PHONE}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="lg:hidden"
                        >
                            <MainButton
                                className="w-[140px] h-8"
                                variant="outline"
                                textClassName="text-[12px] leading-[167%] font-normal"
                            >
                                {CONTACT_PHONE.replace(
                                    contactsPhoneRegex,
                                    "+45 $1 $2 $3 $4"
                                )}
                            </MainButton>
                        </a>
                        <BurgerMenuButton
                            isBurgerMenuOpened={isBurgerMenuOpened}
                            toggleBurgerMenuOpen={toggleBurgerMenuOpen}
                        />
                    </div>
                </Container>
            </header>
            <BurgerMenu
                isBurgerMenuOpened={isBurgerMenuOpened}
                setIsBurgerMenuOpened={setIsBurgerMenuOpened}
                dynamicPagesList={dynamicPagesList}
            />
        </>
    );
}
