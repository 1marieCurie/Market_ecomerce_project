import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private adminApiUrl = 'http://localhost:8080/admin/categories';
  private publicApiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  // ========== PUBLIC ENDPOINTS ==========

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.publicApiUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.publicApiUrl}/${id}`);
  }

  // ========== ADMIN ENDPOINTS ==========

  getAllCategoriesAdmin(): Observable<Category[]> {
    return this.http.get<Category[]>(this.adminApiUrl);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.adminApiUrl, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.adminApiUrl}/${id}`, category);
  }

  updateCategoryPartial(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.patch<Category>(`${this.adminApiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imageUrl: string }>(`${this.adminApiUrl}/upload`, formData);
  }
}