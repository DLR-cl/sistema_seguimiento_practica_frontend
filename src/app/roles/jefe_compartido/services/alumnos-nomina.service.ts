import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { CantidadAlumnosEnPractica } from "../interface/alumnosPractica.interface";
import { map } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AlumnosNominaService {
    constructor(
        private readonly _http: HttpClient
    ){}

  public obtenerAlumnoNomina(rut: string){
    return this._http.get<any>(`${enviroment.API_URL}/alumnos-nomina/alumno/${rut}`)
  }
}
