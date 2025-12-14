import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: 'admin-dashboard.component.html',
  styleUrls: ['admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalProducts = 0;
  totalCategories = 0;
  totalStock = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.productService.getAllProductsAdmin().subscribe(products => {
      this.totalProducts = products.length;
      this.totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    });

    this.categoryService.getAllCategoriesAdmin().subscribe(categories => {
      this.totalCategories = categories.length;
    });
  }

  goToCategories() {
    this.router.navigate(['/admin/categories']);
  }

  goToProducts() {
    this.router.navigate(['/admin/products']);
  }
  
  // Add this method if you want the logout button in the dashboard
  logout() {
    // example: redirect to login page
    this.router.navigate(['/login']);
  }

}
