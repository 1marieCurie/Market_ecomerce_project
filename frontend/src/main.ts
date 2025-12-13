// here we should mention all the global services and interceptors when starting the application

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // all endpoints defined in the app
//JWT
import {JwtInterceptor} from './interceptors/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

//Helpers
// we shall add a helper for HttpClient (predefined function in Angular)
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router'; //for routes

bootstrapApplication(AppComponent, {

  providers : [
    provideRouter(routes),// routes helper
    
    // We have to use Angular 19 syntaxe for interceptors : DI (dependency injection)
    provideHttpClient(withInterceptors([JwtInterceptor])),
  

  ]
});
  
// HttpInterceptorFn → must be registered only via withInterceptors([jwtInterceptor]).

