import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  username: string | null = null;
  showForm = false;
  editingCategory: Category | null = null;
  categoryForm!: FormGroup;
  formLoading = false;
  formError = '';
  formSuccess = '';
  
  searchTerm = '';
  imagePreview: string | null = null;
  imageFile: File | null = null;

  constructor(
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
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: [''],
      imageUrl: ['']
    });
  }

  loadCategories() {
    this.categoryService.getAllCategoriesAdmin().subscribe(
      categories => {
        this.categories = categories;
        this.loading = false;
      },
      error => {
        console.error('Error loading categories:', error);
        this.formError = 'Failed to load categories';
        this.loading = false;
      }
    );
  }

  get filteredCategories(): Category[] {
    if (!this.searchTerm) return this.categories;
    return this.categories.filter(c =>
      c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openForm(category?: Category) {
    this.formError = '';
    this.formSuccess = '';
    this.editingCategory = category || null;
    this.showForm = true;

    if (category) {
      this.categoryForm.patchValue(category);
      this.imagePreview = category.imageUrl || null;
    } else {
      this.categoryForm.reset();
      this.imagePreview = null;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeForm() {
    this.showForm = false;
    this.editingCategory = null;
    this.categoryForm.reset();
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
    if (this.categoryForm.invalid) {
      return;
    }

    this.formError = '';
    this.formSuccess = '';
    this.formLoading = true;

    const formValue = this.categoryForm.value;
    const request: Category = {
      ...formValue,
      imageUrl: this.imagePreview || ''
    };

    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id!, request).subscribe(
        () => {
          this.formSuccess = '✅ Category updated successfully!';
          this.formLoading = false;
          setTimeout(() => {
            this.closeForm();
            this.loadCategories();
          }, 1500);
        },
        error => {
          this.formError = error.error?.message || 'Error updating category';
          this.formLoading = false;
        }
      );
    } else {
      this.categoryService.createCategory(request).subscribe(
        () => {
          this.formSuccess = '✅ Category created successfully!';
          this.formLoading = false;
          setTimeout(() => {
            this.closeForm();
            this.loadCategories();
          }, 1500);
        },
        error => {
          this.formError = error.error?.message || 'Error creating category';
          this.formLoading = false;
        }
      );
    }
  }

  deleteCategory(category: Category) {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      this.categoryService.deleteCategory(category.id!).subscribe(
        () => {
          this.formSuccess = '✅ Category deleted successfully!';
          setTimeout(() => {
            this.loadCategories();
          }, 1000);
        },
        error => {
          this.formError = error.error?.message || 'Error deleting category';
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

  goToProducts() {
    this.router.navigate(['/admin/products']);
  }
}
