import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authState = inject(AuthService); // Usar inyección con funciones
  const session = authState.getDecodedToken();

  if (session) {
    const token = JSON.parse(session)?.access_token;
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest);
    }
  }

  return next(req);
};
