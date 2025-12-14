import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal = 0;
  loading = true;
  username = '';

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.loadCart();
  }

  loadCart() {
    this.loading = true;
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
      this.loading = false;
    });
    this.cartService.getCartTotal().subscribe(total => this.cartTotal = total);
  }

  calculateTotal() {
    this.cartTotal = this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  updateQuantity(item: CartItem, quantity: string) {
    const qty = parseInt(quantity);
    if (qty > 0) {
      item.quantity = qty;
      item.totalPrice = item.price * qty;
      this.cartService.updateCartQuantity(item.productId, qty);
      this.calculateTotal();
    }
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.productId);
    this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
    this.calculateTotal();
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
      this.cartItems = [];
      this.cartTotal = 0;
    }
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }

  checkout() {
    alert('Checkout feature coming soon!');
  }

  logout() {
    this.authService.logout();
  }
}
