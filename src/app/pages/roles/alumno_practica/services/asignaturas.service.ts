import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsignaturaBack } from '../dto/asignaturas.dto';
import { enviroment } from '../../../../environment/environment';



@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerAsignaturas(){
    return this.http.get<AsignaturaBack[]>(`${enviroment.API_URL}/asignaturas`)
  }

}
