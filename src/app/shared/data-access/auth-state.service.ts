import { inject, Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Session } from "./interface/session.interface";
import { PayloadInterface } from "../interface/payload.interface";
import * as jwt_decode from "jwt-decode";
import { TipoUsuario } from "../../enum/enumerables.enum";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {
    private _storageService: StorageService = inject(StorageService);

    signOut(): void {
        this._storageService.remove('session');
    }

    getSession(): Session | null {

        const maybeSession = this._storageService.get<Session>('session');
        
        if(maybeSession && this._isValidSession(maybeSession)){
            return maybeSession;
        }else{
            this.signOut()
            return null;
        }
    }

    public getRole(): TipoUsuario | null{
        const session = this.getSession();
        if (session) {
          const decodedToken: any = jwt_decode.jwtDecode(session.access_token);
          return decodedToken.rol;
        }
        return null;
      }
      

    public getData(): PayloadInterface | null{
        const session = this.getSession();
        if(session){
            const decodedToken: PayloadInterface = 
            jwt_decode.jwtDecode(session.access_token);
            return decodedToken;
        }
        return null;
    }
    private _isValidSession(maybeSession: unknown): boolean {
        return typeof maybeSession === 'object' &&
         maybeSession !== null &&
         'access_token' in maybeSession;
        
    }


}