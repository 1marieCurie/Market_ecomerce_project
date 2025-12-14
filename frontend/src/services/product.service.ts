import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  stock?: number;
  sku: string;
  imageUrl?: string;
  brand?: string;
  categoryId: number;
  categoryName?: string; // Pour affichage côté user
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Types exportés pour utilisation dans les composants
export type ProductAdminResponse = Product;
export type ProductAdminResponseDTO = Product;
export type ProductRequest = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'categoryName'>;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private adminApiUrl = 'http://localhost:8080/api/admin/products';

  constructor(private http: HttpClient) {}

  // ========== PUBLIC ENDPOINTS ==========

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  searchProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search`, {
      params: { name }
    });
  }

  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}`);
  }

  // ========== ADMIN ENDPOINTS ==========

  getAllProductsAdmin(): Observable<ProductAdminResponse[]> {
    return this.http.get<ProductAdminResponse[]>(this.adminApiUrl);
  }

  getProductByIdAdmin(id: number): Observable<ProductAdminResponse> {
    return this.http.get<ProductAdminResponse>(`${this.adminApiUrl}/${id}`);
  }

  createProduct(request: ProductRequest): Observable<ProductAdminResponse> {
    return this.http.post<ProductAdminResponse>(this.adminApiUrl, request);
  }

  updateProduct(id: number, request: ProductRequest): Observable<ProductAdminResponse> {
    return this.http.put<ProductAdminResponse>(`${this.adminApiUrl}/${id}`, request);
  }

  updateProductPartial(id: number, request: Partial<ProductRequest>): Observable<ProductAdminResponse> {
    return this.http.patch<ProductAdminResponse>(`${this.adminApiUrl}/${id}`, request);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imageUrl: string }>(`${this.adminApiUrl}/upload`, formData);
  }
}