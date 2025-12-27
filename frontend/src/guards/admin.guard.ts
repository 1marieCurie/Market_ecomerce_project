//this file is for the definition of permited routes in respect to roles for client side (Angular)
// we shall define some routes assesible only for admins, otherwise we should redirect the user to another page

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
    providedIn : 'root' // only one instance available of this guard everywhere in the app

})
//the class Admin guard should implement the methode canActivate() and return weither true or false
export class AdminGuard implements CanActivate{

    constructor(private router : Router){} //inject the Router service so we can redirect the user if necessary
    
    canActivate(): boolean | UrlTree {

        const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // si pas défini, on prend []
        if (roles.includes('ROLE_ADMIN')) {
            return true; // autorisé
        }
        return this.router.parseUrl('/login'); // sinon, redirige vers la page publique
    }
}
//and then we use this class in app.routes.ts