import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../models/product/product.model';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  urlBase: string = 'http://localhost:443/product/v1';

  private _httpProduct = inject(HttpClient);
  private productsUpdated = new Subject<IProduct[]>();

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProducts() : Observable<IProduct[]>{ 
    return this._httpProduct.get<IProduct[]>(this.urlBase);
  }

  getProductCategory(category: string) : Observable<IProduct>{
    return this._httpProduct.get<IProduct>(this.urlBase + category);
  }

  addProduct( file: File, product: IProduct,): Observable<any> {
    const formData: FormData = new FormData();
  
    // Agrega el archivo al formData
    formData.append('file', file, file.name);
  
    // Crea una copia del objeto horse para no modificar el original
    const productCopy = { ...product };
  
    // Elimina la propiedad imagePath del objeto horse
    productCopy.imagePath = undefined;
  
    // Agrega el objeto horse al formData
    formData.append('product', new Blob([JSON.stringify(productCopy)], {
      type: "application/json"
    }));
  

  
    return this._httpProduct.post(this.urlBase + "/upload", formData , {withCredentials: true});
    
  }

  deleteProduct(idProduct: number): Observable<any> {
    return this._httpProduct.delete<any>(`${this.urlBase}/delete/${idProduct}`, {withCredentials: true});
  }

  putProduct(id: number, product: IProduct, file: File): Observable<any> {
    const formData: FormData = new FormData();
  
    // Agrega el archivo al formData
    formData.append('file', file, file.name);
  
    // Crea una copia del objeto horse para no modificar el original
    const productCopy = { ...product };
  
    // Elimina la propiedad imagePath del objeto horse
    productCopy.imagePath = undefined;
  
    // Agrega el objeto horse al formData
    formData.append('product', new Blob([JSON.stringify(productCopy)], {
      type: "application/json"
    }));
  

  
    return this._httpProduct.put(`${this.urlBase}/put/${id}`, formData , {withCredentials: true}).pipe(
      tap(() => {
        this.getProducts().subscribe((products: IProduct[]) => {
          this.productsUpdated.next(products);
        });
      })
    );
    
  }

  putproductWithoutImage(id: number, product: IProduct): Observable<any> {
    return this._httpProduct.put(`${this.urlBase}/put/${id}`, product , {withCredentials: true});
  }

  constructor() { }
}
