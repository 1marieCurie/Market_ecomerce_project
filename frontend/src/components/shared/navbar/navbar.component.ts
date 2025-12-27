import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  username: string | null = null;
  cartCount = 0;
  searchTerm = '';
  menuOpen = false;
  isAuthenticated = false;
  isAdmin = false;

  private authSub!: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // 🔹 Auth state (réactif)
    this.authSub = this.authService.isLoggedIn()
      .subscribe(isLogged => {
        this.isAuthenticated = isLogged;
        this.username = isLogged ? this.authService.getUsername() : null;
        this.isAdmin = isLogged ? this.authService.isAdmin() : false;
      });

    // 🔹 Cart count
    this.cartService.getCartCount()
      .subscribe(count => this.cartCount = count);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  navigateTo(route: string) {
    if (route === 'home') {
      this.router.navigate(['/']);
    } else if (route === 'cart') {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }

  goToAdmin() {
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  search() {
    if (this.searchTerm.trim()) {
      console.log('Search for:', this.searchTerm);
      this.menuOpen = false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
