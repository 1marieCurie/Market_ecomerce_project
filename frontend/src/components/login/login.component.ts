import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: string = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initForm();
  }

  // Initialize the login form
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        // Save token and roles in localStorage
        this.authService.setToken(response.token);
        this.authService.setRoles(response.roles);

        // Redirect based on role
        const roles = this.authService.getRoles();
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']); // Admin dashboard
        } else {
          this.router.navigate(['/user']); // normal user dashboard
        }

        this.loading = false;
      },
      error: (error) => {
        this.error = error.error?.message || 'An error occurred during login.';
        this.loading = false;
      },
    });
  }
}
