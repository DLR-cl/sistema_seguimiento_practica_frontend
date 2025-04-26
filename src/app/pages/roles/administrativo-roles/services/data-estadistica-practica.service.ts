import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { estadisticasPractica } from '../../jefe_compartido/dto/dashboard-practicas.dto';
import { enviroment } from '../../../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class DataEstadisticaPracticaService {

 private readonly _httpClient = inject(HttpClient);
  datosEstadisticaPractica = signal<estadisticasPractica | null>(null);
  
 constructor() {
  this.obtenerEstadisticaPracticas();
 }

 obtenerEstadisticaPracticas() {
  this._httpClient.get<estadisticasPractica>(`${enviroment.API_URL}/dashboard/estadistica-practicas-dashboard-jefe-carrera`)
  .subscribe((resp) => {
    this.datosEstadisticaPractica.set(resp);
  });
 }
}
