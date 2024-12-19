import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { StorageService } from "../data-access/storage.service";
import * as jwt_decode from "jwt-decode";
import { PayloadInterface } from "../interface/payload.interface";
import { AuthStateService } from "../data-access/auth-state.service";
import { Session } from "../data-access/interface/session.interface";
import { TipoUsuario } from "../../enum/enumerables.enum";

export const roleGuard = (roles: TipoUsuario[]): CanActivateFn => {
    return () => {
        const router = inject(Router);
        const authState = inject(AuthStateService);

        const session: Session | null= authState.getSession();
        
        if(!session){
            router.navigate(['login']);
            return false;
        }
  
        const token = session.access_token;
        const payload: PayloadInterface = jwt_decode.jwtDecode(token);
        console.log(payload);
        console.log(payload.rol);
        if(roles.includes(payload.rol)){
                return true;
        }else {
            router.navigate(['/unauthorized']);
            return false;
        }

    }
}