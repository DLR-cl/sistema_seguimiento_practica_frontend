import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { map } from "rxjs";
import { CantidadAlumnosEnPractica, AlumnosActivosPractica, AprobacionPracticas, detallePractica, estadisticasPractica, practicasMes } from "../dto/dashboard-practicas.dto";
import { Practicas } from "../../secretaria/dto/practicas.dto";

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
        return this._http.get<estadisticasPractica>(`${enviroment.API_URL}/dashboard/estadistica-practicas-dashboard-jefe-carrera`)   
    }

    public getAprobacionPracticas(){
        return this._http.get<AprobacionPracticas>(`${enviroment.API_URL}/dashboard/aprobacion-practicas`)   
    }
    
    public getAlumnosActivosPracticas(){
        return this._http.get<AlumnosActivosPractica[]>(`${enviroment.API_URL}/dashboard/alumnos-activos-practica`)   
    }
    
    public getDetallesPracticas(){
        return this._http.get<detallePractica[]>(`${enviroment.API_URL}/dashboard/obtener-detalles-practica`)
    }

    public getPracticasMeses(periodo: number){
        return this._http.get<practicasMes[]>(`${enviroment.API_URL}/dashboard/obtener-practicas-meses/${periodo}`)
    }

    public obtenerPractica(idPractica: number){
        return this._http.get<Practicas>(`${enviroment.API_URL}/practicas/${idPractica}`)
      }
}
