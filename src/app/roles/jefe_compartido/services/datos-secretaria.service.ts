import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class DatosSecretariaService {

    private readonly _http = inject(HttpClient);

    // Obtener información de académicos
    public getInfoSecretarias() {
        return this._http.get<any[]>(`${enviroment.API_URL}/users/lista-rol/SECRETARIA`);
    }

    // Crear un nuevo académico
    public crearSecretaria(nuevaSecretaria: { nombre: string; correo: string; rut: string, tipo_usuario:string }) {
        return this._http.post<any>(`${enviroment.API_URL}/users`, nuevaSecretaria);
    }

    public getInfoSecretaria(id_academico: number){
        return this._http.get<any>(`${enviroment.API_URL}/users/${id_academico}`)
    }
}
