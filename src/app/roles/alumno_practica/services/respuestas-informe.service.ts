import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface createInforme{
  id_practica: number;
  id_alumno: number;
}

export interface ListaRespuestas{
  respuestas: Respuesta[]
}

export interface Respuesta{
  id_informe?: number;
  id_pregunta: number;
  texto?: string;
  puntaje?: number;
  asignaturas?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RespuestasInformeService {

  constructor(
    private http: HttpClient,
  ) { }

  private url_respuestasInforme = 'http://localhost:3000/respuestas-informe-alumno';
  private url_informe = 'http://localhost:3000/informe-alumno'


  public crearInformeAlumno(informe: createInforme){
    return this.http.post<any>(`${this.url_informe}`, informe)
  }

  public asociarRespuestas(respuestas: ListaRespuestas){
    return this.http.post<any>(`${this.url_respuestasInforme}`, respuestas)
  }

  public enviarInforme(formData: FormData){
    return this.http.post<any>(`${this.url_informe}/upload`, formData)
  }

  public obtenerArchivo(idInforme: number){
    return this.http.get(`${this.url_informe}/${idInforme}/archivo`, {
      responseType: 'blob'
    })
  }

}
