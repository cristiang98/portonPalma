import { IProduct } from "../product/product.model";

export interface ICart {
    idCart?: number;
    items: {[key: string]: number};
    total: number;
}