import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/userService/user-service.service';
import { catchError, of, tap } from 'rxjs';
import { JwtDecoderService } from '../../services/jwt_decoder/jwt-decoder.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private _loginService = inject(LoginService);
  private _router = inject(Router);
  private _userService = inject(UserServiceService);
  private _jwtDecoder = inject(JwtDecoderService);
  private _snackBar = inject(MatSnackBar);


  constructor() { }

  login() {
    console.log(this.email, this.password)
  
    this._loginService.loginUser({ email: this.email, password: this.password }).pipe(
      catchError(error => {
        if (error.status === 500) { // Asume que el servidor devuelve un estado 401 para credenciales incorrectas
          this._snackBar.open('No se pudo iniciar sesión. Usuario o contraseña incorrectos.', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'my-snackbar',
          });
        } else {
          this._snackBar.open('Ocurrió un error al intentar iniciar sesión.', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'my-snackbar',
          });
        }
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        console.log(res)
        this._router.navigate(['/home']);
        const decoder = this._jwtDecoder.decode(res.body);
        console.log(decoder)
      }
    });
  }
}
