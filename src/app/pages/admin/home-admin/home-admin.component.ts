import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {

  private _loginService = inject(LoginService);
  currentUser: any;
  name:string = '';

  constructor() { 
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
}
