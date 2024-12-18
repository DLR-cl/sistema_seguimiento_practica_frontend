import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { AuthStateService } from "../../shared/data-access/auth-state.service";


export const combinedInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authState = inject(AuthStateService);
    const router = inject(Router);

    // Obtener el token desde el estado de autenticación
    const token = authState.getSession()?.access_token;

    // Si hay un token, agregarlo al encabezado Authorization
    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = "Ocurrió un error inesperado.";

            if (error.error instanceof ErrorEvent) {
                // Error del lado del cliente
                errorMessage = `Error del cliente: ${error.error.message}`;
            } else {
                // Error del lado del servidor
                switch (error.status) {
                    case 401: // No autorizado
                        errorMessage = error.error.message;
                        authState.signOut(); // Cerrar sesión
                        router.navigate(['/login']); // Redirigir al login
                        break;

                    case 403: // Prohibido
                        errorMessage = "Acceso prohibido. Es posible que necesite cambiar su contraseña.";
                        router.navigate(['/change-password']); // Redirigir al cambio de contraseña
                        break;

                    default: // Otros errores
                        errorMessage = error.error.message || "Error desconocido en el servidor.";
                        console.log(error)
                        break;
                }
            }

            console.error(errorMessage); // Mostrar el error en consola
            return throwError(() => new Error(errorMessage)); // Lanzar el error para manejarlo donde sea necesario
        })
    );
};
