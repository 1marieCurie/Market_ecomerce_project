import { HttpInterceptorFn } from '@angular/common/http';


export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

// we need to add this interceptor so he can add the JWT token to the header of each http request sent to the backend
// so we dont need to copy past the token everywhere

// without this interceptor, we gotta add the jwt token manually in each Angular service
// this interceptor works like a global filter for the client side(Angular)

//We injectonly classes, but not functions. here we do have a function so we dont need injectable()