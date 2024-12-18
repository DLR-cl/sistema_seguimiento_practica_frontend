import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

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
  nota?: number
}

export interface respuestaInformeConfidencial {
  id_informe: number;
  id_pregunta: number;
  respuesta_texto?: string;
  puntos?: number;
  nota?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RespuestasInformeService {

  constructor(
    private http: HttpClient,
  ) { }

  public enviarInformeConfidencial(data: FormData, id_informe: number){
    return this.http.patch<any>(`${enviroment.API_URL}/informe-confidencial/actualizar-informe/${id_informe}`, data);
  }
  public asociarRespuestas(respuestas: ListaRespuestas){
    return this.http.post<any>(`${enviroment.API_URL}/respuestas-informe-alumno`, respuestas)
  }

  public enviarInforme(formData: FormData){
    return this.http.post<any>(`${enviroment.API_URL}/informe-alumno/subir-informe`, formData)
  }

  public obtenerArchivo(idInforme: number){
    return this.http.get(`${enviroment.API_URL}/informe-alumno/${idInforme}/archivo`, {
      responseType: 'blob'
    })
  }

  public existeRespuesta(idPractica: number){
    return this.http.get(`${enviroment.API_URL}/informe-alumno/existeRespuesta/${idPractica}`)
  }

  public registrarRespuestasConfidencial(respuestas: respuestaInformeConfidencial[]){
    return this.http.post<any>(`${enviroment.API_URL}/respuesta-informe-confidencial`, respuestas)
  }
}
