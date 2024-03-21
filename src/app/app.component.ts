import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'porton-de-la-palma';
  menuOption: string = '';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Determina si el navbar debe mostrarse según la ruta actual
        this.showNavbar = !['/user/auth/login', '/user/auth/register'].includes(event.url);
      }
    });
  }

  onOption(option: string) {
    this.menuOption = option;
  }


}
