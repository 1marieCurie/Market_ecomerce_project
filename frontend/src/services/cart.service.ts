import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  private baseUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    this.http.get<any[]>(this.baseUrl).subscribe({
      next: (items) => {
        const mapped = items.map(i => ({
          productId: i.productId,
          name: i.productName,
          price: i.unitPrice,
          quantity: i.quantity,
          imageUrl: i.imageUrl,
          totalPrice: i.totalPrice
        }));
        this.cartItemsSubject.next(mapped);
      },
      error: err => console.error('Failed to load cart', err)
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getCartCount(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, i) => sum + i.quantity, 0))
    );
  }

  getCartTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((sum, i) => sum + i.totalPrice, 0))
    );
  }

  addToCart(productId: number) {
    const request = { productId, quantity: 1 }; // plus besoin de userId
    this.http.post(`${this.baseUrl}/add`, request).subscribe({
      next: () => this.loadCart(),
      error: err => console.error('Add to cart failed', err)
    });
  }


  updateCartQuantity(productId: number, quantity: number) {
    const request = { productId, quantity };
    this.http.post(`${this.baseUrl}/add`, request).subscribe(() => this.loadCart());
  }


  removeFromCart(productId: number) {
    this.http.post(`${this.baseUrl}/remove/${productId}`, {}).subscribe(() => this.loadCart());
  }

  clearCart() {
    this.http.delete(`${this.baseUrl}/clear`).subscribe(() => this.cartItemsSubject.next([]));
  }
}
