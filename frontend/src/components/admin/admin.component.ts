import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  username: string = 'Admin';

  constructor(
    private router: Router,
  ) {}

  goHome() {
    this.router.navigate(['/']);
  }

  navigateTo(section: string) {
    this.router.navigate([`/admin/${section}`]);
  }
}