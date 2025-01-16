import { Package } from "./package.model";

export interface Pricing{
    title: string,
    description: string,
    imageUrl: string,
    packages: Package[],
}