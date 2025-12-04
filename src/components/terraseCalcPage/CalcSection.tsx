import TickIcon from "../shared/icons/TickIcon";
import Image from "next/image";

interface CalcSectionProps {
    id: string;
    title: string;
    description?: string;
    fields: {
        id: string;
        label: string;
        value: string;
        image: string;
    }[];
    selectedValue?: string;
    onChange: (
        id: string,
        value: string,
        label: string,
        category: string
    ) => void;
}

export const CalcSection = ({
    id,
    title,
    description,
    fields,
    selectedValue,
    onChange,
}: CalcSectionProps) => {
    return (
        <>
            {title && (
                <h2 className="text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light mb-6 before:content-[counter(calc-section)_'.'] before:mr-2">
                    {title}
                </h2>
            )}
            {description && (
                <p className="mb-6 text-lg leading-[22px]">{description}</p>
            )}
            <fieldset className="flex flex-wrap gap-x-[14px] gap-y-6 border-none p-0 m-0 lg:gap-6">
                {fields.map(field => {
                    const fieldValue = String(field.value ?? "");
                    const isSelected = selectedValue === fieldValue;
                    return (
                        <label
                            key={field.id}
                            htmlFor={field.id}
                            className={`group flex w-[157px] cursor-pointer flex-col rounded-[4.13px] transition duration-[250ms] ease-in-out hover:bg-white/10 focus:bg-white/10 lg:w-[272px] lg:rounded-lg ${
                                isSelected ? "bg-white/10" : ""
                            }`}
                        >
                            <input
                                type="radio"
                                id={field.id}
                                name={id}
                                value={fieldValue}
                                checked={isSelected}
                                onChange={() =>
                                    onChange(id, fieldValue, field.label, title)
                                }
                                className="hidden"
                            />
                            <Image
                                src={field.image}
                                alt={field.id}
                                width={157}
                                height={157}
                                className="overflow-hidden rounded-[4px] object-cover transition duration-[250ms] ease-in-out mb-1 lg:h-[272px] lg:w-[272px] lg:rounded-[12px]"
                            />
                            <div className="flex items-center gap-2 rounded-[4px] p-[6px] transition duration-[250ms] ease-in-out lg:px-2 lg:py-2">
                                <div
                                    className={`flex size-4 shrink-0 items-center justify-center rounded-md border border-white transition duration-[250ms] ease-in-out ${
                                        isSelected
                                            ? "border-none bg-gradient-brown"
                                            : "bg-transparent"
                                    }`}
                                >
                                    <TickIcon
                                        className={`h-3 w-3 text-white ${
                                            isSelected ? "block" : "hidden"
                                        }`}
                                    />
                                </div>
                                <span
                                    className={`text-[12px] leading-[125%] lg:text-[18px] ${
                                        isSelected
                                            ? "font-medium"
                                            : "font-light "
                                    }`}
                                >
                                    {field.label}
                                </span>
                            </div>
                        </label>
                    );
                })}
            </fieldset>
        </>
    );
};
