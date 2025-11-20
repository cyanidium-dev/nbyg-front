import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { burgerMenuVariants } from "@/utils/animationVariants";
import Container from "@/components/shared/container/Container";
import BurgerNavigation from "./BurgerNavigation";
import { fadeInAnimation } from "@/utils/animationVariants";
import { DynamicPage } from "@/types/dynamicPage";
import { mainNavList } from "../navigation/NavList";
import MainButton from "@/components/shared/buttons/MainButton";

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
                    className="lg:hidden absolute z-40 inset-0 w-screen h-dvh bg-black overflow-hidden no-doc-scroll pt-[151px] pb-[62px] overflow-y-auto overflow-x-hidden"
                >
                    <Container className="flex flex-col gap-10 justify-between h-full pl-[25px] pr-[30px]">
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
                                setIsBurgerMenuOpened={setIsBurgerMenuOpened}
                            />
                        </motion.div>
                        <MainButton
                            className="w-full h-12 shrink-0"
                            variant="outline"
                        >
                            Kontakt os
                        </MainButton>
                    </Container>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
