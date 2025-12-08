export const fieldsData = [
    {
        id: "tagtype",
        type: "checkbox",
        title: "Tagtype",
        description:
            "Du kan vælge flere tagtyper samtidig – KLIK på ALLE de BILLEDER, du vil have med.",
        summaryLabel: "Tagtype",
        options: [
            {
                id: "staltag",
                label: "Ståltag",
                image: {
                    link: "/images/calculatorTagPage/staltag.webp",
                    priority: true,
                },
                price: 850,
            },
            {
                id: "eternittag",
                label: "Eternittag",
                image: {
                    link: "/images/calculatorTagPage/eternittag.webp",
                    priority: true,
                },
                price: 800,
            },
            {
                id: "skiferTag",
                label: "Skifer tag",
                image: {
                    link: "/images/calculatorTagPage/skiferTag.webp",
                    priority: true,
                },
                price: 1600,
            },
            {
                id: "tagpapTag",
                label: "Tagpap tag",
                image: {
                    link: "/images/calculatorTagPage/tagpapTag.webp",
                    priority: true,
                },
                price: 900,
            },
            {
                id: "tegletag",
                label: "Tegltag",
                image: {
                    link: "/images/calculatorTagPage/tegletag.webp",
                    priority: true,
                },
                price: 1100,
            },
            {
                id: "traditionelDanskRodTegl",
                label: "Traditionel dansk rød tegl",
                image: {
                    link: "/images/calculatorTagPage/traditionelDanskRodTegl.webp",
                    priority: true,
                },
                price: 1400,
            },
            {
                id: "trapezogtermotag",
                label: "Trapez og termotag",
                image: {
                    link: "/images/calculatorTagPage/trapezogtermotag.webp",
                    priority: true,
                },
                price: 350,
            },
        ],
    },
    {
        id: "tagform",
        type: "radio",
        title: "Vælg tagets form",
        summaryLabel: "Tagets form",
        options: [
            {
                id: "pulttag",
                label: "Pulttag",
                image: {
                    link: "/images/calculatorTagPage/pulttag.webp",
                },
                price: 0,
            },
            {
                id: "sadeltag",
                label: "Sadeltag",
                image: {
                    link: "/images/calculatorTagPage/sadeltag.webp",
                },
                price: 0,
            },
            {
                id: "pyramidetag",
                label: "Pyramidetag",
                image: {
                    link: "/images/calculatorTagPage/pyramidetag.webp",
                },
                price: 100,
            },
            {
                id: "halvvalmettag",
                label: "Halvvalmet tag",
                image: {
                    link: "/images/calculatorTagPage/halvvalmettag.webp",
                },
                price: 100,
            },
            {
                id: "helvalmettag",
                label: "Helvalmet tag",
                image: {
                    link: "/images/calculatorTagPage/helvalmettag.webp",
                },
                price: 100,
            },
            {
                id: "komplektSadeltag",
                label: "Komplekt sadeltag",
                image: {
                    link: "/images/calculatorTagPage/komplektSadeltag.webp",
                },
                price: 100,
            },
            {
                id: "mansardtTag",
                label: "Mansard tag",
                image: {
                    link: "/images/calculatorTagPage/mansardtTag.webp",
                },
                price: 100,
            },
            {
                id: "fladtTag",
                label: "Fladt tag",
                image: {
                    link: "/images/calculatorTagPage/fladtTag.webp",
                },
                price: 0,
            },
        ],
    },
    {
        id: "area",
        type: "area",
        title: "Angiv tagets størrelse i m²",
        description: "Angiv tagets areal i m² – eller brug skyderen nedenfor.",
        summaryLabel: "Tagets størrelse",
        options: { min: 50, max: 500 },
    },
    {
        id: "hældning",
        type: "radio",
        title: "Vælg tagets hældning",
        summaryLabel: "Tagets hældning",
        options: [
            {
                id: "0-30 grader",
                label: "0-30 grader",
                image: {
                    link: "/images/calculatorTagPage/0-30grader.webp",
                },
                price: 0,
            },
            {
                id: "31-50 grader",
                label: "31-50 grader",
                image: {
                    link: "/images/calculatorTagPage/31-50grader.webp",
                },
                price: 15,
            },
            {
                id: "graderChart",
                type: "image",
                label: "Taghældning i grader – klik for større billede",
                image: {
                    link: "/images/calculatorTagPage/graderChart.webp",
                },
            },
            {
                id: "indtastGrader",
                label: "Indtast den præcise taghældning, hvis den er over 31 grader",
                type: "number",
                variant: "hidden",
                min: 31,
                max: 50,
            },
        ],
    },
    {
        id: "antalOvenlysvinduer",
        type: "dropdown",
        title: "Vælg antal ovenlysvinduer",
        description: "Vejledende pris for montering, ekskl. vinduets pris.",
        summaryLabel: "Antal ovenlysvinduer",
        price: 2995,
        options: [
            {
                type: "select",
                min: 0,
                max: 20,
                step: 1,
            },
            {
                id: "indtastAntalVinduer",
                label: "Indtast det præcise antal vinduer, hvis du har mere end 20",
                type: "number",
                variant: "hidden",
                min: 21,
            },
        ],
    },
    {
        id: "antalKviste",
        type: "dropdown",
        title: "Vælg antal kviste",
        summaryLabel: "Antal kviste",
        price: 19995,
        options: [
            {
                type: "select",
                min: 0,
                max: 6,
                step: 1,
            },
            {
                id: "indtastAntalKviste",
                label: "Indtast antal, hvis over 6 kviste",
                type: "number",
                variant: "hidden",
                min: 7,
            },
        ],
    },
    {
        id: "antalMeterVindskeder",
        type: "number",
        title: "Angiv antal meter vindskeder",
        description:
            "Skriv cirka, hvor mange meter vindskeder der er på dit tag.",
        summaryLabel: "Meter vindskeder",
        hint: "Du kan sagtens springe dette felt over, hvis du ikke har målene lige ved hånden.",
        price: 99,
    },
    {
        id: "antalMeterTagrender",
        type: "number",
        title: "Angiv antal meter tagrender",
        description:
            "Skriv cirka, hvor mange meter tagrender der er på dit hus.",
        summaryLabel: "Meter tagrender",
        hint: "Du kan sagtens springe dette felt over, hvis du ikke har målene lige ved hånden.",
        price: 199,
    },
];
