import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { PracticaAlumno } from '../dto/practica-alumno.dto';

@Injectable({
  providedIn: 'root'
})
export class PracticasAlumnoService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerPracticasAlumno(idAlumno: number){
    return this.http.get<PracticaAlumno[]>(`${enviroment.API_URL}/practicas/alumno/${idAlumno}`)
  }
}
