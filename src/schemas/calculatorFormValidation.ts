import { emailRegex } from "@/regex/regex";
import * as Yup from "yup";

export const calculatorFormValidation = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, "Ugyldig e-mail")
        .required("E-mailadresse er påkrævet"),
});
