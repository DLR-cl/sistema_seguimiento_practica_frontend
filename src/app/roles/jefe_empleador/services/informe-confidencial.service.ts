import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../environment/environment';

export interface listaInformes{
  informes_data: datosInforme[]
}

export interface datosInforme{
  estado_entrega: boolean;
  id_practica: number;
  id_informe_confidencial: number;
  nombre_alumno: string;
  tipo_practica: string;   
}

@Injectable({
  providedIn: 'root'
})
export class InformeConfidencialService {

  constructor(
    private http: HttpClient
  ) { }

  public obtenerInformes(idSupervisor: number){
    return this.http.get<listaInformes>(`${enviroment.API_URL}/jefe-alumno/${idSupervisor}/lista-informes`)
  }
  public obtenerDestallesInformes(token: string) {

    return this.http.get<any>(`${enviroment.API_URL}/dashboard/informes-supervisor`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  
  public obtenerAlumnosAsignados() {
    return this.http.get<any>(`${enviroment.API_URL}/dashboard/cantidad-alumnos-asignados`);
  }
  
  public obtenerPractica(idPractica: number){
    return this.http.get<any>(`${enviroment.API_URL}/practicas/${idPractica}`)
  }

  public obtenerDatosEmpresa(){
    return this.http.get<any>(`${enviroment.API_URL}/empresas`)
  }
  

}
