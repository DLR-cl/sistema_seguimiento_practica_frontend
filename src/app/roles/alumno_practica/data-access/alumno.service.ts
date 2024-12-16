import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthStateService } from "../../../shared/data-access/auth-state.service";
import { map, Observable } from "rxjs";
import { AlumnoInterface } from "./interfaces/alumno.interface";
import { enviroment } from "../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class AlumnoService {
    
    private readonly _http = inject(HttpClient);
    private readonly _authStateService = inject(AuthStateService);

    public getAlumnoPracticante(): Observable<AlumnoInterface>{
        const id_usuario = this.getData();
        
        return this._http.get<AlumnoInterface>(`${enviroment.API_URL}/alumno-practica/`+id_usuario).pipe(
            map(
                (response) => {
                    return response as AlumnoInterface;
                }
            )
        )
        
    }
    

    private getData(): number | null {
        const data = this._authStateService.getData();
        if(data){
            return data.id_usuario
        }
        return null;
    }
}