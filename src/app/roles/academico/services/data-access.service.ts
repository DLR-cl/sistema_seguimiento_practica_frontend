import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { CantidadInformesPendientes, InfoInformes } from '../interface/info-informes.interface';

@Injectable({
  providedIn: 'root',
})
export class DataAccessService {
  constructor(private readonly _http: HttpClient) {}

  public getInformacionInformes(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Adjunta el token al encabezado
    });
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/info-informes`, { headers });
  }

  public getCantidadInformesPendientes(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get<CantidadInformesPendientes>(`${enviroment.API_URL}/dashboard/pendientes-informes`, { headers });
  }

  public getInformesCriticos(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/informes-criticos`, { headers });
  }
}
