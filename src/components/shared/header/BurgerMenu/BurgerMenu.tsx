import { Dispatch, SetStateAction } from "react";
import Backdrop from "../../Backdrop/Backdrop";
import { BurgerMenuButton } from "./BurgerMenuButton";
import { BurgerMenuContent } from "./BurgerMenuContent";

interface BurgerMenuProps {
    isOpenBurgerMenu: boolean;
    setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
}

export const BurgerMenu = ({
    isOpenBurgerMenu,
    setIsOpenBurgerMenu,
}: BurgerMenuProps) => {
    const toggleHeaderMenuOpen = () => setIsOpenBurgerMenu(!isOpenBurgerMenu);
    return (
        <div>
            <BurgerMenuButton
                isHeaderMenuOpened={isOpenBurgerMenu}
                toggleHeaderMenuOpen={toggleHeaderMenuOpen}
            />
            <BurgerMenuContent
                isOpen={isOpenBurgerMenu}
                onClose={() => setIsOpenBurgerMenu(false)}
            />
            <Backdrop
                isVisible={isOpenBurgerMenu}
                onClick={() => setIsOpenBurgerMenu(false)}
                className="lg:hidden"
            />
        </div>
    );
};
