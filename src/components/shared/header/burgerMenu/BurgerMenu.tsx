import { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { burgerMenuVariants } from "@/utils/animationVariants";
import Container from "@/components/shared/container/Container";
import BurgerNavigation from "./BurgerNavigation";
import { fadeInAnimation } from "@/utils/animationVariants";
import { DynamicPage } from "@/types/dynamicPage";
import { mainNavList } from "../navigation/NavList";
import MainButton from "@/components/shared/buttons/MainButton";
import Link from "next/link";

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
          className="lg:hidden fixed z-30 inset-0 w-screen h-dvh bg-black overflow-hidden no-doc-scroll overflow-x-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden mt-[137px]">
            <Container>
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
            </Container>
          </div>

          {/* Fixed bottom button area with padding */}
          <div className="shrink-0 pb-[62px] pt-1">
            <Container>
              <Link
                href="/kontakt-os"
                onClick={() => setIsBurgerMenuOpened(false)}
              >
                <MainButton className="w-full h-12" variant="outline">
                  Kontakt os
                </MainButton>
              </Link>
            </Container>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
