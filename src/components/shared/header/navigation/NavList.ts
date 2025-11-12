export interface NavItem {
    label: string;
    href: string;
    dropdown?: boolean;
}
// keep as reference
export const mainNavList: NavItem[] = [
    {
        label: "Hjem",
        href: "/",
    },
    {
        label: "Byggeydelser",
        href: "/byggeydelser",
        dropdown: true,
    },
    {
        label: "Om os",
        href: "/om-os",
    },
    {
        label: "Galleri",
        href: "/galleri",
    },
    {
        label: "Blog",
        href: "/blog",
    },
];

export const servicesNavList: NavItem[] = [
    {
        label: "Renovering af badeværelse",
        href: "/renovering-af-adeværelse",
    },
    {
        label: "Renovering af lejlighed",
        href: "/renovering-af-lejlighed",
    },
    {
        label: "Totalrenovering af hus",
        href: "/totalrenovering-af-hus",
    },
];
