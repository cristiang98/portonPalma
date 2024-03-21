export interface IProduct {
    "nameProduct": string,
    "description": string,
    "price": number,
    "stock": number,
    "imagePath": string,
    "category": Category
}


export enum Category {

    ALIMENTACION = "Alimentación",
    CUIDADOS = "Cuidados",
    UTILIDADES = "Utilidades",

}