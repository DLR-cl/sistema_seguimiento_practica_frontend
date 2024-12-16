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

  private url_informes = 'http://localhost:3000/jefe-alumno';

  public obtenerInformes(idSupervisor: number){
    return this.http.get<listaInformes>(`${this.url_informes}/${idSupervisor}/lista-informes`)
  }
  public obtenerDestallesInformes() {
    return this.http.get<any>(`${enviroment.API_URL}/dashboard/informes-supervisor`);
  }
  
  public obtenerAlumnosAsignados() {
    return this.http.get<any>(`${enviroment.API_URL}/dashboard/cantidad-alumnos-asignados`);
  }
  

  public obtenerDatosEmpresa(){
    return this.http.get<any>(`${enviroment.API_URL}/empresas`)
  }
  

}
