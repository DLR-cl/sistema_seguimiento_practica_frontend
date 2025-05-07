import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { enviroment } from '../../environment/environment';
import { Observable } from 'rxjs';
import type { EstadisticaAprobacionPorPractica, EstadisticasPractica } from '../interfaces/estadistica-praactica.interface';
import type { DetallePractica } from '../interfaces/detalle-practica.interface';
import { AprobacionPracticas } from '../interfaces/estadistica-praactica.interface';


@Injectable({
  providedIn: 'root'
})
export class DataEstadisticaPracticaService {

  // Inyección
  private readonly _httpClient = inject(HttpClient);

  // Variables

  // - Booleanas 
  public verDetallePractica = signal<boolean>(false);
  public modalViewDetallesPractica = signal<boolean>(false);
  public cargandoDatosDashboard = signal<boolean>(true);
  // Objetos
  public datosEstadisticaPractica = signal<EstadisticasPractica | null>(null);
  public detallesPracticaAlumnos = signal<DetallePractica[]>([])
  public informeAlumno = signal([]);
  public practicaSeleccionada = signal<DetallePractica | null>(null);

  // Contandores
  contadorSolicitudes = signal<number>(0);

  constructor() {
    this.obtenerEstadisticaPracticas();
  }

  showModalDetallesPractica() {
    console.log(this.modalViewDetallesPractica())
    this.modalViewDetallesPractica.update((current) => !current);
    if (this.modalViewDetallesPractica()) {
      this.obtenerDetallesAlumnosEnPractica();
    }
  }


  obtenerEstadisticaPracticas() {
    this._httpClient.get<EstadisticasPractica>(`${enviroment.API_URL}/dashboard/estadistica-practicas-dashboard-jefe-carrera`)
      .subscribe((resp) => {
        this.datosEstadisticaPractica.set(resp);
      });
  }

  obtenerDetallesAlumnosEnPractica(): Observable<DetallePractica[]> {
    return this._httpClient.get<DetallePractica[]>(`${enviroment.API_URL}/dashboard/obtener-detalles-practica`);
  }
  // Obtener informe del alumno cuya practica esté con el informe del profesor
  public getAprobacionPracticas() {
    return this._httpClient.get<EstadisticaAprobacionPorPractica>(`${enviroment.API_URL}/dashboard/estadisticas/practicas`)
  }

  seleccionarPractica(practica: DetallePractica) {
    this.practicaSeleccionada.set(practica);
    console.log("practica cambiada en servicio", this.practicaSeleccionada())
  }

  mostrarPractica() {
    this.verDetallePractica.update(current => !current);
  }

  sumarContadorDeCarga() {
    this.contadorSolicitudes.update(current => ++current);
  }

  // Lógica para la carga de datos del dashboard
  disminuirContadorDeCarga() {
    this.contadorSolicitudes.update(current => --current);
    this.checkCargandoFinalizado();
  }

  checkCargandoFinalizado() {
    if (this.contadorSolicitudes() === 0) {
      this.cargandoDatosDashboard.update(current => !current);
      console.log("Todas las solicitudes han finalizado.");
    }
  }
}
