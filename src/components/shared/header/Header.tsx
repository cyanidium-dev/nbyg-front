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
import { BurgerMenuButton } from "./burgerMenu/BurderMenuButton";
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
            <header className="fixed top-7 left-0 right-0 z-50 py-2 transition duration-300 ease-in-out">
                <div
                    className={clsx(
                        "absolute left-0.5 right-0.5 lg:left-13 lg:right-13 -z-10 inset-0 rounded-full",
                        (isScrolled || isBurgerMenuOpened) &&
                            "bg-white/6 shadow-[0px_4px_12px_0px_#FFFFFF1F_inset] backdrop-blur-[38px]"
                    )}
                />
                <Container className="flex items-center justify-between">
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
                    <div className="flex items-center xl:gap-[84px] space-between gap-3 lg:gap-[16px]">
                        <Navigation dynamicPagesList={dynamicPagesList} />
                        <MainButton
                            className="hidden lg:flex w-[217px] h-12"
                            variant="outline"
                        >
                            Kontakt os
                        </MainButton>
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
                                    "+45 $1"
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
