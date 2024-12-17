import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class DatosAcademicosService {

    private readonly _http = inject(HttpClient);

    // Obtener información de académicos
    public getInfoAcademicos() {
        return this._http.get<any[]>(`${enviroment.API_URL}/academicos`);
    }

    // Crear un nuevo académico
    public crearAcademico(nuevoAcademico: { nombre: string; correo: string; rut: string }) {
        return this._http.post<any>(`${enviroment.API_URL}/academicos`, nuevoAcademico);
    }
}
