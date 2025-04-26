import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../environment/environment';

export interface Dimension {
  nombre: string;
  descripcion: string;
}

export interface CrearPreguntas {
  preguntas: {
    enunciado_pregunta: string;
    tipo_pregunta: string;
    id_dimension: number;
  }[]
}

export interface AsignarPreguntas{
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
  
  private url_dimensiones = `${enviroment.API_URL}/dimensiones-evaluativas`;
  private url_preguntas = `${enviroment.API_URL}/preguntas`
  private url_implementadas_confidencial = `${enviroment.API_URL}/preguntas-implementadas-confidencial`;
  private url_implementadas_alumno = `${enviroment.API_URL}/preguntas-implementadas-informe-alumno`;

  public getPreguntasConfidencial(){
    return this.http.get<any>(`${this.url_implementadas_confidencial}`)
  }

  public getPreguntasAlumno(){
    return this.http.get<any>(`${this.url_implementadas_alumno}`)
  }

  public asociatePreguntasAlumno(preguntas: AsignarPreguntas[]){
    return this.http.post<any>(`${this.url_implementadas_alumno}/asociar-varios`, preguntas)
  }


  public getDimensiones(){
    return this.http.get<Dimension[]>(`${this.url_dimensiones}`)
  }

  public createDimension(dimension: any){
    return this.http.post<any>(`${this.url_dimensiones}`, dimension)
  }

  public getPreguntas(){
    return this.http.get<any>(`${this.url_preguntas}`)
  } 

  public createPreguntas(preguntas: CrearPreguntas){
    console.log(preguntas)
    return this.http.post<any>(`${this.url_preguntas}/crear-varios`, preguntas)
  }

}
