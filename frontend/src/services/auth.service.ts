import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

interface UserProfile {
  id?: number;
  username: string;
  email: string;
  phone?: string;
  address?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserDTO {
  username: string;
  email: string;
  phone?: string;
  address?: string;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
  active: boolean;
}

@Injectable({ 
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private userApiUrl = 'http://localhost:8080/api/users';
 
  
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  // Define keys for localStorage
  private tokenKey = 'token';
  private rolesKey = 'roles';
  private usernameKey = 'username';
  private userIdKey = 'userId';

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  register(user: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setRoles(response.roles);
          this.setUsername(response.username);
          this.loggedIn.next(true);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.userIdKey);
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // Token Management
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // Roles Management
  getRoles(): string[] {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : [];
  }

  setRoles(roles: string[]) {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  // Username Management
  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  setUsername(username: string) {
    localStorage.setItem(this.usernameKey, username);
  }

  // User ID Management
  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  setUserId(id: number) {
    localStorage.setItem(this.userIdKey, id.toString());
  }

  // User Profile Management
  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.userApiUrl}/profile`);
  }

  updateUserProfile(profile: UserDTO): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.userApiUrl}/profile`, profile)
      .pipe(
        tap(response => {
          // Update username in localStorage if it changed
          if (response.username) {
            this.setUsername(response.username);
          }
        })
      );
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.userApiUrl}/${id}`);
  }

  // Account Management
  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.userApiUrl}/profile`)
      .pipe(
        tap(() => {
          // Clear all stored data when account is deleted
          this.logout();
        })
      );
  }

  // Check if user is admin
  isAdmin(): boolean {
    const roles = this.getRoles();
    return roles && roles.includes('ADMIN');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.hasToken() && this.getUsername() !== null;
  }
}