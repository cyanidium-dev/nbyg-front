import {
  Field,
  ErrorMessage,
  useFormikContext,
  FieldInputProps,
  FieldMetaProps,
} from "formik";
import { useId } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { IMaskInput } from "react-imask";

interface Values {
  [fieldName: string]: string;
}

interface CustomizedInputProps {
  fieldName: string;
  label: string;
  labelClassName?: string;
  fieldClassName?: string;
  inputType?: string;
  placeholder?: string;
  isLabelHidden?: boolean;
  as?: string;
  mask?: string;
}

export default function CustomizedInput({
  fieldName,
  label,
  labelClassName = "",
  fieldClassName = "",
  inputType = "text",
  placeholder = "",
  isLabelHidden = false,
  as,
  mask = "+45 00 00 00 00",
}: CustomizedInputProps) {
  const { setFieldValue, setFieldTouched } = useFormikContext<Values>();
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={`relative flex flex-col w-full ${labelClassName}`}
    >
      <span
        className={twMerge(
          clsx(
            "mb-1 lg:mb-3 text-[14px] font-light leading-[121.4%]",
            isLabelHidden && "sr-only"
          )
        )}
      >
        {label}
      </span>
      <div className="relative w-full">
        <Field name={fieldName}>
          {({
            field,
            meta,
          }: {
            field: FieldInputProps<string>;
            meta: FieldMetaProps<string>;
          }) => {
            const commonProps = {
              id: inputId,
              className: twMerge(
                "relative w-full outline-none resize-none border transition duration-300 ease-out",
                fieldClassName,
                meta.touched && meta.error
                  ? "border-red-error"
                  : "border-white/60"
              ),
            };

            if (inputType === "tel") {
              return (
                <IMaskInput
                  {...field}
                  {...commonProps}
                  mask={mask}
                  lazy={false}
                  autoComplete="on"
                  type="tel"
                  onAccept={(value: string) => {
                    setFieldValue(fieldName, value || "");
                    setFieldTouched(fieldName, true, false);
                  }}
                />
              );
            }

            if (as === "textarea") {
              return (
                <textarea
                  {...field}
                  {...commonProps}
                  autoComplete="on"
                  placeholder={placeholder}
                />
              );
            }

            return (
              <input
                {...field}
                {...commonProps}
                type={inputType}
                autoComplete="on"
                placeholder={placeholder}
              />
            );
          }}
        </Field>
      </div>

      <ErrorMessage
        name={fieldName}
        component="p"
        className="absolute bottom-[-12px] left-4 text-[8px] lg:text-[10px] lg:bottom-[-14px] font-light leading-[125%] lg:leading-[120%] text-red-error truncate"
      />
    </label>
  );
}
