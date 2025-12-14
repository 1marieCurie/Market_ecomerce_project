import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService, ProductAdminResponse, ProductRequest } from '../../../services/product.service';
import { CategoryService, Category } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

interface ProductForm {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock?: number;
  sku: string;
  imageUrl: string;
  brand?: string;
  categoryId: number;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: ProductAdminResponse[] = [];
  categories: Category[] = [];
  loading = true;
  username: string | null = null;
  showForm = false;
  editingProduct: ProductAdminResponse | null = null;
  productForm!: FormGroup;
  formLoading = false;
  formError = '';
  formSuccess = '';

  searchTerm = '';
  imagePreview: string | null = null;
  imageFile: File | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.loadCategories();
    this.loadProducts();
  }

  initForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: ['', [Validators.required, Validators.min(0.01)]],
      oldPrice: [''],
      stock: [0, [Validators.min(0)]],
      sku: ['', [Validators.required]],
      imageUrl: [''],
      brand: [''],
      categoryId: ['', [Validators.required]]
    });
  }

  loadProducts() {
    this.productService.getAllProductsAdmin().subscribe(
      products => {
        this.products = products;
        this.loading = false;
      },
      error => {
        console.error('Error loading products:', error);
        this.formError = 'Failed to load products';
        this.loading = false;
      }
    );
  }

  loadCategories() {
    this.categoryService.getAllCategoriesAdmin().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error loading categories:', error);
      }
    );
  }

  getCategoryName(categoryId: number | null | undefined): string {
    if (!categoryId) return 'N/A';
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  get filteredProducts(): ProductAdminResponse[] {
    if (!this.searchTerm) return this.products;
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description?.toLowerCase().includes(term) ||
      p.sku.toLowerCase().includes(term) ||
      p.brand?.toLowerCase().includes(term)
    );
  }

  openForm(product?: ProductAdminResponse) {
    this.formError = '';
    this.formSuccess = '';
    this.editingProduct = product || null;
    this.showForm = true;

    if (product) {
      this.productForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice,
        stock: product.stock,
        sku: product.sku,
        brand: product.brand,
        categoryId: product.categoryId
      });
      this.imagePreview = product.imageUrl || null;
    } else {
      this.productForm.reset({ stock: 0 });
      this.imagePreview = null;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeForm() {
    this.showForm = false;
    this.editingProduct = null;
    this.productForm.reset({ stock: 0 });
    this.imagePreview = null;
    this.imageFile = null;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    this.formError = '';
    this.formSuccess = '';
    this.formLoading = true;

    const formValue = this.productForm.value;
    const request: ProductRequest = {
      name: formValue.name,
      description: formValue.description,
      price: parseFloat(formValue.price),
      oldPrice: formValue.oldPrice ? parseFloat(formValue.oldPrice) : undefined,
      stock: formValue.stock ? parseInt(formValue.stock) : 0,
      sku: formValue.sku,
      imageUrl: this.imagePreview || '',
      brand: formValue.brand,
      categoryId: parseInt(formValue.categoryId)
    };

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id!, request).subscribe(
        () => {
          this.formSuccess = 'Product updated successfully!';
          this.formLoading = false;
          setTimeout(() => {
            this.closeForm();
            this.loadProducts();
          }, 1500);
        },
        error => {
          this.formError = error.error?.message || 'Error updating product';
          this.formLoading = false;
        }
      );
    } else {
      this.productService.createProduct(request).subscribe(
        () => {
          this.formSuccess = 'Product created successfully!';
          this.formLoading = false;
          setTimeout(() => {
            this.closeForm();
            this.loadProducts();
          }, 1500);
        },
        error => {
          this.formError = error.error?.message || 'Error creating product';
          this.formLoading = false;
        }
      );
    }
  }

  deleteProduct(product: ProductAdminResponse) {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.productService.deleteProduct(product.id!).subscribe(
        () => {
          this.formSuccess = 'Product deleted successfully!';
          setTimeout(() => {
            this.loadProducts();
          }, 1000);
        },
        error => {
          this.formError = error.error?.message || 'Error deleting product';
        }
      );
    }
  }

  logout() {
    this.authService.logout();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goToCategories() {
    this.router.navigate(['/admin/categories']);
  }
}