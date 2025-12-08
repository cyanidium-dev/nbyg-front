export type CheckboxOption = {
    id: string;
    label: string;
    price?: number;
    image?: {
        link: string;
        priority?: boolean;
    };
    type?: string;
};

export type CheckboxFieldValue = {
    summaryLabel: string;
    values: Array<{ label: string; price: number }>;
};

export type RadioOption =
    | {
          id: string;
          label: string;
          price?: number;
          image?: {
              link: string;
              priority?: boolean;
          };
      }
    | {
          id: string;
          label: string;
          type: "image";
          image: {
              link: string;
              priority?: boolean;
          };
      }
    | {
          id: string;
          label: string;
          type: "number";
          variant?: "hidden";
          min?: number;
          max?: number;
      };

export type SingleSelectFieldValue = {
    summaryLabel: string;
    label: string;
    price: number;
};

export type OptionalFieldValue = {
    label: string;
    value: number;
};

export type NumberFieldValue = {
    summaryLabel: string;
    value: number;
    price?: number;
};

export type DropdownOption =
    | {
          type: "select";
          min: number;
          max: number;
          step: number;
      }
    | {
          id: string;
          label: string;
          type: "number";
          variant?: "hidden";
          min?: number;
          max?: number;
      };

export type FormFieldValue =
    | CheckboxFieldValue
    | SingleSelectFieldValue
    | NumberFieldValue
    | OptionalFieldValue
    | undefined;

export type FormValues = {
    [key: string]: FormFieldValue;
};

export interface PriceCalculation {
    tagtypeLabel: string;
    basePrice: number;
    area: number;
    formExtra: number;
    angleExtra: number;
    pricePerM2: number;
    roofCost: number;
    extrasCost: number;
    total: number;
}

export interface FieldData {
    value: string | number;
    label: string;
    category: string;
    labels?: string[];
}
