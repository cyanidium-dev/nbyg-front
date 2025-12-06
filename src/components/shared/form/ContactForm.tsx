"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import CustomizedInput from "../customizedInput/CustomizedInput";
import { createPortal } from "react-dom";
import Backdrop from "../backdrop/Backdrop";
import Notification from "../notification/Notification";
import axios from "axios";
import { contactFormValidation } from "@/schemas/contactFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import MainButton from "../buttons/MainButton";

interface ContactFormValues {
    name: string;
    phone: string;
    email: string;
    address: string;
    message: string;
}

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isNotificationShown, setIsNotificationShown] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        (async () => {
            setIsMounted(true);
        })();
        return () => setIsMounted(false);
    }, []);

    const initialValues: ContactFormValues = {
        name: "",
        phone: "",
        email: "",
        address: "",
        message: "",
    };

    const submitForm = async (
        values: ContactFormValues,
        formikHelpers: FormikHelpers<ContactFormValues>
    ) => {
        console.log(values);
        const { resetForm } = formikHelpers;
        try {
            setIsError(false);
            setIsLoading(true);

            const response = await axios({
                method: "POST",
                url: "/api/send-email",
                data: JSON.stringify({
                    source: "Kontakt os",
                    name: values.name,
                    phone: values.phone,
                    email: values.email,
                    address: values.address,
                    message: values.message,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data.html) {
                console.log("Email HTML:", response.data.html);
            }

            resetForm();
            setIsNotificationShown(true);
        } catch (error) {
            setIsError(true);
            setIsNotificationShown(true);
            return error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                validationSchema={contactFormValidation}
            >
                {({ dirty, isValid }) => (
                    <Form>
                        <div className="flex flex-col gap-5 mb-6">
                            <CustomizedInput
                                fieldName="name"
                                label="Dit navn"
                                placeholder="Dit navn"
                                isLabelHidden={true}
                                fieldClassName="p-4 h-[49px] rounded-full text-[14px] leading-[121.4%] font-light placeholder:text-white/60"
                            />
                            <CustomizedInput
                                fieldName="phone"
                                label="Telefonnummer"
                                placeholder="Telefonnummer"
                                inputType="tel"
                                isLabelHidden={true}
                                fieldClassName="px-6 h-[49px] rounded-full text-[14px] leading-[121.4%] font-light placeholder:text-white/60"
                            />
                            <CustomizedInput
                                fieldName="email"
                                label="E-mail"
                                placeholder="E-mail"
                                isLabelHidden={true}
                                fieldClassName="p-4 h-[49px] rounded-full text-[14px] leading-[121.4%] font-light placeholder:text-white/60"
                            />
                            <CustomizedInput
                                fieldName="address"
                                label="Adresse/By/Postnr."
                                placeholder="Adresse/By/Postnr."
                                isLabelHidden={true}
                                fieldClassName="p-4 h-[49px] rounded-full text-[14px] leading-[121.4%] font-light placeholder:text-white/60"
                            />
                            <CustomizedInput
                                fieldName="message"
                                label="Besked"
                                placeholder="Besked"
                                as="textarea"
                                isLabelHidden={true}
                                labelClassName="h-[147px] md:h-[120px]"
                                fieldClassName="p-4 rounded-[24px] h-[147px] md:h-[120px] text-[14px] leading-[121.4%] font-light placeholder:text-white/60"
                            />
                        </div>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={fadeInAnimation({
                                scale: 0.9,
                                y: 20,
                                delay: 0.5,
                            })}
                        >
                            <MainButton
                                type="submit"
                                disabled={!(dirty && isValid) || isLoading}
                                isLoading={isLoading}
                                loadingText="Sender..."
                                className="w-full h-[48px]"
                            >
                                Send besked
                            </MainButton>
                        </motion.div>
                    </Form>
                )}
            </Formik>
            {isMounted &&
                createPortal(
                    <>
                        <Backdrop
                            isVisible={isNotificationShown}
                            onClick={() => {
                                setIsNotificationShown(false);
                            }}
                        />
                        <Notification
                            title={
                                isError
                                    ? "Noget gik galt"
                                    : "Tak for din henvendelse!"
                            }
                            description={
                                isError
                                    ? "Der opstod en fejl, og din besked blev ikke sendt. Kontroller venligst, at alle felter er udfyldt korrekt, og prøv igen."
                                    : "Vi har modtaget din besked og kontakter dig snarest muligt. Tak fordi du valgte Nbyg."
                            }
                            buttonText="Luk"
                            isNotificationShown={isNotificationShown}
                            setIsNotificationShown={setIsNotificationShown}
                        />
                    </>,
                    document.body
                )}
        </>
    );
}
