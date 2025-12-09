export const fieldsData = {
    materialtype: [
        {
            id: "wood",
            value: "wood",
            label: "Træterrasse",
            image: {
                link: "/images/calculatorTerrasserPage/type-wood.webp",
                priority: true,
            },
        },
        {
            id: "stone",
            value: "stone",
            label: "Stenterrasse",
            image: {
                link: "/images/calculatorTerrasserPage/type-stone.webp",
                priority: true,
            },
        },
        {
            id: "composite",
            value: "composite",
            label: "Kompositterrasse",
            image: {
                link: "/images/calculatorTerrasserPage/type-composite.webp",
                priority: true,
            },
        },
        {
            id: "tiled",
            value: "tiled",
            label: "Fliseterrasse",
            image: {
                link: "/images/calculatorTerrasserPage/type-tiled.webp",
                priority: true,
            },
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
                    image: {
                        link: "/images/calculatorTerrasserPage/wood-pine.webp",
                    },
                    value: 895,
                },
                {
                    id: "brownwood",
                    label: "Brunimprægneret træ",
                    image: {
                        link: "/images/calculatorTerrasserPage/wood-brownwood.webp",
                    },
                    value: 995,
                },
                {
                    id: "hardwood",
                    label: "Hårdttræ (fx Lærketræ, Douglastræ)",
                    image: {
                        link: "/images/calculatorTerrasserPage/wood-hardwood.webp",
                    },
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
                    image: {
                        link: "/images/calculatorTerrasserPage/wood-screws.webp",
                    },
                    value: 0,
                },
                {
                    id: "side-screws",
                    label: "Skruet fra siden",
                    image: {
                        link: "/images/calculatorTerrasserPage/wood-side-screws.webp",
                    },
                    value: 30,
                },
                {
                    id: "hidden",
                    label: "Skjulte skruer med propper",
                    image: {
                        link: "/images/calculatorTerrasserPage/wood-hidden.webp",
                    },
                    value: 150,
                },
            ],
        },
    ],
    stone: [
        {
            sectionTitle: "Vælg stenmateriale",
            id: "type",
            fields: [
                {
                    id: "natural",
                    label: "Natursten",
                    image: {
                        link: "/images/calculatorTerrasserPage/stone-natural.webp",
                    },
                    value: 1295,
                },
                {
                    id: "paving",
                    label: "Chaussesten / brosten",
                    image: {
                        link: "/images/calculatorTerrasserPage/stone-paving.webp",
                    },
                    value: 1195,
                },
                {
                    id: "shards",
                    label: "Skærver",
                    image: {
                        link: "/images/calculatorTerrasserPage/stone-shards.webp",
                    },
                    value: 495,
                },
            ],
        },
    ],
    composite: [
        {
            sectionTitle: "Vælg komposit",
            id: "type",
            fields: [
                {
                    id: "wood-plastic",
                    label: "Træ-plast komposit",
                    image: {
                        link: "/images/calculatorTerrasserPage/composite-wood-plastic.webp",
                    },
                    value: 1345,
                },
                {
                    id: "solid",
                    label: "Massiv komposit",
                    image: {
                        link: "/images/calculatorTerrasserPage/composite-solid.webp",
                    },
                    value: 1095,
                },
                {
                    id: "hollow",
                    label: "Hulrum komposit",
                    image: {
                        link: "/images/calculatorTerrasserPage/composite-hollow.webp",
                    },
                    value: 1145,
                },
                {
                    id: "extruded",
                    label: "Co-extruderet komposit",
                    image: {
                        link: "/images/calculatorTerrasserPage/composite-extruded.webp",
                    },
                    value: 1495,
                },
                {
                    id: "bamboo",
                    label: "Bambuskomposit",
                    image: {
                        link: "/images/calculatorTerrasserPage/composite-bamboo.webp",
                    },
                    value: 1845,
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
                    image: {
                        link: "/images/calculatorTerrasserPage/tiled-concrete.webp",
                    },
                    value: 845,
                },
                {
                    id: "brick",
                    label: "Klinkerfliser",
                    image: {
                        link: "/images/calculatorTerrasserPage/tiled-brick.webp",
                    },
                    value: 1145,
                },
                {
                    id: "granite",
                    label: "Granitfliser",
                    image: {
                        link: "/images/calculatorTerrasserPage/tiled-granite.webp",
                    },
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
                    image: {
                        link: "/images/calculatorTerrasserPage/tiled-med-30.webp",
                    },
                    value: 0,
                },
                {
                    id: "medium",
                    label: "40×40–60×60",
                    image: {
                        link: "/images/calculatorTerrasserPage/tiled-40-60.webp",
                    },
                    value: 200,
                },
                {
                    id: "big",
                    label: "Større end 60×60",
                    image: {
                        link: "/images/calculatorTerrasserPage/tiled-60.webp",
                    },
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
                    image: {
                        link: "/images/calculatorTerrasserPage/with-padding.webp",
                    },
                    value: 50,
                },
                {
                    id: "without",
                    label: "Uden ukrudtsdug",
                    image: {
                        link: "/images/calculatorTerrasserPage/without-padding.webp",
                    },
                    value: 0,
                },
            ],
        },
    ],
};
