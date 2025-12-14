import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = this.authService.getToken();
    if (!token) {
      return this.router.parseUrl('/login');
    }

    const roles = this.authService.getRoles();
    if (roles && roles.includes('ROLE_ADMIN')) {
      return true;
    }


    return this.router.parseUrl('/home');
  }
}
