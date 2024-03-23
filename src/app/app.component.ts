import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from './services/admin/admin.service';

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
  private _adminService = inject(AdminService);

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Determina si el navbar debe mostrarse según la ruta actual
        this.showNavbar = !['/admin', '/admin/horse/v1','/admin/product/v1','/admin/event/v1'].includes(event.url);
      }
    });
  }

  onOption(option: string) {
    this.menuOption = option;
  }


}
