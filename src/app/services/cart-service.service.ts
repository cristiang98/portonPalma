import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../models/product/product.model';
import { ICart } from '../models/cart/cart.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  urlBase: string = 'http://localhost:443/cart/v1'
  private _httpCart = inject(HttpClient);
  private cartSubject = new BehaviorSubject<ICart | null>(null);

  constructor() { }

  addProductToCart(idProduct: number): Observable<any> {
    return this._httpCart.put(`${this.urlBase}/add-product?idProduct=${idProduct}`, {}, {withCredentials: true}).pipe(
      tap(() => {
        this._httpCart.get<ICart>(`${this.urlBase}/my-cart`, {withCredentials: true}).subscribe(cart => {
          this.cartSubject.next(cart);
        });
      })
    );
  }

  updateCart(): Observable<any> {
    return this.cartSubject.asObservable();
  }

  getCart(): Observable<ICart> {
    return this._httpCart.get<ICart>(`${this.urlBase}/my-cart`, {withCredentials: true});
  }

  removeItem(nameProduct: string): Observable<any> {
    return this._httpCart.put(`${this.urlBase}/delete-product?nameProduct=${nameProduct}`,{}, {withCredentials: true});
  }

  emptyCart(token: string): Observable<any> {
    if (!token) {
        throw new Error('Token is undefined or null');
    }
    const params = new HttpParams().set('token', token);
    return this._httpCart.put(`${this.urlBase}/empty-cart`, {}, { params, withCredentials: true });
}

}
