import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

export interface nuevaPractica {
  id_empresa: number;
  id_supervisor: number;
  id_alumno: number;
  fecha_inicio: Date;
  fecha_termino: Date;
  cantidad_horas: number;
  horas_semanales: number;
  modalidad: string;
  tipo_practica: string;
}

export interface nuevaEmpresa {
  nombre_razon_social: string;
  ubicacion: string;
  rubro: string;
  nombre_gerente: string;
}

export interface nuevoAlumno {
  correo: string;
  nombre: string;
  rut: string;
  tipo_usuario: string;
}

export interface nuevoSupervisor {
    correo: string;
    nombre: string;
    rut: string;
    tipo_usuario: string;
    cargo: string;
    id_empresa: number;
}


export interface jefeSupervisor{
  id_user: number;
  cargo: string;
  id_empresa: number;
  usuario: usuario
}

export interface empresa {
  id_empresa: number;
  nombre_razon_social: string;
  ubicacion: string;
  rubro: string;
  nombre_gerente: string;
  jefe_supervisor: jefeSupervisor[];
}

export interface alumnoPractica{
  id_user: number;
  primer_practica: boolean;
  segunda_practica: boolean;
}

export interface alumno{
  id_usuario: number;
  nombre: string;
  correo: string;
  rut: string;
  tipo_usuario: string;
  alumno_practica: alumnoPractica;
}

export interface usuario{
  id_usuario: number;
  password: string;
  correo: string;
  nombre: string;
  rut: string;
  tipo_usuario: string;
}

@Injectable({
  providedIn: 'root'
})

export class GenerarPracticaService {

  constructor(
    private http: HttpClient,
  ) { }

  // private url_practicas = 'http://localhost:3000/practicas';
  // private url_empresas = 'http://localhost:3000/empresas';
  // private url_supervisor = 'http://localhost:3000/jefe-alumno';
  // private url_alumnos = 'http://localhost:3000/alumno-practica';

  // PENDIENTE
  public crearPractica(datosPractica: nuevaPractica){
    return this.http.post<any>(`${enviroment.API_URL}/practicas`, datosPractica)
  }

  public crearEmpresa(datosEmpresa: nuevaEmpresa){
    return this.http.post<any>(`${enviroment.API_URL}/empresas`, datosEmpresa)
  }

  public crearSupervisor(datosSupervisor: nuevoSupervisor){
    return this.http.post<any>(`${enviroment.API_URL}/jefe-alumno`, datosSupervisor)
  }

  public crearAlumno(datosAlumno: nuevoAlumno){
    return this.http.post<any>(`${enviroment.API_URL}/alumno-practica/registro`, datosAlumno)
  }

  public obtenerEmpresas(){
    return this.http.get<empresa[]>(`${enviroment.API_URL}/empresas`)
  }

  public obtenerAlumnos(){
    return this.http.get<alumno[]>(`${enviroment.API_URL}/alumno-practica`)
  }
}
