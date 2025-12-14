import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  id: number;   // same as product.id
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadFromStorage();  // defined latter down
  }

  private loadFromStorage(): void {
    const stored = localStorage.getItem('cart');
    if (stored) this.cartItemsSubject.next(JSON.parse(stored));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getCartTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, i) => sum + i.price * i.quantity, 0))
    );
  }

  getCartCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, i) => sum + i.quantity, 0))
    );
  }

  addToCart(product: Product): void {
    const items = [...this.cartItemsSubject.value];
    const existing = items.find(i => i.id === product.id);
    if (existing) existing.quantity++; // if exist , increase quantity

    // we need to define the backend set for cartitem, otherwise there is nothing we can so for this one 'id'
   // else items.push({ id: product.id, name: product.name, price: product.price, quantity: 1, imageUrl: product.imageUrl });
    this.updateCart(items); // update cart
  }

  updateQuantity(id: number, quantity: number): void {
    const items = [...this.cartItemsSubject.value];
    const item = items.find(i => i.id === id);
    if (item) item.quantity = quantity;
    this.updateCart(items);
  }

  removeFromCart(id: number): void {
    const items = this.cartItemsSubject.value.filter(i => i.id !== id);
    this.updateCart(items);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }
}
