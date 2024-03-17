import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IHorse } from '../../models/horse/horse.model';

@Injectable({
  providedIn: 'root'
})
export class ApiHorsesService {

  urlBase: string = 'http://localhost:443/horse/v1';

  private _httpHorse = inject(HttpClient);

  getHorses() :Observable<IHorse[]>{
    return this._httpHorse.get<IHorse[]>(this.urlBase);
  }

  getHorseBreed(breed: string) :Observable<IHorse>{
    return this._httpHorse.get<IHorse>(this.urlBase  + breed);
  }

  constructor() { }
}
