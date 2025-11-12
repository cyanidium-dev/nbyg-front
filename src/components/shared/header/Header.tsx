"use client";
import Container from "../container/Container";
import Link from "next/link";
import Image from "next/image";
//import { NavMenu } from "./navigation/Navigation";
import clsx from "clsx";
import { CONTACT_PHONE } from "@/constants/constants";
import { contactsPhoneRegex } from "@/regex/regex";
import { useScroll } from "framer-motion";
import MainButton from "../buttons/MainButton";

export default function Header() {
    const { scrollYProgress } = useScroll();
    return (
        <header className="fixed top-5 left-0 right-0 z-50">
            <Container className="w-full">
                <div
                    className={clsx(
                        "flex items-center justify-between p-2 rounded-full",
                        scrollYProgress.get() > 0.1 && "backdrop-blur-[38px]"
                    )}
                    style={
                        scrollYProgress.get() > 0.1
                            ? {
                                  boxShadow: "0px 4px 12px 0px #FFFFFF1F inset",
                              }
                            : undefined
                    }
                >
                    <Link href="/">
                        <Image
                            src="/images/header/logo.jpg"
                            alt="Logo"
                            width={48}
                            height={48}
                            sizes="(max-width: 786px) 32px, 48px"
                            className="w-12 h-12 md:w-18 md:h-18 rounded-full"
                        />
                    </Link>
                    <div className="flex items-center">
                        {/* <NavMenu /> */}
                        <MainButton
                            as="button"
                            props={{ type: "button" }}
                            className="hidden md:flex"
                            variant="outline"
                        >
                            Kontakt os
                        </MainButton>
                        <MainButton
                            as="a"
                            href={`tel:${CONTACT_PHONE}`}
                            className="flex md:hidden"
                            variant="outline"
                        >
                            {CONTACT_PHONE.replace(
                                contactsPhoneRegex,
                                "+45 $1"
                            )}
                        </MainButton>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="lg:hidden group relative z-60 w-6 h-6 outline-none flex flex-col justify-center items-center gap-1"
                            >
                                <div className="w-full h-[2px] bg-white"></div>
                                <div className="w-full h-[2px] bg-white"></div>
                                <div className="w-full h-[2px] bg-white"></div>
                                <div className="w-full h-[2px] bg-white"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
}
