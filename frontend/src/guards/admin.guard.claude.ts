import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Check if user is authenticated
    if (!this.authService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if user has ADMIN role
    const roles = this.authService.getRoles();
    
    if (roles && roles.includes('ADMIN')) {
      return true;
    }

    // User is authenticated but not admin
    console.warn('Access denied: User does not have ADMIN role');
    this.router.navigate(['/home']);
    return false;
  }
}
