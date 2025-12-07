# Roof Calculator - Calculation Formulas

## Overview

Found the complete calculation formulas in the minified JavaScript. The formulas
are written in JavaScript and calculate the total roof price based on multiple
factors.

## Field Mappings

Based on the formulas found, here are the field name mappings:

- `fieldname21` - Area (m²)
- `fieldname16` - Tagtype selection (1 or 15 = selected)
- `fieldname40` - Ståltag price (850)
- `fieldname41` - Eternittag price (800)
- `fieldname111` - Skifer tag price (1600)
- `fieldname44` - Tagpap tag price (900)
- `fieldname45` - Tegltag price (1100)
- `fieldname117` - Traditionel dansk rød tegl price (1400)
- `fieldname130` - Trapez og termotag price (350)
- `fieldname106` - Roof form (tagform)
- `fieldname17` - Roof angle/slope (hældning)
- `fieldname86` - Roof window dropdown (0-20)
- `fieldname89` - Roof window number input (>20)
- `fieldname93` - Kviste dropdown (0-6)
- `fieldname94` - Kviste number input (>6)
- `fieldname99` - Gutter meters (antalMeterTagrender)
- `fieldname104` - Wind board meters (antalMeterVindskeder)

## Calculation Formula

The formula is the same for all roof types, with only the `basePrice` changing:

```javascript
// Area
const area = parseFloat(fieldname21) || 0;

// Base price per m² (varies by tagtype)
const basePrice = [850 | 800 | 1600 | 900 | 1100 | 1400 | 350]; // Depends on selected tagtype

// Roof form
const form = fieldname106;
const formsWithExtra = [
    "Mansard tag",
    "Pyramidetag",
    "Halvvalmet tag",
    "Helvalmet tag",
    "Komplekt sadeltag",
];
const extraForm = formsWithExtra.includes(form) ? 100 : 0;

// Roof angle
const angle = parseInt(fieldname17) || 0;
const extraAngle = angle > 30 ? 15 : 0;

// Calculate price per m² with adjustments for form and angle
const pricePerM2 = basePrice + extraForm + extraAngle;

// Total roof cost based on area
const totalRoofCost = area * pricePerM2;

// Additional features (added separately, NOT multiplied)
const roofWindowDropdown = parseInt(fieldname86) || 0;
const roofWindowNumber = parseInt(fieldname89) || 0;
const totalWindows =
    roofWindowNumber > 20 ? roofWindowNumber : roofWindowDropdown;
const windowsCost = totalWindows >= 1 ? totalWindows * 2995 : 0;

const kvistDropdown = parseInt(fieldname93) || 0;
const kvistNumber = parseInt(fieldname94) || 0;
const totalKvists = kvistNumber > 20 ? kvistNumber : kvistDropdown;
const kvistsCost = totalKvists >= 1 ? totalKvists * 19995 : 0;

const gutter = parseFloat(fieldname99) || 0;
const gutterCost = gutter * 199;

const wind = parseFloat(fieldname104) || 0;
const windCost = wind * 99;

// Extras cost (simply added, NOT multiplied)
const extrasCost = windowsCost + kvistsCost + gutterCost + windCost;

// Final total
const total = totalRoofCost + extrasCost;
```

## Pricing Data

### Base Prices per m² (by tagtype)

- **Ståltag**: 850 DKK
- **Eternittag**: 800 DKK
- **Skifer tag**: 1600 DKK
- **Tagpap tag**: 900 DKK
- **Tegltag**: 1100 DKK
- **Traditionel dansk rød tegl**: 1400 DKK
- **Trapez og termotag**: 350 DKK

### Form Adjustments

Complex roof forms add **+100 DKK per m²**:

- Mansard tag
- Pyramidetag
- Halvvalmet tag
- Helvalmet tag
- Komplekt sadeltag

### Angle Adjustments

If roof angle > 30 degrees: **+15 DKK per m²**

### Additional Features (Fixed Prices)

- **Ovenlysvinduer (Roof windows)**: 2,995 DKK each
- **Kviste (Dormers)**: 19,995 DKK each
- **Tagrender (Gutters)**: 199 DKK per meter
- **Vindskeder (Wind boards)**: 99 DKK per meter

## Calculation Summary

1. **Base Price Calculation**:

    ```
    pricePerM2 = basePrice + (complexForm ? 100 : 0) + (angle > 30 ? 15 : 0)
    ```

2. **Roof Cost**:

    ```
    totalRoofCost = area × pricePerM2
    ```

3. **Extras Cost**:

    ```
    extrasCost = (windows × 2995) + (kviste × 19995) + (gutters × 199) + (windBoards × 99)
    ```

4. **Final Total**:
    ```
    total = totalRoofCost + extrasCost
    ```

## Important Notes

1. **Extras are added, not multiplied**: The additional features (windows,
   kviste, gutters, wind boards) are added as fixed costs, not multiplied by the
   area.

2. **Form and angle adjustments**: These are added to the base price per m², so
   they scale with the area.

3. **Multiple tagtypes**: The old form seems to support selecting multiple
   tagtypes, but each has its own calculation field. The final price would
   likely be the sum of all selected tagtypes.

4. **Field name differences**: The current implementation uses different field
   IDs, so you'll need to map these to your current field structure.
