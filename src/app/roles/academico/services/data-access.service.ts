import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(
    private readonly _http: HttpClient,
  ) { }

  public getInformacionInformes(){
    return this._http.get<any>(`${enviroment.API_URL}`)
  }
}
