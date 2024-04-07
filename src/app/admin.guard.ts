import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login/login.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const loginService = inject(LoginService);
  const router = inject(Router);

  const isLoggedIn: boolean = loginService.isAdmin();

  if (!isLoggedIn) {
    const url = router.createUrlTree(['/about-us']);
    return url;
  }

  return true;
};
