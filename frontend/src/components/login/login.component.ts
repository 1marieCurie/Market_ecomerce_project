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
  loginForm!: FormGroup;  // form group for login
  loading: boolean = false;
  submitted: boolean = false;
  error: string = '';
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder, private authService: AuthService, private router: Router
  ){
    this.initForm(); // just to simplify the constructor (code of initForm below)
  }

    // Initialize the login form with email and password fields
    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['',[Validators.required, Validators.minLength(6)]]
        });
    }

    get f(){ // to simplify access to form fields (use only: f.email instead of loginForm.controls.email)
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
    next: () => {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    error: (error) => {
      this.error = error.error.message || 'An error occurred during login.';
      this.loading = false;
    }
  });
}

}