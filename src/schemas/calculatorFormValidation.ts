import { emailRegex } from "@/regex/regex";
import * as Yup from "yup";

export const calculatorFormValidation = Yup.object().shape({
    email: Yup.string()
        .matches(
            emailRegex,
            "Ugyldigt format – tjek venligst de indtastede oplysninger."
        )
        .required("E-mailadresse er påkrævet"),
});
