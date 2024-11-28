import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Dimension {
  nombre: string;
  descripcion: string;
}

export interface Pregunta {
  preguntas: {
    enunciado_pregunta: string;
    tipo_pregunta: string;
    id_dimension: number;
  }[]
}

export interface Asignarpregunta{
  preguntas: {
    id_pregunta: number
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class PreguntasInformeService {

  constructor(
    private http: HttpClient,
  ) { }
  
  private url_dimensiones = 'http://localhost:3000/dimensiones-evaluativas';
  private url_preguntas = 'http://localhost:3000/preguntas'
  private url_implementadas_confidencial = 'http://localhost:3000/preguntas-implementadas-confidencial';
  private url_implementadas_alumno = 'http://localhost:3000/preguntas-implementadas-informe-alumno';

  public getPreguntasConfidencial(){
    return this.http.get<any>(`${this.url_implementadas_confidencial}`)
  }

  public getPreguntasAlumno(){
    return this.http.get<any>(`${this.url_implementadas_alumno}`)
  }

  public asociatePreguntasAlumno(preguntas: Asignarpregunta[]){
    return this.http.post<any>(`${this.url_implementadas_alumno}/asociar-varios`, preguntas)
  }


  public getDimensiones(){
    return this.http.get<Dimension[]>(`${this.url_dimensiones}`)
  }

  public createDimension(dimension: any){
    return this.http.post<any>(`${this.url_dimensiones}/crear`, dimension)
  }

  public getPreguntas(){
    return this.http.get<any>(`${this.url_preguntas}`)
  }

  public createPreguntas(preguntas: Pregunta){
    console.log(preguntas)
    return this.http.post<any>(`${this.url_preguntas}/crear-varios`, preguntas)
  }

}
