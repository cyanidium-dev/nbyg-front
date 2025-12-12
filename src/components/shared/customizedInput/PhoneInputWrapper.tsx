"use client";
import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import "react-phone-number-input/style.css";

type PhoneInputProps = ComponentProps<
  typeof import("react-phone-number-input").default
>;

const PhoneInputWrapper = dynamic(
  () =>
    Promise.all([
      import("react-phone-number-input"),
    ]).then(([mod]) => {
      const PhoneInput = mod.default;
      return function PhoneInputWrapper(props: PhoneInputProps) {
        return <PhoneInput {...props} />;
      };
    }),
  {
    ssr: false,
  }
);

export default PhoneInputWrapper;