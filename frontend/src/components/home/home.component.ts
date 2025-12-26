import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username: string | null = null;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  categoryMap: Map<number, string> = new Map();
  selectedCategoryId = 0;
  searchTerm = '';
  sortBy = 'name';
  maxPrice = 1000;
  cartCount = 0;
  loading = true;
  showFilters = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.loadCategories();
    this.loadProducts();
    this.cartService.getCartCount().subscribe(count => this.cartCount = count);
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        this.categories = categories;
        categories.forEach(cat => {
          if (cat.id != null) {
            this.categoryMap.set(cat.id, cat.name);
          }
        });
      },
      error: err => console.error('Error loading categories:', err)
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data.map(p => ({
          ...p,
          categoryName: p.categoryId != null ? this.categoryMap.get(p.categoryId) || 'Unknown' : 'Unknown'
        }));
        this.filteredProducts = this.products;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  filterAndSort() {
    let result = [...this.products];

    if (this.selectedCategoryId > 0) {
      result = result.filter(p => p.categoryId === this.selectedCategoryId);
    }

    if (this.searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (p.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
      );
    }

    // Filter by price
    result = result.filter(p => p.price <= this.maxPrice);

    if (this.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredProducts = result;
  }

  onCategoryChange() {
    this.filterAndSort();
  }

  onSearchChange() {
    this.filterAndSort();
  }

  onSortChange() {
    this.filterAndSort();
  }

  onPriceChange() {
    this.filterAndSort();
  }

  addToCart(product: Product) {
    if (product.id != null) {
      this.cartService.addToCart(product.id);
      alert(`${product.name} added to cart!`);
      this.updateCartCount();
    }
  }

  goToProductDetail(productId: number | undefined) {
  if (productId != null) {
    this.router.navigate(['/product', productId]);
  }
}

  updateCartCount() {
    this.cartService.getCartCount().subscribe(count => this.cartCount = count);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  logout() {
    this.authService.logout();
  }
}