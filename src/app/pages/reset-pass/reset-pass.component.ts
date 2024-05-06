import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent implements OnInit {

  recoverForm!: FormGroup;
  private _loginService = inject(LoginService);
  private _route = inject(ActivatedRoute);

  checkPasswords = (control: AbstractControl) => {
    let pass = control.get('password')?.value;
    let confirmPass = control.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    this.recoverForm = new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, { validators: this.checkPasswords });
  }


  hasErrors(field: string, typeError: string) {
    return this.recoverForm.get(field)?.hasError(typeError) && this.recoverForm.get(field)?.touched;
  }

  onResetPassword() {
    if (this.recoverForm.valid) {
      const token = this._route.snapshot.queryParams['token'];
      console.log('Token:', token);
      const passwordControl = this.recoverForm.get('password');
      if (passwordControl && passwordControl.value) {
        console.log('Password:', passwordControl.value);
        const newPasswordRequest = { newPassword: passwordControl.value };
        this._loginService.resetPassword(token, newPasswordRequest).subscribe(
          response => {
            console.log('Response:', response);
          },
          error => {
            console.error('Error:', error);
          }
        );
      } else {
        console.error('No se pudo obtener el control de la contraseña del formulario o la contraseña es nula');
      }
    } else {
      console.error('Form is not valid');
    }
  }
}
