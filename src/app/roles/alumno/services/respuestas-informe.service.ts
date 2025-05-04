import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { existeRespuesta, ListaRespuestas } from '../../supervisor/dto/informe-alumno.dto';
import { respuestaInformeConfidencial } from '../../supervisor/dto/informe-confidencial.dto';

@Injectable({
  providedIn: 'root'
})
export class RespuestasInformeService {

  constructor(
    private http: HttpClient,
  ) { }

  public asociarRespuestas(respuestas: ListaRespuestas){
    return this.http.post<any>(`${enviroment.API_URL}/respuestas-informe-alumno`, respuestas)
  }

  public enviarInforme(formData: FormData){
    return this.http.post<any>(`${enviroment.API_URL}/informe-alumno/subir-informe`, formData)
  }

  public obtenerRespuestasAlumno(idAlumno:number){
    return this.http.get<any>(`${enviroment.API_URL}/informe-alumno/obtener-respuestas/${idAlumno}`)
  }

  public obtenerArchivo(idInforme: number){
    return this.http.get(`${enviroment.API_URL}/informe-alumno/${idInforme}/archivo`, {
      responseType: 'blob'
    })
  }

  public existeRespuesta(idPractica: number){
    return this.http.get<existeRespuesta>(`${enviroment.API_URL}/informe-alumno/existeRespuesta/${idPractica}`)
  }

  public registrarRespuestasConfidencial(respuestas: respuestaInformeConfidencial[]){
    return this.http.post<any>(`${enviroment.API_URL}/respuesta-informe-confidencial`, respuestas)
  }

  public enviarInformeConfidencial(data: FormData, id_informe: number){
    return this.http.patch<any>(`${enviroment.API_URL}/informe-confidencial/actualizar-informe/${id_informe}`, data);
  }

  public obtenerArchivoCorreccion(idInforme: number) {
    return this.http.get(`${enviroment.API_URL}/informe-alumno/archivo/obtener/correccion`, {
      params: { id_informe_alumno: idInforme },
      responseType: 'blob', // Indicamos que esperamos un archivo binario (Blob)
    });
  }
}
