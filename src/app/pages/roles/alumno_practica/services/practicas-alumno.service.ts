import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../../environment/environment';
import { PracticaAlumno } from '../../../../gestion-practicas/interfaces/practica-alumno.interface';
import { Empresa } from '../../jefe_compartido/dto/empresa.dto';

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

  public obtenerDetallePractica(idPractica: number){
    return this.http.get<PracticaAlumno>(`${enviroment.API_URL}/practicas/${idPractica}`)
  }
  
  public obtenerEmpresa(){
    return this.http.get<Empresa[]>(`${enviroment.API_URL}/empresas`)
  }
}
