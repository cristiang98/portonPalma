import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomCurrencyPipe } from '../../pipe/custom-currency.pipe';
import { CustomCapitalizePipe } from '../../pipe/custom-capitalize.pipe';
import { CustomFirstLetterUppercasePipe } from '../../pipe/custom-first-letter-uppercase.pipe';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs,{ EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe, CustomCapitalizePipe, CustomFirstLetterUppercasePipe, FormsModule,ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  contactForm1: FormGroup;

  constructor( private fc: FormBuilder ) {
    this.contactForm1 = this.fc.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // 10 dígitos para teléfono
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    const serviceID = 'service_k6d9c56';
    const templateID = 'template_j879oqk';
    const userID = '0BKnOI65CNaOD3sj6';

    if (this.contactForm1.valid) {
      const formData = {
        from_name: this.contactForm1.value.name,
        from_email: this.contactForm1.value.email,
        from_phone: this.contactForm1.value.phone,
        message: this.contactForm1.value.message
      };

      emailjs.send(serviceID, templateID, formData, userID)
        .then((response: EmailJSResponseStatus) => {
          console.log('Formulario enviado:', response.status, response.text);
          // Limpiar el formulario después de enviarlo
          this.contactForm1.reset();
        }, (error) => {
          console.log('Error al enviar el formulario:', error);
        });
    }
  }

}
