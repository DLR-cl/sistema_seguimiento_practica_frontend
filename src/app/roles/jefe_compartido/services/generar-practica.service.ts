import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';
import { nuevaPractica } from '../dto/practicas.dto';
import { Empresa, NuevaEmpresa, NuevoSupervisor, ResponseEmpresa, ResponseSupervisor } from '../dto/empresa.dto';
import { AlumnosDataDto, nuevoAlumno } from '../dto/alumno.dto';

@Injectable({
  providedIn: 'root'
})

export class GenerarPracticaService {

  constructor(
    private http: HttpClient,
  ) { }

  public crearPractica(datosPractica: nuevaPractica){
    return this.http.post<any>(`${enviroment.API_URL}/practicas`, datosPractica)
  }

  public crearEmpresa(datosEmpresa: NuevaEmpresa){
    return this.http.post<ResponseEmpresa>(`${enviroment.API_URL}/empresas`, datosEmpresa)
  }

  public crearSupervisor(datosSupervisor: NuevoSupervisor){
    return this.http.post<ResponseSupervisor>(`${enviroment.API_URL}/jefe-alumno`, datosSupervisor)
  }

  public crearAlumno(datosAlumno: nuevoAlumno){
    return this.http.post<any>(`${enviroment.API_URL}/alumno-practica/registro`, datosAlumno)
  }

  public obtenerEmpresas(){
    return this.http.get<Empresa[]>(`${enviroment.API_URL}/empresas`)
  }

  public obtenerAlumnos(){
    return this.http.get<AlumnosDataDto[]>(`${enviroment.API_URL}/alumno-practica`)
  }
}
