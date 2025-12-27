import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface JwtResponse {
  token: string;
  type: string;
  username: string;
  roles: string[];
}

@Injectable({ 
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); // initial value based on token presence
  // behaviorSubject is an observable that we can subscribe to in order to get the current login status

  constructor(private http: HttpClient, private router: Router) {}

  // verify if token exists in localstorage
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // Observable to track login status
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // REGISTER
  register(user: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // LOGIN
  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('roles', JSON.stringify(response.roles));
          this.loggedIn.next(true);
        })
      );
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // get Token for authorized requests
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // get roles
  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getUsername(): string | null {
  return localStorage.getItem('username');
}
//helpers to distinguish the roles
isAdmin(): boolean {
  return this.getRoles().includes('ROLE_ADMIN');
}

isUser(): boolean {
  return this.getRoles().includes('ROLE_USER');
}

}
