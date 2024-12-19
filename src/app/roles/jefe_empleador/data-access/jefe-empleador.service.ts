import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { JefeAlumnoInterface } from "./interface/jefe-alumno.interface";
import { map, Observable } from "rxjs";
import { enviroment } from "../../../environment/environment";
import { AuthStateService } from "../../../shared/data-access/auth-state.service";

@Injectable({
    providedIn: 'root',
})
export class JefeEmpleadorService{
    private readonly _http = inject(HttpClient);
    private readonly _authStateService = inject(AuthStateService);

    public getJefeEmpleador(): 
    Observable<JefeAlumnoInterface> {
        const id_usuario = this.getData();
       return this._http.get<JefeAlumnoInterface>(`${enviroment.API_URL}/jefe-alumno/`+id_usuario)
       .pipe(
        map( (response) => {
            return response as JefeAlumnoInterface;
        })
       );
    }

    // obten el id del usuario
    private getData(): number | null{
        const data = this._authStateService.getData()
        if(data){
            return data.id_usuario;
        }
        return null;
    }
    
}