import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { enviroment } from "../../../environment/environment";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class DatosAcademicosService {

    private readonly _http = inject(HttpClient);

    public getInfoAcademicos(){
        return this._http.get<any[]>(`${enviroment.API_URL}/academicos`)
    }
}