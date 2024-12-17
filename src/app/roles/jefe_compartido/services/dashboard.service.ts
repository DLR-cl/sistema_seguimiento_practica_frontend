import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { CantidadAlumnosEnPractica } from "../interface/alumnosPractica.interface";
import { map } from "rxjs";

export interface estadisticasPractica{
    estudiantes_practica: number,
    estudiantes_revision: number,
    informes_sin_enviar: number,
    total_asignados: number,
    max_informes: number
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(
        private readonly _http: HttpClient
    ){}

    public getCantidadEstudiantesEnPractica(){
        return this._http.get<CantidadAlumnosEnPractica>(`${enviroment.API_URL}/dashboard`).pipe(
            map(
                (response) => {
                    return response as CantidadAlumnosEnPractica
                }
            )
        )
    }

    public getEstadisticasPracticas(){
        return this._http.get<any>(`${enviroment.API_URL}/dashboard/estadistica-practicas-dashboard-jefe-carrera`)   
    }

    public getAprobacionPracticas(){
        return this._http.get<any>(`${enviroment.API_URL}/dashboard/aprobacion-practicas`)   
    }
    
    public getAlumnosActivosPracticas(){
        return this._http.get<any>(`${enviroment.API_URL}/dashboard/alumnos-activos-practica`)   
    }
}
