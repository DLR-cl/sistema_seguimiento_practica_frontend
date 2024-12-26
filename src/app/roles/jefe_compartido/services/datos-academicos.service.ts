import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { Academico, AcademicoSolo, NuevoAcademico, ResponseNuevo } from "../dto/academicos.dto";

@Injectable({
    providedIn: 'root'
})
export class DatosAcademicosService {

    private readonly _http = inject(HttpClient);

    // Obtener información de académicos
    public getInfoAcademicos() {
        return this._http.get<Academico[]>(`${enviroment.API_URL}/academicos`);
    }

    // Crear un nuevo académico
    public crearAcademico(nuevoAcademico: NuevoAcademico) {
        return this._http.post<ResponseNuevo>(`${enviroment.API_URL}/academicos`, nuevoAcademico);
    }

    public getInfoAcademico(id_academico: number){
        return this._http.get<AcademicoSolo[]>(`${enviroment.API_URL}/academicos/${id_academico}`)
    }
}
