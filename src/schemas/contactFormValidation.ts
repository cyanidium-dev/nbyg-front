import { emailRegex, nameRegex } from "@/regex/regex";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const contactFormValidation = Yup.object().shape({
    name: Yup.string()
        .min(2, "Skal indeholde 2 til 30 tegn")
        .max(30, "Skal indeholde 2 til 30 tegn")
        .matches(
            nameRegex,
            "Tilladte bogstaver og bindestreger, apostroffer og anførselstegn"
        )
        .required("Navn er påkrævet."),
    phone: Yup.string()
        .required("Telefonnummer er påkrævet")
        .test(
            "is-valid-phone",
            "Ugyldigt telefonnummer",
            value => !value || isValidPhoneNumber(value)
        ),
    email: Yup.string()
        .matches(
            emailRegex,
            "Ugyldigt format – tjek venligst de indtastede oplysninger"
        )
        .required("E-mailadresse er påkrævet"),
    address: Yup.string(),
    message: Yup.string().max(400, "Skal indeholde 2 til 400 tegn"),
});
