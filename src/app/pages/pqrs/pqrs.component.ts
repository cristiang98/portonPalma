import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomCurrencyPipe } from '../../pipe/custom-currency.pipe';
import { CustomCapitalizePipe } from '../../pipe/custom-capitalize.pipe';
import { CustomFirstLetterUppercasePipe } from '../../pipe/custom-first-letter-uppercase.pipe';
import emailjs,{ EmailJSResponseStatus } from 'emailjs-com';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { noProfanityValidator } from '../../validators/noProfanity';

@Component({
  selector: 'app-pqrs',
  standalone: true,
  imports: [CommonModule, CustomCurrencyPipe, CustomCapitalizePipe, CustomFirstLetterUppercasePipe, FormsModule,ReactiveFormsModule],
  templateUrl: './pqrs.component.html',

  styleUrl: './pqrs.component.css'
})
export class PqrsComponent {

  pqrsForm = {
    type: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  };

  pqrsForm1: FormGroup;
  prohibitedWords = [
    "idiota", "estúpido", "imbécil", "mierda", "cabron", "jodido", "carajo", "chingado",
    "hijo de puta", "maldito", "pendejo", "perra", "culo", "verga", "pinche", "zorra",
    "bastardo", "mamón", "maricón", "tonto", "asno", "rata", "cagado", "chinga tu madre",
    "follar", "idiot", "stupid", "asshole", "shit", "bitch", "fuck", "bastard", "damn",
    "son of a bitch", "dick", "cunt", "moron", "douchebag", "pussy", "fucker", "wanker",
    "prick", "slut", "suck", "crap", "hell", "freak", "screw you", "jackass", "retard","puta"
  ];
  
  constructor(private fb: FormBuilder) {
    this.pqrsForm1 = this.fb.group({
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // 10 dígitos para teléfono
      description: ['', [Validators.required, Validators.minLength(10), noProfanityValidator(this.prohibitedWords)]] // Mueve el validador aquí
    });
  }
  

  onSubmit() {
    const serviceID = 'service_k6d9c56';
    const templateID = 'template_g2urt05';
    const userID = '0BKnOI65CNaOD3sj6';

    emailjs.send(serviceID, templateID, this.pqrsForm, userID)
      .then((response: EmailJSResponseStatus) => {
        console.log('Formulario enviado:', response.status, response.text);
        // Limpiar el formulario después de enviarlo
        this.pqrsForm = {
          type: '',
          description: '',
          name: '',
          email: '',
          phone: ''
        };
      }, (error) => {
        console.error('Error al enviar el formulario:', error);
      });
  }

  onSubmit2() {
    const serviceID = 'service_k6d9c56';
    const templateID = 'template_g2urt05';
    const userID = '0BKnOI65CNaOD3sj6';

    if (this.pqrsForm1.valid) {
      console.log('Formulario enviado', this.pqrsForm1.value);
      // Procesar envío con emailjs

      emailjs.send(serviceID, templateID, this.pqrsForm1.value, userID)
      .then((response: EmailJSResponseStatus) => {
        console.log('Formulario enviado:', response.status, response.text);

        // Limpiar el formulario después de enviarlo
        this.pqrsForm1.reset({
          type: '',
          description: '',
          name: '',
          email: '',
          phone: ''
        });
      }, (error) => {
        console.error('Error al enviar el formulario:', error);
      });
    } else {
      console.error('El formulario no es válido');
    }
  }

}