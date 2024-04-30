import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, NgClass, ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent implements OnInit {

  recoverForm!: FormGroup;
  private _httpLogin = inject(HttpClient);
  private _loginService = inject(LoginService);

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  hasErrors(field: string, typeError: string) {
    return this.recoverForm.get(field)?.hasError(typeError) && this.recoverForm.get(field)?.touched;
  }



  onForgotPassword() {
    if (this.recoverForm.valid) {
      const emailRequest = { email: this.recoverForm.get('emailRecover')?.value };
      this._loginService.forgotPassword(emailRequest).subscribe(
        response => {
          console.log('Response:', response);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  ngOnInit() {
    this.recoverForm = new FormGroup({
      'emailRecover': new FormControl(null, [Validators.required, Validators.email])
    });
  }

}
