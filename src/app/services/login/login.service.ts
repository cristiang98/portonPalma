import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserLoginRequest } from '../../models/user/user.model';
import { catchError } from 'rxjs/operators';
import { JwtDecoderService } from '../jwt_decoder/jwt-decoder.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  // api personalities localhost:443/user/auth/
  private _httpLogin = inject(HttpClient);
  urlBase: string = 'http://localhost:443/user/auth'

  private _jwtDecoder = inject(JwtDecoderService);
  private nameJwt: string = '';

  private _jwtHelper = inject(JwtHelperService);
  private _cookieService = inject(CookieService);

  constructor() {
    let currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(currentUser ? JSON.parse(currentUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  loginUser(user: UserLoginRequest): Observable<any> {
    return this._httpLogin.post<any>(`${this.urlBase}/login`, user, { observe: 'response', responseType: 'text' as 'json', withCredentials: true })
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
            token: token, // Almacena el token de autenticación
            role: decodedToken.role, // Almacena el rol del usuario
            userEmail: decodedToken.userEmail, // Almacena el email del usuario
            dni: decodedToken.dni, // Almacena el DNI del usuario
            cart: decodedToken.cart, // Almacena el carrito del usuario
            sub: decodedToken.sub, // Almacena el nombre de usuario del token
            iat: decodedToken.iat, // Almacena la fecha de emisión del token
            exp: decodedToken.exp // Almacena la fecha de expiración del token
            // Agrega aquí cualquier otro claim que necesites
          };
          this.nameJwt = user.sub;
          // Almacena los claims del usuario en la cookie
          this._cookieService.set('token', JSON.stringify(user));
          // Almacena la fecha de expiración en la cookie
          this._cookieService.set('expires_at', JSON.stringify(decodedToken.exp));
          this.currentUserSubject.next(user);


        }

        return response;
      }));
  }

  logout() {
    return this._httpLogin.post<any>(`${this.urlBase}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => {
        // Limpiar los datos del usuario
        this._cookieService.delete('token');
        this._cookieService.delete('expires_at');
        this.currentUserSubject.next(null);
      }));
  }

  getName(): string {
    return this.nameJwt;
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const decodedToken = this._jwtDecoder.decode(token);
    return decodedToken ? decodedToken.role : null;
  }

  getToken(): string | null {
    if (!this.currentUserValue) {
      return null;
    }
    return this.currentUserValue.token;
  }

  isTokenExpired(): boolean {
    const token = this.getToken(); // Obtén el token de donde lo estás almacenando
    if (!token) {
      return true;
    }
    return this._jwtHelper.isTokenExpired(token);
  }


  isAdmin(): boolean {
    if (this.getRole() === 'ADMIN') {
      return true;
    }
    return false;
  }

  forgotPassword(emailRequest: {email: string}): Observable<any> {
    return this._httpLogin.post<any>(`${this.urlBase}/forgot-password`, emailRequest, { withCredentials: true });
  }

}
