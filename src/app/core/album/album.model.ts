import { Photo } from "./photo.model";

export interface Album{
    id: string,
    title: string,
    order: number,
    photos: Photo[]
}