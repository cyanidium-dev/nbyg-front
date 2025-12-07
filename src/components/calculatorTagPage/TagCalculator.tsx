"use client";
import { Formik, Form } from "formik";
import { useState, useRef } from "react";
import Container from "@/components/shared/container/Container";
import AreaInput from "./AreaInput";
import CheckboxInput from "./CheckboxInput";
import { RadioInput } from "./RadioInput";
import DropdownInput from "./DropdownInput";
import NumberInput from "./NumberInput";
import Summary from "./Summary";
import { fieldsData } from "./fieldsData";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import CalculatorContactForm from "../shared/calculatorContactForm/CalculatorContactForm";

interface FormValues {
    [key: string]: string | number | string[] | undefined;
}

const initialValues: FormValues = {
    tagtype: [],
    area: 50,
};

export default function TagCalculator() {
    const [showContactForm, setShowContactForm] = useState(false);
    const previousShouldShowFormRef = useRef(false);

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({ values, setFieldValue }) => {
                    const hasSelections = Object.keys(values).some(key => {
                        const value = values[key];
                        if (Array.isArray(value)) {
                            return value.length > 0;
                        }
                        if (typeof value === "number") {
                            return value > 0;
                        }
                        return !!value;
                    });

                    const shouldShowForm = hasSelections;
                    if (shouldShowForm !== previousShouldShowFormRef.current) {
                        previousShouldShowFormRef.current = shouldShowForm;
                        setTimeout(() => {
                            setShowContactForm(shouldShowForm);
                        }, 0);
                    }

                    return (
                        <Form className="pt-19 lg:pt-[239px] font-montserrat [counter-reset:calc-section]">
                            <Container>
                                {fieldsData.map((field, index) => {
                                    const fieldId = field.id;
                                    const fieldValue = values[fieldId];

                                    return (
                                        <motion.section
                                            key={fieldId}
                                            initial="hidden"
                                            whileInView="visible"
                                            exit="exit"
                                            viewport={{
                                                once: true,
                                                amount: 0.1,
                                            }}
                                            variants={fadeInAnimation({
                                                y: 100,
                                                delay: index * 0.2,
                                            })}
                                            className="w-full pb-6 pt-8 lg:pt-0 xl:pb-12 [counter-increment:calc-section]"
                                        >
                                            {field.type === "checkbox" &&
                                                Array.isArray(
                                                    field.options
                                                ) && (
                                                    <CheckboxInput
                                                        id={fieldId}
                                                        title={field.title}
                                                        description={
                                                            field.description
                                                        }
                                                        options={field.options
                                                            .filter(
                                                                (
                                                                    opt
                                                                ): opt is {
                                                                    id: string;
                                                                    label: string;
                                                                    image: {
                                                                        link: string;
                                                                    };
                                                                } =>
                                                                    "id" in
                                                                        opt &&
                                                                    "label" in
                                                                        opt &&
                                                                    "image" in
                                                                        opt &&
                                                                    !(
                                                                        "type" in
                                                                        opt
                                                                    )
                                                            )
                                                            .map(opt => ({
                                                                id: opt.id,
                                                                label: opt.label,
                                                                value: opt.id,
                                                                image: opt.image,
                                                            }))}
                                                        selectedValues={
                                                            Array.isArray(
                                                                fieldValue
                                                            )
                                                                ? (fieldValue as string[])
                                                                : []
                                                        }
                                                        onChange={(
                                                            id: string,
                                                            value: string,
                                                            label: string,
                                                            category: string,
                                                            updatedValues: string[]
                                                        ) => {
                                                            setFieldValue(
                                                                id,
                                                                updatedValues
                                                            );
                                                        }}
                                                    />
                                                )}

                                            {field.type === "radio" &&
                                                Array.isArray(
                                                    field.options
                                                ) && (
                                                    <RadioInput
                                                        id={fieldId}
                                                        title={field.title}
                                                        description={
                                                            field.description
                                                        }
                                                        options={field.options
                                                            .filter(
                                                                opt =>
                                                                    typeof opt ===
                                                                        "object" &&
                                                                    opt !==
                                                                        null &&
                                                                    "id" in opt
                                                            )
                                                            .map(opt => {
                                                                const option =
                                                                    opt as {
                                                                        id: string;
                                                                        label: string;
                                                                        image?: {
                                                                            link: string;
                                                                        };
                                                                        type?:
                                                                            | "image"
                                                                            | "number";
                                                                        variant?: "hidden";
                                                                        min?: number;
                                                                        max?: number;
                                                                    };
                                                                return {
                                                                    id: option.id,
                                                                    label: option.label,
                                                                    value: option.id,
                                                                    image: option.image || {
                                                                        link: "",
                                                                        priority: false,
                                                                    },
                                                                    type: option.type,
                                                                    variant:
                                                                        option.variant,
                                                                    min: option.min,
                                                                    max: option.max,
                                                                };
                                                            })}
                                                        selectedOptionValue={
                                                            typeof fieldValue ===
                                                            "string"
                                                                ? fieldValue
                                                                : undefined
                                                        }
                                                        numberValue={
                                                            typeof fieldValue ===
                                                            "number"
                                                                ? fieldValue
                                                                : undefined
                                                        }
                                                        onChange={(
                                                            id: string,
                                                            value: string
                                                        ) => {
                                                            setFieldValue(
                                                                id,
                                                                value
                                                            );
                                                        }}
                                                        onNumberChange={(
                                                            value: number
                                                        ) => {
                                                            if (
                                                                Array.isArray(
                                                                    field.options
                                                                )
                                                            ) {
                                                                const numberField =
                                                                    field.options.find(
                                                                        opt =>
                                                                            typeof opt ===
                                                                                "object" &&
                                                                            opt !==
                                                                                null &&
                                                                            "id" in
                                                                                opt &&
                                                                            "type" in
                                                                                opt &&
                                                                            (
                                                                                opt as {
                                                                                    type?: string;
                                                                                }
                                                                            )
                                                                                .type ===
                                                                                "number"
                                                                    ) as
                                                                        | {
                                                                              id: string;
                                                                          }
                                                                        | undefined;
                                                                if (
                                                                    numberField &&
                                                                    "id" in
                                                                        numberField
                                                                ) {
                                                                    setFieldValue(
                                                                        numberField.id,
                                                                        value
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )}

                                            {field.type === "area" &&
                                                !Array.isArray(field.options) &&
                                                typeof field.options ===
                                                    "object" &&
                                                "min" in field.options && (
                                                    <AreaInput
                                                        value={
                                                            typeof fieldValue ===
                                                            "number"
                                                                ? fieldValue
                                                                : (
                                                                      field.options as {
                                                                          min: number;
                                                                          max: number;
                                                                      }
                                                                  ).min || 5
                                                        }
                                                        onChange={(
                                                            value: number
                                                        ) => {
                                                            setFieldValue(
                                                                fieldId,
                                                                value
                                                            );
                                                        }}
                                                    />
                                                )}

                                            {field.type === "dropdown" &&
                                                Array.isArray(
                                                    field.options
                                                ) && (
                                                    <DropdownInput
                                                        id={fieldId}
                                                        title={field.title}
                                                        description={
                                                            field.description
                                                        }
                                                        dropdownOptions={
                                                            field
                                                                .options[0] as {
                                                                min: number;
                                                                max: number;
                                                                step: number;
                                                            }
                                                        }
                                                        moreOption={
                                                            Array.isArray(
                                                                field.options
                                                            ) &&
                                                            field.options[1] &&
                                                            typeof field
                                                                .options[1] ===
                                                                "object" &&
                                                            "type" in
                                                                field
                                                                    .options[1] &&
                                                            field.options[1]
                                                                .type ===
                                                                "number"
                                                                ? {
                                                                      id: (
                                                                          field
                                                                              .options[1] as {
                                                                              id: string;
                                                                          }
                                                                      ).id,
                                                                      label: (
                                                                          field
                                                                              .options[1] as {
                                                                              label: string;
                                                                          }
                                                                      ).label,
                                                                      min:
                                                                          (
                                                                              field
                                                                                  .options[1] as {
                                                                                  min?: number;
                                                                              }
                                                                          )
                                                                              .min ||
                                                                          0,
                                                                      max: (
                                                                          field
                                                                              .options[1] as {
                                                                              max?: number;
                                                                          }
                                                                      ).max,
                                                                  }
                                                                : undefined
                                                        }
                                                        selectedValue={
                                                            typeof fieldValue ===
                                                                "number" ||
                                                            typeof fieldValue ===
                                                                "string"
                                                                ? fieldValue
                                                                : undefined
                                                        }
                                                        onChange={(
                                                            value:
                                                                | number
                                                                | string
                                                        ) => {
                                                            setFieldValue(
                                                                fieldId,
                                                                value
                                                            );
                                                        }}
                                                        onNumberChange={(
                                                            value: number
                                                        ) => {
                                                            if (
                                                                Array.isArray(
                                                                    field.options
                                                                )
                                                            ) {
                                                                const moreOption =
                                                                    field.options.find(
                                                                        opt =>
                                                                            typeof opt ===
                                                                                "object" &&
                                                                            opt !==
                                                                                null &&
                                                                            "id" in
                                                                                opt &&
                                                                            "type" in
                                                                                opt &&
                                                                            (
                                                                                opt as {
                                                                                    type?: string;
                                                                                }
                                                                            )
                                                                                .type ===
                                                                                "number"
                                                                    ) as
                                                                        | {
                                                                              id: string;
                                                                          }
                                                                        | undefined;
                                                                if (
                                                                    moreOption &&
                                                                    "id" in
                                                                        moreOption
                                                                ) {
                                                                    setFieldValue(
                                                                        moreOption.id,
                                                                        value
                                                                    );
                                                                    setFieldValue(
                                                                        fieldId,
                                                                        value
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    />
                                                )}

                                            {field.type === "number" && (
                                                <NumberInput
                                                    id={fieldId}
                                                    title={field.title}
                                                    description={
                                                        field.description
                                                    }
                                                    hint={field.hint}
                                                    value={
                                                        typeof fieldValue ===
                                                        "number"
                                                            ? fieldValue
                                                            : 0
                                                    }
                                                    onChange={value => {
                                                        setFieldValue(
                                                            fieldId,
                                                            value
                                                        );
                                                    }}
                                                    min={0}
                                                    max={1000}
                                                />
                                            )}
                                        </motion.section>
                                    );
                                })}

                                {hasSelections && (
                                    <>
                                        <Summary
                                            values={values}
                                            fieldsData={
                                                fieldsData as Array<{
                                                    id: string;
                                                    type: string;
                                                    title: string;
                                                    options?: unknown;
                                                }>
                                            }
                                        />
                                        {/* CalculatedPrice will be added when calculations are implemented */}
                                    </>
                                )}
                            </Container>
                        </Form>
                    );
                }}
            </Formik>
            <AnimatePresence>
                {showContactForm && <CalculatorContactForm />}
            </AnimatePresence>
        </>
    );
}
