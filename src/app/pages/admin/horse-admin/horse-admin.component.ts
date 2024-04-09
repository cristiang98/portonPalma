import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IHorse } from '../../../models/horse/horse.model';
import { ApiHorsesService } from '../../../services/horses/api-horses.service';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomCurrencyPipe } from '../../../pipe/custom-currency.pipe';
import { CustomCapitalizePipe } from '../../../pipe/custom-capitalize.pipe';
import { CustomFirstLetterUppercasePipe } from '../../../pipe/custom-first-letter-uppercase.pipe';

@Component({
  selector: 'app-horse-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomCurrencyPipe, CustomCapitalizePipe, CustomFirstLetterUppercasePipe],
  templateUrl: './horse-admin.component.html',
  styleUrl: './horse-admin.component.css'
})
export class HorseAdminComponent implements OnInit, OnDestroy {

  horses: IHorse[] = []; // Inicializa la lista de caballos
  newHorse: IHorse = {  // Inicializa el nuevo caballo
    breed: '',
    description: '',
    price: 0,
    bornOn: '',
    imagePath: ''
  };



  horseById :any = null;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  selectedHorseId: number = 0;

  constructor() { }
  private _router = inject(Router);
  private _horseService = inject(ApiHorsesService);
  private _loginService = inject(LoginService);
  private _cdr = inject(ChangeDetectorRef);

  getHorses() {
    this._horseService.getHorses().subscribe(horses => {
      this.horses = horses;
      console.log('horses:', horses);
    });
  }

  ngOnInit() {
    this.getHorses();
  }

  ngOnDestroy(): void {
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = file; // Assign the selected file to this.selectedFile
    if (file) {
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  selectHorse(horse: IHorse) {
    const imagePath = horse.imagePath;
    if (imagePath) {
      // Convert the horse's image URL to a File
      fetch(imagePath)
        .then(response => response.blob())
        .then(blob => {
          // Extract the file name from the imagePath
          const url = new URL(imagePath);
          const pathname = url.pathname;
          const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
  
          this.selectedFile = new File([blob], filename, {type: 'image/jpeg'});
          this.previewUrl = URL.createObjectURL(this.selectedFile);
        })
        .catch(error => console.error('Error:', error));
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.selectedFile) {
      // Obtiene el rol del usuario
      const userRole = this._loginService.getRole();
      console.log('userRole:', userRole);
      // Verifica si el rol del usuario es 'ADMIN'
      if (userRole === 'ADMIN') {
        // Verifica si el token ha expirado
        if (this._loginService.isTokenExpired()) {
          console.log('El token ha expirado');
        } else {
          console.log('El token no ha expirado');
          this._horseService.addHorse(this.newHorse, this.selectedFile).subscribe(() => {
            this.getHorses(); // Actualiza la lista de caballos
            form.reset(); // Limpia el formulario
            this.selectedFile = null; // Limpia el archivo seleccionado
          });
        }
      } else {
        console.log('El usuario no está autorizado para agregar un caballo');
      }
    }
    console.log('Formulario valido?', form.valid, this.newHorse);
  }

  deleteHorse(idHorse: number | undefined) {
    if (idHorse !== undefined) {
      this._horseService.deleteHorse(idHorse).subscribe({
        next: () => {
          // Actualizar la lista de caballos después de eliminar un caballo
          this.getHorses();
        },
        error: (error) => {
          if (error.status === 200) {
            // Si el estado de la respuesta es 200, asumir que la eliminación fue exitosa
            this.getHorses();
          } else {
            // Manejar otros errores aquí
            console.error(error);
          }
        }
      });
    }
  }

  updateHorse(form: NgForm) {
    if (form.valid) {
      if (this.selectedFile === null) {
        console.log('No file selected');
        // Handle no file selected
      } else {
        this._horseService.putHorse(this.selectedHorseId, this.horseById, this.selectedFile).subscribe(
          response => {
            console.log('Horse updated successfully');
            // Handle successful response
          },
          error => {
            console.log('Error updating horse:', error);
            // Handle error
          }
        );
      }
    }
  }

  onHorseSelectChange() {
    const selectedHorseId = Number(this.selectedHorseId);
    const selectedHorse = this.horses.find(horse => horse.idHorse === selectedHorseId);
    if (selectedHorse) {
      selectedHorse.bornOn = `${selectedHorse.bornOn[0]}-${selectedHorse.bornOn[1].toString().padStart(2, '0')}-${selectedHorse.bornOn[2].toString().padStart(2, '0')}`;
      this.horseById = selectedHorse;
    } else {
      alert('Caballo no existe');
    }
  }



}
