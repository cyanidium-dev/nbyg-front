"use client";
import { useMemo } from "react";
import { Formik, Form } from "formik";
import Container from "@/components/shared/container/Container";
import AreaInput from "./AreaInput";
import CheckboxInput from "./CheckboxInput";
import { RadioInput } from "./RadioInput";
import DropdownInput from "./DropdownInput";
import type {
  CheckboxOption,
  CheckboxFieldValue,
  RadioOption,
  SingleSelectFieldValue,
  OptionalFieldValue,
  DropdownOption,
  NumberFieldValue,
  FormValues,
} from "@/types/calculatorTag";
import NumberInput from "./NumberInput";
import Summary from "./Summary";
import CalculatedPrice from "./CalculatedPrice";
import { fieldsData } from "./fieldsData";
import { getAllCalculations, getPriceTitle } from "./calculatePrice";

import { fadeInAnimation } from "@/utils/animationVariants";
import * as motion from "motion/react-client";
import CalculatorContactForm from "../shared/calculatorContactForm/CalculatorContactForm";

function MemoizedSummaryAndPrice({
  values,
  fieldsData,
}: {
  values: FormValues;
  fieldsData: Array<{
    id: string;
    type: string;
    title: string;
    options?: unknown;
  }>;
}) {
  const calculations = useMemo(() => getAllCalculations(values), [values]);

  return (
    <>
      <Summary values={values} fieldsData={fieldsData} />
      {calculations.length > 0 && (
        <div className="space-y-4">
          {calculations.map((calc, index) => (
            <CalculatedPrice
              key={`${calc.tagtypeLabel}-${index}`}
              title={getPriceTitle(calc.tagtypeLabel)}
              total={calc.total}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function TagCalculator() {
  const initialValues: FormValues = {
    area: {
      summaryLabel: "Tagets størrelse",
      value: 50,
    },
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          return (
            <Form className="pt-2 lg:pt-8 font-montserrat [counter-reset:calc-section]">
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
                        delay: index * 0.1,
                      })}
                      className="w-full py-6 lg:py-12 [counter-increment:calc-section]"
                    >
                      {field.type === "checkbox" &&
                        Array.isArray(field.options) && (
                          <CheckboxInput
                            id={fieldId}
                            title={field.title}
                            description={field.description}
                            options={field.options as CheckboxOption[]}
                            selectedValues={
                              (fieldValue as CheckboxFieldValue | undefined)
                                ?.values
                            }
                            onChange={(
                              id: string,
                              updatedSelectedValues: Array<{
                                label: string;
                                price: number;
                              }>
                            ) => {
                              setFieldValue(id, {
                                summaryLabel: field.summaryLabel || field.title,
                                values: updatedSelectedValues,
                              });
                            }}
                          />
                        )}
                      {field.type === "radio" &&
                        Array.isArray(field.options) && (
                          <RadioInput
                            id={fieldId}
                            title={field.title}
                            description={field.description}
                            options={field.options as RadioOption[]}
                            selectedValue={
                              fieldValue && "label" in fieldValue
                                ? (fieldValue as SingleSelectFieldValue)
                                : undefined
                            }
                            values={values}
                            onChange={(
                              id: string,
                              value: SingleSelectFieldValue
                            ) => {
                              setFieldValue(id, {
                                summaryLabel: field.summaryLabel || field.title,
                                label: value.label,
                                price: value.price,
                              });
                            }}
                            onNumberChange={(
                              numberFieldId: string,
                              value: OptionalFieldValue | undefined
                            ) => {
                              setFieldValue(numberFieldId, value);
                            }}
                          />
                        )}

                      {field.type === "area" &&
                        !Array.isArray(field.options) &&
                        typeof field.options === "object" &&
                        field.options !== null &&
                        "min" in field.options && (
                          <AreaInput
                            value={
                              fieldValue && "value" in fieldValue
                                ? (fieldValue as NumberFieldValue).value
                                : Math.max(50, field.options.min)
                            }
                            min={field.options.min}
                            max={field.options.max}
                            onChange={(value: number) => {
                              setFieldValue(fieldId, {
                                summaryLabel: field.summaryLabel || field.title,
                                value: value,
                              });
                            }}
                          />
                        )}

                      {field.type === "dropdown" &&
                        Array.isArray(field.options) && (
                          <DropdownInput
                            id={fieldId}
                            title={field.title}
                            description={field.description}
                            options={field.options as DropdownOption[]}
                            selectedValue={
                              fieldValue &&
                              "value" in fieldValue &&
                              "summaryLabel" in fieldValue
                                ? (fieldValue as NumberFieldValue)
                                : undefined
                            }
                            values={values}
                            price={field.price}
                            onChange={(id: string, value: NumberFieldValue) => {
                              setFieldValue(id, {
                                summaryLabel: field.summaryLabel || field.title,
                                value: value.value,
                                price: value.price,
                              });
                            }}
                            onNumberChange={(
                              numberFieldId: string,
                              value: OptionalFieldValue
                            ) => {
                              setFieldValue(numberFieldId, value);
                            }}
                          />
                        )}

                      {field.type === "number" && (
                        <NumberInput
                          id={fieldId}
                          title={field.title}
                          description={field.description}
                          hint={field.hint}
                          value={
                            fieldValue && "value" in fieldValue
                              ? (fieldValue as NumberFieldValue).value
                              : 0
                          }
                          onChange={value => {
                            setFieldValue(fieldId, {
                              summaryLabel: field.summaryLabel || field.title,
                              value: value,
                              price: field.price,
                            });
                          }}
                          min={
                            "min" in field && typeof field.min === "number"
                              ? field.min
                              : 0
                          }
                          {...("max" in field &&
                            typeof field.max === "number" && {
                              max: field.max,
                            })}
                        />
                      )}
                    </motion.section>
                  );
                })}

                {Object.keys(values).length > 0 && (
                  <MemoizedSummaryAndPrice
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
                )}
              </Container>
            </Form>
          );
        }}
      </Formik>
      <CalculatorContactForm />
    </>
  );
}
