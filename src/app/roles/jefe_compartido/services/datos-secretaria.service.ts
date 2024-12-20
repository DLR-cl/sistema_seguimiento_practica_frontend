import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";
import { NuevaSecretaria, ResponseNueva, Secretaria } from "../dto/secretaria.dto";

@Injectable({
    providedIn: 'root'
})
export class DatosSecretariaService {

    private readonly _http = inject(HttpClient);

    // Obtener información de académicos
    public getInfoSecretarias() {
        return this._http.get<Secretaria[]>(`${enviroment.API_URL}/users/lista-rol/SECRETARIA`);
    }

    // Crear un nuevo académico
    public crearSecretaria(nuevaSecretaria: NuevaSecretaria) {
        return this._http.post<ResponseNueva>(`${enviroment.API_URL}/users`, nuevaSecretaria);
    }

    public getInfoSecretaria(id_secretaria: number){
        return this._http.get<Secretaria>(`${enviroment.API_URL}/users/${id_secretaria}`)
    }
}
