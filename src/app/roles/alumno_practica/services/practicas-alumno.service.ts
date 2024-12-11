import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PracticasAlumnoService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerPracticasAlumno(idAlumno: number){
    return this.http.get<any>(`${enviroment.API_URL}/practicas/alumno/${idAlumno}`)
  }
}
