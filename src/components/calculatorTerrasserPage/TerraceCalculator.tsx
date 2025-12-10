"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState, useRef, useLayoutEffect } from "react";
import Container from "@/components/shared/container/Container";
import { CalcSection } from "./CalcSection";
import AreaInput from "./AreaInput";
import Summary from "./Summary";
import CalculatedPrice from "./CalculatedPrice";
import { fieldsData } from "./fieldsData";
import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import CalculatorContactForm from "../shared/calculatorContactForm/CalculatorContactForm";
import {
    extractTerraceCalculatorSummaryData,
    extractTerraceCalculatorPrice,
} from "@/utils/email/calculatorDataUtils";

interface FieldData {
    value: string | number;
    label: string;
    category: string;
}

interface FormValues {
    materialtype: FieldData | string;
    area: FieldData | number;
    [key: string]: FieldData | string | number;
}

const validationSchema = Yup.object({
    materialtype: Yup.string().required("Vælg materialetype"),
    area: Yup.number()
        .min(5, "Minimum areal er 5 m²")
        .max(300, "Maksimum areal er 300 m²")
        .required("Angiv terrasseareal"),
});

const initialValues: FormValues = {
    materialtype: {
        value: fieldsData.materialtype[0].value,
        label: fieldsData.materialtype[0].label,
        category: "Vælg materialetype",
    },
    area: { value: 50, label: "50 m²", category: "Angiv terrasseareal i m²" },
};

export default function TerraceCalculator() {
    const [showContactForm, setShowContactForm] = useState(false);
    const [calculatorData, setCalculatorData] = useState<{
        summaryData: ReturnType<typeof extractTerraceCalculatorSummaryData>;
        calculatedPrices: ReturnType<typeof extractTerraceCalculatorPrice>;
    } | null>(null);
    const previousShouldShowFormRef = useRef(false);
    const valuesRef = useRef<FormValues>(initialValues);
    const previousValuesStringRef = useRef<string>("");

    useLayoutEffect(() => {
        const currentValuesString = JSON.stringify(valuesRef.current);
        if (previousValuesStringRef.current !== currentValuesString) {
            previousValuesStringRef.current = currentValuesString;

            const summaryData = extractTerraceCalculatorSummaryData(
                valuesRef.current
            );
            const calculatedPrices = extractTerraceCalculatorPrice(
                valuesRef.current
            );

            setCalculatorData({ summaryData, calculatedPrices });
        }
    });

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={() => {}}
            >
                {({ values, setFieldValue, setValues }) => {
                    valuesRef.current = values;

                    const materialType =
                        typeof values.materialtype === "string"
                            ? values.materialtype
                            : (values.materialtype as FieldData).value;
                    const materialSections: Array<{
                        sectionTitle: string;
                        id: string;
                        description?: string;
                        fields: Array<{
                            id: string;
                            label: string;
                            image: {
                                link: string;
                                priority?: boolean;
                            };
                            value: number;
                        }>;
                    }> =
                        materialType &&
                        fieldsData[materialType as keyof typeof fieldsData]
                            ? (fieldsData[
                                  materialType as keyof typeof fieldsData
                              ] as Array<{
                                  sectionTitle: string;
                                  id: string;
                                  description?: string;
                                  fields: Array<{
                                      id: string;
                                      label: string;
                                      image: {
                                          link: string;
                                          priority?: boolean;
                                      };
                                      value: number;
                                  }>;
                              }>)
                            : [];

                    const handleMaterialTypeChange = (
                        fieldId: string,
                        value: string,
                        label: string,
                        category: string
                    ) => {
                        const previousMaterialType = materialType;
                        const newMaterialType = value;

                        if (previousMaterialType !== newMaterialType) {
                            const alwaysKeepFields = ["materialtype", "area"];

                            const cleanedValues: FormValues = {
                                materialtype: {
                                    value,
                                    label,
                                    category,
                                },
                            } as FormValues;
                            alwaysKeepFields.forEach(key => {
                                if (key !== "materialtype" && values[key]) {
                                    cleanedValues[key] = values[key];
                                }
                            });

                            setValues(cleanedValues);
                        } else {
                            setFieldValue("materialtype", {
                                value,
                                label,
                                category,
                            });
                        }
                    };

                    const calculateTotal = () => {
                        const prices = Object.entries(values)
                            .filter(
                                ([key, value]) =>
                                    key !== "area" &&
                                    key !== "materialtype" &&
                                    (typeof value === "object"
                                        ? !isNaN(Number(value.value))
                                        : typeof value === "string" &&
                                          !isNaN(Number(value)))
                            )
                            .map(([, value]) =>
                                typeof value === "object"
                                    ? Number(value.value)
                                    : Number(value)
                            );

                        const areaValue =
                            typeof values.area === "object"
                                ? (values.area as FieldData).value
                                : (values.area as number);

                        const total =
                            Number(areaValue) *
                            prices.reduce((acc, price) => acc + price, 0);
                        return total;
                    };

                    const total = calculateTotal();
                    const hasSelections = Object.keys(values).length > 2;
                    const shouldShowForm = total > 0 && hasSelections;

                    if (shouldShowForm !== previousShouldShowFormRef.current) {
                        previousShouldShowFormRef.current = shouldShowForm;
                        setTimeout(() => {
                            setShowContactForm(shouldShowForm);
                        }, 0);
                    }

                    return (
                        <Form className="pt-12 lg:pt-20 font-montserrat [counter-reset:calc-section]">
                            <Container>
                                <motion.section
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{ once: true, amount: 0.1 }}
                                    variants={fadeInAnimation({
                                        y: 100,
                                    })}
                                    className="w-full pb-6 pt-8 lg:pt-0 xl:pb-12 [counter-increment:calc-section]"
                                >
                                    <CalcSection
                                        id="materialtype"
                                        title="Vælg materialetype"
                                        fields={fieldsData.materialtype.map(
                                            field => ({
                                                id: field.id,
                                                label: field.label,
                                                value: field.value,
                                                image: field.image,
                                            })
                                        )}
                                        selectedValue={
                                            typeof values.materialtype ===
                                            "string"
                                                ? values.materialtype
                                                : String(
                                                      (
                                                          values.materialtype as FieldData
                                                      ).value
                                                  )
                                        }
                                        onChange={(id, value) => {
                                            const materialField =
                                                fieldsData.materialtype.find(
                                                    f => f.value === value
                                                );
                                            handleMaterialTypeChange(
                                                id,
                                                value,
                                                materialField?.label || "",
                                                "Vælg materialetype"
                                            );
                                        }}
                                    />
                                </motion.section>

                                <motion.section
                                    key={`${materialType}-area`}
                                    initial="hidden"
                                    whileInView="visible"
                                    exit="exit"
                                    viewport={{
                                        once: true,
                                        amount: 0.1,
                                    }}
                                    variants={fadeInAnimation({
                                        y: 100,
                                        delay: 0.2,
                                    })}
                                    className="[counter-increment:calc-section]"
                                >
                                    <AreaInput
                                        value={
                                            typeof values.area === "object"
                                                ? Number(
                                                      (values.area as FieldData)
                                                          .value
                                                  )
                                                : Number(values.area)
                                        }
                                        onChange={value => {
                                            setFieldValue("area", {
                                                value,
                                                label: `${value} m²`,
                                                category:
                                                    "Angiv terrasseareal i m²",
                                            });
                                        }}
                                    />
                                </motion.section>

                                <AnimatePresence>
                                    {materialSections.map((section, index) => {
                                        return (
                                            <motion.section
                                                key={`${materialType}-${section.id}`}
                                                initial="hidden"
                                                animate="visible"
                                                exit={{
                                                    opacity: 0,
                                                    transform:
                                                        "translate3d(0, -100px, 0)",
                                                    transition: {
                                                        duration: 0.3,
                                                        ease: [
                                                            0.42, 0, 1, 1,
                                                        ] as const,
                                                    },
                                                }}
                                                variants={fadeInAnimation({
                                                    y: 100,
                                                    delay: 0.4 + index * 0.2,
                                                })}
                                                className={`w-full border-y border-white/10 py-6 lg:py-12 [counter-increment:calc-section] ${
                                                    index === 0
                                                        ? "border-t-0"
                                                        : ""
                                                }`}
                                            >
                                                <CalcSection
                                                    id={section.id}
                                                    title={section.sectionTitle}
                                                    description={
                                                        section.description
                                                    }
                                                    fields={section.fields.map(
                                                        field => ({
                                                            id: field.id,
                                                            label: field.label,
                                                            value: String(
                                                                field.value
                                                            ),
                                                            image: {
                                                                link: field
                                                                    .image.link,
                                                                priority:
                                                                    (
                                                                        field.image as {
                                                                            link: string;
                                                                            priority?: boolean;
                                                                        }
                                                                    )
                                                                        ?.priority ??
                                                                    false,
                                                            },
                                                        })
                                                    )}
                                                    selectedValue={
                                                        typeof values[
                                                            section.id
                                                        ] === "object"
                                                            ? String(
                                                                  (
                                                                      values[
                                                                          section
                                                                              .id
                                                                      ] as FieldData
                                                                  ).value
                                                              )
                                                            : String(
                                                                  values[
                                                                      section.id
                                                                  ]
                                                              )
                                                    }
                                                    onChange={(
                                                        fieldId,
                                                        value,
                                                        label,
                                                        category
                                                    ) => {
                                                        const cleanCategory =
                                                            category.replace(
                                                                /^\d+\.\s*/,
                                                                ""
                                                            );
                                                        setFieldValue(fieldId, {
                                                            value,
                                                            label,
                                                            category:
                                                                cleanCategory,
                                                        });
                                                    }}
                                                />
                                            </motion.section>
                                        );
                                    })}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {materialType && (
                                        <motion.section
                                            key={`${materialType}-padding`}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{
                                                opacity: 0,
                                                transform:
                                                    "translate3d(0, -100px, 0)",
                                                transition: {
                                                    duration: 0.3,
                                                    ease: [
                                                        0.42, 0, 1, 1,
                                                    ] as const,
                                                },
                                            }}
                                            variants={fadeInAnimation({
                                                y: 100,
                                                delay: 0.6,
                                            })}
                                            className="w-full border-y border-white/10 py-6 lg:py-12 [counter-increment:calc-section]"
                                        >
                                            <CalcSection
                                                id="padding"
                                                title="Bund"
                                                fields={fieldsData.padding[0].fields.map(
                                                    field => ({
                                                        id: field.id,
                                                        label: field.label,
                                                        value: String(
                                                            field.value
                                                        ),
                                                        image: {
                                                            link: field.image
                                                                .link,
                                                            priority:
                                                                (
                                                                    field.image as {
                                                                        link: string;
                                                                        priority?: boolean;
                                                                    }
                                                                )?.priority ??
                                                                false,
                                                        },
                                                    })
                                                )}
                                                selectedValue={
                                                    typeof values.padding ===
                                                    "object"
                                                        ? String(
                                                              (
                                                                  values.padding as FieldData
                                                              ).value
                                                          )
                                                        : String(values.padding)
                                                }
                                                onChange={(
                                                    fieldId,
                                                    value,
                                                    label,
                                                    category
                                                ) => {
                                                    const cleanCategory =
                                                        category.replace(
                                                            /^\d+\.\s*/,
                                                            ""
                                                        );
                                                    setFieldValue(fieldId, {
                                                        value,
                                                        label,
                                                        category: cleanCategory,
                                                    });
                                                }}
                                            />
                                        </motion.section>
                                    )}
                                </AnimatePresence>
                                {hasSelections && materialType && (
                                    <>
                                        <Summary values={values} />
                                        {total > 0 && (
                                            <CalculatedPrice total={total} />
                                        )}
                                    </>
                                )}
                            </Container>
                        </Form>
                    );
                }}
            </Formik>
            <AnimatePresence>
                {showContactForm && (
                    <CalculatorContactForm
                        source="Terrasseberegner"
                        summaryData={calculatorData?.summaryData}
                        calculatedPrices={calculatorData?.calculatedPrices}
                        getCalculatorData={() => {
                            const summaryData =
                                extractTerraceCalculatorSummaryData(
                                    valuesRef.current
                                );
                            const calculatedPrices =
                                extractTerraceCalculatorPrice(
                                    valuesRef.current
                                );
                            return { summaryData, calculatedPrices };
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
