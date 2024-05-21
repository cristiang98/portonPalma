import { IProduct } from "../product/product.model";

export interface ISale {
    id?: number;
    total?: number;
    userEmail?: string;
    dni?: string;
    items?: IProduct[];
    date?: string;
}