import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  cartCount = 0;
  menuOpen = false;
  searchTerm = '';

  constructor(
    private router: Router,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.cartService.getCartCount().subscribe(count => this.cartCount = count);
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

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  search() {
    if (this.searchTerm.trim()) {
      console.log('Search for:', this.searchTerm);
      // Tu peux ajouter une logique de recherche ici
      this.menuOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
