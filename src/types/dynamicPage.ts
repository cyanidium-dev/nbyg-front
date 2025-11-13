export interface DynamicPage {
    title: string;
    slug: string;
    menuOrder: number;
    children?: DynamicPage[];
}