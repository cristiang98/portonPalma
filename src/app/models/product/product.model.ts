export interface IProduct {
    "idProduct"?: number,
    "nameProduct": string,
    "description": string,
    "price": number,
    "stock": number,
    "imagePath"?: string,
    "category": Category
}


export enum Category {

    ALIMENTACION = "ALIMENTACION",
    CUIDADOS = "CUIDADOS",
    UTILIDADES = "UTILIDADES",

}