import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { IUser } from '../../models/userRegister/userRegister.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // api personalities localhost:443/user/auth/
  private _httpRegister = inject(HttpClient);
  urlBaseRegister: string = 'http://localhost:443/user/auth'

  registerUser(user: any): Observable<any> {
    return this._httpRegister.post<IUser>(`${this.urlBaseRegister}/register`, user);
  }


  // api-colombia.com is a free API that provides information about Colombia, such as departments, cities, and more.
  private _httpCountry = inject(HttpClient);
  urlBaseCountry: string = 'https://api-colombia.com/api/v1/Country/Colombia'
  urlBaseDepartment: string = 'https://api-colombia.com/api/v1/Department/2'
  urlBaseCities: string = 'https://api-colombia.com/api/v1/Department/2/cities'


  getCountries(): Observable<any> {
    return this._httpCountry.get<any>(this.urlBaseCountry);
  }

  getDepartments(): Observable<any> {
    return this._httpCountry.get<any>(this.urlBaseDepartment);
  }

  getCities(): Observable<any> {
    return this._httpCountry.get<any>(this.urlBaseCities);
  }


  constructor() { }
}
