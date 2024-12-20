import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { Practicas } from '../../secretaria/dto/practicas.dto';


export interface Dimension {
  id_dimension: number;
  nombre: string;
  descripcion: string;
  idDimensionPadre: number;
}

export interface Pregunta {
  id_pregunta: number;
  enunciado_pregunta: string;
  tipo_pregunta: string;
  id_dimension: number;
  dimension: Dimension;
}

export interface PreguntaEvaluacion {
  id_pregunta: number;
  pregunta: Pregunta;
}

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

  public obtenerPreguntasEvaluacion(){
    return this.http.get<any>(`${enviroment.API_URL}/evaluacion-academica/obtener-preguntas-implementadas`)
  }

  public enviarRevision(revision: any){
    return this.http.post<any>(`${enviroment.API_URL}/evaluacion-academica`, revision)
  }
}
