import { IProduct } from "../product/product.model";

export interface ISale {
    id?: number;
    total?: number;
    email?: string;
    dni?: string;
    products?: IProduct[];
    date?: string;
}