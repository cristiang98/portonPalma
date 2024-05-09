import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../../services/register/register.service';
import { IUser } from '../../../models/userRegister/userRegister.model';
import { CommonModule, NgClass } from '@angular/common';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  registerForm!: FormGroup;
  private formBuilder = inject(FormBuilder);
  private _httpCountry = inject(RegisterService);
  private authService = inject(LoginService);
  country: any = '';
  department: any = '';
  city: any[] = [''];
  selectCountry = 'Seleccionar País';

  constructor() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', Validators.required],
      country: ['', Validators.required],
      department: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.authService.getUserData().subscribe((userData: any) => {
      console.log('userData', userData[0]);
      if (userData && userData[0] && userData[0].name && userData[0].address) {
        let nameParts = userData[0].name.split(' ');
        let locationParts = userData[0].address.split(' ');
        this.registerForm.patchValue({
          firstname: nameParts[0] || '',
          lastName: nameParts[1] || '',
          dni: userData[0].dni,
          email: userData[0].email,
          cellphone: userData[0].cellphone,
          country: `${locationParts[0] || ''}`,
          department: `${locationParts[1] || ''}`,
          city: `${locationParts[2] || ''}`,
          address: `${locationParts[3] || ''} ${locationParts[4] || ''} ${locationParts[5] || ''} ${locationParts[6] || ''} ${locationParts[7] || ''} `,

        });
      }
    });
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
        address: `${formValues.country} ${formValues.department} ${formValues.city} ${formValues.address}`, // Aquí puedes concatenar los valores de dirección, ciudad, departamento y país
        password: formValues.password
      };
      this.authService.putUserData(user).subscribe(
        (data) => {
          console.log('Usuario registrado con éxito', data);
          this.registerForm.reset();
          
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
