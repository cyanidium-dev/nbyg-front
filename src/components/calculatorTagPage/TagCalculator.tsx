"use client";
import { Formik, Form, useFormikContext } from "formik";
import { useState, useRef, useEffect } from "react";
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

// Form value types
type CheckboxFieldValue = {
    summaryLabel: string;
    values: Array<{ label: string; value: number }>;
};

type SingleSelectFieldValue = {
    summaryLabel: string;
    label: string;
    value: number;
};

type NumberFieldValue = {
    summaryLabel: string;
    value: number;
};

type OptionalFieldValue = {
    label: string;
    value: number;
};

type FormFieldValue =
    | CheckboxFieldValue
    | SingleSelectFieldValue
    | NumberFieldValue
    | OptionalFieldValue
    | undefined;

interface FormValues {
    [key: string]: FormFieldValue;
}

const initialValues: FormValues = {};

// Component to handle contact form visibility based on form values
function ContactFormController({
    onVisibilityChange,
}: {
    onVisibilityChange: (show: boolean) => void;
}) {
    const { values } = useFormikContext<FormValues>();
    const previousShouldShowFormRef = useRef(false);

    useEffect(() => {
        const hasSelections = Object.keys(values).some(key => {
            const value = values[key];
            if (!value) return false;
            if ("values" in value) {
                // Checkbox field
                return value.values.length > 0;
            }
            if ("value" in value) {
                // Single select, number, or optional field
                return value.value > 0;
            }
            return false;
        });

        const shouldShowForm = hasSelections;
        if (shouldShowForm !== previousShouldShowFormRef.current) {
            previousShouldShowFormRef.current = shouldShowForm;
            onVisibilityChange(shouldShowForm);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    return null;
}

export default function TagCalculator() {
    const [showContactForm, setShowContactForm] = useState(false);

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={() => {}}>
                {({ values, setFieldValue }) => {
                    const hasSelections = Object.keys(values).some(key => {
                        const value = values[key];
                        if (!value) return false;
                        if ("values" in value) {
                            // Checkbox field
                            return value.values.length > 0;
                        }
                        if ("value" in value) {
                            // Single select, number, or optional field
                            return value.value > 0;
                        }
                        return false;
                    });

                    return (
                        <Form className="pt-12 lg:pt-20 font-montserrat [counter-reset:calc-section]">
                            <ContactFormController
                                onVisibilityChange={setShowContactForm}
                            />
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
                                                                    value: number;
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
                                                                    "value" in
                                                                        opt &&
                                                                    typeof (
                                                                        opt as {
                                                                            value: unknown;
                                                                        }
                                                                    ).value ===
                                                                        "number" &&
                                                                    !(
                                                                        "type" in
                                                                        opt
                                                                    )
                                                            )
                                                            .map(opt => ({
                                                                id: opt.id,
                                                                label: opt.label,
                                                                value: opt.value,
                                                                image: opt.image,
                                                            }))}
                                                        selectedValues={
                                                            fieldValue &&
                                                            "values" in
                                                                fieldValue
                                                                ? fieldValue.values.map(
                                                                      v =>
                                                                          v.label
                                                                  )
                                                                : []
                                                        }
                                                        onChange={(
                                                            id: string,
                                                            updatedSelectedValues: Array<{
                                                                label: string;
                                                                value: number;
                                                            }>
                                                        ) => {
                                                            setFieldValue(id, {
                                                                summaryLabel:
                                                                    field.summaryLabel ||
                                                                    field.title,
                                                                values: updatedSelectedValues,
                                                            });
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
                                                                        value?: number;
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
                                                                    value:
                                                                        option.value ??
                                                                        100,
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
                                                            fieldValue &&
                                                            "label" in
                                                                fieldValue
                                                                ? (
                                                                      fieldValue as SingleSelectFieldValue
                                                                  ).label
                                                                : undefined
                                                        }
                                                        numberValue={(() => {
                                                            // Find the optional number field ID
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
                                                                    const optionalFieldValue =
                                                                        values[
                                                                            numberField
                                                                                .id
                                                                        ];
                                                                    if (
                                                                        optionalFieldValue &&
                                                                        "value" in
                                                                            optionalFieldValue
                                                                    ) {
                                                                        return (
                                                                            optionalFieldValue as OptionalFieldValue
                                                                        ).value;
                                                                    }
                                                                }
                                                            }
                                                            return undefined;
                                                        })()}
                                                        onChange={(
                                                            id: string,
                                                            optionId: string,
                                                            optionLabel: string,
                                                            optionValue: number
                                                        ) => {
                                                            setFieldValue(id, {
                                                                summaryLabel:
                                                                    field.summaryLabel ||
                                                                    field.title,
                                                                label: optionLabel,
                                                                value: optionValue,
                                                            });

                                                            // Clear the optional number field if "0-30 grader" is selected
                                                            if (
                                                                optionId ===
                                                                "0-30 grader"
                                                            ) {
                                                                // Find the optional number field
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
                                                                            undefined
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                        onNumberChange={(
                                                            numberFieldId: string,
                                                            value: number
                                                        ) => {
                                                            setFieldValue(
                                                                numberFieldId,
                                                                {
                                                                    label: Array.isArray(
                                                                        field.options
                                                                    )
                                                                        ? (
                                                                              field.options.find(
                                                                                  opt =>
                                                                                      typeof opt ===
                                                                                          "object" &&
                                                                                      opt !==
                                                                                          null &&
                                                                                      "id" in
                                                                                          opt &&
                                                                                      opt.id ===
                                                                                          numberFieldId
                                                                              ) as {
                                                                                  label?: string;
                                                                              }
                                                                          )
                                                                              ?.label ||
                                                                          ""
                                                                        : "",
                                                                    value: value,
                                                                }
                                                            );
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
                                                            fieldValue &&
                                                            "value" in
                                                                fieldValue
                                                                ? (
                                                                      fieldValue as NumberFieldValue
                                                                  ).value
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
                                                                {
                                                                    summaryLabel:
                                                                        field.summaryLabel ||
                                                                        field.title,
                                                                    value: value,
                                                                }
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
                                                            fieldValue &&
                                                            "value" in
                                                                fieldValue &&
                                                            "summaryLabel" in
                                                                fieldValue
                                                                ? (
                                                                      fieldValue as NumberFieldValue
                                                                  ).value
                                                                : 0
                                                        }
                                                        onChange={(
                                                            value: number
                                                        ) => {
                                                            setFieldValue(
                                                                fieldId,
                                                                {
                                                                    summaryLabel:
                                                                        field.summaryLabel ||
                                                                        field.title,
                                                                    value: value,
                                                                }
                                                            );
                                                        }}
                                                        onNumberChange={(
                                                            numberFieldId: string,
                                                            value: number
                                                        ) => {
                                                            // Update the optional field
                                                            setFieldValue(
                                                                numberFieldId,
                                                                {
                                                                    label: Array.isArray(
                                                                        field.options
                                                                    )
                                                                        ? (
                                                                              field.options.find(
                                                                                  opt =>
                                                                                      typeof opt ===
                                                                                          "object" &&
                                                                                      opt !==
                                                                                          null &&
                                                                                      "id" in
                                                                                          opt &&
                                                                                      opt.id ===
                                                                                          numberFieldId
                                                                              ) as {
                                                                                  label?: string;
                                                                              }
                                                                          )
                                                                              ?.label ||
                                                                          ""
                                                                        : "",
                                                                    value: value,
                                                                }
                                                            );
                                                            // Also update the main field with the value
                                                            setFieldValue(
                                                                fieldId,
                                                                {
                                                                    summaryLabel:
                                                                        field.summaryLabel ||
                                                                        field.title,
                                                                    value: value,
                                                                }
                                                            );
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
                                                        fieldValue &&
                                                        "value" in fieldValue
                                                            ? (
                                                                  fieldValue as NumberFieldValue
                                                              ).value
                                                            : 0
                                                    }
                                                    onChange={value => {
                                                        setFieldValue(fieldId, {
                                                            summaryLabel:
                                                                field.summaryLabel ||
                                                                field.title,
                                                            value: value,
                                                        });
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
