import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { map } from 'rxjs';
import { CantidadInformesPendientes, InfoInformes } from '../interface/info-informes.interface';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getInformacionInformes(id_usuario: number){
    console.log(id_usuario);
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/info-informes/${id_usuario}`).pipe(
      map(
        (response) => {
          console.log(response)
          return response as InfoInformes[];
        }
      )
    )
  }

  public getCantidadInformesPendientes(id_usuario: number){
    return this._http.get<CantidadInformesPendientes>(`${enviroment.API_URL}/dashboard/pendientes-informes/${id_usuario}`).pipe(
      map(
        (response) => {
          return response as CantidadInformesPendientes;
        }
      )
    )
  }
  public getInformesCriticos(id_usuario: number){
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/informes-criticos/${id_usuario}`).pipe(
      map(
        (response) => {
          return response as InfoInformes[];
        }
      )
    )
  }
}
