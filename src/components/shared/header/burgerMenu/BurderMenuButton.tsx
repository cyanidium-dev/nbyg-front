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
            className="lg:hidden group relative z-60 w-[24px] h-[24px] outline-none flex flex-col justify-center items-center gap-[3px]"
        >
            <div className="w-full h-[2px] bg-white"></div>
            <div className="w-full h-[2px] bg-white"></div>
            <div className="w-full h-[2px] bg-white"></div>
            <div className="w-full h-[2px] bg-white"></div>
        </button>
    );
};
