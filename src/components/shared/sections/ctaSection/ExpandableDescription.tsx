"use client";

import { useState } from "react";
import ShowMoreButton from "../../buttons/ShowMoreButton";

interface ExpandableDescriptionProps {
  description: string;
  showMoreOnMobile: boolean;
}

export default function ExpandableDescription({
  description,
  showMoreOnMobile,
}: ExpandableDescriptionProps) {
  const [isShownMore, setIsShownMore] = useState(false);

  const toggleShowMore = () => setIsShownMore(!isShownMore);

  if (!showMoreOnMobile) {
    return <p className="whitespace-pre-line">{description}</p>;
  }

  return (
    <>
      <div
        className={`whitespace-pre-line overflow-hidden md:max-h-none transition-[max-height] duration-500 ease-in-out ${
          isShownMore ? "max-h-[1000px] " : "max-h-[158px]"
        }`}
      >
        <p>{description}</p>
      </div>

      <div className="md:hidden flex justify-end mt-4">
        <ShowMoreButton
          isShownMore={isShownMore}
          toggleShowMore={toggleShowMore}
        />
      </div>
    </>
  );
}
