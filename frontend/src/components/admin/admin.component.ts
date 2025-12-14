import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-container">
      <!-- Navbar -->
      <nav class="navbar">
        <div class="navbar-content">
          <div class="logo">🛡️ Admin Panel</div>
          <div class="nav-links">
            <button class="nav-btn" (click)="goHome()">← Back to Shop</button>
            <span class="user-info">{{ username }}</span>
            <button class="btn-logout" (click)="logout()">Logout</button>
          </div>
        </div>
      </nav>

      <!-- Child Routes Render Here -->
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {
    this.username = this.authService.getUsername();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }
}
