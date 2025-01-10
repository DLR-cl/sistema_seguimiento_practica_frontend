import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InformesService {

  constructor(
    private http: HttpClient
  ){}

  public obtenerInformes() {
    return this.http.get<any>(`${enviroment.API_URL}/evaluacion-academica/obtener/informes/listar`);
  }
}
