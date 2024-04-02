import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from './services/admin/admin.service';
import { LoginComponent } from './pages/login/login.component';
import { UserLoginRequest } from './models/user/user.model';
import { LoginService } from './services/login/login.service';
import { UserServiceService } from './services/userService/user-service.service';
import { User } from './models/userPrueba/userPrueba.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'porton-de-la-palma';
  menuOption: string = '';
  showNavbar: boolean = true;
  private _adminService = inject(AdminService);
  private _loginService = inject(LoginService);
  private _userService = inject(UserServiceService);
  currentUser: User | null = null;
  name: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Determina si el navbar debe mostrarse según la ruta actual
        this.showNavbar = !['/admin', '/admin/horse/v1', '/admin/product/v1', '/admin/event/v1'].includes(event.url);
      }
    });

    // Suscríbete a la información del usuario
    this._loginService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.name = user.sub;
      }
      else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit(): void {
    
  }


  logout() {
    this._loginService.logout();
    this.router.navigate(['/home']);
  }


  onOption(option: string) {
    this.menuOption = option;
  }


}
