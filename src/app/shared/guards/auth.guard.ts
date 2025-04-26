import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../data-access/auth-state.service";
import { inject } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";

// si no inicia sesión, no entra a ningun lado
export const privateGuard =  (): CanActivateFn => {
    return () => {
        const authState = inject(AuthStateService)
        const router = inject(Router);

        const session = authState.getSession();
        
        if(session){
            return true;
        }

        router.navigateByUrl('login');
        
        return false;
    }
}
// dsad

export const publicGuard = (): CanActivateFn => {
    return () => {


        const authState = inject(AuthStateService);
        const authService = inject(AuthService);
        const router = inject(Router);
        const session = authState.getSession();
        // hay que redigir dependiendo del rol que tengan.
        if(session) {

            const redirectUrl = authService.getRedirectUrlByRole(authState.getRole());
            return router.parseUrl(redirectUrl);
        }
        return true;
    }
}

