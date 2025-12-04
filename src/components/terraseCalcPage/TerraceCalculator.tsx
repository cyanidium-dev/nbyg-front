"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@/components/shared/container/Container";
import { CalcSection } from "./CalcSection";
import AreaInput from "./AreaInput";
import Summary from "./Summary";
import CalculatedPrice from "./CalculatedPrice";
import { fieldsData } from "./fieldsData";

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
    materialtype: "",
    area: { value: 50, label: "50 m²", category: "Angiv terrasseareal i m²" },
};

export default function TerraceCalculator() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={() => {
                // Form submission handled by calculation display
            }}
        >
            {({ values, setFieldValue, setValues }) => {
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
                        image: string;
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
                                  image: string;
                                  value: number;
                              }>;
                          }>)
                        : [];

                // Handle material type change - preserve only area
                const handleMaterialTypeChange = (
                    fieldId: string,
                    value: string,
                    label: string,
                    category: string
                ) => {
                    const currentArea =
                        typeof values.area === "object"
                            ? values.area
                            : {
                                  value: values.area as number,
                                  label: `${values.area} m²`,
                                  category: "Angiv terrasseareal i m²",
                              };
                    // Reset all fields except area
                    const newValues: FormValues = {
                        materialtype: {
                            value,
                            label,
                            category,
                        },
                        area: currentArea,
                    };
                    setValues(newValues);
                };

                // Calculate total price
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

                return (
                    <Form>
                        <main className="pt-19 lg:pt-[239px] flex flex-col items-center justify-center font-montserrat [counter-reset:calc-section]">
                            <Container>
                                {/* Material Type Selection - Always shown */}
                                <section className="w-full pb-6 pt-8 xl:pt-0 xl:pb-12 [counter-increment:calc-section]">
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
                                </section>

                                {/* Area Input - Always shown */}
                                <div className="[counter-increment:calc-section]">
                                    <AreaInput
                                        value={
                                            typeof values.area === "object"
                                                ? Number(
                                                      (values.area as FieldData)
                                                          .value
                                                  )
                                                : Number(values.area)
                                        }
                                        onChange={value =>
                                            setFieldValue("area", {
                                                value,
                                                label: `${value} m²`,
                                                category:
                                                    "Angiv terrasseareal i m²",
                                            })
                                        }
                                    />
                                </div>

                                {/* Dynamic Sections - Based on material type */}
                                {materialSections.map((section, index) => {
                                    return (
                                        <section
                                            key={section.id}
                                            className={`w-full border-y border-white/10 py-6 lg:py-12 [counter-increment:calc-section] ${
                                                index === 0 ? "border-t-0" : ""
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
                                                        image: `/images/calculator-terrasser/${field.image}`,
                                                    })
                                                )}
                                                selectedValue={
                                                    typeof values[
                                                        section.id
                                                    ] === "object"
                                                        ? String(
                                                              (
                                                                  values[
                                                                      section.id
                                                                  ] as FieldData
                                                              ).value
                                                          )
                                                        : String(
                                                              values[section.id]
                                                          )
                                                }
                                                onChange={(
                                                    fieldId,
                                                    value,
                                                    label,
                                                    category
                                                ) => {
                                                    // Remove section number from category (e.g., "3. Vælg materiale" -> "Vælg materiale")
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
                                        </section>
                                    );
                                })}

                                {/* Padding Section - Always shown if material type selected */}
                                {materialType && (
                                    <section className="w-full border-y border-white/10 py-6 lg:py-12 [counter-increment:calc-section]">
                                        <CalcSection
                                            id="padding"
                                            title="Bund"
                                            fields={fieldsData.padding[0].fields.map(
                                                field => ({
                                                    id: field.id,
                                                    label: field.label,
                                                    value: String(field.value),
                                                    image: `/images/calculator-terrasser/${field.image}`,
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
                                                // Remove section number from category (e.g., "4. Bund" -> "Bund")
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
                                    </section>
                                )}
                                {/* Summary and Calculated Price */}
                                {hasSelections && materialType && (
                                    <>
                                        <Summary values={values} />
                                        {total > 0 && (
                                            <CalculatedPrice total={total} />
                                        )}
                                    </>
                                )}
                            </Container>
                        </main>
                    </Form>
                );
            }}
        </Formik>
    );
}
