import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { CantidadAlumnosEnPractica } from "../interface/alumnosPractica.interface";
import { map } from "rxjs";

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
}
