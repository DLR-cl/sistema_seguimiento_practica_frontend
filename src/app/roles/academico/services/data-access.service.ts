import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { CantidadInformesPendientes, InfoInformes } from '../interface/info-informes.interface';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService {
  constructor(private readonly _http: HttpClient) {}

  public getInformacionInformes() {
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/info-informes`);
  }

  public getCantidadInformesPendientes() {
    return this._http.get<CantidadInformesPendientes>(`${enviroment.API_URL}/dashboard/pendientes-informes`);
  }

  public getInformesCriticos() {
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/informes-criticos`);
  }
}
