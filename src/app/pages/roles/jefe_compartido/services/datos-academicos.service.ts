import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../../environment/environment";
import { Academico, AcademicoSolo, NuevoAcademico, ResponseNuevo } from "../dto/academicos.dto";

@Injectable({
    providedIn: 'root'
})
export class DatosAcademicosService {

    constructor(
        private _http: HttpClient
    ){}

    public getInfoAcademicos() {
        return this._http.get<Academico[]>(`${enviroment.API_URL}/academicos`);
    }

    public crearAcademico(nuevoAcademico: NuevoAcademico) {
        return this._http.post<ResponseNuevo>(`${enviroment.API_URL}/academicos`, nuevoAcademico);
    }

    public getInfoAcademico(id_academico: number){
        return this._http.get<AcademicoSolo[]>(`${enviroment.API_URL}/academicos/${id_academico}`)
    }
}
