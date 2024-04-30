import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../models/userRegister/userRegister.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private _httpCountry = inject(RegisterService);

  country: any;
  department: any;
  city: any[] = [];
  selectCountry = 'Seleccionar País';

  constructor() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      country: [{ value: '', disabled: true }, Validators.required],
      department: [{ value: '', disabled: true }, Validators.required],
      city: ['', Validators.required],
      streetType1: ['', Validators.required],
      streetNumber1: ['', Validators.required],
      streetType2: ['', Validators.required],
      streetNumber2: ['', Validators.required],
      localAptoNumber: ['', Validators.required],
      apto: [''],
      postalCode: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  hasErrors(field: string, typeError: string) {
    return this.registerForm.get(field)?.hasError(typeError) && this.registerForm.get(field)?.touched;
  }

  submit(event: Event) {
    event.preventDefault();  // Evita que el formulario se envíe de la forma predeterminada
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const user : IUser= {
        name: this.capitalize(`${formValues.firstname} ${formValues.lastName}`),
        email: formValues.email,
        dni: formValues.dni,
        cellphone: formValues.cellphone,
        region:` ${formValues.country} ${formValues.department}`,
        city: formValues.city,
        streetType: `${formValues.streetType1} `,
        streetNumber: `${formValues.streetNumber1}`,
        localAptoNumber: `${formValues.streetType2} ${formValues.streetNumber2} ${formValues.localAptoNumber} ${formValues.apto}`,
        postalCode: formValues.postalCode, 
        password: formValues.password
      };
      this._httpCountry.registerUser(user).subscribe(
        (data) => {
          console.log('Usuario registrado con éxito', data);
          this.registerForm.reset();
          this.registerForm.get('country')?.setValue("default");
          this.registerForm.get('department')?.setValue("default");
          
          // Aquí puedes hacer lo que quieras con los datos devueltos por tu API
        },
        (error) => {
          console.log('Error al registrar el usuario', error);
          // Aquí puedes manejar los errores que puedan ocurrir durante el registro
        }
      );
    }
  }

  capitalize(str: string) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  ngOnInit(): void {
    this._httpCountry.getCountries().subscribe((data: any) => {
      this.country = data;
      // Habilitar el campo 'country'
      this.registerForm.get('country')?.enable();
      this.getDepartment();
    });

    this.getDepartment();
  }

  getDepartment() {
    this._httpCountry.getDepartments().subscribe((data: any) => {
      this.department = data;
      // Habilitar el campo 'department' y establecer su valor
      this.registerForm.get('department')?.enable();
      this.getCities();
    });
  }

  getCities() {
    this._httpCountry.getCities().subscribe((data: any[]) => {
      this.city = this.sort(data, 'name');
      
    });
  }



  sort(array: any[], field: string): any[] {
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }


}
