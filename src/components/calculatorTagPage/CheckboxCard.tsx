import Image from "next/image";
import TickIcon from "../shared/icons/TickIcon";

interface CheckboxCardProps {
  id: string;
  name: string;
  label: string;
  price: number;
  image?: {
    link: string;
    priority?: boolean;
  };
  isSelected: boolean;
  type?: "checkbox" | "radio";
  onChange: () => void;
}

export default function CheckboxCard({
  id,
  name,
  label,
  price,
  image,
  isSelected,
  type = "checkbox",
  onChange,
}: CheckboxCardProps) {
  return (
    <label
      htmlFor={id}
      className={`
                group flex flex-col h-full cursor-pointer rounded-lg 
                transition duration-250 ease-in-out
                hover:bg-white/10
                ${isSelected ? "bg-white/10" : ""}                                
            `}
    >
      <input
        type={type}
        id={id}
        name={name}
        value={price}
        checked={isSelected}
        onChange={() => onChange()}
        className="hidden"
      />
      {image && (
        <div className="relative mb-1 xl:mb-2 aspect-square w-full overflow-hidden rounded-[4px] lg:rounded-[12px]">
          <Image
            src={image.link}
            alt={id}
            fill
            className="object-cover"
            priority={image.priority}
          />
        </div>
      )}
      <div className="flex grow items-center gap-2 p-[6px] xl:px-2 min-h-[28px] lg:min-h-[43px]">
        <div
          className={`flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-white transition duration-250 ease-in-out ${
            isSelected ? "border-none bg-gradient-brown" : "bg-transparent"
          }`}
        >
          <TickIcon
            className={`h-3 w-3 text-white ${isSelected ? "block" : "hidden"}`}
          />
        </div>
        <span
          className={`text-[12px] leading-[125%] xs:text-[18px] md:text-[12px] lg:text-[18px]  ${
            isSelected ? "font-medium tracking-[-0.02rem]" : "font-light "
          }`}
        >
          {label}
        </span>
      </div>
    </label>
  );
}
