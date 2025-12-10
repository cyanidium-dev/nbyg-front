"use client";
import * as motion from "motion/react-client";
import MainButton from "../buttons/MainButton";
import Image from "next/image";
import { fadeInAnimation } from "@/utils/animationVariants";
import { useState } from "react";
import Backdrop from "../backdrop/Backdrop";
import Notification from "../notification/Notification";
import { Form, Formik, FormikHelpers } from "formik";
import CustomizedInput from "../customizedInput/CustomizedInput";
import { calculatorFormValidation } from "@/schemas/calculatorFormValidation";
import Container from "../container/Container";
import {
    sendCalculatorEmails,
    type FieldData,
    type CalculatedPrice,
} from "@/utils/email";

interface FormValues {
    email: string;
}

interface CalculatorContactFormProps {
    source?: string;
    summaryData?: FieldData[];
    calculatedPrices?: CalculatedPrice[];
    getCalculatorData?: () => {
        summaryData: FieldData[];
        calculatedPrices: CalculatedPrice[];
    };
}

export default function CalculatorContactForm({
    source = "Terrasseberegner",
    summaryData = [],
    calculatedPrices = [],
    getCalculatorData,
}: CalculatorContactFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isNotificationShown, setIsNotificationShown] = useState(false);
    const [isError, setIsError] = useState(false);

    const initialValues = {
        email: "",
    };

    const submitForm = async (
        values: FormValues,
        formikHelpers: FormikHelpers<FormValues>
    ) => {
        const { resetForm } = formikHelpers;
        try {
            setIsError(false);
            setIsLoading(true);

            const dataToSend = getCalculatorData
                ? getCalculatorData()
                : { summaryData, calculatedPrices };

            await sendCalculatorEmails({
                email: values.email,
                source,
                summaryData: dataToSend.summaryData,
                calculatedPrices: dataToSend.calculatedPrices,
            });

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
            <section className="mt-6 lg:mt-12 bg-black">
                <Container className="relative">
                    <motion.div
                        variants={fadeInAnimation({
                            delay: 0.9,
                            scale: 0.8,
                        })}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.1 }}
                        className="lg:block hidden absolute -z-10 left-[313px] bottom-[-218px] rotate-240"
                    >
                        <Image
                            src="/images/decorations/ellipsis.svg"
                            alt="ellipsis"
                            width="300"
                            height="228"
                            className="w-[300px] h-auto"
                        />
                    </motion.div>
                    <div className="bottom-[-59px] left-[220px] absolute -z-10 w-[416px] h-[309px] bg-black blur-[48.1453px]" />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={submitForm}
                        validationSchema={calculatorFormValidation}
                    >
                        {({ dirty, isValid }) => (
                            <Form className="relative">
                                <motion.div
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        scale: 0.95,
                                        y: 30,
                                        delay: 0.1,
                                    })}
                                    className="p-px rounded-[16px] mb-6 lg:mb-12"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(0deg, rgba(4, 4, 4, 0.4), rgba(4, 4, 4, 0.4)), linear-gradient(129.15deg, var(--color-gradient-brown-dark) 21.74%, var(--color-black) 103.38%)",
                                    }}
                                >
                                    <div className="px-4 py-6 lg:p-8 bg-black rounded-[16px]">
                                        <motion.h2
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{
                                                once: true,
                                                amount: 0.1,
                                            }}
                                            variants={fadeInAnimation({
                                                scale: 0.9,
                                                y: 20,
                                                delay: 0.2,
                                            })}
                                            className="text-[20px] lg:text-[24px] leading-[125%] font-find-sans-pro font-light mb-2"
                                        >
                                            Tak fordi du brugte vores
                                            prisberegner.
                                        </motion.h2>
                                        <motion.p
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{
                                                once: true,
                                                amount: 0.1,
                                            }}
                                            variants={fadeInAnimation({
                                                scale: 0.9,
                                                y: 20,
                                                delay: 0.3,
                                            })}
                                            className="text-[12px] lg:text-[18px] leading-[125%] font-light mb-6 max-w-[672px]"
                                        >
                                            Hvis du har spørgsmål eller har brug
                                            for hjælp til at vælge den rette
                                            løsning, er du velkommen til at
                                            skrive din e-mail herunder.
                                        </motion.p>
                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{
                                                once: true,
                                                amount: 0.1,
                                            }}
                                            variants={fadeInAnimation({
                                                scale: 0.9,
                                                y: 20,
                                                delay: 0.4,
                                            })}
                                            className="w-full sm:max-w-[361px] mr-auto"
                                        >
                                            <CustomizedInput
                                                fieldName="email"
                                                label="E-mail"
                                                isLabelHidden={true}
                                                placeholder="E-mail"
                                                fieldClassName="p-4 h-[49px] rounded-full border border-white/60 text-[14px] leading-[121.4%] font-light placeholder:text-white/60"
                                            />
                                        </motion.div>
                                    </div>
                                </motion.div>
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
                                        disabled={
                                            !(dirty && isValid) || isLoading
                                        }
                                        isLoading={isLoading}
                                        loadingText="Sender..."
                                        className="w-full h-[58px] sm:w-[320px] sm:ml-auto"
                                    >
                                        Send
                                    </MainButton>
                                </motion.div>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </section>
            <Backdrop
                isVisible={isNotificationShown}
                onClick={() => {
                    setIsNotificationShown(false);
                }}
            />
            <Notification
                title={isError ? "Noget gik galt" : "Tak for din henvendelse!"}
                description={
                    isError
                        ? "Der opstod en fejl, og din besked blev ikke sendt. Kontroller venligst, at alle felter er udfyldt korrekt, og prøv igen."
                        : "Vi har modtaget din besked og kontakter dig snarest muligt. Tak fordi du valgte Nbyg."
                }
                buttonText="Luk"
                isNotificationShown={isNotificationShown}
                setIsNotificationShown={setIsNotificationShown}
            />
        </>
    );
}
