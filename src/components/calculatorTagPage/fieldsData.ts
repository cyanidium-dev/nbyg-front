export const fieldsData = [
    {
        id: "tagtype",
        type: "checkbox",
        title: "Tagtype",
        description:
            "Du kan vælge flere tagtyper samtidig – KLIK på ALLE de BILLEDER, du vil have med.",
        options: [
            {
                id: "staltag",
                label: "Ståltag",
                image: {
                    link: "/images/calculatorTagPage/staltag.webp",
                },
            },
            {
                id: "eternittag",
                label: "Eternittag",
                image: {
                    link: "/images/calculatorTagPage/eternittag.webp",
                },
            },
            {
                id: "skiferTag",
                label: "Skifer tag",
                image: {
                    link: "/images/calculatorTagPage/skiferTag.webp",
                },
            },
            {
                id: "tagpapTag",
                label: "Tagpap tag",
                image: {
                    link: "/images/calculatorTagPage/tagpapTag.webp",
                },
            },
            {
                id: "tegletag",
                label: "Tegltag",
                image: {
                    link: "/images/calculatorTagPage/tegletag.webp",
                },
            },
            {
                id: "traditionelDanskRødTegl",
                label: "Traditionel dansk rød tegl",
                image: {
                    link: "/images/calculatorTagPage/traditionelDanskRødTegl.webp",
                },
            },
            {
                id: "trapezogtermotag",
                label: "Trapez og termotag",
                image: {
                    link: "/images/calculatorTagPage/trapezogtermotag.webp",
                },
            },
        ],
    },
    {
        id: "tagform",
        type: "radio",
        title: "Vælg tagets form",
        options: [
            {
                id: "pulttag",
                label: "Pulttag",
                image: {
                    link: "/images/calculatorTagPage/pulttag.webp",
                },
            },
            {
                id: "sadeltag",
                label: "Sadeltag",
                image: {
                    link: "/images/calculatorTagPage/sadeltag.webp",
                },
            },
            {
                id: "pyramidetag",
                label: "Pyramidetag",
                image: {
                    link: "/images/calculatorTagPage/pyramidetag.webp",
                },
            },
            {
                id: "halvvalmettag",
                label: "Halvvalmet tag",
                image: {
                    link: "/images/calculatorTagPage/halvvalmettag.webp",
                },
            },
            {
                id: "helvalmettag",
                label: "Helvalmet tag",
                image: {
                    link: "/images/calculatorTagPage/helvalmettag.webp",
                },
            },
            {
                id: "komplektSadeltag",
                label: "Komplekt sadeltag",
                image: {
                    link: "/images/calculatorTagPage/komplektSadeltag.webp",
                },
            },
            {
                id: "mansardtTag",
                label: "Mansard tag",
                image: {
                    link: "/images/calculatorTagPage/mansardtTag.webp",
                },
            },
            {
                id: "fladtTag",
                label: "Fladt tag",
                image: {
                    link: "/images/calculatorTagPage/fladtTag.webp",
                },
            },
        ],
    },
    {
        id: "area",
        type: "area",
        title: "Angiv tagets størrelse i m²",
        description: "Angiv tagets areal i m² – eller brug skyderen nedenfor.",
        options: { min: 5, max: 500 },
    },
    {
        id: "hældning",
        type: "radio",
        title: "Vælg tagets hældning",
        options: [
            {
                id: "0-30 grader",
                label: "0-30 grader",
                image: {
                    link: "/images/calculatorTagPage/0-30grader.webp",
                },
            },
            {
                id: "30-45 grader",
                label: "30-45 grader",
                image: {
                    link: "/images/calculatorTagPage/45-60grader.webp",
                },
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
        options: [
            {
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
        options: [
            {
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
        hint: "Du kan sagtens springe dette felt over, hvis du ikke har målene lige ved hånden.",
    },
    {
        id: "antalMeterTagrender",
        type: "number",
        title: "Angiv antal meter tagrender",
        description:
            "Skriv cirka, hvor mange meter tagrender der er på dit hus.",
        hint: "Du kan sagtens springe dette felt over, hvis du ikke har målene lige ved hånden.",
    },
];
