import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;
  username: string | null = null;
  cartCount = 0;
  categoryMap: Map<number, string> = new Map();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.loadCategories();
    this.loadProduct();
    this.cartService.getCartCount().subscribe(count => this.cartCount = count);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        categories.forEach(cat => {
          if (cat.id != null) {
            this.categoryMap.set(cat.id, cat.name);
          }
        });
      },
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.productService.getProductById(parseInt(productId)).subscribe({
        next: data => {
          this.product = {
            ...data,
            categoryName: data.categoryId != null 
              ? this.categoryMap.get(data.categoryId) || 'Unknown' 
              : 'Unknown'
          };
          this.loading = false;
        },
        error: err => {
          console.error('Error loading product:', err);
          this.loading = false;
        }
      });
    }
  }

  increaseQuantity() {
    if (this.quantity < (this.product?.stock || 0)) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  calculateDiscount(): number {
    if (!this.product || !this.product.oldPrice) return 0;
    const discount = ((this.product.oldPrice - this.product.price) / this.product.oldPrice) * 100;
    return Math.round(discount);
  }

  addToCart() {
    if (this.product?.id != null) {
      for (let i = 0; i < this.quantity; i++) {
        this.cartService.addToCart(this.product.id);
      }
      alert(`${this.quantity} x ${this.product.name} added to cart!`);
      this.updateCartCount();
      this.quantity = 1;
    }
  }

  updateCartCount() {
    this.cartService.getCartCount().subscribe(count => this.cartCount = count);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
  }
}