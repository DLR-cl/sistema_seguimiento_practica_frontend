import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

export interface PracticaInfo {
  id_practica: number;
  id_informe: number;
  tipo_practica: string;
  estado_practica: string;
  cantidad_horas: number;
  horas_semanales: number;
  fecha_inicio: Date;
  fecha_termino: Date;
  modalidad: string;
  alumno_nombre: string;
  alumno_correo: string;
  alumno_rut: string;
  alumno_tipo_usuario: string;
  primer_practica: number;
  segunda_practica: number;
  estado_informe_alumno: string;
  informe_alumno_archivo?: string;
  academico_nombre?: string;
  academico_rut?: string;
  horas_practicas_regulares?: number;
  horas_practicas_extraordinarias?: number;
  total_horas?: number;
  horas_inasistencia?: number;
  nota_evaluacion?: number;
  supervisor_nombre?: string;
  supervisor_rut?: string;
  supervisor_correo?: string;
}

export interface AcademicoInformes {
  nombre_academico:  string;
  rut_academico:     string;
  cantidad_informes: number;
  id_academico: number;
}

export interface AcademicoAsociado{
  id_academico: number;
  id_informe: number;
}

@Injectable({
  providedIn: 'root'
})
export class AsignacionInformesService {

  private readonly _http = inject(HttpClient);

  constructor() { }

  public getProfesores(){
    return this._http.get<AcademicoInformes[]>(`${enviroment.API_URL}/academicos/cantidad-informes`)
  }

  public getPracticas(){
    return this._http.get<PracticaInfo[]>(`${enviroment.API_URL}/practicas`)
  }

  public asociarInformeAcademico(academicoAsociado: AcademicoAsociado){
    return this._http.patch<any>(`${enviroment.API_URL}/informe-alumno/asociar-informe`, academicoAsociado)
  }

}
