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
        const router = inject(Router);
        const authService = inject(AuthService);

        const session = authState.getSession();
        console.log(session);
        // hay que redigir dependiendo del rol que tengan.
        if(session){
            console.log('hola')
            authService.redirectUserByRol();
            return false;
        }
        return true;
    }
}

