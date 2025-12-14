import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Directly check the token in localStorage
    const token = this.authService.getToken();
    if (token) {
      return of(true);
    } else {
      console.warn('Access denied: User is not authenticated');
      return of(this.router.parseUrl('/login'));
    }
  }
}
