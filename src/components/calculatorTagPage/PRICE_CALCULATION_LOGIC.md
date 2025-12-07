# Price Calculation Logic from Old Page

## Price Data Found

Based on the structured data (JSON-LD) in the old HTML page, here are the prices
per m² for each tag type:

| Tag Type                   | Price per m² (kr.) |
| -------------------------- | ------------------ |
| Ståltag                    | 850                |
| Eternittag                 | 800                |
| Skifer tag                 | 1600               |
| Tagpap tag                 | 900                |
| Tegltag                    | 1100               |
| Traditionel dansk rød tegl | 1400               |
| Trapez og termotag         | 350                |

## Calculation Logic

The old page uses a WordPress plugin called "Calculated Fields Form"
(cp_calculatedfieldsf) with a calculated field (#fieldname105).

### Expected Calculation Formula

Since the form allows **multiple checkbox selections** for tag types, the
calculation should be:

```
Total Price = Area (m²) × Sum of selected tag type prices per m²
```

For example:

- If user selects "Ståltag" (850 kr/m²) and "Eternittag" (800 kr/m²) for 100 m²:
    - Total = 100 × (850 + 800) = 100 × 1650 = 165,000 kr.

### Additional Factors (from old page context)

The old page mentions these factors that might affect pricing:

- Tagets stand (roof condition)
- Hældning (roof pitch/slope)
- Eventuelle tillægsopgaver (additional tasks)
- Ovenlysvinduer (skylights)
- Kviste (dormers)
- Vindskeder (gables)
- Tagrender (gutters)

## Implementation Notes

1. **Checkbox handling**: Multiple tag types can be selected, so prices should
   be summed
2. **Area**: Base calculation uses area in m²
3. **Additional features**: Ovenlysvinduer, kviste, vindskeder, and tagrender
   likely have fixed or per-unit prices that should be added to the base
   calculation

## Next Steps

To implement the calculation in the new TagCalculator:

1. Create a price mapping object with the prices above
2. For each selected tag type in the checkbox array, sum their prices
3. Multiply by area
4. Add additional costs for:
    - Ovenlysvinduer (skylights)
    - Kviste (dormers)
    - Vindskeder (gables - meters)
    - Tagrender (gutters - meters)
5. Display the total in the CalculatedPrice component
