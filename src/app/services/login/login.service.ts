import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLoginRequest } from '../../models/user/user.model';
import { catchError } from 'rxjs/operators';
import { JwtDecoderService } from '../jwt_decoder/jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  // api personalities localhost:443/user/auth/
  private _httpLogin= inject(HttpClient);
  urlBase: string = 'http://localhost:443/user/auth'

  private _jwtDecoder = inject(JwtDecoderService);
  private nameJwt: string = '';

  constructor() {
    let currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  loginUser(user: UserLoginRequest): Observable<any> {
    return this._httpLogin.post<any>(`${this.urlBase}/login`, user, { observe: 'response', responseType: 'text' as 'json' })
      .pipe(map(response => {
        let token: string | null = null;
        const setCookieHeader = response.headers.get('Set-Cookie');
        if (setCookieHeader) {
          const cookies = setCookieHeader.split(';');
          for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].trim().startsWith('token=')) {
              token = cookies[i].split('=')[1];
              break;
            }
          }
        }

        // Si no se encontró el token en el encabezado Set-Cookie, busca en el cuerpo de la respuesta
        if (!token && response.body) {
          token = response.body;
        }

        if (token) {
          // injecta el servicio manual de decoder
          let decodedToken = this._jwtDecoder.decode(token);
          const user = {
            token: token,
            role: decodedToken.role,
            userEmail: decodedToken.userEmail,
            dni: decodedToken.dni,
            cart: decodedToken.cart,
            sub: decodedToken.sub,
            iat: decodedToken.iat,
            exp: decodedToken.exp
            // Agrega aquí cualquier otro claim que necesites
          };
          this.nameJwt = user.sub;
          // Almacena los claims del usuario en el localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return response;
      }));
    }

    logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }

    getName(): string {
      return this.nameJwt;
    }
}
