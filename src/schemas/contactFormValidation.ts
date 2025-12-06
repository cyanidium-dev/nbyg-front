import { emailRegex } from "@/regex/regex";
import * as Yup from "yup";

export const contactFormValidation = Yup.object().shape({
    name: Yup.string().required("Navn er påkrævet"),
    phone: Yup.string().required("Telefonnummer er påkrævet"),
    email: Yup.string()
        .matches(
            emailRegex,
            "Ugyldigt format – tjek venligst de indtastede oplysninger."
        )
        .required("E-mailadresse er påkrævet"),
    address: Yup.string().required("Adresse er påkrævet"),
    message: Yup.string().required("Besked er påkrævet"),
});
