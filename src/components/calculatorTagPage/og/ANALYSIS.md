# Analysis of Old Site Calculation Data

## Overview

The old site uses a WordPress plugin called "Calculated Fields Form"
(cp_calculatedfieldsf) for the roof calculator. The calculation logic is
embedded in JavaScript within the form plugin.

## Pricing Data Found

### 1. Structured Data (JSON-LD Schema)

The HTML contains structured pricing data in JSON-LD format:

- **Ståltag**: 850 DKK per m²
- **Eternittag**: 800 DKK per m²
- **Skifer tag**: 1600 DKK per m²
- **Tagpap tag**: 900 DKK per m²
- **Tegltag**: 1100 DKK per m²
- **Traditionel dansk rød tegl**: 1400 DKK per m²
- **Trapez og termotag**: 350 DKK per m²

### 2. Pricing Table in HTML

A pricing table is displayed on the page with the following ranges:

| Tagmateriale               | Pris             |
| -------------------------- | ---------------- |
| Ståltage-løsninger         | 600-1100 pr. m2  |
| Eternit bølgeplade         | 600-1000 pr. m2  |
| Skifer tag                 | 1100-2300 pr. m2 |
| Tag pap                    | 395-1300 kr. m2  |
| Klassisk tegltag           | 1000-1700 kr. m2 |
| Traditionel dansk rød tegl | 1200-2000 kr. m2 |
| Trapezplade                | 150-500 kr. m2   |

### 3. Current Implementation Comparison

The current `fieldsData.ts` uses these values:

- **Ståltag**: 850 DKK
- **Eternittag**: 800 DKK
- **Skifer tag**: 1600 DKK
- **Tagpap tag**: 900 DKK
- **Tegltag**: 1100 DKK
- **Traditionel dansk rød tegl**: 1400 DKK
- **Trapez og termotag**: 350 DKK

**Note**: The current implementation matches the structured data values, not the
table ranges.

## How the Old Calculator Works

### Form Structure

- Uses WordPress plugin: **Calculated Fields Form**
  (cp_calculatedfieldsf_pform_1)
- Form ID: `cp_calculatedfieldsf_pform_1`
- Uses JavaScript-based equation evaluation system
- Fields are referenced as `fieldname[number]` in calculations

### Calculation System

1. **Equation Evaluation**: The plugin uses `EVALEQUATION()` and
   `EVALEQUATIONS()` functions
2. **Dynamic Updates**: Calculations update on field changes via `change keyup`
   events
3. **Dependency Tracking**: The system tracks field dependencies for
   calculations
4. **Form Processing**: Uses `fbuilderjQuery.fbuilder.calculator.defaultCalc()`
   for calculations

### Key JavaScript Functions Found

- `EVALEQUATION(_field, _form)` - Evaluates a single equation
- `EVALEQUATIONS(f)` - Evaluates all equations in a form
- `_getField(_field, _form)` - Gets field reference
- `lib.formsDependency` - Tracks field dependencies

## Calculation Formulas Found ✅

**UPDATE**: Successfully extracted the complete calculation formulas from the
minified JavaScript!

The formulas were found in the `form_structure_1` variable within the
`siteground-optimizer-combined-js` file. See **CALCULATION_FORMULAS.md** for
complete details.

### Summary of Calculation Logic:

1. **Base Price per m²**: Varies by tagtype (850, 800, 1600, 900, 1100,
   1400, 350)

2. **Form Adjustment**: Complex forms add +100 DKK/m²
    - Mansard tag, Pyramidetag, Halvvalmet tag, Helvalmet tag, Komplekt sadeltag

3. **Angle Adjustment**: If angle > 30°, add +15 DKK/m²

4. **Price per m²**: `basePrice + extraForm + extraAngle`

5. **Total Roof Cost**: `area × pricePerM2`

6. **Extras** (added separately, not multiplied):
    - Ovenlysvinduer: 2,995 DKK each
    - Kviste: 19,995 DKK each
    - Tagrender: 199 DKK per meter
    - Vindskeder: 99 DKK per meter

7. **Final Total**: `totalRoofCost + extrasCost`

## Recommendations

1. **Pricing Values**: ✅ Confirmed - Current implementation correctly uses the
   structured data values (850, 800, 1600, 900, 1100, 1400, 350)

2. **Calculation Logic**: ✅ **FOUND** - Complete formulas documented in
   `CALCULATION_FORMULAS.md`

3. **Implementation**: The formulas are ready to be implemented. Key points:
    - Form and angle adjustments are added to base price per m² (they scale with
      area)
    - Extras are fixed costs added separately (they don't scale with area)
    - Multiple tagtypes can be selected (each calculated separately)

4. **Next Steps**:
    - Review `CALCULATION_FORMULAS.md` for complete formula details
    - Map old field names to current implementation field IDs
    - Implement the calculation logic in your calculator
    - Test with known examples to verify accuracy
