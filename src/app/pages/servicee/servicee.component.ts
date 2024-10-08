import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicee',
  standalone: true,
  imports: [],
  templateUrl: './servicee.component.html',
  styleUrl: './servicee.component.css'
})
export class ServiceeComponent {

  menuOption?: string = ''
  private _router = inject(Router);

  onOption(option: string) {
    this.menuOption = option;
  }

  navigateTo(option: string) {
    this._router.navigate([option]);
  }

}
