import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../data-access/auth-state.service";
import { inject } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";

// Guard para rutas protegidas
export const privateGuard = (): CanActivateFn => {
    return () => {
        const authState = inject(AuthStateService);
        const router = inject(Router);

        const session = authState.getSession();
        
        if (session) {
            return true;
        }

        // Redirigir a la página de login
        router.navigate(['/public/login']);
        return false;
    }
}

// Guard para rutas públicas
export const publicGuard = (): CanActivateFn => {
    return () => {
        const authState = inject(AuthStateService);
        const authService = inject(AuthService);
        const router = inject(Router);
        const session = authState.getSession();

        // Si hay sesión, redirigir según el rol
        if (session) {
            const role = authState.getRole();
            if (!role) {
                console.error('No se pudo determinar el rol del usuario');
                return router.parseUrl('/public');
            }

            const redirectUrl = authService.getRedirectUrlByRole(role);
            if (!redirectUrl) {
                console.error('No se encontró una ruta válida para el rol:', role);
                return router.parseUrl('/app/menu');
            }

            // Asegurarse de que la ruta comience con 'app/'
            const fullPath = redirectUrl.startsWith('app/') ? redirectUrl : `app/${redirectUrl}`;
            return router.parseUrl(`/${fullPath}`);
        }

        return true;
    }
}

