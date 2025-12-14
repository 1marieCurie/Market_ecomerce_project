import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  profileForm!: FormGroup;
  isEditMode = false;
  loading = true;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  totalOrders = 0;
  totalSpent = 0;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.loadProfile();
  }

  initForm() {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  loadProfile() {
    this.loading = true;
    this.authService.getUserProfile().subscribe(
      profile => {
        this.userProfile = profile;
        this.profileForm.patchValue(profile);
        this.loading = false;
        // Mock stats - replace with actual API call
        this.totalOrders = 5;
        this.totalSpent = 1250.50;
      },
      error => {
        console.error('Error loading profile:', error);
        this.errorMessage = 'Failed to load profile';
        this.loading = false;
      }
    );
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.successMessage = '';
    this.errorMessage = '';
    if (!this.isEditMode && this.userProfile) {
      this.profileForm.patchValue(this.userProfile);
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updatedProfile: UserProfile = this.profileForm.value;

    this.authService.updateUserProfile(updatedProfile).subscribe(
      response => {
        this.successMessage = '✅ Profile updated successfully!';
        this.userProfile = response;
        this.isSubmitting = false;
        setTimeout(() => {
          this.isEditMode = false;
          this.successMessage = '';
        }, 2000);
      },
      error => {
        this.errorMessage = error.error?.message || 'Error updating profile';
        this.isSubmitting = false;
      }
    );
  }

  deleteAccount() {
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    
    if (confirmed) {
      this.authService.deleteAccount().subscribe(
        () => {
          this.successMessage = 'Account deleted successfully';
          setTimeout(() => {
            this.authService.logout();
          }, 2000);
        },
        error => {
          this.errorMessage = error.error?.message || 'Error deleting account';
        }
      );
    }
  }
}