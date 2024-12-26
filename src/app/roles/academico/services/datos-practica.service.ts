import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { Practicas } from '../../secretaria/dto/practicas.dto';
import { Observable } from 'rxjs';
import { PreguntaEvaluacion } from '../dto/revision-informes.dto';

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

  public getArchivoInforme(id_informe: number): Observable<Blob> {
    return this.http.get(`${enviroment.API_URL}/informe-alumno/ver-informe/${id_informe}`, {
      responseType: 'blob' 
    });
  }

  public obtenerPreguntasEvaluacion(){
    return this.http.get<PreguntaEvaluacion[]>(`${enviroment.API_URL}/evaluacion-academica/obtener-preguntas-implementadas`)
  }

  public enviarRevision(revision: any){
    return this.http.post<any>(`${enviroment.API_URL}/evaluacion-academica`, revision)
  }

  public enviarCorreccionInforme(formdata: FormData){
    return this.http.patch<any>(`${enviroment.API_URL}/academicos/subir-correccion`, formdata)
  }
}
