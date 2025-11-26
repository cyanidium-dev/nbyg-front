"use client";
import { burgerMenuButtonVariants } from "@/utils/animationVariants";
import { AnimatePresence, motion } from "framer-motion";
import BurgerButtonIcon from "../../icons/BurgerButtonIcon";
import CloseIcon from "../../icons/CloseIcon";

interface BurgerMenuButtonProps {
    isBurgerMenuOpened?: boolean;
    toggleBurgerMenuOpen?: () => void;
}

export const BurgerMenuButton = ({
    isBurgerMenuOpened,
    toggleBurgerMenuOpen,
}: BurgerMenuButtonProps) => {
    return (
        <button
            aria-label="open menu button"
            type="button"
            onClick={() => {
                if (toggleBurgerMenuOpen) toggleBurgerMenuOpen();
            }}
            className="lg:hidden group relative z-60 size-6 outline-none flex flex-col justify-center items-center"
        >
            <AnimatePresence>
                {!isBurgerMenuOpened && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={burgerMenuButtonVariants}
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        <BurgerButtonIcon className="w-full h-full text-white" />
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isBurgerMenuOpened && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={burgerMenuButtonVariants}
                        className="absolute top-0 left-0 w-full h-full"
                    >
                        <CloseIcon className="w-full h-full text-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
