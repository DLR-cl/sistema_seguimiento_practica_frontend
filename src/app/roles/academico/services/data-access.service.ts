import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { map } from 'rxjs';
import { InfoInformes } from '../interface/info-informes.interface';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getInformacionInformes(id_usuario: number){
    return this._http.get<InfoInformes[]>(`${enviroment.API_URL}/dashboard/info-informes/${id_usuario}`).pipe(
      map(
        (response) => {
          return response as InfoInformes[];
        }
      )
    )
  }
}
