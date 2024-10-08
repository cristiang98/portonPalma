export interface SaleInf {
    id: number;
    total: number;
    userEmail: string;
    dni: string;
    address: string;
    items: ProductDto[];
    date: string; // Las fechas se suelen manejar como strings en TypeScript/JavaScript
  }
  
  export interface ProductDto {
    idProduct: number;
    nameProduct: string;
    description: string;
    price: number;
    stock: number;
    imagePath: string;
    quantity: number;
    category: Category;
  }
  
  export enum Category {
    // Aquí debes definir las categorías de acuerdo con el enum Category en tu backend
    ALIMENTACION = "ALIMENTACION",
    CUIDADOS = "CUIDADOS",
    UTILIDADES = "UTILIDADES",
  }