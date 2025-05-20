import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { PracticaAlumno } from '../../../gestion-practicas/interfaces/practica-alumno.interface';
import { enviroment } from '../../../environment/environment';
import type { GenerarPDF, PreguntaEvaluacion } from '../interfaces/revision-informes.dto';

@Injectable({
  providedIn: 'root'
})
export class DatosPracticaService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerInfoPractica(idPractica: number){
    return this.http.get<PracticaAlumno>(`${enviroment.API_URL}/practicas/${idPractica}`)
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

  public descargarPDF(practica: number) {
    const params = { 
      id_practica: practica, 
    };
    
    this.http
    .get(`${enviroment.API_URL}/evaluacion-academica/obtener-informe/evaluacion-practica`, {
      params, // Parámetros en formato JSON
      responseType: 'blob', // Necesario para manejar archivos binarios
    })
    .subscribe({
      next: (response) => {
        // Crear una URL temporal para descargar el archivo
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = `informe_evaluacion_practica_${practica}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url); // Liberar la memoria
      },
      error: (error) => {
        console.error('Error al descargar el informe de evaluación de la práctica:', error);
      },
    });
  }



}
