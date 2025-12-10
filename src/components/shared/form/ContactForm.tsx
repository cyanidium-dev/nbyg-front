"use client";
import { Form, Formik, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import CustomizedInput from "../customizedInput/CustomizedInput";
import { contactFormValidation } from "@/schemas/contactFormValidation";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";
import MainButton from "../buttons/MainButton";
import { sendContactFormEmail } from "@/utils/email";

interface ContactFormValues {
    name: string;
    phone: string;
    email: string;
    address: string;
    message: string;
}

interface ContactFormProps {
    setIsError: Dispatch<SetStateAction<boolean>>;
    setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
    setIsModalShown?: Dispatch<SetStateAction<boolean>>;
}

export default function ContactForm({
    setIsError,
    setIsNotificationShown,
    setIsModalShown,
}: ContactFormProps) {
    const [isLoading, setIsLoading] = useState(false);

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
        const { resetForm } = formikHelpers;
        try {
            setIsError(false);
            setIsLoading(true);

            await sendContactFormEmail({
                source: "Kontakt os",
                name: values.name,
                phone: values.phone,
                email: values.email,
                address: values.address,
                message: values.message,
            });

            resetForm();
            if (setIsModalShown) {
                setIsModalShown(false);
            }
            setIsNotificationShown(true);
        } catch (error) {
            setIsError(true);
            if (setIsModalShown) {
                setIsModalShown(false);
            }
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
        </>
    );
}
