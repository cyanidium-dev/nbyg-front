import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { burgerMenuVariants } from "@/utils/animationVariants";
import Container from "@/components/shared/container/Container";
import BurgerNavigation from "./BurgerNavigation";
import Image from "next/image";
import { fadeInAnimation } from "@/utils/animationVariants";
import { DynamicPage } from "@/types/dynamicPage";
import { mainNavList } from "../navigation/NavList";

interface BurgerMenuProps {
    isBurgerMenuOpened: boolean;
    setIsBurgerMenuOpened: Dispatch<SetStateAction<boolean>>;
    dynamicPagesList: DynamicPage[];
}

export default function BurgerMenu({
    isBurgerMenuOpened,
    setIsBurgerMenuOpened,
    dynamicPagesList,
}: BurgerMenuProps) {
    return (
        <AnimatePresence>
            {isBurgerMenuOpened && (
                <motion.div
                    viewport={{ once: true, amount: 0.2 }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={burgerMenuVariants}
                    className={`${
                        isBurgerMenuOpened ? "no-doc-scroll" : ""
                    } lg:hidden absolute z-50 inset-0 w-[100vw] h-[100dvh] bg-black overflow-hidden`}
                >
                    <div className="flex flex-col gap-y-16 justify-between w-[100vw] h-[calc(100dvh-88px)] mt-22 pt-[130px] pb-[42px] overflow-y-auto overflow-x-hidden">
                        <Container className="w-full">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                exit="exit"
                                viewport={{ once: true, amount: 0.1 }}
                                variants={fadeInAnimation({
                                    delay: 0.3,
                                    x: 30,
                                })}
                            >
                                <BurgerNavigation
                                    mainNavList={mainNavList}
                                    dynamicPagesList={dynamicPagesList}
                                    setIsBurgerMenuOpened={
                                        setIsBurgerMenuOpened
                                    }
                                />
                            </motion.div>
                        </Container>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
