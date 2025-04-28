import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../environment/environment';
import { Observable } from 'rxjs';

import type { PracticaAlumno } from '../interfaces/practica-alumno.interface';
import type { AcademicoData } from '../interfaces/academico-info.interface';
import type { AlumnosActivosPorPractica } from '../interfaces/estadistica-praactica.interface';

@Injectable({
  providedIn: 'root'
})
export class DataPracticaAlumnoService {

  dataPracticaAlumno = signal<PracticaAlumno | null>(null);
  dataAcademico = signal<AcademicoData | null>(null);
  verListaPracticasAlumno = signal<boolean>(false);
  private _httpClient = inject(HttpClient);

  
  constructor() { }

  getDataPracticaAlumno(id_practica: number): Observable<PracticaAlumno> {
    return this._httpClient.get<PracticaAlumno>(`${enviroment.API_URL}/practicas/${id_practica}`);
  }

  getDataAcademico(id_academico: number) {
    console.log(id_academico)
    return this._httpClient.get<AcademicoData>(`${enviroment.API_URL}/academicos/${id_academico}`);
  }

  getAlumnosPracticaActiva() {
    return this._httpClient.get<AlumnosActivosPorPractica[]>(`${enviroment.API_URL}/dashboard/alumnos-activos-practica`)
  }

  mostrarModalListaPractica() {
    this.verListaPracticasAlumno.update( current => !current)
  }
}
