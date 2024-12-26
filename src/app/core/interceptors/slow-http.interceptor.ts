import { HttpEvent, HttpRequest, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const SlowHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn // Usamos HttpHandlerFn en lugar de HttpHandler
): Observable<HttpEvent<any>> => {
  console.log('Interceptando solicitud:', req);

  // Simula un retraso en la solicitud (ejemplo de prueba de carga lenta)
  return new Observable<HttpEvent<any>>(observer => {
    setTimeout(() => {
      next(req).subscribe({
        next: (event) => {
          observer.next(event);  // Pasar el evento
        },
        error: (err) => {
          observer.error(err);  // Pasar el error si ocurre
        },
        complete: () => {
          observer.complete();  // Completar la observación
        }
      });
    }, 1000); // Retraso de 2 segundos
  });
};
