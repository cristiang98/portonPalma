import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  menuOption?: string = ''
  private _router = inject(Router);

  onOption(option: string) {
    this.menuOption = option;
  }

  navigateTo(option: string) {
    this._router.navigate([option]);
  }

}
