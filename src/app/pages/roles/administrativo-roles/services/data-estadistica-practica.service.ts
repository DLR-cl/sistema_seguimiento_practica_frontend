import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { enviroment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import type { EstadisticasPractica } from '../interfaces/estadistica-praactica.interface';
import type { DetallePractica } from '../interfaces/detalle-practica.interface';


@Injectable({
  providedIn: 'root'
})
export class DataEstadisticaPracticaService {

  private readonly _httpClient = inject(HttpClient);
  public datosEstadisticaPractica = signal<EstadisticasPractica | null>(null);
  public modalViewDetallesPractica = signal<boolean>(false);
  public detallesPracticaAlumnos = signal<DetallePractica[]>([])
  public informeAlumno = signal([]);
  public practicaSeleccionada = signal<DetallePractica | null>(null);

  public verDetallePractica = signal<boolean>(false);

  constructor() {
    this.obtenerEstadisticaPracticas();
  }

  showModalDetallesPractica() {
    console.log(this.modalViewDetallesPractica())
    this.modalViewDetallesPractica.update( (current) => !current);
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
  obtenerInformeAlumno( id_practica: number ) {
    this._httpClient.get('');
  }

  seleccionarPractica(practica: DetallePractica ) {
    this.practicaSeleccionada.set(practica);
  }

  mostrarPractica() {
    this.verDetallePractica.update( current => !current);  
  
  }
}
