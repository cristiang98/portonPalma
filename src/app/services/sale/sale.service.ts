import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ISale } from '../../models/sale/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  urlBase: string = 'http://localhost:443/sale/v1'
  private _httpSale = inject(HttpClient);

  constructor() { }

  successfulSale(): Observable<any> {
    return this._httpSale.get(`${this.urlBase}/successful`, {responseType: 'text' , withCredentials: true})
  }

  getSaleHistory(): Observable<ISale[]> {
    return this._httpSale.get<ISale[]>(`${this.urlBase}/history`, { withCredentials: true });
  }

}




