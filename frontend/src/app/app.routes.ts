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
//import { CartComponent } from '../components/cart/cart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, // page publique
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path : 'admin', component :  AdminComponent, canActivate : [AdminGuard]},
    {path : 'user', component : UserComponent, canActivate: [AuthGuard] },
   // { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' } // wildcard for unknown functions
]