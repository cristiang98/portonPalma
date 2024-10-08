import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';
import { CookieService } from 'ngx-cookie-service';

export const adminGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);
  const cookie = inject(CookieService);

  const isLoggedIn: boolean = loginService.isAdmin();

  if (isLoggedIn) {
    return true;
  }else{

    router.navigate(['']);
    alert('No tienes permisos para acceder a esta página');
    return false;
  }

  
};
