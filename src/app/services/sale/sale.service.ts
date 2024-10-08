import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ISale } from '../../models/sale/sale.model';
import { SaleInf } from '../../models/myHistory/saleInf.model';

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

  getSaleHistory(): Observable<SaleInf[]> {
    return this._httpSale.get<SaleInf[]>(`${this.urlBase}/history`, { withCredentials: true });
  }

  getMyHistory(): Observable<SaleInf[]> {
    return this._httpSale.get<SaleInf[]>(`${this.urlBase}/my-history`, { withCredentials: true });
  }

}




