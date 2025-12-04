export const fieldsData = {
    materialtype: [
        {
            id: "wood",
            value: "wood",
            label: "Træterrasse",
            image: "/images/calculator-terrasser/type-wood.webp",
        },
        {
            id: "stone",
            value: "stone",
            label: "Stenterrasse",
            image: "/images/calculator-terrasser/type-stone.webp",
        },
        {
            id: "composite",
            value: "composite",
            label: "Kompositterrasse",
            image: "/images/calculator-terrasser/type-composite.webp",
        },
        {
            id: "tiled",
            value: "tiled",
            label: "Fliseterrasse",
            image: "/images/calculator-terrasser/type-tiled.webp",
        },
    ],
    wood: [
        {
            sectionTitle: "Vælg træsort",
            id: "type",
            fields: [
                {
                    id: "pine",
                    label: "Trykimprægneret fyrretræ",
                    image: "wood-pine.webp",
                    value: 895,
                },
                {
                    id: "brownwood",
                    label: "Brunimprægneret træ",
                    image: "wood-brownwood.webp",
                    value: 995,
                },
                {
                    id: "hardwood",
                    label: "Hårdttræ (fx Lærketræ, Douglastræ)",
                    image: "wood-hardwood.webp",
                    value: 1195,
                },
            ],
        },
        {
            sectionTitle: "Montering – skruemetode",
            id: "mounting",
            description:
                "Vælg den monteringstype, der passer bedst til dit ønskede udtryk",
            fields: [
                {
                    id: "screws",
                    label: "Synlige skruer – ovenfra",
                    image: "wood-screws.webp",
                    value: 0,
                },
                {
                    id: "side-screws",
                    label: "Skruet fra siden",
                    image: "wood-side-screws.webp",
                    value: 30,
                },
                {
                    id: "hidden",
                    label: "Skjulte skruer med propper",
                    image: "wood-hidden.webp",
                    value: 150,
                },
            ],
        },
    ],
    stone: [
        {
            sectionTitle: "Vælg materiale",
            id: "type",
            fields: [
                {
                    id: "natural",
                    label: "Natursten",
                    image: "stone-natural.webp",
                    value: 1295,
                },
                {
                    id: "paving",
                    label: "Chaussesten / brosten",
                    image: "stone-paving.webp",
                    value: 1195,
                },
                {
                    id: "shards",
                    label: "Skærver",
                    image: "stone-shards.webp",
                    value: 495,
                },
            ],
        },
    ],
    composite: [
        {
            sectionTitle: "Vælg materiale",
            id: "type",
            fields: [
                {
                    id: "wood-plastic",
                    label: "Træ-plast komposit",
                    image: "composite-wood-plastic.webp",
                    value: 1295,
                },
                {
                    id: "solid",
                    label: "Massiv komposit",
                    image: "composite-solid.webp",
                    value: 1055,
                },
                {
                    id: "hollow",
                    label: "Hulrum komposit",
                    image: "composite-hollow.webp",
                    value: 1095,
                },
                {
                    id: "extruded",
                    label: "Co-extruderet komposit",
                    image: "composite-extruded.webp",
                    value: 1455,
                },
                {
                    id: "bamboo",
                    label: "Bambuskomposit",
                    image: "composite-bamboo.webp",
                    value: 1795,
                },
            ],
        },
    ],
    tiled: [
        {
            sectionTitle: "Vælg flisetype",
            id: "type",
            fields: [
                {
                    id: "concrete",
                    label: "Betonfliser",
                    image: "tiled-concrete.webp",
                    value: 795,
                },
                {
                    id: "brick",
                    label: "Klinkerfliser",
                    image: "tiled-brick.webp",
                    value: 1095,
                },
                {
                    id: "granite",
                    label: "Granitfliser",
                    image: "tiled-granite.webp",
                    value: 1495,
                },
            ],
        },
        {
            sectionTitle: "Flisestørrelse",
            id: "size",
            fields: [
                {
                    id: "small",
                    label: "Op til og med 30×30",
                    image: "tiled-med-30.webp",
                    value: 0,
                },
                {
                    id: "medium",
                    label: "40×40–60×60",
                    image: "tiled-40-60.webp",
                    value: 200,
                },
                {
                    id: "big",
                    label: "Større end 60×60",
                    image: "tiled-60.webp",
                    value: 300,
                },
            ],
        },
    ],
    padding: [
        {
            sectionTitle: "Bund",
            id: "padding",
            fields: [
                {
                    id: "with",
                    label: "Med ukrudtsdug – forhindrer ukrudt under terrassen",
                    image: "with-padding.webp",
                    value: 50,
                },
                {
                    id: "without",
                    label: "Uden ukrudtsdug",
                    image: "without-padding.webp",
                    value: 0,
                },
            ],
        },
    ],
};
