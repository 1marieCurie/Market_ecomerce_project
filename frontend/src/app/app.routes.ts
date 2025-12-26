import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

// Guards
import { AdminGuard } from '../guards/admin.guard'; // optional, late
import { AuthGuard } from '../guards/auth.guard';

// Components 
import { AdminComponent } from '../components/admin/admin.component'; 
import { UserComponent } from '../components/user/user.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { CartComponent } from '../components/cart/cart.component';
import { ProductDetailComponent } from '../components/product-detail/product-detail.component';
import {AdminCategoriesComponent} from '../components/admin/categories/admin-categories.component';
import { AdminProductsComponent } from '../components/admin/products/admin-products.component';


export const routes: Routes = [
    // Public routes
    { path: '', component: HomeComponent }, // page publique
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // Protected user routes
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    // Protected admin routes
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
        children: [
            { path: 'categories', component: AdminCategoriesComponent },
            {path :'products', component: AdminProductsComponent}
        ]
    },
    // Fallback
    { path: '**', redirectTo: '/home' }
];
