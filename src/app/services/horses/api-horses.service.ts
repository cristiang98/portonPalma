import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IHorse } from '../../models/horse/horse.model';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiHorsesService {

  urlBase: string = 'http://localhost:443/horse/v1';

  private _httpHorse = inject(HttpClient);
  private _loginService = inject(LoginService);

  getHorses() :Observable<IHorse[]>{
    return this._httpHorse.get<IHorse[]>(this.urlBase);
  }

  getHorseBreed(breed: string) :Observable<IHorse>{
    return this._httpHorse.get<IHorse>(this.urlBase  + breed);
  }

  

  addHorse(horse: IHorse, file: File): Observable<any> {
    const formData: FormData = new FormData();
  
    // Agrega el archivo al formData
    formData.append('file', file, file.name);
  
    // Crea una copia del objeto horse para no modificar el original
    const horseCopy = { ...horse };
  
    // Elimina la propiedad imagePath del objeto horse
    horseCopy.imagePath = undefined;
  
    // Agrega el objeto horse al formData
    formData.append('horse', new Blob([JSON.stringify(horseCopy)], {
      type: "application/json"
    }));
  

  
    return this._httpHorse.post(this.urlBase + "/upload", formData , {withCredentials: true});
    
  }

  deleteHorse(idHorse: number): Observable<any> {
    return this._httpHorse.delete<any>(`${this.urlBase}/delete/${idHorse}`, {withCredentials: true});
  }

  putHorse(id: number, horse: IHorse, file: File): Observable<any> {
    const formData: FormData = new FormData();

    // Agrega el archivo al formData
    formData.append('file', file, file.name);

    // Crea una copia del objeto horse para no modificar el original
    const horseCopy = { ...horse };

    // Elimina la propiedad imagePath del objeto horse
    horseCopy.imagePath = undefined;

    // Agrega el objeto horse al formData
    formData.append('horse', new Blob([JSON.stringify(horseCopy)], {
        type: "application/json"
    }));

    
    

    return this._httpHorse.put(`${this.urlBase}/put/${id}`, formData, {withCredentials: true});
    
}

  constructor() { }
  
}
