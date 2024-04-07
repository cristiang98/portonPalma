import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { HorseAdminComponent } from './horse-admin/horse-admin.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { EventAdminComponent } from './event-admin/event-admin.component';
import { ServiceeAdminComponent } from './servicee-admin/servicee-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HorseAdminComponent, ProductAdminComponent, EventAdminComponent, ServiceeAdminComponent, HomeAdminComponent ],
  templateUrl: './admin.component.html',
  styleUrl: '../../../assets/css/style.css'
})
export class AdminComponent implements OnInit, OnDestroy{

  
  private _AdminService = inject(AdminService);
  private _router = inject(Router);
  private _loginService = inject(LoginService);
  menuOption: string = '';
  currentRoute: string = '/admin';
  currentUser: any;
  name: string = '';

  constructor() {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

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



  onOption(option: string) {
    this.menuOption = option;
    this._router.navigate([option]);
  }

  ngOnInit(): void {
    this._AdminService.isAdminPage = true;
  }

  ngOnDestroy(): void {
    this._AdminService.isAdminPage = false;
  }

}
