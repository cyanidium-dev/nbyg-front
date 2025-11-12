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