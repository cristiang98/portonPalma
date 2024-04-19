import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [CommonModule, NgClass, ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent implements OnInit{

  recoverForm!: FormGroup;

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  hasErrors(field: string, typeError: string) {
    return this.recoverForm.get(field)?.hasError(typeError) && this.recoverForm.get(field)?.touched;
  }

  submitRecover(event:Event){

    event.preventDefault();
    if(this.recoverForm.valid){
      const formValues = this.recoverForm.value;
      console.log(formValues);
    }

  }

  ngOnInit() {
    this.recoverForm = new FormGroup({
      'emailRecover': new FormControl(null, [Validators.required, Validators.email]),
      'dniRecover': new FormControl(null, Validators.required)
    });
  }

}
