interface BurgerMenuButtonProps {
    isHeaderMenuOpened?: boolean;
    toggleHeaderMenuOpen?: () => void;
}

export const BurgerMenuButton = ({
    isHeaderMenuOpened,
    toggleHeaderMenuOpen,
}: BurgerMenuButtonProps) => {
    return (
        <button
            aria-label="open menu button"
            type="button"
            onClick={toggleHeaderMenuOpen}
            className="lg:hidden group relative z-60 w-[24px] h-[24px] outline-none flex flex-col justify-center items-center gap-[3px]"
        >
            <div className="w-full h-[2px] bg-white"></div>
            <div className="w-full h-[2px] bg-white"></div>
            <div className="w-full h-[2px] bg-white"></div>
            <div className="w-full h-[2px] bg-white"></div>
        </button>
    );
};
