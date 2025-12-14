// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProductService, Product } from '../../services/product.service';
// import { CartService } from '../../services/cart.service';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {

//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   categories: string[] = [];
//   selectedCategory = '';
//   searchTerm = '';
//   sortBy = 'name';
//   cartCount = 0;
//   loading = true;

//   constructor(
//     private productService: ProductService,
//     private cartService: CartService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.loadProducts();
//     this.cartService.getCartCount().subscribe(count => this.cartCount = count);
//   }

//   loadProducts() {
//     this.productService.getProducts().subscribe({
//       next: data => {
//         this.products = data;
//         this.filteredProducts = data;
//         this.categories = [...new Set(data.map(p => p.categoryName))];
//         this.loading = false;
//       },
//       error: err => {
//         console.error(err);
//         this.loading = false;
//       }
//     });
//   }

//   filterAndSort() {
//     let result = [...this.products];
//     if (this.selectedCategory) result = result.filter(p => p.categoryName === this.selectedCategory);
//     if (this.searchTerm) {
//       result = result.filter(p =>
//         p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//     }
//     if (this.sortBy === 'price-low') result.sort((a,b) => a.price - b.price);
//     else if (this.sortBy === 'price-high') result.sort((a,b) => b.price - a.price);
//     else result.sort((a,b) => a.name.localeCompare(b.name));
//     this.filteredProducts = result;
//   }

//   onCategoryChange() { this.filterAndSort(); }
//   onSearchChange() { this.filterAndSort(); }
//   onSortChange() { this.filterAndSort(); }

//   addToCart(product: Product) {
//     this.cartService.addToCart(product);
//     alert(`${product.name} added to cart!`);
//   }

//   goToCart() { this.router.navigate(['/cart']); }
//   logout() { this.authService.logout(); }
// }
