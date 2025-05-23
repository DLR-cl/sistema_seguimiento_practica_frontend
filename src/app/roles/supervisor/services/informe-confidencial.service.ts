import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

import { AlumnosAsignados } from '../dto/dashboard.dto';
import { Empresa } from '../../../pages/roles/jefe_compartido/dto/empresa.dto';
import type { PracticaAlumno } from '../../../gestion-practicas/interfaces/practica-alumno.interface';
import type{ DetallesInformes, ListaInformes } from '../dto/informe-confidencial.dto';

@Injectable({
  providedIn: 'root'
})
export class InformeConfidencialService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerInformes(idSupervisor: number){
    return this.http.get<ListaInformes>(`${enviroment.API_URL}/jefe-alumno/${idSupervisor}/lista-informes`)
  }
  public obtenerDestallesInformes(token: string) {

    return this.http.get<DetallesInformes[]>(`${enviroment.API_URL}/dashboard/informes-supervisor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  public obtenerAlumnosAsignados() {
    return this.http.get<AlumnosAsignados>(`${enviroment.API_URL}/dashboard/cantidad-alumnos-asignados`);
  }
  
  public obtenerPractica(idPractica: number){
    return this.http.get<PracticaAlumno>(`${enviroment.API_URL}/practicas/${idPractica}`)
  }

  public obtenerDatosEmpresas(){
    return this.http.get<Empresa[]>(`${enviroment.API_URL}/empresas`)
  }
  

}
