import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Practicas } from '../../secretaria/dto/secretaria-data.dto';
import { enviroment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosPracticaService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerInfoPractica(idPractica: number){
    return this.http.get<Practicas>(`${enviroment.API_URL}/practicas/${idPractica}`)
  }

  public obtenerInformeAlumno(idInforme: number){
    return this.http.get<any>(`${enviroment.API_URL}/informe-alumno/ver-informe/${idInforme}`)
  }
}
