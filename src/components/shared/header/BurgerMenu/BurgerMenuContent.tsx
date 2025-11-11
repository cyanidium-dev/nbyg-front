interface BurgerMenuContentProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BurgerMenuContent = ({
    isOpen,
    onClose,
}: BurgerMenuContentProps) => {
    return (
        <>
            {isOpen && (
                <div>
                    <button onClick={onClose}>close</button>
                    Content
                </div>
            )}
        </>
    );
};
