import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../models/product/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  urlBase: string = 'http://localhost:443/product/v1';

  private _httpProduct = inject(HttpClient);

  getProducts() : Observable<IProduct[]>{ 
    return this._httpProduct.get<IProduct[]>(this.urlBase);
  }

  getProductCategory(category: string) : Observable<IProduct>{
    return this._httpProduct.get<IProduct>(this.urlBase + category);
  }

  constructor() { }
}
