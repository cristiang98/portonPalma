import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/userService/user-service.service';
import { catchError, of, tap } from 'rxjs';
import { JwtDecoderService } from '../../services/jwt_decoder/jwt-decoder.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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


  constructor() { }

  login() {

    console.log(this.email, this.password)

    this._loginService.loginUser({ email: this.email, password: this.password }).subscribe(res => {
      console.log(res)
      this._router.navigate(['/home']);
      const decoder = this._jwtDecoder.decode(res.body);
      console.log(decoder)
    })


  }
}
