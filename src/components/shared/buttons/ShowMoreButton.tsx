interface ShowMoreButtonProps {
  toggleShowMore: () => void;
  isShownMore: boolean;
}
export default function ShowMoreButton({
  toggleShowMore,
  isShownMore,
}: ShowMoreButtonProps) {
  return (
    <button
      type="button"
      aria-label="show more button"
      onClick={toggleShowMore}
      className="text-[14px] font-medium leading-[143%]"
    >
      {!isShownMore ? "Læs mere" : "Skjul"}
    </button>
  );
}
