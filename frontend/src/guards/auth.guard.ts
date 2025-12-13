import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  // only one instance available of this guard everywhere in the app
})
export class AuthGuard implements CanActivate {
    // CanActivate is an interface of angular to protect routes

  constructor(private authService: AuthService, private router: Router) {
    // authService to verify the user is connected
    // router to redirect if necessary
  }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      take(1),
      map(isLogged => {
        if (!isLogged) {
          this.router.navigate(['/login']);  // redirect to login if not authenticated
          return false;
        }
        return true;
      })
    );
  }
}
